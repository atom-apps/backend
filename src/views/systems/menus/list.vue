<template>
  <div>
    <PageHeader subtitle="系统管理">
      <ActionCreate v-can="'MenuCreate'" :to="{ name: 'MenuCreate' }" />
      <ActionImport v-can="'MenuImport'" />
      <ActionExport v-can="'MenuDownload'" />
      <ActionRefresh @click="fetchData" />
      <ActionDensity v-model:size="size" />
      <ActionColumn
        :columns="allColumns"
        :hidden="hiddenColumns"
        v-model:clone="showColumns"
      />
    </PageHeader>

    <a-table
      class="m-5"
      row-key="id"
      :hoverable="true"
      :stripe="true"
      :loading="loading"
      :columns="showColumns"
      :data="renderData"
      :size="size"
    >
      <template #operations="{ record }">
        <RowOperations
          :record="record"
          :reload="fetchData"
          edit="MenuEdit"
          remove="MenuDelete"
          :view="false"
          :params="{ id: record.id }"
          :deleteAction="deleteMenuItem"
        >
        <a-button type="outline" size="mini" @click="$router.push({name:'MenuSubList', params:{id: record.id}})">菜单管理</a-button>
        </RowOperations>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import {
MenuItem,
deleteMenuItem,
queryMenuList,
tableMenuColumns
} from "@/api/systems/menus";
import { PageHeader } from "@/components/layout";
import {
ActionColumn,
ActionCreate,
ActionDensity,
ActionExport,
ActionImport,
ActionRefresh,
RowOperations
} from "@/components/table";
import { SizeProps } from "@/components/table/types";
import useLoading from "@/hooks/loading";
import {
TableColumnData
} from "@arco-design/web-vue";
import { ref } from "vue";

const size = ref<SizeProps>("large");
const queryForm = ref();

const { columns, hidden } = tableMenuColumns();
const allColumns = ref<TableColumnData[]>(columns ?? []);
const hiddenColumns = ref<string[]>(hidden ?? []);
const showColumns = ref<TableColumnData[]>([]);

// load columns

// fetch table data
const { loading, setLoading } = useLoading(true);
const renderData = ref<MenuItem[]>([]);

const fetchData = async () => {
  setLoading(true);
  try {
    const { data } = await queryMenuList();
    renderData.value = data;
    // pagination.current = data.page;
    // pagination.pageSize = data.limit;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};
fetchData();
</script>
