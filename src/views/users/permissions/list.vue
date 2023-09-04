<template>
  <div>
    <PageHeader title="用户管理" subtitle="权限列表" />

    <a-table
      class="m-5"
      row-key="id"
      v-model:selectedKeys="selectedKeys"
      :default-expand-all-rows="true"
      :row-selection="rowSelection"
      :loading="loading"
      :columns="columns"
      :data="renderData"
      :pagination="false"
      size="large"
    />
  </div>
</template>

<script lang="ts" setup>
import {
PermissionTree,
getPermissionTree,
tablePermissionColumns,
} from "@/api/users/permissions";
import { PageHeader } from "@/components/layout";
import useLoading from "@/hooks/loading";
import { TableExpandable, TableRowSelection } from "@arco-design/web-vue";
import { onMounted, reactive, ref } from "vue";

const { columns } = tablePermissionColumns();

// load columns
onMounted(() => {
  fetchData();
});

// expand
const expandable = reactive<TableExpandable>({
  defaultExpandAllRows: true,
});

// fetch table data
const { loading, setLoading } = useLoading(true);
const renderData = ref<PermissionTree[]>([]);

const fetchData = async () => {
  setLoading(true);
  try {
    const { data } = await getPermissionTree();
    renderData.value = data;
  } catch (err) {
  } finally {
    setLoading(false);
  }
};

// row selection
// row selection
const selectedKeys = ref([]);

const rowSelection = reactive<TableRowSelection>({
  type: "checkbox",
  showCheckedAll: true,
  checkStrictly: false,
  onlyCurrent: false,
});
</script>
