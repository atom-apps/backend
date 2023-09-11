<template>
  <div>
    <PageHeader subtitle="系统管理" :back="true" :loading="loading">
      <a-button v-can="'LocationEdit'" type="primary" @click="$router.push({ name: 'LocationEdit', params: { id: route.params.id } })">编辑</a-button>

      <a-popconfirm content="确认删除？" type="warning" :ok-loading="deleting" @ok="handleConfirmDelete" position="lt" v-can="'LocationDelete'">
        <a-tooltip content="删除">
          <a-button type="outline" status="danger">删除</a-button>
        </a-tooltip>
      </a-popconfirm>
    </PageHeader>

    <Container :loading="loading" :rows="2">
      <a-descriptions :data="renderData" :column="3" :align="{ label: 'right' }" size="large" :title="title" />
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { LocationItem, deleteLocationItem, getLocationItem, tableLocationLabels } from '@/api/systems/locations';
import { Container, PageHeader } from "@/components/layout";
import useLoading from '@/hooks/loading';
import { DescData, Message } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const title=ref<string>("Title")

const { loading, setLoading } = useLoading();
const renderData = ref<DescData[]>([]);
const userInfo = ref<LocationItem>({});
const labels = tableLocationLabels();

const fetchData = async () => {
  try {
    setLoading(true);
    const { data: profile } = await getLocationItem(Number(route.params.id))
    userInfo.value = profile

    let items:DescData[] = [];
    for (const key in profile) {
      if (Object.prototype.hasOwnProperty.call(labels, key)) {
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
    await deleteLocationItem(Number(route.params.id))

    Message.success('删除成功');
    router.back()

  } catch (e) {
    console.log(e)
  } finally {
    setDeleting(false);
  }
}
</script>