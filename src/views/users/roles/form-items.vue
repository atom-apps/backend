<template>
  <a-form-item field="name" label="名称">
    <a-input v-model="form.name" placeholder="请输入名称" />
  </a-form-item>
  <a-form-item field="slug" label="唯一标识">
    <a-input v-model="form.slug" placeholder="请输入唯一标识" />
  </a-form-item>
  <a-form-item field="description" label="描述">
    <a-input v-model="form.description" placeholder="请输入描述" />
  </a-form-item>
  <a-form-item field="parent_id" label="父角色">
    <a-select  allow-clear v-model.number="form.parent_id" placeholder="请输入父角色" >
      <a-option v-for="item in userStore.roles" :value="Number(item.value)" :label="item.label" />
    </a-select>
  </a-form-item>
          
</template>

<script lang="ts" setup>
import { RoleItem } from '@/api/users/roles';
import { useUserStore } from '@/store';

const userStore = useUserStore();

const props = defineProps<{
  form: RoleItem;
}>();
</script>