<template>
  <div>
    <PageHeader title="用户管理" subtitle="用户详情" :back="true" :loading="loading">
      <a-button type="primary" @click="$router.push({ name: 'UserEdit', params: { id: route.params.id } })">编辑</a-button>

      <a-popconfirm content="确认删除？" type="warning" :ok-loading="deleting" @ok="handleConfirmDelete" position="lt">
        <a-tooltip content="删除">
          <a-button type="outline" status="danger">删除</a-button>
        </a-tooltip>
      </a-popconfirm>
    </PageHeader>

    <Container :loading="loading" :rows="2">
      <a-descriptions :data="renderData" :column="3" :align="{ label: 'right' }" size="large"
        :title="userInfo.username" />
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { deleteUser, getUserProfile, getUserProfileLabel } from '@/api/users';
import Container from '@/components/container.vue';
import PageHeader from '@/components/page-header.vue';
import useLoading from '@/hooks/loading';
import { UserProfile } from '@/store/modules/user/types';
import { DescData, Message } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();


const { loading, setLoading } = useLoading();
const renderData = ref<DescData[]>([]);
const userInfo = ref<UserProfile>({});

const fetchData = async () => {
  try {
    setLoading(true);
    const { data: profile } = await getUserProfile(Number(route.params.id))
    userInfo.value = profile

    const { data: labels } = await getUserProfileLabel(Number(route.params.id))
    renderData.value = labels
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
    await deleteUser(Number(route.params.id))

    Message.success('删除成功');
    router.back()

  } catch (e) {
    console.log(e)
  } finally {
    setDeleting(false);
  }
}
</script>