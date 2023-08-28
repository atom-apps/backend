<template>
  <a-space direction="vertical" size="large" class="w-full" v-if="columnLoading">
    <a-skeleton :animation="true">
      <a-space direction="vertical" class="w-full" size="large">
        <a-skeleton-line :rows="3" />
      </a-space>
    </a-skeleton>
  </a-space>


  <div class="mx-5 my-5 mt-0" v-else>

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
            <ActionColumn :columns="columns" :hidden="hiddenColumns" v-model:clone="tableColumns" />
          </a-space>
        </a-col>
      </a-row>


      <a-table row-key="id" :loading="loading" :pagination="pagination" :columns="tableColumns" :data="renderData"
        :bordered="false" :size="size" @page-change="onPageChange">
        <template #created_at="{ record }"> {{ date(record.created_at) }} </template>
        <template #updated_at="{ record }"> {{ date(record.updated_at) }} </template>
        <template #status="{ record }">
          <!-- <a-badge status="processing" />
          <a-badge status="success" />
          <a-badge status="warning"  /> -->
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
  </div>
</template>

<script lang="ts" setup>
import { UserItem, UserListQuery, getColumns, queryUserList } from "@/api/users";
import { ActionColumn, ActionCreate, ActionDensity, ActionExport, ActionImport, ActionRefresh, } from "@/components/table/action";
import { SizeProps } from '@/components/table/types';
import useDatetime from '@/hooks/datetime';
import useLoading from "@/hooks/loading";
import { Pagination } from "@/types/global";
import { TableColumnData } from "@arco-design/web-vue";
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
    hiddenColumns.value = data.hidden??[];
    tableColumns.value = data.columns.filter((item) => data.hidden?.indexOf(item.dataIndex??"") === -1);
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setColumnLoading(false);
  }
}
onMounted(() => {
  fetchColumns();
  fetchData();
})


// fetch table data
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

</script>