<template>
  <a-form-item field="code" label="行政区划代码" :rules="[{required:true,message:'行政区划代码必填'}]">
    <a-input v-model="form.code" placeholder="请输入行政区划代码" />
  </a-form-item>
  <a-form-item field="name" label="名称" :rules="[{required:true,message:'名称必填'}]">
    <a-input v-model="form.name" placeholder="请输入名称" />
  </a-form-item>
  <a-form-item field="province" label="省/直辖市" :rules="[{required:true,message:'省/直辖市必填'}]">
    <a-input v-model="form.province" placeholder="请输入省/直辖市" />
  </a-form-item>
  <a-form-item field="city" label="市" :rules="[{required:true,message:'市必填'}]">
    <a-input v-model="form.city" placeholder="请输入市" />
  </a-form-item>
  <a-form-item field="area" label="区县" :rules="[{required:true,message:'区县必填'}]">
    <a-input v-model="form.area" placeholder="请输入区县" />
  </a-form-item>
  <a-form-item field="town" label="乡镇" :rules="[{required:true,message:'乡镇必填'}]">
    <a-input v-model="form.town" placeholder="请输入乡镇" />
  </a-form-item>
</template>

<script lang="ts" setup>
import { LocationItem } from '@/api/systems/locations';

const props = defineProps<{
  form: LocationItem;
}>();
</script>