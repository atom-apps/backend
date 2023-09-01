<template>
  <a-form-item field="name" label="名称">
    <a-input v-model="form.name" placeholder="请输入名称" />
  </a-form-item>
  <a-form-item field="description" label="描述">
    <a-input v-model="form.description" placeholder="请输入描述" />
  </a-form-item>
  <a-form-item field="meta" label="元数据">
    <a-input v-model="form.meta" placeholder="请输入元数据" />
  </a-form-item>
</template>

<script lang="ts" setup>
import { TenantItem } from '@/api/users/tenants';

const props = defineProps<{
  form: TenantItem;
}>();
</script>