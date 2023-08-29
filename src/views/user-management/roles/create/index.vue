<template>
  <div>
    <PageHeader title="用户管理" subtitle="角色编辑" :back="true" :loading="false" />

    <Container class="pt-5">
      <a-form :model="form" @submit="handleSubmit" class="md:w-3/4 sm:w-full">
        <!-- form start -->

        <a-form-item field="name" label="名称">
          <a-input v-model="form.name" placeholder="请输入名称" />
        </a-form-item>

        <a-form-item field="slug" label="别名">
          <a-input v-model="form.slug" placeholder="请输入别名" />
        </a-form-item>

        <a-form-item field="description" label="描述">
          <a-input v-model="form.description" placeholder="请输入描述" />
        </a-form-item>

        <a-form-item field="parent_id" label="父级">
          <a-input v-model="form.phone" placeholder="请输入手机" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" :loading="submitting">提交</a-button>
        </a-form-item>
        <!-- form end -->
      </a-form>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { RoleItem, createRoleItem } from '@/api/roles';
import Container from '@/components/container.vue';
import PageHeader from '@/components/page-header.vue';
import useLoading from '@/hooks/loading';
import { Message } from '@arco-design/web-vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const form = ref<RoleItem>({});

const { loading: submitting, setLoading: setSubmitting } = useLoading()
// form
const handleSubmit = async ({ values, errors }: any) => {
  console.log(values, errors);
  try {
    setSubmitting(true);
    await createRoleItem(values);

    Message.success("创建成功");
    router.back();
  } catch (e: any) {
    // Message.error(e.message)
  } finally {
    setSubmitting(false)
  }
};
</script>