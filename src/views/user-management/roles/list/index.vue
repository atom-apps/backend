<template>
  <div>
    <PageHeader title="用户管理" subtitle="角色列表" :back="false" :loading="columnLoading">
      <ActionCreate :to="{ 'name': 'RoleCreate' }" />
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
        <template #parent_id="{record}">
          {{ record.parent?.name }}
        </template>
        <template #operations="{ record }">
          <Operations :record="record" :reload="fetchData" edit="RoleEdit" view="RoleView" :params="{ id: record.id }" />
        </template>
      </a-table>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { RoleItem, RoleListQuery, getRoleListColumns, queryRoleList } from "@/api/roles";
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
    const { data } = await getRoleListColumns();
    columns.value = cloneDeep(data.columns);
    hiddenColumns.value = data.hidden ?? [];
    if (hiddenColumns.value.length > 0) {
      tableColumns.value = data.columns.filter((item) => data.hidden?.indexOf(item.dataIndex ?? "") === -1);
    } else {
      tableColumns.value = data.columns;
    }
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
    const pages = { page: pg.current, limit: pg.pageSize }
    const params = ({ ...pages, ...queryForm.value?.formModel } as unknown) as RoleListQuery
    console.log(params)

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