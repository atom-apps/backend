<template>
  <a-form-item field="tenant_id" label="租户ID" :rules="[{required:true,message:'租户ID必填'}]">
    <a-input-number v-model="form.tenant_id" placeholder="请输入租户ID" />
  </a-form-item>

          
  <a-form-item field="user_id" label="用户ID" :rules="[{required:true,message:'用户ID必填'}]">
    <a-input-number v-model="form.user_id" placeholder="请输入用户ID" />
  </a-form-item>

          
  <a-form-item field="book_id" label="书ID" :rules="[{required:true,message:'书ID必填'}]">
    <a-input-number v-model="form.book_id" placeholder="请输入书ID" />
  </a-form-item>

          
  <a-form-item field="title" label="章节名" :rules="[{required:true,message:'章节名必填'}]">
    <a-input v-model="form.title" placeholder="请输入章节名" />
  </a-form-item>
  <a-form-item field="description" label="简介" :rules="[{required:true,message:'简介必填'}]">
    <a-input v-model="form.description" placeholder="请输入简介" />
  </a-form-item>
  <a-form-item field="content" label="详细介绍" :rules="[{required:true,message:'详细介绍必填'}]">
    <a-input v-model="form.content" placeholder="请输入详细介绍" />
  </a-form-item>
</template>

<script lang="ts" setup>
import { ChapterItem } from '@/api/posts/chapters';

const props = defineProps<{
  form: ChapterItem;
}>();
</script>