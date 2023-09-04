<template>
  <a-form-item field="type" label="类型">
    <a-input v-model="form.type" placeholder="请输入类型" />
  </a-form-item>
  <a-form-item field="parent_id" label="父级ID">
    <a-input-number v-model="form.parent_id" placeholder="请输入父级ID" />
  </a-form-item>
          
  <a-form-item field="name" label="名称">
    <a-input v-model="form.name" placeholder="请输入名称" />
  </a-form-item>
  <a-form-item field="path" label="路径">
    <a-input v-model="form.path" placeholder="请输入路径" />
  </a-form-item>
  <a-form-item field="metadata" label="元数据">
    <a-input v-model="form.metadata" placeholder="请输入元数据" />
  </a-form-item>
  <a-form-item field="order" label="排序">
    <a-input-number v-model="form.order" placeholder="请输入排序" />
  </a-form-item>
          
</template>

<script lang="ts" setup>
import { RouteItem } from '@/api/systems/routes';

const props = defineProps<{
  form: RouteItem;
}>();
</script>