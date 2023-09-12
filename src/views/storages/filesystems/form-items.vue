<template>
  <a-form-item field="tenant_id" label="租户ID" :rules="[{required:true,message:'租户ID必填'}]">
    <a-input-number v-model="form.tenant_id" placeholder="请输入租户ID" />
  </a-form-item>

          
  <a-form-item field="user_id" label="用户ID" :rules="[{required:true,message:'用户ID必填'}]">
    <a-input-number v-model="form.user_id" placeholder="请输入用户ID" />
  </a-form-item>

          
  <a-form-item field="driver_id" label="驱动" :rules="[{required:true,message:'驱动必填'}]">
    <a-input-number v-model="form.driver_id" placeholder="请输入驱动" />
  </a-form-item>

          
  <a-form-item field="filename" label="文件名" :rules="[{required:true,message:'文件名必填'}]">
    <a-input v-model="form.filename" placeholder="请输入文件名" />
  </a-form-item>
  <a-form-item field="type" label="类型" :rules="[{required:true,message:'类型必填'}]">
    <a-input v-model="form.type" placeholder="请输入类型" />
  </a-form-item>
  <a-form-item field="parent_id" label="父级ID" :rules="[{required:true,message:'父级ID必填'}]">
    <a-input-number v-model="form.parent_id" placeholder="请输入父级ID" />
  </a-form-item>

          
  <a-form-item field="status" label="状态" :rules="[{required:true,message:'状态必填'}]">
    <a-input v-model="form.status" placeholder="请输入状态" />
  </a-form-item>
  <a-form-item field="mime" label="MIME" :rules="[{required:true,message:'MIME必填'}]">
    <a-input v-model="form.mime" placeholder="请输入MIME" />
  </a-form-item>
  <a-form-item field="ext" label="后缀名" :rules="[{required:true,message:'后缀名必填'}]">
    <a-input v-model="form.ext" placeholder="请输入后缀名" />
  </a-form-item>
  <a-form-item field="share_uuid" label="共享ID" :rules="[{required:true,message:'共享ID必填'}]">
    <a-input v-model="form.share_uuid" placeholder="请输入共享ID" />
  </a-form-item>
  <a-form-item field="metadata" label="元数据" :rules="[{required:true,message:'元数据必填'}]">
    <a-input v-model="form.metadata" placeholder="请输入元数据" />
  </a-form-item>
</template>

<script lang="ts" setup>
import { FilesystemItem } from '@/api/storages/filesystems';

const props = defineProps<{
  form: FilesystemItem;
}>();
</script>