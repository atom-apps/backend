<template>
    <a-tooltip content="刷新">
        <div class="action-icon" @click="refresh"><icon-refresh size="18" /></div>
    </a-tooltip>
</template>

<script lang="ts">
export default {
    name: "ActionRefresh",
};
</script>

<script setup lang="ts">
const emit = defineEmits();

const refresh = () => {
    emit('click');
};

</script>