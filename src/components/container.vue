<template>
    <a-card class="m-5">
        <a-space direction="vertical" size="large" class="w-full" v-if="loading">
            <a-skeleton :animation="true">
                <a-space direction="vertical" class="w-full" size="large">
                    <a-skeleton-line :rows="rows" />
                </a-space>
            </a-skeleton>
        </a-space>
        <slot v-else></slot>
    </a-card>
</template>
<script lang="ts" setup>
defineProps<{
    loading: boolean;
    rows: number;
}>();
</script>