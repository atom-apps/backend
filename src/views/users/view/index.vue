<template>
  <div>
    <a-page-header title="用户管理" subtitle="用户详情" class="bg-white" :show-back="true" @back="$router.back()">
      <template #breadcrumb>
        <a-breadcrumb>
          <a-breadcrumb-item>用户管理</a-breadcrumb-item>
          <a-breadcrumb-item>用户详情</a-breadcrumb-item>
        </a-breadcrumb>
      </template>

      <template #extra v-if="!loading">
        <a-space class="flex justify-end items-center">
          <a-button type="primary"
            @click="$router.push({ name: 'UserEdit', params: { id: route.params.id } })">编辑</a-button>

          <a-popconfirm content="确认删除？" type="warning" :ok-loading="deleting" @ok="handleConfirmDelete" position="lt">
            <a-tooltip content="删除">
              <a-button type="outline" status="danger">删除</a-button>
            </a-tooltip>
          </a-popconfirm>
        </a-space>
      </template>
    </a-page-header>

    <a-card class="m-5" v-if="loading">
      <a-space direction="vertical" size="large" class="w-full">
        <a-skeleton :animation="true">
          <a-space direction="vertical" class="w-full" size="large">
            <a-skeleton-line :rows="3" />
          </a-space>
        </a-skeleton>
      </a-space>
    </a-card>

    <a-card class="m-5">
      <a-descriptions :data="renderData" :column="3" :align="{ label: 'right' }" size="large"
        :title="userInfo.username" />
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { deleteUser, getUserProfile, getUserProfileLabel } from '@/api/users';
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