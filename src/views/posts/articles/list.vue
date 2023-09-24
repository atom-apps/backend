<template>
  <div>
    <PageHeader subtitle="内容管理">
      <ActionCreate v-can="'ArticleCreate'" :to="{ name: 'ArticleCreate' }" />
      <ActionImport v-can="'ArticleImport'" />
      <ActionExport v-can="'ArticleDownload'" />
      <ActionRefresh @click="fetchData" />
      <ActionDensity v-model:size="size" />
      <ActionColumn :columns="allColumns" :hidden="hiddenColumns" v-model:clone="showColumns" />
    </PageHeader>

    <QueryForm class="m-5 pt-5" ref="queryForm" @search="fetchData" :filters="tableArticleFilters()" />

    <a-table class="m-5" row-key="id" :hoverable="true" :stripe="true" :row-selection="rowSelection" 
      v-model:selectedKeys="selectedKeys" :loading="loading" :pagination="pagination" :columns="showColumns"
      :data="renderData" :size="size" @page-change="onPageChange" @page-size-change="onPageSizeChange">
      <template #title="{ record }">
        <template v-if="afterNow(record.publish_at)">
          <a-tooltip :content="datetime(record.publish_at)">
            <icon-clock-circle :style="{ color: 'orange' }" class="mr-2" />
          </a-tooltip>
        </template>
        {{ record.title }}
      </template>

      <template #created_at="{ record }">{{ datetime(record.created_at) }}</template>
      <template #updated_at="{ record }">{{ datetime(record.updated_at) }}</template>
      <template #type_format="{ record }">{{ record.type_cn }} / {{ record.format_cn }}</template>

      <template #dig="{ record }">
        {{ record.dig.views }} / {{ record.dig.likes }} / {{ record.dig.dislikes }}
      </template>

      <template #tags="{ record }">
        <a-space size="mini" :wrap="true">
          <a-tag v-for="tag in record.tags">{{ tag }}</a-tag>
        </a-space>
      </template>

      <template #payments="{ record }">
        <a-tag v-if="record.payments.length == 0">免费</a-tag>
        <a-popover v-else>
          <a-button>付费</a-button>
          <template #content>
            <a-table :columns="paymentColumns" :data="paymentTableData(record.payments)" :pagination="false">
              <template #start_at="{ record }">{{ datetime(record.discount_start_at) }}</template>
              <template #end_at="{ record }">{{ datetime(record.discount_end_at) }}</template>
            </a-table>
          </template>
        </a-popover>
      </template>

      <template #forward="{ record }">
        <a-link v-if="record.forward_source" href="{{ record.forward_source.source }}">{{
          record.forward_source.source_author }}</a-link>
      </template>

      <template #operations="{ record }">
        <RowOperations :record="record" :reload="fetchData" edit="ArticleEdit" view="ArticleView" remove="ArticleDelete"
          :params="{ id: record.id }" :deleteAction="deleteArticleItem" />
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import {
ArticleItem,
ArticleListQuery,
deleteArticleItem,
queryArticleList,
tableArticleColumns,
tableArticleFilters,
} from "@/api/posts/articles";
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
PaginationProps,
TableColumnData,
TableData,
TableRowSelection,
} from "@arco-design/web-vue";
import { onMounted, reactive, ref } from "vue";

const { date, datetime, beforeNow, afterNow } = useDatetime();

const size = ref<SizeProps>("large");
const queryForm = ref();

const { columns, hidden } = tableArticleColumns();
const allColumns = ref<TableColumnData[]>(columns ?? []);
const hiddenColumns = ref<string[]>(hidden ?? []);
const showColumns = ref<TableColumnData[]>([]);

// load columns
onMounted(() => {
  fetchData(basePagination);
});

// fetch table data
const { loading, setLoading } = useLoading(true);
const renderData = ref<ArticleItem[]>([]);

const basePagination: Pagination = { current: 1, pageSize: 10 };
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
    } as unknown) as ArticleListQuery;
    console.log(params);

    const { data } = await queryArticleList(params);
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
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: false,
});

const paymentColumns = [
  { title: '类型', dataIndex: 'price_type' },
  { title: 'Token', dataIndex: 'token' },
  { title: '价格', dataIndex: 'price' },
  { title: '折扣', dataIndex: 'discount' },
  { title: '开始', dataIndex: 'discount_start_at', slotName: 'start_at' },
  { title: '结束', dataIndex: 'discount_end_at', slotName: 'end_at' },
]

const paymentTableData = (items: any) => {
  let rows: TableData[] = [];
  for (let item of items) rows.push(item);
  return rows
}
</script>
