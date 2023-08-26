<template>
  <a-layout-footer class="footer">&copy; {{ year }}</a-layout-footer>
</template>

<script lang="ts" setup>
// get current year
const year = new Date().getFullYear();
</script>

<style lang="less" scoped>
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: var(--color-text-2);
    text-align: center;
  }
</style>
