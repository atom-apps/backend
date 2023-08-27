<template>
  <a-tooltip content="设置列">
    <a-popover trigger="click" position="bl" @popup-visible-change="popupVisibleChange">
      <div class="action-icon"><icon-settings size="18" /></div>
      <template #content>
        <div id="tableSetting">
          <div v-for="(item, index) in showColumns" :key="item.dataIndex" class="flex items-center">
            <div style="margin-right: 4px; cursor: move">
              <icon-drag-arrow />
            </div>
            <div>
              <a-checkbox v-model="item.checked" @change="handleChange($event, item as TableColumnData, index)" />
            </div>
            <div class="ml-2 cursor-pointer">
              {{ item.title === "#" ? "序列号" : item.title }}
            </div>
          </div>
        </div>
      </template>
    </a-popover>
  </a-tooltip>
</template>


<script lang="ts">
export default {
  name: "ActionColumn",
};
</script>

<script lang="ts" setup>
import { Column } from '@/components/table/types';
import { TableColumnData } from '@arco-design/web-vue';
import { cloneDeep } from 'lodash';
import Sortable from 'sortablejs';
import { nextTick, ref, watch } from 'vue';

const props = defineProps<{
  columns: TableColumnData[],
  hidden: string[],
  clone: Column[],
}>();

const emit = defineEmits(['update:clone']);

const showColumns = ref<Column[]>([]);


const handleChange = (
  checked: boolean | (string | boolean | number)[],
  column: Column,
  index: number
) => {
  emit('update:clone', showColumns.value.filter((item) => item.checked ))
};

const popupVisibleChange = (val: boolean) => {
  if (val) {
    nextTick(() => {
      const el = document.getElementById("tableSetting") as HTMLElement;
      const sortable = new Sortable(el, {
        onEnd(e: any) {
          const { oldIndex, newIndex } = e;
          exchangeArray(showColumns.value, oldIndex, newIndex);
          emit('update:clone', showColumns.value.filter((item) => item.checked ))
        },
      });
    });
  }
};

const exchangeArray = <T extends Array<any>>(
  array: T,
  beforeIdx: number,
  newIdx: number,
  isDeep = false
): T => {
  const newArray = isDeep ? cloneDeep(array) : array;
  if (beforeIdx > -1 && newIdx > -1) {
    // 先替换后面的，然后拿到替换的结果替换前面的
    newArray.splice(beforeIdx, 1, newArray.splice(newIdx, 1, newArray[beforeIdx]).pop());
  }
  return newArray;
};

watch(
  () => props.columns,
  (val) => {
    showColumns.value = cloneDeep(val);
    showColumns.value.forEach((item, index) => {
      item.checked = !props.hidden.includes(item.dataIndex ?? '')
    });
  },
  { deep: true, immediate: true }
);
</script>