<template>
  <a-form-item field="tenant_id" label="租户ID" :rules="[{required:true,message:'租户ID必填'}]">
    <a-input-number v-model="form.tenant_id" placeholder="请输入租户ID" />
  </a-form-item>

          
  <a-form-item field="user_id" label="用户ID" :rules="[{required:true,message:'用户ID必填'}]">
    <a-input-number v-model="form.user_id" placeholder="请输入用户ID" />
  </a-form-item>

          
  <a-form-item field="title" label="书名" :rules="[{required:true,message:'书名必填'}]">
    <a-input v-model="form.title" placeholder="请输入书名" />
  </a-form-item>
  <a-form-item field="description" label="简介" :rules="[{required:true,message:'简介必填'}]">
    <a-input v-model="form.description" placeholder="请输入简介" />
  </a-form-item>
  <a-form-item field="content" label="详细介绍" :rules="[{required:true,message:'详细介绍必填'}]">
    <a-input v-model="form.content" placeholder="请输入详细介绍" />
  </a-form-item>
  <a-form-item field="author" label="原作者" :rules="[{required:true,message:'原作者必填'}]">
    <a-input v-model="form.author" placeholder="请输入原作者" />
  </a-form-item>
  <a-form-item field="source" label="原书地址" :rules="[{required:true,message:'原书地址必填'}]">
    <a-input v-model="form.source" placeholder="请输入原书地址" />
  </a-form-item>
  <a-form-item field="isbn" label="ISBN" :rules="[{required:true,message:'ISBN必填'}]">
    <a-input v-model="form.isbn" placeholder="请输入ISBN" />
  </a-form-item>
  <a-form-item field="price" label="价格" :rules="[{required:true,message:'价格必填'}]">
    <a-input-number v-model="form.price" placeholder="请输入价格" />
  </a-form-item>

          
</template>

<script lang="ts" setup>
import { BookItem } from '@/api/posts/books';

const props = defineProps<{
  form: BookItem;
}>();
</script>