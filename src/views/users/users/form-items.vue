<template>
  <a-form-item field="avatar" label="头像">
    <a-input v-model="form.avatar" placeholder="请输入头像" />
  </a-form-item>

  <a-form-item field="username" label="用户名" :rules="[{required:true,message:'用户名必填'}]">
    <a-input v-model="form.username" placeholder="请输入用户名" />
  </a-form-item>

  <a-form-item field="display_name" label="显示名称" :rules="[{required:true,message:'显示名称必填'}]">
    <a-input v-model="form.display_name" placeholder="请输入显示名称" />
  </a-form-item>

  <a-form-item field="password" label="密码" :rules="[{required:true,message:'密码必填'}]">
    <a-input v-model="form.password" placeholder="请输入密码" />
  </a-form-item>

  <a-form-item field="email" label="邮箱">
    <a-input v-model="form.email" placeholder="请输入邮箱" />
  </a-form-item>

  <a-form-item field="email_verified" label="邮箱是否验证">
    <a-switch type="round" v-model="form.email_verified"/>
  </a-form-item>
          
  <a-form-item field="phone" label="手机号">
    <a-input v-model="form.phone" placeholder="请输入手机号" />
  </a-form-item>

  <a-form-item field="status" label="状态">
    <a-radio-group :options="statusOptions" v-model="form.status" placeholder="请输入状态" />
  </a-form-item>
</template>

<script lang="ts" setup>
import { UserItem } from '@/api/users/users';
import { ref } from 'vue';

const props = defineProps<{
  form: UserItem;
}>();
const statusOptions = ref([
  { label: '正常', value: '' },
  { label: '禁用', value: 'blocked' },
]);
</script>