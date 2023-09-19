<template>
  <div>
    <PageHeader subtitle="内容管理" :back="true" :loading="loading">
      <a-button v-can="'BookEdit'" type="primary"
        @click="$router.push({ name: 'BookEdit', params: { id: route.params.id } })">编辑</a-button>

      <a-popconfirm v-can="'BookDelete'" content="确认删除？" type="warning" :ok-loading="deleting" @ok="handleConfirmDelete"
        position="lt">
        <a-tooltip content="删除">
          <a-button type="outline" status="danger">删除</a-button>
        </a-tooltip>
      </a-popconfirm>
    </PageHeader>

    <Container :loading="loading" :rows="2">
      <a-descriptions :data="renderData" bordered :column="1" :align="{ label: 'right' }" size="large" :title="title" />
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { BookItem, deleteBookItem, getBookItem, tableBookLabels } from '@/api/posts/books';
import { Container, PageHeader } from "@/components/layout";
import useLoading from '@/hooks/loading';
import { DescData, Message } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const title = ref<string>('')

const { loading, setLoading } = useLoading();
const renderData = ref<DescData[]>([]);
const itemInfo = ref<BookItem>({});
const labels = tableBookLabels();

const fetchData = async () => {
  try {
    setLoading(true);
    const { data: profile } = await getBookItem(Number(route.params.id))
    itemInfo.value = profile

    let items: DescData[] = [];
    for (const key in profile) {
      if (Object.prototype.hasOwnProperty.call(labels, key)) {

        if (key == "title") {
          title.value = profile[key]
        }

        items.push({
          label: labels[key],
          value: profile[key]
        })
      }
    }
    renderData.value = items;
  } catch (e) {

  } finally {
    setLoading(false)
  }
}
onMounted(() => { fetchData() })


// handle delete
const { loading: deleting, setLoading: setDeleting } = useLoading();

const handleConfirmDelete = async () => {
  try {
    setDeleting(true);
    await deleteBookItem(Number(route.params.id))

    Message.success('删除成功');
    router.back()

  } catch (e) {
    console.log(e)
  } finally {
    setDeleting(false);
  }
}
</script>