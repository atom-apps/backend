<template>
  <div>
    <PageHeader subtitle="存储管理" :back="true" :loading="false" />

    <Container class="pt-5">
      <a-form :model="form" @submit="handleSubmit" class="md:w-3/4 sm:w-full">
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
import { DriverItem, createDriverItem } from '@/api/storages/drivers';
import { Container, PageHeader } from '@/components/layout';
import useLoading from '@/hooks/loading';
import { Message } from '@arco-design/web-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormItems from './form-items.vue';

const router = useRouter();

const form = ref<DriverItem>({});

const { loading: submitting, setLoading: setSubmitting } = useLoading()
// form
const handleSubmit = async ({ values, errors }: any) => {
	if (!!errors) return;
  try {
    setSubmitting(true);
    await createDriverItem(values);

    Message.success("创建成功");
    router.back();
  } catch (e: any) {
    // Message.error(e.message)
  } finally {
    setSubmitting(false)
  }
};
</script>