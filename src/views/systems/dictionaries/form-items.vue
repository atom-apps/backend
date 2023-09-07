<template>
  <a-form-item field="name" label="名称" :rules="[{ required: true, message: '名称必填' }]">
    <a-input v-model="form.name" placeholder="请输入名称" />
  </a-form-item>

  <a-form-item field="slug" label="别名" :rules="[{ required: true, message: '别名必填' }]">
    <a-input v-model="form.slug" placeholder="请输入别名" />
  </a-form-item>

  <a-form-item field="description" label="描述" :rules="[{ required: true, message: '描述必填' }]">
    <a-input v-model="form.description" placeholder="请输入描述" />
  </a-form-item>

  <a-divider />

  <a-form-item field="items" v-for="(item, index) in form.items" :label="`选项 ${index}`">
    <a-space>
      <a-input v-model="item.value" placeholder="请输入值">
        <template #prepend>值</template>
      </a-input>
      <a-input v-model="item.label" placeholder="请输入标签">
        <template #prepend>标签</template>
      </a-input>
      <a-button @click.prevent="deleteItem(index)" type="outline" status="danger">删除</a-button>
    </a-space>
  </a-form-item>
  <a-form-item field="items" label="">
    <a-button @click.prevent="addNewItem">添加选项</a-button>
  </a-form-item>
</template>

<script lang="ts" setup>
import { DictionaryItem } from '@/api/systems/dictionaries';



const props = defineProps<{
  form: DictionaryItem;
}>();

const addNewItem = () => {
  if (!props.form.items) {
    props.form.items = []
  }

  props.form.items?.push({ label: '', value: '' })

  console.log(props.form.items)
}
const deleteItem = (index: number) => {
  props.form.items?.splice(index, 1)
}
</script>