<template>
  <div class="h-full relative">
    <PageHeader subtitle="存储管理">
      <ActionRefresh @click="fetchData" />
    </PageHeader>

    <div class="bg-white border-t border-b absolute left-0 right-0 bottom-0" style="top: 63px">
      <a-split v-model:size="size" min="80px" :style="{ minHeight: '100px', height: '100%' }">
        <template #first>
          <a-spin :loading="loading" tip="加载中" class="w-full p-5">
            <a-tree showLine blockNode :data="renderTreeData" id="file-tree"/>
          </a-spin>
        </template>
        <template #second>
          <a-spin :loading="loading" tip="加载中" class="w-full overflow-auto">
            <a-grid :gutter="16" :row-gap="10" :col-gap="10" class="m-5">
              <a-grid-item v-for="item in renderData" :span=12 class="cursor-pointer">

                <a-card hoverable>
                  <div class="flex justify-between items-center">
                    <IconFolder/>

                    <div class="flex-1 flex flex-col items-start">
                      <span class="ml-5">{{ filename(item) }}</span>
                    </div>

                    <a-link>More</a-link>
                  </div>
                </a-card>

              </a-grid-item>
            </a-grid>
          </a-spin>
        </template>
      </a-split>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FilesystemItem, FilesystemListQuery, getFilesystemDirectoryTree, queryFilesystemList } from "@/api/storages/filesystems";
import { PageHeader } from "@/components/layout";
import { ActionRefresh } from "@/components/table";
import useLoading from "@/hooks/loading";
import { Pagination } from "@/types/global";
import { PaginationProps, TreeNodeData } from "@arco-design/web-vue";
import IconFont from '@components/icon/icon.vue';
import { h, reactive, ref } from "vue";

const queryForm = ref();
const size = ref('200px');

// fetch table data
const { loading, setLoading } = useLoading(true);

const dirs = ref<FilesystemItem[]>([]);
const files = ref<FilesystemItem[]>([]);
const tree = ref<FilesystemItem[]>([]);
const renderTreeData = ref<TreeNodeData[]>([]);

const filename = (item: FilesystemItem) => {
  return item.filename + (item.ext ? "." + item.ext : "");
};

const genTree = (items: FilesystemItem[], parent_id: number) => {
  let tree: TreeNodeData[] = []

  for (const item of items) {
    if (Number(item.parent_id ?? 0) === parent_id) {
      const nodeItem: TreeNodeData = {
        key: item.id,
        title: item.filename,
      }

      if (item.children?.length) {
        nodeItem.children = genTree(item.children ?? [], Number(item.id))
        nodeItem.switcherIcon = () => h(IconFont,{type:'folder-open',size:16})
      } else {
        nodeItem.switcherIcon = () => h(IconFont,{type:'folder',size:16})
      }
      tree.push(nodeItem)
    }
  }

  return tree
}

// 加载目录列表
const loadTree = async () => {
  setLoading(true);
  try {
    const { data } = await getFilesystemDirectoryTree()
    tree.value = data
    renderTreeData.value = genTree(data, 0)
    console.log(renderTreeData.value)

  } finally {
    setLoading(false)
  }
}
loadTree()

const renderData = ref<FilesystemItem[]>([]);

const pagination: Pagination = reactive<PaginationProps>({ current: 1, pageSize: 50 });

const fetchData = async (pg: Pagination = pagination) => {
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
    // pagination.current = data.page;
    // pagination.pageSize = data.limit;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};
fetchData(pagination);

</script>


<style>
#file-tree .arco-tree-node-switcher-icon svg{
  transform: rotate(0) !important;
}
</style>