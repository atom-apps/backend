<template>
  <div>
    <PageHeader title="用户管理" subtitle="权限列表" />

    <a-table
      class="m-5"
      row-key="id"
      v-model:selectedKeys="selectedKeys"
      :default-expand-all-rows="true"
      :default-expanded-keys="expandedKeys"
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
import { TableRowSelection } from "@arco-design/web-vue";
import { onMounted, reactive, ref } from "vue";

const { columns } = tablePermissionColumns();

// load columns
onMounted(() => {
  fetchData();
});

// fetch table data
const { loading, setLoading } = useLoading(true);
const renderData = ref<PermissionTree[]>([]);
const expandedKeys = ref<number[]>([]);

const fetchData = async () => {
  setLoading(true);
  try {
    const { data } = await getPermissionTree();
    renderData.value = data;

    data.forEach((item) => {
      expandedKeys.value.push(item.id);
    });
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
  showCheckedAll: false,
  checkStrictly: true,
  onlyCurrent: false,
});
</script>
