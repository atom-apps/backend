<template>
  <a-form-item field="user_id" label="用户ID">
    <a-input-number v-model="form.user_id" placeholder="请输入用户ID" />
  </a-form-item>
          
  <a-form-item field="session_id" label="会话ID">
    <a-input v-model="form.session_id" placeholder="请输入会话ID" />
  </a-form-item>
  <a-form-item field="expire_at" label="过期时间">
    <a-input v-model="form.expire_at" placeholder="请输入过期时间" />
  </a-form-item>
</template>

<script lang="ts" setup>
import { SessionItem } from '@/api/sessions';

const props = defineProps<{
  form: SessionItem;
}>();
</script>