<template>
  <icon-font :type="'icon-' + type" :size=size />
</template>
  
<script setup>
import { Icon } from '@arco-design/web-vue';

defineProps({
  size: {
    type: Number,
    default: '32',
  },
  type: {
    type: String,
    default: 'file',
  },
});

</script>

<script>
const IconFont = Icon.addFromIconFontCn({ src: '//at.alicdn.com/t/c/font_4249438_ke9067myqlb.js' });
export default {
  components: {
    IconFont
  }
}
</script>