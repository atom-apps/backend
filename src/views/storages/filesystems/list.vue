<template>
  <div class="h-full relative">
    <PageHeader subtitle="存储管理">
      <a-button :disabled="!(currentSelectFile.length > 0 && cutFiles.length == 0)" @click="doCopyFiles"
        class="w-full">复制</a-button>
      <a-button :disabled="!(currentSelectFile.length > 0 && copyFiles.length == 0)" @click="doCutFiles"
        class="w-full">剪切</a-button>
      <a-button :disabled="!canPaste" @click="doPasteFiles" class="w-full">粘贴</a-button>
      <div class="px-10"></div>

      <a-button @click="showCreateDirModal = true" class="w-full">创建目录</a-button>
      <a-button @click="() => fetchData(pagination)">刷新</a-button>
      <a-button type="primary" @click="showUploadModal = true">上传文件</a-button>
    </PageHeader>

    <!-- modal upload -->
    <a-modal v-model:visible="showUploadModal" simple :footer="false" :width="600" :hideTitle="true"
      body-style="overflow:hidden;">
      <a-upload draggable :action="uploadAction" :multiple="true" :headers="uploadHeaders" @success="uploadSuccess" />
    </a-modal>

    <!-- model create  -->
    <a-modal v-model:visible="showCreateDirModal" simple title="新建目录" ok-text="创建" :ok-loading="createDirLoading"
      @ok="createDir">
      <a-input v-model:model-value="dirName" class="w-full align-center" placeholder="请输入目录名" />
      <small class="mt-2 p-2 block bg-gray-200">
        <ul class="list-disc">
          <li>支持 <code>/</code> 分割多级目录创建</li>
          <li>
            支持 <code>{a,b,c}</code> 分割同级多目录创建（多个 {} 只对上一次 {}
            匹配的最后一个目录生效）
          </li>
        </ul>
      </small>
    </a-modal>

    <div class="border-t border-b absolute left-0 right-0 bottom-0"
      style="top: 63px; background-color: var(--color-bg-2)">
      <a-split id="fs-split" v-model:size="size" min="150px" :style="{ minHeight: '100px', height: '100%' }">
        <template #first>
          <div class="m-2">
            <a-tree ref="dirTree" showLine blockNode :data="renderTreeData" v-model:expanded-keys="expandedKeys"
              v-model:selected-keys="currentSelectedDir" @select="onFolderSelect" />
          </div>
        </template>

        <template #second>
          <a-spin :loading="loading" tip="加载中" class="w-full overflow-auto">

            <a-empty v-if="renderData.length == 0" />

            <a-row v-else>
              <a-col :span="8" v-for="item in renderData" class="cursor-pointer p-3" :key="item.id">
                <div @click="() => toggleSelectFile(Number(item.id))"
                  class="rounded hover:shadow border flex justify-center items-center pr-5"
                  :class="{ 'border-sky-500 bg-gray-100 border': isFileSelected(Number(item.id)) }">

                  <div class="preview bg-gray-100 flex items-center justify-center text-gray-500"
                    style="width: 100px; height: 100px">
                    <div style="padding:1px" v-if="item.metadata?.thumbnail">
                      <img :src="item.metadata?.thumbnail">
                    </div>
                    <IconFont v-else type="file" :size=48 />
                  </div>

                  <div class="flex-1 flex flex-col ml-5">
                    <div class="mb-1">{{ filename(item) }}</div>
                    <small class="text-gray-500">{{ item.mime }}</small>
                    <small class="text-gray-500">{{ item.real_name }}</small>
                    <small class="text-gray-500">{{ datetime(item.created_at?.toString()) }}</small>
                    <small class="text-gray-500">{{ item.metadata?.human_file_size }}</small>
                  </div>

                  <a-button href="">预览</a-button>
                </div>
              </a-col>

            </a-row>

          </a-spin>
        </template>
      </a-split>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
FilesystemItem,
FilesystemListQuery,
copyFilesystemToDirectory,
createFilesystemSubDirectory,
getFilesystemDirectoryTree,
moveFilesystemToDirectory,
queryFilesystemList,
} from "@/api/storages/filesystems";
import { PageHeader } from "@/components/layout";
import useDatetime from "@/hooks/datetime";
import useLoading from "@/hooks/loading";
import { Pagination } from "@/types/global";
import { getToken } from "@/utils/auth";
import { FileItem, PaginationProps, TreeNodeData } from "@arco-design/web-vue";
import IconFont from "@components/icon/icon.vue";
import { computed, h, reactive, ref } from "vue";

const { datetime } = useDatetime()

const queryForm = ref<FilesystemListQuery>({
  parent_id: 0,
});
const size = ref("300px");

// fetch table data
const { loading, setLoading } = useLoading(true);

const showUploadModal = ref<boolean>(false);

const uploadAction = computed(() => `/v1/storages/uploads/${queryForm.value.parent_id}`);
const uploadHeaders = computed(() => {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
  };
});
const uploadSuccess = (file: FileItem) => {
  const response = file.response as FilesystemItem;
  renderData.value.push(response);
};

const tree = ref<FilesystemItem[]>([]);
const renderTreeData = ref<TreeNodeData[]>([]);

