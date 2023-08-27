<template>
    <a-row>
        <a-col :flex="1">
            <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-item field="number" label="ID">
                            <a-input v-model="formModel.number" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item field="name" label="名称">
                            <a-input v-model="formModel.name" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item field="contentType" label="类型">
                            <a-select v-model="formModel.contentType" :options="contentTypeOptions" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item field="filterType" label="过滤条件">
                            <a-select v-model="formModel.filterType" :options="filterTypeOptions" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item field="createdTime" label="创建时间">
                            <a-range-picker v-model="formModel.createdTime" style="width: 100%" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item field="status" label="状态">
                            <a-select v-model="formModel.status" :options="statusOptions" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
            <a-space direction="vertical" :size="18">
                <a-button type="primary" @click="emit('search')">
                    <template #icon>
                        <icon-search />
                    </template>
                    搜索
                </a-button>
                <a-button @click="reset">
                    <template #icon>
                        <icon-refresh />
                    </template>
                    重置
                </a-button>
            </a-space>
        </a-col>
    </a-row>
    <a-divider />
</template>


<script lang="ts" setup>
import { Pagination } from "@/types/global";
import type { SelectOptionData } from "@arco-design/web-vue/es/select/interface";
import { computed, ref } from 'vue';

const emit = defineEmits(['search']);

const basePagination: Pagination = { page: 1, limit: 20 };

const generateFormModel = () => {
  return {
    number: "123",
    name:"",
    contentType:"",
    filterType:"",
    createdTime:[],
    status:"",
  };
};
const formModel = ref(generateFormModel());
defineExpose({ formModel });

const reset = () => {
  formModel.value = generateFormModel();
};


const contentTypeOptions = computed<SelectOptionData[]>(() => [
    {
        label: "1",
        value: "img",
    },
    {
        label: "2",
        value: "horizontalVideo",
    },
    {
        label: "3",
        value: "verticalVideo",
    },
]);
const filterTypeOptions = computed<SelectOptionData[]>(() => [
    {
        label: "1",
        value: "artificial",
    },
    {
        label: "2",
        value: "rules",
    },
]);
const statusOptions = computed<SelectOptionData[]>(() => [
    {
        label: "1",
        value: "online",
    },
    {
        label: "2",
        value: "offline",
    },
]);
</script>