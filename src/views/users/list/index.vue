<template>
  <div>
    <PageHeader title="用户管理" subtitle="用户列表" :back="false" :loading="columnLoading">
      <ActionCreate :to="{ 'name': 'UserCreate' }" />
      <ActionImport />
      <ActionExport />
      <ActionRefresh @click="fetchData" />
      <ActionDensity v-model:size="size" />
      <ActionColumn :columns="columns" :hidden="hiddenColumns" v-model:clone="tableColumns" />
    </PageHeader>


    <Query class="m-5 pt-5" ref="queryForm" @search="fetchData" />

    <Container :loading="columnLoading" :rows="2">
      <a-table row-key="id" :hoverable="true" :stripe="true" :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys" :loading="loading" :pagination="pagination" :columns="tableColumns"
        :data="renderData" :bordered="false" :size="size" @page-change="onPageChange"
        @page-size-change="onPageSizeChange">
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
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { UserItem, UserListQuery, getColumns, queryUserList } from "@/api/users";
import Container from '@/components/container.vue';
import PageHeader from '@/components/page-header.vue';
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
    const pages = { page: pg.current, limit: pg.pageSize }
    const params = ({ ...pages, ...queryForm.value?.formModel } as unknown) as UserListQuery
    console.log(params)

    const { data } = await queryUserList(params);
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
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});

</script>