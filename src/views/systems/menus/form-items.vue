<template>
  <a-form-item field="name" label="名称" :rules="[{required:true,message:'名称必填'}]">
    <a-input v-model="form.name" placeholder="请输入名称" />
  </a-form-item>
  <a-form-item field="slug" label="别名" :rules="[{required:true,message:'别名必填'}]">
    <a-input v-model="form.slug" placeholder="请输入别名" />
  </a-form-item>
  <a-form-item field="group_id" label="组" :rules="[{required:true,message:'组必填'}]">
    <a-input-number v-model="form.group_id" placeholder="请输入组" />
  </a-form-item>

          
  <a-form-item field="parent_id" label="父ID" :rules="[{required:true,message:'父ID必填'}]">
    <a-input-number v-model="form.parent_id" placeholder="请输入父ID" />
  </a-form-item>

          
  <a-form-item field="metadata" label="元数据" :rules="[{required:true,message:'元数据必填'}]">
    <a-input v-model="form.metadata" placeholder="请输入元数据" />
  </a-form-item>
</template>

<script lang="ts" setup>
import { MenuItem } from '@/api/systems/menus';

const props = defineProps<{
  form: MenuItem;
}>();
</script>