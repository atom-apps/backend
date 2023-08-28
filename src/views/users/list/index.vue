<template>
  <a-space direction="vertical" size="large" class="w-full" v-if="columnLoading">
    <a-skeleton :animation="true">
      <a-space direction="vertical" class="w-full" size="large">
        <a-skeleton-line :rows="3" />
      </a-space>
    </a-skeleton>
  </a-space>

  <a-page-header title="用户管理" subtitle="用户列表" :show-back="false" class="bg-white">
    <template #breadcrumb>
      <a-breadcrumb>
        <a-breadcrumb-item>用户管理</a-breadcrumb-item>
        <a-breadcrumb-item>用户列表</a-breadcrumb-item>
      </a-breadcrumb>
    </template>

    <template #extra v-if="!columnLoading">
      <a-space class="flex justify-end items-center">
        <ActionCreate :to="{ 'name': 'Workplace' }" />
        <ActionImport />
        <ActionExport />
        <ActionRefresh @click="fetchData" />
        <ActionDensity v-model:size="size" />
        <ActionColumn :columns="columns" :hidden="hiddenColumns" v-model:clone="tableColumns" />
      </a-space>
    </template>
  </a-page-header>


  <a-card class="m-5">
    <Query ref="queryForm" @search="fetchData" />
  </a-card>


  <a-card class="m-5">
    <a-table row-key="id" :hoverable="true" :stripe="true" :row-selection="rowSelection"
      v-model:selectedKeys="selectedKeys" :loading="loading" :pagination="pagination" :columns="tableColumns"
      :data="renderData" :bordered="false" :size="size" @page-change="onPageChange">
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
      <template #operations="{ record }">
        <Operations :record="record" :reload="fetchData" edit="UserEdit" view="UserView" :params="{ id: record.id }" />
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts" setup>
import { UserItem, UserListQuery, getColumns, queryUserList } from "@/api/users";
import { ActionColumn, ActionCreate, ActionDensity, ActionExport, ActionImport, ActionRefresh, } from "@/components/table/action";
import { SizeProps } from '@/components/table/types';
import useDatetime from '@/hooks/datetime';
import useLoading from "@/hooks/loading";
import { Pagination } from "@/types/global";
import { PaginationProps, TableColumnData, TableRowSelection } from "@arco-design/web-vue";
import { cloneDeep } from 'lodash';
import { onMounted, reactive, ref } from "vue";
import Operations from "./operations.vue";
import Query from "./query.vue";


const { date } = useDatetime();

const size = ref<SizeProps>("large");
const queryForm = ref();

const columns = ref<TableColumnData[]>([]);
const hiddenColumns = ref<string[]>([]);
const tableColumns = ref<TableColumnData[]>([]);

// load columns
const { loading: columnLoading, setLoading: setColumnLoading } = useLoading(true);
const fetchColumns = async () => {
  setColumnLoading(true);
  try {
    const { data } = await getColumns();
    columns.value = cloneDeep(data.columns);
    hiddenColumns.value = data.hidden ?? [];
    tableColumns.value = data.columns.filter((item) => data.hidden?.indexOf(item.dataIndex ?? "") === -1);
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setColumnLoading(false);
  }
}
onMounted(() => {
  fetchColumns();
  fetchData(basePagination);
})


// fetch table data
const { loading, setLoading } = useLoading(true);
const renderData = ref<UserItem[]>([]);

const basePagination: Pagination = { current: 2, pageSize: 20 };
const pagination = reactive<PaginationProps>({
  ...basePagination,
  showPageSize: true,
  showJumper: true,
  showTotal: true,
  simple: false,
  hideOnSinglePage: true,
  showMore: true,
  defaultCurrent: 1,
  defaultPageSize: 20,
});


const fetchData = async (pg: Pagination = basePagination) => {
  setLoading(true);
  try {
    const pages = { page: pg.current ?? 0 + 1, limit: pagination.pageSize }
    const params = ({ ...pages, ...queryForm.value?.formModel } as unknown) as UserListQuery
    const { data } = await queryUserList(params);
    renderData.value = data.items;
    pagination.current = data.page;
    pagination.total = data.total;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

const onPageChange = (current: number) => {
  fetchData({ current });
};

// row selection
const selectedKeys = ref([]);

const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});

</script>