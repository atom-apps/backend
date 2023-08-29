<template>
    <a-page-header :title="title" :subtitle="subtitle" class="bg-white" :show-back="back" @back="$router.back()">
        <template #extra>
            <a-space class="flex justify-end items-center">
                <slot></slot>
            </a-space>
        </template>
    </a-page-header>
</template>
<script lang="ts" setup>
defineProps<{
    title: string,
    subtitle: string,
    back: boolean,
    loading: boolean
}>();
</script>