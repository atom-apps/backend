<template>
    <Container>
        <a-row>
            <a-col :flex="1">
                <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
                    label-align="left">
                    <a-row :gutter="16">
                        <a-col :span="8" v-for="filter in filters">
                            <a-form-item :field="filter.name" :label="filter.label">
                                <template v-if="filter.items">
                                    <a-select v-model="formModel[filter.name]" :options="filter.items"
                                        :allow-clear="true" />
                                </template>
                                <template v-else>
                                    <a-input v-model="formModel[filter.name]" v-if="filter.type === FilterType.String"
                                        :allow-clear="true" />
                                    <a-input-number v-model="formModel[filter.name]"
                                        v-else-if="filter.type === FilterType.Number" :allow-clear="true" />
                                    <a-input-tag v-model="formModel[filter.name]"
                                        v-else-if="filter.type === FilterType.List" :allow-clear="true" />
                                    <a-range-picker v-model="formModel[filter.name]"
                                        v-else-if="filter.type === FilterType.Date" :allow-clear="true" />
                                    <a-select v-model="formModel[filter.name]" v-else-if="filter.type === FilterType.Bool"
                                        :options="BoolOptions" :allow-clear="true" />
                                </template>
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
    </Container>
</template>


<script lang="ts" setup>
import { Container } from "@/components/layout";
import { AnyObject, BoolOptions, Filter, FilterType } from "@/types/global";
import { ref } from 'vue';

const props = defineProps<{
    filters: Filter[];
}>();
const emit = defineEmits(['search']);

const filters = ref<Filter[]>(props.filters)

const generateFormModel = () => {
    let obj: AnyObject = {};
    filters.value?.forEach((item) => {
        obj[item.name] = item.value ?? undefined;
    })
    return obj
};

const formModel = ref<AnyObject>(generateFormModel());

const filterItems = () => {
    let obj: AnyObject = {};

    for (const key in formModel.value) {
        if (Object.prototype.hasOwnProperty.call(formModel.value, key)) {
            const element = formModel.value[key];
            if (element === undefined || element === null || element === '') {
                continue
            }
            obj[key] = element
        }
        console.log(obj)
        return obj
    }
}
defineExpose({ filterItems });

const reset = () => {
    formModel.value = generateFormModel();
};
</script>