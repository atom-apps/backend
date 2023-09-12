<template>
  <a-form-item field="name" label="名称" :rules="[{required:true,message:'名称必填'}]">
    <a-input v-model="form.name" placeholder="请输入名称" />
  </a-form-item>
  <a-form-item field="endpoint" label="地址" :rules="[{required:true,message:'地址必填'}]">
    <a-input v-model="form.endpoint" placeholder="请输入地址" />
  </a-form-item>
  <a-form-item field="access_key" label="AccessKey" :rules="[{required:true,message:'AccessKey必填'}]">
    <a-input v-model="form.access_key" placeholder="请输入AccessKey" />
  </a-form-item>
  <a-form-item field="access_secret" label="AccessSecret" :rules="[{required:true,message:'AccessSecret必填'}]">
    <a-input v-model="form.access_secret" placeholder="请输入AccessSecret" />
  </a-form-item>
  <a-form-item field="bucket" label="Bucket" :rules="[{required:true,message:'Bucket必填'}]">
    <a-input v-model="form.bucket" placeholder="请输入Bucket" />
  </a-form-item>
</template>

<script lang="ts" setup>
import { DriverItem } from '@/api/storages/drivers';

const props = defineProps<{
  form: DriverItem;
}>();
</script>