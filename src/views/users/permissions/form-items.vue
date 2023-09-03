<template>
  <a-form-item field="tenant_id" label="租户ID">
    <a-input-number v-model="form.tenant_id" placeholder="请输入租户ID" />
  </a-form-item>
          
  <a-form-item field="role_id" label="角色ID">
    <a-input-number v-model="form.role_id" placeholder="请输入角色ID" />
  </a-form-item>
          
  <a-form-item field="path" label="路由">
    <a-input v-model="form.path" placeholder="请输入路由" />
  </a-form-item>
  <a-form-item field="action" label="请求方式">
    <a-input v-model="form.action" placeholder="请输入请求方式" />
  </a-form-item>
</template>

<script lang="ts" setup>
import { PermissionItem } from '@/api/users/permissions';

const props = defineProps<{
  form: PermissionItem;
}>();
</script>