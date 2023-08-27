<template>
    <a-row>
        <a-col :flex="1">
            <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
                <a-row :gutter="16">
                    <a-col :span="6" v-for="filter in filters">
                        <a-form-item :field="filter.name" :label="filter.label">
                            <template v-if="filter.items">
                                <a-select v-model="formModel[filter.name]" :options="filter.items" :allow-clear="true"/>
                            </template>
                            <template v-else>
                                <a-input v-model="formModel[filter.name]" v-if="filter.type === FilterType.String"  :allow-clear="true"/>
                                <a-input-number v-model="formModel[filter.name]" v-else-if="filter.type === FilterType.Number"  :allow-clear="true"/>
                                <a-input-tag v-model="formModel[filter.name]" v-else-if="filter.type === FilterType.List"  :allow-clear="true"/>
                                <a-range-picker v-model="formModel[filter.name]" v-else-if="filter.type === FilterType.Date"  :allow-clear="true"/>
                                <a-select v-model="formModel[filter.name]" v-else-if="filter.type === FilterType.Bool" :options="BoolOptions"  :allow-clear="true"/>
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
    <a-divider />
</template>


<script lang="ts" setup>
import { getUserListQueryFilters } from "@/api/users";
import useLoading from "@/hooks/loading";
import { AnyObject, BoolOptions, Filter, FilterType, Pagination } from "@/types/global";
import { onMounted, ref } from 'vue';

const emit = defineEmits(['search']);

const basePagination: Pagination = { page: 1, limit: 20 };
const { loading, setLoading } = useLoading(true)

const filters = ref<Filter[]>()

const fetchFilters = async () => {
    try {
        setLoading(true)
        const { data } = await getUserListQueryFilters()
        filters.value = data
    } catch (e) {
        console.log(e)
    } finally {
        setLoading(false)
    }
}

onMounted(() => {
    fetchFilters()
})


const generateFormModel = () => {
    let obj: AnyObject = {};
    filters.value?.forEach((item) => {
        obj[item.name] = item.value ?? '';
    })
    return obj
};

const formModel = ref<AnyObject>(generateFormModel());
defineExpose({ formModel });

const reset = () => {
    formModel.value = generateFormModel();
};
</script>