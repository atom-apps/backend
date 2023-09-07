<template>
  <div>
    <PageHeader subtitle="用户管理" :back="true"/>

    <Container :loading="loading" :rows="3" class="pt-5">
      <a-form :model="form" @submit="handleSubmit" class="mx-auto md:w-1/2 sm:w-full">
        <FormItems :form="form" />
        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" :loading="submitting">提交</a-button>
        </a-form-item>
      </a-form>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { RoleItem, getRoleItem, updateRoleItem } from '@/api/users/roles';
import { Container, PageHeader } from "@/components/layout";
import useLoading from '@/hooks/loading';
import { useUserStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormItems from './form-items.vue';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const { loading, setLoading } = useLoading()

onMounted(() => {
  fetchData()
})
const form = ref<RoleItem>({});

const fetchData = async () => {
  try {
    setLoading(true);
    const { data } = await getRoleItem(Number(route.params.id))
    form.value = data
  } catch (e: any) {
    Message.error(e.message)
  } finally {
    setLoading(false)
  }
}

const { loading: submitting, setLoading: setSubmitting } = useLoading()
// form
const handleSubmit = async ({ values, errors }: any) => {
  if (!!errors) return;
  try {
    setSubmitting(true);
    await updateRoleItem(Number(route.params.id), values)

    Message.success("更新成功")
    await userStore.init();
    router.back()
  } catch (e: any) {
    // Message.error(e.message)
  } finally {
    setSubmitting(false)
  }
};
</script>