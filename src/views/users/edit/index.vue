<template>
  <div>
    <PageHeader title="用户管理" subtitle="用户编辑" :back="true" :loading="loading">
      <a-button @click="$router.back()">取消</a-button>
      <a-button type="primary" @click="">提交</a-button>
    </PageHeader>

    <Container :loading="loading" :rows="3">
      <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
        <a-form-item field="name" tooltip="Please enter username" label="Username">
          <a-input v-model="form.username" placeholder="please enter your username..." />
        </a-form-item>
        <a-form-item field="post" label="Post">
          <a-input v-model="form.displayName" placeholder="please enter your post..." />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { getUserProfile } from '@/api/users';
import Container from '@/components/container.vue';
import PageHeader from '@/components/page-header.vue';
import useLoading from '@/hooks/loading';
import { UserProfile } from '@/store/modules/user/types';
import { Message } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const { loading, setLoading } = useLoading()

onMounted(() => {
  fetchData()
})
const form = ref<UserProfile>({});

const fetchData = async () => {
  try {
    setLoading(true);
    const { data } = await getUserProfile(Number(route.params.id))
    form.value = data

  } catch (e: any) {
    Message.error(e.message)
  } finally {
    setLoading(false)
  }
}

// form
const handleSubmit = () => {
  console.log();
};
</script>