<template>
  <a-form-item field="name" label="名称" :rules="[{required:true,message:'名称必填'}]">
    <a-input v-model="form.name" placeholder="请输入名称" />
  </a-form-item>
  <a-form-item field="slug" label="别名" :rules="[{required:true,message:'别名必填'}]">
    <a-input v-model="form.slug" placeholder="请输入别名" />
  </a-form-item>
  <a-form-item field="description" label="描述" :rules="[{required:true,message:'描述必填'}]">
    <a-input v-model="form.description" placeholder="请输入描述" />
  </a-form-item>
  <a-form-item field="items" label="选项" :rules="[{required:true,message:'选项必填'}]">
    <a-input v-model="form.items" placeholder="请输入选项" />
  </a-form-item>
</template>

<script lang="ts" setup>
import { DictionaryItem } from '@/api/systems/dictionaries';

const props = defineProps<{
  form: DictionaryItem;
}>();
</script>