import { useAppStore } from '@/store';
import { DirectiveBinding } from 'vue';

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding;
  const appStore = useAppStore();

  if (value.length > 0) {
    if (!appStore.authMenus.includes(value) && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
