<template>
    <a-page-header :title="route.meta.title" :subtitle="subtitle" :style="{ background: 'var(--color-bg-2)' }" :show-back="back" @back="$router.back()">
        <template #extra>
            <a-space class="flex justify-end items-center">
                <slot></slot>
            </a-space>
        </template>
    </a-page-header>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
defineProps<{
    subtitle: string,
    back?: boolean,
    loading?: boolean
}>();
</script>