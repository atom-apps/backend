<template>
  <div>
    <PageHeader subtitle="系统管理" :back="true"/>

    <Container :loading="loading" :rows="3" class="pt-5">
      <a-form :model="form" @submit="handleSubmit" class="md:w-3/4 sm:w-full">
        <FormItems :form="form" />
        <a-form-item v-if="errMsg">
          <div class="p-3 rounded w-full border-red-200 bg-orange-200 text-red-500" >
            {{ errMsg }}
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" :loading="submitting">提交</a-button>
        </a-form-item>
      </a-form>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { DictionaryItem, getDictionaryItem, updateDictionaryItem } from '@/api/systems/dictionaries';
import { Container, PageHeader } from "@/components/layout";
import useLoading from '@/hooks/loading';
import { Message } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormItems from './form-items.vue';

const route = useRoute();
const router = useRouter();
const { loading, setLoading } = useLoading()

onMounted(() => {
  fetchData()
})
const form = ref<DictionaryItem>({});
const errMsg = ref<string>();

const fetchData = async () => {
  try {
    setLoading(true);
    const { data } = await getDictionaryItem(Number(route.params.id))
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

  if (!values.items || values.items.length === 0) {
    errMsg.value = "请至少添加一个选项";
    return;
  }

  // items value 不能重复
  const valueSet = new Set<string>();
  for (const item of values.items) {
    if (valueSet.has(item.value)) {
      errMsg.value = "选项值不能重复";
      return;
    }
    valueSet.add(item.value);
  }

  // item label 不能为空
  for (const item of values.items) {
    if (!item.label) {
      errMsg.value = "选项标签不能为空";
      return;
    }
  }

  try {
    setSubmitting(true);
    await updateDictionaryItem(Number(route.params.id), values)

    Message.success("更新成功")
    router.back()
  } catch (e: any) {
    // Message.error(e.message)
  } finally {
    setSubmitting(false)
  }
};
</script>