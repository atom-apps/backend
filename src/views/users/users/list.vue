<template>
  <div>
    <PageHeader subtitle="用户管理">
      <ActionCreate v-can="'UserCreate'" :to="{ name: 'UserCreate' }" />
      <ActionImport v-can="'UserImport'"/>
      <ActionExport v-can="'UserDownload'"/>
      <ActionRefresh @click="fetchData" />
      <ActionDensity v-model:size="size" />
      <ActionColumn :columns="allColumns" :hidden="hiddenColumns" v-model:clone="showColumns" />
    </PageHeader>

    <QueryForm class="m-5 pt-5" ref="queryForm" @search="fetchData" :filters="tableUserFilters()" />

    <a-table class="m-5" row-key="id" :hoverable="true" :stripe="true" :row-selection="rowSelection"
      v-model:selectedKeys="selectedKeys" :loading="loading" :pagination="pagination" :columns="showColumns"
      :data="renderData" :size="size" @page-change="onPageChange" @page-size-change="onPageSizeChange">
      <template #created_at="{ record }"> {{ date(record.created_at) }} </template>
      <template #updated_at="{ record }"> {{ date(record.updated_at) }} </template>

      <template #status="{ record }">
        <a-badge status="danger" v-if="record.status == 'blocked'" />
        <a-badge status="normal" v-else :text="record.status" />
      </template>

      <template #email="{ record }">
        <a-badge status="normal" v-if="record.email_verified" :text="record.email" />
        <a-badge status="warning" v-else :text="record.email" />
      </template>

      <template #tenant_role="{ record }">
        <a-space wrap>
          <a-tag color="orange" v-for="item in record.tenant_roles">
            {{ item.tenant.name }}/{{ item.role.name }}
          </a-tag>
        </a-space>
      </template>

      <template #operations="{ record }">
        <RowOperations v-if="record.id > 1" :record="record" :reload="fetchData" edit="UserEdit" view="UserView" remove="UserDelete"
          :params="{ id: record.id }" :deleteAction="deleteUserItem">
          <a-button v-can="'UserAddressList'" type="outline" size="mini" status="normal"
            @click="$router.push({ name: 'UserAddressList', params: { user_id: record.id } })">地址管理</a-button>

          <a-button v-can="'UserTenantRole'" type="outline" size="mini" status="normal"
            @click="$router.push({ name: 'UserTenantRole', params: { id: record.id } })">角色分配</a-button>

          <a-popconfirm v-if="'UserResetPassword'" content="确认重置用户密码？" type="warning" :ok-loading="passwordReseting"
            @ok="handlerResetPassword(record.id)" position="lt" :data-id="record.id">
            <a-button type="outline" size="mini">重置密码</a-button>
          </a-popconfirm>
        </RowOperations>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import {
UserItem,
UserListQuery,
deleteUserItem,
queryUserList,
resetUserPassword,
tableUserColumns,
tableUserFilters,
} from "@/api/users/users";
import { PageHeader } from "@/components/layout";
import {
ActionColumn,
ActionCreate,
ActionDensity,
ActionExport,
ActionImport,
ActionRefresh,
QueryForm,
RowOperations,
} from "@/components/table";
import { SizeProps } from "@/components/table/types";
import useDatetime from "@/hooks/datetime";
import useLoading from "@/hooks/loading";
import { Pagination } from "@/types/global";
import {
Message,
Notification,
PaginationProps,
TableColumnData,
TableRowSelection,
} from "@arco-design/web-vue";
import { onMounted, reactive, ref } from "vue";

const { date } = useDatetime();

const size = ref<SizeProps>("large");
const queryForm = ref();

const { columns, hidden } = tableUserColumns();
const allColumns = ref<TableColumnData[]>(columns ?? []);
const hiddenColumns = ref<string[]>(hidden ?? []);
const showColumns = ref<TableColumnData[]>([]);

// load columns
onMounted(() => {
  fetchData(basePagination);
});

// reset password
const { loading: passwordReseting, setLoading: setPasswordReseting } = useLoading(false);
const handlerResetPassword = async (id: number) => {
  try {
    setPasswordReseting(true);
    const { data } = await resetUserPassword(id);
    Notification.success({
      title: '密码重置成功',
      content: `新密码：${data}, 请复制后手动关闭`,
      closable: true,
      duration: 0,
    })
  } catch (e: any) {
    Message.error(e.message);
  } finally {
    setPasswordReseting(false);
  }
};

// fetch table data
const { loading, setLoading } = useLoading(true);
const renderData = ref<UserItem[]>([]);

const basePagination: Pagination = { current: 1, pageSize: 20 };
const pagination = reactive<PaginationProps>({
  ...basePagination,
  showPageSize: true,
  showJumper: true,
  showTotal: true,
  simple: false,
  hideOnSinglePage: true,
  showMore: true,
});

const fetchData = async (pg: Pagination = basePagination) => {
  setLoading(true);
  try {
    const pages = { page: pg.current, limit: pg.pageSize };
    const params = ({
      ...pages,
      ...queryForm.value?.filterItems(),
    } as unknown) as UserListQuery;
    console.log(params);

    const { data } = await queryUserList(params);
    renderData.value = data.items;
    pagination.total = data.total;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

const onPageChange = (current: number) => {
  pagination.current = current;
  fetchData({ current: current, pageSize: pagination.pageSize });
};

const onPageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize;
  fetchData({ current: pagination.current, pageSize: pageSize });
};

// row selection
const selectedKeys = ref([]);

const rowSelection = reactive<TableRowSelection>({
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: false,
});
</script>