const filename = (item: FilesystemItem) => {
  return item.filename + (item.ext ? "." + item.ext : "");
};
const expandedKeys = ref<string[]>(["0"]);
const currentSelectedDir = ref<string[]>(["0"]);

const genTree = (items: FilesystemItem[], parent_id: number) => {
  let tree: TreeNodeData[] = [];

  for (const item of items) {
    if (Number(item.parent_id ?? 0) === parent_id) {
      const nodeItem: TreeNodeData = {
        key: item.id,
        title: item.filename,
        switcherIcon: () => h(IconFont, { type: "folder", size: 16 }),
      };

      if (item.children?.length) {
        nodeItem.children = genTree(item.children ?? [], Number(item.id));
        nodeItem.switcherIcon = () => h(IconFont, { type: "folder-add", size: 16 });
      }
      tree.push(nodeItem);
    }
  }

  return tree;
};

const pagination: Pagination = reactive<PaginationProps>({ current: 1, pageSize: 50 });

const dirTree = ref();
// 加载目录列表
const loadTree = async () => {
  setLoading(true);
  try {
    const { data } = await getFilesystemDirectoryTree();
    tree.value = data;
    renderTreeData.value = [
      {
        key: "0",
        title: "根目录",
        switcherIcon: () => h(IconFont, { type: "folder-add", size: 16 }),
        children: genTree(data, 0),
      },
    ];

    // setTimeout(() => dirTree.value.expandAll(), 1000)
  } finally {
    setLoading(false);
  }
};
loadTree();

const renderData = ref<FilesystemItem[]>([]);

const fetchData = async (pg: Pagination = pagination) => {
  setLoading(true);
  try {
    const pages = { page: pg.current, limit: pg.pageSize };
    const params = ({
      ...pages,
      ...queryForm.value,
    } as unknown) as FilesystemListQuery;
    console.log(params);

    const { data } = await queryFilesystemList(params);
    renderData.value = data.items;
  } finally {
    setLoading(false);
  }
};
fetchData(pagination);

const onFolderSelect = (newSelectedKeys: any, event: any) => {
  if (event.node.key != queryForm.value.parent_id) {
    queryForm.value.parent_id = event.node.key;
    fetchData(pagination);
  }
  currentSelectedDir.value = [event.node.key];
  dirTree.value.expandNode(event.node.key, true);
  console.log("onFolderSelect", event.node.key);
};

// create dir modal
const dirName = ref<string>("子目录");
const { loading: createDirLoading, setLoading: setCreateDirLoading } = useLoading(false);
const showCreateDirModal = ref<boolean>(false);
const createDir = async () => {
  setCreateDirLoading(true);
  try {
    await createFilesystemSubDirectory(
      Number(currentSelectedDir.value[0]),
      dirName.value
    );
    dirName.value = "子目录";
    loadTree();
  } finally {
    setCreateDirLoading(false);
  }
};

const currentSelectFile = ref<number[]>([]);
const copyFiles = ref<number[]>([]);
const cutFiles = ref<number[]>([]);

const canPaste = computed(() => {
  return copyFiles.value.length > 0 || cutFiles.value.length > 0;
});

const isFileSelected = (id: number) => currentSelectFile.value?.includes(id);

const toggleSelectFile = (fileID: number) => {
  if (currentSelectFile.value?.includes(fileID)) {
    currentSelectFile.value.splice(currentSelectFile.value.indexOf(fileID), 1);
  } else {
    currentSelectFile.value?.push(fileID);
  }

  if (copyFiles.value?.includes(fileID) && copyFiles.value.length > 0) {
    copyFiles.value.splice(copyFiles.value.indexOf(fileID), 1);
  }

  if (cutFiles.value?.includes(fileID) && cutFiles.value.length > 0) {
    cutFiles.value.splice(cutFiles.value.indexOf(fileID), 1);
  }
};

const doCopyFiles = () => {
  if (currentSelectFile.value.length == 0) {
    return;
  }

  let files = [];
  for (const item of currentSelectFile.value) {
    files.push(item);
  }
  copyFiles.value = files;
  cutFiles.value = [];
};

const doCutFiles = () => {
  if (currentSelectFile.value.length == 0) {
    return;
  }

  let files = [];
  for (const item of currentSelectFile.value) {
    files.push(item);
  }
  cutFiles.value = files;
  copyFiles.value = [];
};

const doPasteFiles = async () => {
  try {
    if (cutFiles.value && cutFiles.value?.length > 0) {
      await moveFilesystemToDirectory(
        Number(currentSelectedDir.value[0]),
        cutFiles.value
      );
    } else if (copyFiles.value && copyFiles.value?.length > 0) {
      await copyFilesystemToDirectory(
        Number(currentSelectedDir.value[0]),
        copyFiles.value
      );
    }

    cutFiles.value = [];
    copyFiles.value = [];
    currentSelectFile.value = [];

    fetchData();
  } catch (e) {
    console.log(e);
  }
};
</script>

<style>
#fs-split .arco-tree-node-switcher-icon svg {
  transform: rotate(0) !important;
}

/* #fs-split .arco-split-pane {
  overflow: hidden !important;
} */
</style>
