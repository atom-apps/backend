<template>
  <div>
    <PageHeader subtitle="存储管理">
      <ActionRefresh @click="fetchData" />
    </PageHeader>

    <a-grid :gutter="16" :row-gap="10" :col-gap="10" class="m-5">
      <a-grid-item v-for="item in renderData" :span=3 class="cursor-pointer">
        <a-card :bordered="false" class="hover:shadow">
            <a-typography-text>{{ item.filename }}</a-typography-text>
        </a-card>
      </a-grid-item>
    </a-grid>
  </div>
</template>

<script lang="ts" setup>
import { FilesystemItem, FilesystemListQuery, queryFilesystemList } from "@/api/storages/filesystems";
import { PageHeader } from "@/components/layout";
import { ActionRefresh } from "@/components/table";
import useLoading from "@/hooks/loading";
import { Pagination } from "@/types/global";
import { PaginationProps } from "@arco-design/web-vue";
import { reactive, ref } from "vue";

const queryForm = ref();

// fetch table data
const { loading, setLoading } = useLoading(true);
const renderData = ref<FilesystemItem[]>([]);

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
    } as unknown) as FilesystemListQuery;
    console.log(params);

    const { data } = await queryFilesystemList(params);
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

</script>
