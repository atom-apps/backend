<template>
  <div>
    <PageHeader subtitle="系统管理" />

    <a-row>
      <a-col :span="12">
        <Container>
          <a-tree class="tree-demo" blockNode :data="treeData" :showLine="true" v-model:expanded-keys="expandedKeys"
            @select="onNodeSelect">
            <template #extra="nodeData">
              <a-button type="text" size="mini" @click="() => onClickNewItem(nodeData)">[添加]</a-button>

              <a-popconfirm content="确认删除？" type="warning" :ok-loading="loading" @ok="() => onClickDeleteItem(nodeData)"
                position="lt">
                <a-button type="text" status="danger" size="mini">[删除]</a-button>
              </a-popconfirm>
            </template>
          </a-tree>
        </Container>
      </a-col>

      <a-col :span="12">
        <Container v-if="form">
          <a-form :model="form" @submit="handleSubmit" class="w-full mt-5">
            <a-form-item field="name" label="名称" :rules="[{ required: true, message: '名称必填' }]">
              <a-input v-model="form.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item field="slug" label="别名" :rules="[{ required: true, message: '别名必填' }]">
              <a-input v-model="form.slug" placeholder="请输入别名" />
            </a-form-item>
            <a-form-item field="parent_id" label="父ID" :rules="[{ required: true, message: '父ID必填' }]">
              <a-tree-select v-model="form.parent_key" :data="treeData" placeholder="请选择父ID" />
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" html-type="submit" size="large" :loading="submitting">提交</a-button>
                <a-button size="large" @click="form=undefined">取消</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </Container>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { MenuItem, createMenuSubItem, deleteMenuItem, getMenuItem, getMenuTree, updateMenuItem } from "@/api/systems/menus";
import { Container, PageHeader } from "@/components/layout";
import useLoading from "@/hooks/loading";
import { Message, TreeNodeData } from "@arco-design/web-vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

interface onDropParam {
  dragNode: TreeNodeData;
  dropNode: TreeNodeData;
  dropPosition: number;
}

const route = useRoute();
const treeData = ref<TreeNodeData[]>([]);
const expandedKeys = ref<string[]>([]);

// fetch table data
const { loading, setLoading } = useLoading(true);
const fetchData = async () => {
  const calcExpandedKeys = (data: TreeNodeData[]) => {
    const keys: string[] = [];
    data.forEach((item) => {
      keys.push(String(item.key ?? ''));
      if (item.children) {
        keys.push(...calcExpandedKeys(item.children));
      }
    });
    return keys;
  };

  setLoading(true);
  try {
    const { data } = await getMenuTree(Number(route.params.id));
    treeData.value = data;
    expandedKeys.value = calcExpandedKeys(data);
  } catch (err) {

  } finally {
    setLoading(false);
  }
};
fetchData();

const form = ref<MenuItem>()

const { loading: submitting, setLoading: setSubmitting } = useLoading()
// form
const handleSubmit = async ({ values, errors }: any) => {
  if (!!errors) return;

  if (!form.value?.id) {
    Message.error("请求错误")
    return
  }

  try {
    setSubmitting(true);

    values.parent_id = Number(values.parent_key)
    await updateMenuItem(form.value.id, values)

    Message.success("更新成功")
    form.value = undefined
    fetchData()
  } catch (e: any) {
    // Message.error(e.message)
  } finally {
    setSubmitting(false)
  }
};

const onClickNewItem = async (nodeData: TreeNodeData) => {
  const children = nodeData.children || []
  const key = nodeData.key + '-' + (children.length + 1)
  const title = '新建菜单'

  setLoading(true)
  try {
    await createMenuSubItem(Number(route.params.id), Number(nodeData.key), title, key)
    fetchData()
  } catch (err) {
  } finally {
    setLoading(false);
  }
}

const onClickDeleteItem = async (nodeData: TreeNodeData) => {
  console.log(nodeData)
  setLoading(true)
  try {
    await deleteMenuItem(Number(nodeData.key))
    fetchData()
  } catch (err) {
  } finally {
    setLoading(false);
  }
}

const onNodeSelect = async (selectedKeys, { node }) => {
  console.log(selectedKeys, node)

  setSubmitting(true)
  try {
    const { data } = await getMenuItem(Number(node?.key))
    data.parent_key = String(data.parent_id)
    form.value = data
  } catch (err) {

  } finally {
    setSubmitting(false)
  }

}
</script>

<style scoped>
.tree-demo :deep(.tree-node-dropover)> :deep(.arco-tree-node-title),
.tree-demo :deep(.tree-node-dropover)> :deep(.arco-tree-node-title):hover {
  animation: blinkBg 0.4s 2;
}

@keyframes blinkBg {
  0% {
    background-color: transparent;
  }

  100% {
    background-color: var(--color-primary-light-1);
  }
}
</style>