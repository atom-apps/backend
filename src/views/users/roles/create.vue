<template>
  <div>
    <PageHeader subtitle="用户管理" :back="true" :loading="false" />

    <Container class="pt-5">
      <a-form :model="form" @submit="handleSubmit" class="mx-auto md:w-1/2 sm:w-full">
        <!-- form start -->
        <FormItems :form="form" />
        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" :loading="submitting">提交</a-button>
        </a-form-item>
        <!-- form end -->
      </a-form>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { RoleItem, createRoleItem } from '@/api/users/roles';
import { Container, PageHeader } from '@/components/layout';
import useLoading from '@/hooks/loading';
import { useUserStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormItems from './form-items.vue';

const router = useRouter();
const userStore = useUserStore()

const form = ref<RoleItem>({});

const { loading: submitting, setLoading: setSubmitting } = useLoading()
// form
const handleSubmit = async ({ values, errors }: any) => {
  if (!!errors) return;
  try {
    setSubmitting(true);
    await createRoleItem(values);

    Message.success("创建成功");
    await userStore.init();
    router.back();
  } catch (e: any) {
    // Message.error(e.message)
  } finally {
    setSubmitting(false)
  }
};
</script>