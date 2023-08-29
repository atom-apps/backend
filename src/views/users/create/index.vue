<template>
  <div>
    <PageHeader title="用户管理" subtitle="用户编辑" :back="true" :loading="false" />

    <Container class="pt-5">
      <a-form :model="form" @submit="handleSubmit" class="md:w-3/4 sm:w-full">
        <!-- form start -->

        <a-form-item field="username" label="用户名">
          <a-input v-model="form.username" placeholder="请输入用户名" />
        </a-form-item>

        <a-form-item field="display_name" label="昵称">
          <a-input v-model="form.display_name" placeholder="请输入昵称" />
        </a-form-item>

        <a-form-item field="email" label="邮箱">
          <a-input v-model="form.email" placeholder="请输入邮箱" />
        </a-form-item>

        <a-form-item field="email_verified" label="邮箱验证">
          <a-switch type="round" v-model="form.email_verified" checked-color="#14C9C9" unchecked-color="#F53F3F" />
        </a-form-item>

        <a-form-item field="phone" label="手机">
          <a-input v-model="form.phone" placeholder="请输入手机" />
        </a-form-item>

        <a-form-item field="status" label="状态">
          <a-select placeholder="状态">
            <a-option value="">正常</a-option>
            <a-option value="blocked">禁用</a-option>
          </a-select>
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
import { UserItem, createUserItem } from '@/api/users';
import Container from '@/components/container.vue';
import PageHeader from '@/components/page-header.vue';
import useLoading from '@/hooks/loading';
import { Message } from '@arco-design/web-vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const form = ref<UserItem>({});

const { loading: submitting, setLoading: setSubmitting } = useLoading()
// form
const handleSubmit = async ({ values, errors }: any) => {
  console.log(values, errors);
  try {
    setSubmitting(true);
    await createUserItem(values);

    Message.success("创建成功");
    router.back();
  } catch (e: any) {
    // Message.error(e.message)
  } finally {
    setSubmitting(false)
  }
};
</script>