<template>
  <div class="mx-5 my-5 mt-0">
    <Breadcrumb :items="['menu.list', 'menu.list.searchTable']" />
    <a-card class="general-card" title="用户列表">
      <Query ref="queryForm" @search="fetchData" />
      <a-row class="mb-5">
        <a-col :span="12">
          <a-space>
            <ActionCreate :to="{ 'name': 'Workplace' }" />
            <ActionImport />
          </a-space>
        </a-col>
        <a-col :span="12" class="flex justify-end items-center">
          <a-space>
            <ActionExport />
            <ActionRefresh @click="fetchData" />
            <ActionDensity v-model:size="size" />
            <ActionColumn :columns="columns" v-model:clone="tableColumns" />
          </a-space>
        </a-col>
      </a-row>

      <a-table row-key="id" :loading="loading" :pagination="pagination" :columns="tableColumns" :data="renderData"
        :bordered="false" :size="size" @page-change="onPageChange">
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { UserItem, UserListQuery, queryUserList } from "@/api/users";
import { ActionColumn, ActionCreate, ActionDensity, ActionExport, ActionImport, ActionRefresh, } from "@/components/table/action";
import { SizeProps } from '@/components/table/types';
import useLoading from "@/hooks/loading";
import { Pagination } from "@/types/global";
import { TableColumnData } from "@arco-design/web-vue";
import { onMounted, reactive, ref } from "vue";
import Query from "./query.vue";

const size = ref<SizeProps>("large");
const queryForm = ref();

const columns =  [
  { title: "ID", dataIndex: "id", slotName: "index" },
  { title: "创建时间", dataIndex: "created_at", ellipsis: true, hidden: true },
  { title: "更新时间", dataIndex: "updated_at" },
  { title: "UUID", dataIndex: "uuid", slotName: "uuid" },
  { title: "名称", dataIndex: "username" },
  { title: "状态", dataIndex: "status" },
  { title: "Email", dataIndex: "email" },
  { title: "EmailVerified", dataIndex: "email_verified" },
  { title: "电话", dataIndex: "phone" },
  { title: "PhoneVerified", dataIndex: "phone_verified" },
  { title: "昵称", dataIndex: "display_name", slotName: "display_name" },
  { title: "操作", dataIndex: "operations", slotName: "operations" },
]
const tableColumns = ref<TableColumnData[]>(columns.filter((item) => !item.hidden));


const { loading, setLoading } = useLoading(true);
const renderData = ref<UserItem[]>([]);

const basePagination: Pagination = { page: 1, limit: 20 };
const pagination = reactive({
  ...basePagination,
});


const fetchData = async () => {
  setLoading(true);
  try {
    const params = ({ ...basePagination, ...queryForm.value?.formModel } as unknown) as UserListQuery
    const { data } = await queryUserList(params);
    renderData.value = data.items;
    pagination.page = params.page;
    pagination.total = data.total;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

const onPageChange = (page: number) => {
  fetchData();
};

onMounted(() => {
  fetchData();
});

</script>

<script lang="ts">
export default {
  name: "SearchTable",
};
</script>
