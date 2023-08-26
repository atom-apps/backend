<template>
    <a-button type="primary" @click="$router.push(to)">
        <template #icon>
            <icon-plus />
        </template>
        创建
    </a-button>
</template>


<script lang="ts">
export default {
    name: "ActionCreate",
};
</script>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
    to: RouteLocationRaw,
}>();
</script>