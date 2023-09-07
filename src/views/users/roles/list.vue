<template>
  <div>
    <PageHeader subtitle="用户管理">
      <ActionCreate :to="{ name: 'RoleCreate' }" />
      <ActionImport />
      <ActionExport />
      <ActionRefresh @click="fetchData" />
      <ActionDensity v-model:size="size" />
      <ActionColumn
        :columns="allColumns"
        :hidden="hiddenColumns"
        v-model:clone="showColumns"
      />
    </PageHeader>

    <QueryForm
      class="m-5 pt-5"
      ref="queryForm"
      @search="fetchData"
      :filters="tableRoleFilters()"
    />

    <a-table
      class="m-5"
      row-key="id"
      :hoverable="true"
      :stripe="true"
      :row-selection="rowSelection"
      v-model:selectedKeys="selectedKeys"
      :loading="loading"
      :pagination="pagination"
      :columns="showColumns"
      :data="renderData"
      :size="size"
      @page-change="onPageChange"
      @page-size-change="onPageSizeChange"
    >
      <!-- 权限配置 -->
      <template #permission="{ record }">
        <a-button
          v-if="record.id > 1"
          @click="openPermissionModal(record)"
          size="mini"
          type="text"
          >设置权限</a-button
        >
      </template>

      <!-- 父角色 -->
      <template #parent_id="{ record }">
          <a-tag v-if="record.parent" color="orange">{{ record.parent?.name }}</a-tag>
      </template>

      <!-- 租户 -->
      <template #tenants="{ record }">
        <a-space>
        <a-tag v-for="tenant in record.tenants" color="orange">{{ tenant.name }}</a-tag>
        </a-space>
      </template>

      <template #operations="{ record }">
        <RowOperations
          v-if="record.id > 1"
          :record="record"
          :reload="fetchData"
          edit="RoleEdit"
          view="RoleView"
          :params="{ id: record.id }"
          :deleteAction="deleteRoleItem"
        />
      </template>
    </a-table>

    <!-- modal -->
    <a-modal v-model:visible="modalVisible" @ok="modalSubmit" body-class="p-0">
      <template #title>{{ modalTitle }} 权限配置</template>
      <div class="p-5 pb-0">
        <a-select v-model.number="permissionTenant" class="w-full">
          <a-option
            v-for="item in permissionTenants"
            :label="item.label"
            :value="Number(item.value)"
          />
        </a-select>
      </div>
      <div class="p-5 max-h-96 overflow-auto">
        <a-table
          row-key="id"
          v-model:selectedKeys="permissionSelectedKeys"
          v-model:expandedKeys="permissionExpandedKeys"
          :row-selection="permissionRowSelection"
          :loading="permissionLoading"
          :bordered="false"
          :columns="permissionColumns"
          :data="permissionTree"
          :pagination="false"
          size="large"
        >
          <template #name="{ record }">{{ record.metadata.title }}</template>
        </a-table>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import {
PermissionTree,
getPermissionTree,
savePermissionOfTenantRole,
tablePermissionColumns,
} from "@/api/users/permissions";
import {
RoleItem,
RoleListQuery,
deleteRoleItem,
queryRoleList,
tableRoleColumns,
tableRoleFilters,
} from "@/api/users/roles";
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
import { useUserStore } from "@/store";
import { LabelItem, Pagination } from "@/types/global";
import {
Message,
PaginationProps,
TableColumnData,
TableRowSelection,
} from "@arco-design/web-vue";
import { reactive, ref, watch } from "vue";
const userStore = useUserStore();
const { date } = useDatetime();

const size = ref<SizeProps>("large");
const queryForm = ref();

const { columns, hidden } = tableRoleColumns();
const allColumns = ref<TableColumnData[]>(columns ?? []);
const hiddenColumns = ref<string[]>(hidden ?? []);
const showColumns = ref<TableColumnData[]>([]);

// load columns

////////////////
// modal
////////////////
const modalTitle = ref<String>("");
const modalVisible = ref(false);

const modalSubmit = async () => {
  setPermissionLoading(true);
  try {
    await savePermissionOfTenantRole(
      permissionTenant.value,
      Number(permissionRole.value.id),
      permissionSelectedKeys.value
    );
    modalVisible.value = false;
    Message.success("配置成功");
    fetchData();
  } catch (err) {
    Message.error("配置失败");
  } finally {
    setPermissionLoading(false);
  }
};

const permissionTenants = ref<LabelItem[]>([]);
const permissionTenant = ref<number>(0);
const permissionRole = ref<RoleItem>({});

watch(
  () => permissionTenant.value,
  (val) => {
    permissionTenant.value = val;
    fetchPermissionData(permissionRole.value);
  }
);

const openPermissionModal = (role: RoleItem) => {
  if (!role.tenants || role.tenants.length == 0) {
    Message.warning("该角色没有租户，无法配置权限");
    return;
  }

  modalTitle.value = String(role.name);
  modalVisible.value = true;

  // 给角色设置租户
  let tenantIDs = role.tenants.map((item) => item.id);
  const tenants = userStore.tenants?.filter((item) =>
    tenantIDs.includes(Number(item.value))
  );
  if (!tenants) {
    Message.warning("该角色没有租户，无法配置权限");
    return;
  }

  permissionTenants.value = tenants;
  permissionTenant.value = Number(tenants[0].value);

  permissionRole.value = role;
};

const { loading: permissionLoading, setLoading: setPermissionLoading } = useLoading(true);
const permissionTree = ref<PermissionTree[]>([]);
const permissionExpandedKeys = ref<number[]>([]);
const { columns: permissionColumns } = tablePermissionColumns();

// row selection
const permissionSelectedKeys = ref<number[]>([]);

const permissionRowSelection = reactive<TableRowSelection>({
  type: "checkbox",
  showCheckedAll: false,
  checkStrictly: true,
  onlyCurrent: false,
});

const fetchPermissionData = async (role: RoleItem) => {
  setPermissionLoading(true);
  try {
    const { data } = await getPermissionTree();
    permissionTree.value = data;

    let keys: number[] = [];
    if (role.permissions && role.permissions[permissionTenant.value]) {
      keys = role.permissions[permissionTenant.value];
    }
    permissionSelectedKeys.value = keys;
    console.log("keys: ", keys);

    let expandKeys: number[] = [];
    data.forEach((item) => {
      expandKeys.push(item.id);
      if (item.children) {
        item.children.forEach((child) => {
          if (keys.includes(child.id) && child.parent_id != 0) {
            expandKeys.push(child.parent_id);
          }
          if (child.children) {
            child.children.forEach((child2) => {
              if (keys.includes(child2.id) && child2.parent_id != 0) {
                expandKeys.push(child2.parent_id);
              }
            });
          }
        });
      }
    });
    permissionExpandedKeys.value = expandKeys;
  } catch (err) {
  } finally {
    setPermissionLoading(false);
  }
};
///////////////////
/// end modal
///////////////////

// fetch table data
const { loading, setLoading } = useLoading(true);
const renderData = ref<RoleItem[]>([]);

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
    } as unknown) as RoleListQuery;
    console.log("11: ",params)

    const { data } = await queryRoleList(params);
    renderData.value = data.items;
    pagination.total = data.total;
    // pagination.current = data.page;
    // pagination.pageSize = data.limit;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};
fetchData(basePagination);

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
