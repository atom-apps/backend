<template>
  <div>
    <PageHeader title="INPUT_TITLE" subtitle="编辑" :back="true" :loading="false" />

    <Container class="pt-5">
      <a-form :model="form" @submit="handleSubmit" class="md:w-3/4 sm:w-full">
        <!-- form start -->
          <a-form-item field="name" label="名称">
            <a-input v-model="form.name" placeholder="请输入名称" />
          </a-form-item>
          <a-form-item field="slug" label="唯一标识">
            <a-input v-model="form.slug" placeholder="请输入唯一标识" />
          </a-form-item>
          <a-form-item field="description" label="描述">
            <a-input v-model="form.description" placeholder="请输入描述" />
          </a-form-item>
          <a-form-item field="parent_id" label="父角色">
            <a-number v-model="form.parent_id" placeholder="请输入父角色" />
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
import { Container, PageHeader } from '@/components/layout';
import useLoading from '@/hooks/loading';
import { Message } from '@arco-design/web-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref<RoleItem>({});

const { loading: submitting, setLoading: setSubmitting } = useLoading()
// form
const handleSubmit = async ({ values, errors }: any) => {
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