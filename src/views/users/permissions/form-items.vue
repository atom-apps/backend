<template>
  <a-form-item field="tenant_id" label="租户">
    <a-select v-model="form.tenant_id" :options="userStore.tenants" placeholder="请输入租户" />
  </a-form-item>
          
  <a-form-item field="role_id" label="角色">
    <a-select v-model="form.role_id" :options="userStore.roles" placeholder="请输入角色" />
  </a-form-item>
          
  <a-form-item field="path" label="路由">
    <a-input v-model="form.path" placeholder="请输入路由" />
  </a-form-item>
  <a-form-item field="action" label="请求方式">
    <a-select v-model="form.action" placeholder="请输入请求方式" :options="actionList()"/>
  </a-form-item>
</template>

<script lang="ts" setup>
import { PermissionItem, actionList } from '@/api/users/permissions';
import { useUserStore } from '@/store';

const userStore = useUserStore()

const props = defineProps<{
  form: PermissionItem;
}>();
</script>