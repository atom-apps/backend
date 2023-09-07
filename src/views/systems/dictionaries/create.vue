<template>
  <div>
    <PageHeader subtitle="系统管理" :back="true" :loading="false" />

    <Container class="pt-5">
      <a-form
        ref="formRef"
        :model="form"
        @submit="handleSubmit"
        class="md:w-3/4 sm:w-full"
      >
        <!-- form start -->
        <FormItems :form="form" />
        <a-form-item v-if="errMsg">
          <div class="p-3 rounded w-full border-red-200 bg-orange-200 text-red-500" >
            {{ errMsg }}
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" :loading="submitting"
            >提交</a-button
          >
        </a-form-item>
        <!-- form end -->
      </a-form>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { DictionaryItem, createDictionaryItem } from "@/api/systems/dictionaries";
import { Container, PageHeader } from "@/components/layout";
import useLoading from "@/hooks/loading";
import { Message } from "@arco-design/web-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormItems from "./form-items.vue";

const router = useRouter();

const form = ref<DictionaryItem>({});
const formRef = ref();
const errMsg = ref<string>();

const { loading: submitting, setLoading: setSubmitting } = useLoading();
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
    await createDictionaryItem(values);

    Message.success("创建成功");
    router.back();
  } catch (e: any) {
    // Message.error(e.message)
  } finally {
    setSubmitting(false);
  }
};
</script>
