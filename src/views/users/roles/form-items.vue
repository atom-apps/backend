<template>
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
    <a-input-number v-model="form.parent_id" placeholder="请输入父角色" />
  </a-form-item>
          
</template>

<script lang="ts" setup>
import { RoleItem } from '@/api/users/roles';

const props = defineProps<{
  form: RoleItem;
}>();
</script>