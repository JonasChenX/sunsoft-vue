import Mousetrap from 'mousetrap';
import { DirectiveBinding, VNode } from 'vue';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

// 綁定快捷鍵
const bindMousetrap = (el: HTMLElement, bind: DirectiveBinding, vnode: VNode) => {
  const key = bind.value.toLowerCase();

  // 如果有 global 修飾符，則使用 Mousetrap.bindGlobal
  if (bind.modifiers && bind.modifiers.global) {
    Mousetrap.bindGlobal(key, (event: KeyboardEvent) => {
      event.preventDefault();
      if (!isDisabled(el)) {
        bindInternal(el, bind, vnode);
      }
    });
  } else {
    Mousetrap.bind(key, (event: KeyboardEvent) => {
      if (!isDisabled(el)) {
        event.preventDefault();
        bindInternal(el, bind, vnode);
      }
    });
  }
};

// 內部綁定事件處理
const bindInternal = (el: HTMLElement, bind: DirectiveBinding, vnode: VNode) => {
  //則觸發 click 事件
  const clickEvent = new MouseEvent('click');
  el.dispatchEvent(clickEvent);
}

// Vue 指令
const ShortcutDirective = {
  // 元素插入時
  mounted(el: HTMLElement, bind: DirectiveBinding, vnode: VNode) {
    bindMousetrap(el, bind, vnode);
  },
  // 元素卸載時
  unmounted(el: HTMLElement, bind: DirectiveBinding) {
    const key = bind.value.toLowerCase();
    Mousetrap.unbind(key);
  }
};

// 檢查元素是否禁用
const isDisabled = (element: HTMLElement): boolean => {
  if (element instanceof HTMLButtonElement) {
    return element.disabled;
  } else {
    return element.getAttribute('disabled') !== null;
  }
}

export { ShortcutDirective };