<template>
    <a-dropdown @select="handleSelectDensity">
        <a-tooltip content="密度">
            <div class="action-icon"><icon-line-height size="18" /></div>
        </a-tooltip>
        <template #content>
            <a-doption v-for="item in densityList" :key="item.value" :value="item.value"
                :class="{ active: item.value === size }">
                <span>{{ item.name }}</span>
            </a-doption>
        </template>
    </a-dropdown>
</template>

<script lang="ts">
export default {
    name: "ActionDensity",
};
</script>

<script lang="ts" setup>
import { SizeProps } from '@/components/table/types';
import { computed } from 'vue';

const props = defineProps<{
    size: SizeProps,
}>();

const emit = defineEmits([
    'update:size',
])


const densityList = computed(() => [
    { name: "迷你", value: "mini" },
    { name: "偏小", value: "small" },
    { name: "中等", value: "medium" },
    { name: "偏大", value: "large" },
]);


const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
) => {
    emit('update:size', val as SizeProps)
    console.log(val)
};

</script>