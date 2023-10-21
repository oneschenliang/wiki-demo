import type { CommandItem, OnesEditor} from '@ones-editor/editor';
import { createElement, createEmptyTextBlockData, editorRangeSetColor, getContainerId, getParentContainer } from '@ones-editor/editor';

const insertHeading = (editor: OnesEditor) => {
  const block = editor.getFocusedBlock();
  const index = editor.getBlockIndex(block);
  const container = getParentContainer(block);
  const containerId = getContainerId(container);
  const text = createEmptyTextBlockData();
  text.heading = 1;
  const newBlock = editor.insertBlock(containerId, index + 1, text);
  editor.focus();
};

const changeColor = (editor: OnesEditor) => {
  editorRangeSetColor(editor, 'backgroundColor', 1, () => {});
};

const createCommands = (editor: OnesEditor) => {
  const commands: CommandItem[] = [{
    id: 'add',
    name: '+',
  }, {
    id: 'color',
    name: 'A',
  }];
  const fragment = document.createDocumentFragment();
  commands.forEach((command) => {
    const elem = createElement('div', ['command-item'], fragment, command.name);
    elem.ontouchstart = () => {
      if (command.id === 'add') {
        const parent = elem.parentElement?.parentElement as HTMLElement;
        if (parent.querySelector('.child-layout')) {
          parent.removeChild(parent.querySelector('.child-layout') as Element);
          return;
        }
        const childLayout = createElement('div', ['child-layout'], parent);
        ([{ name: '标题1' }] as const).forEach((item) => {
          const childItem = createElement('div', ['child-item'], childLayout, item.name);
          childItem.ontouchend = () => {
            if (item.name === '标题1') {
              insertHeading(editor);
              parent.removeChild(parent.querySelector('.child-layout') as Element);
            }
          // editor.execCommand(item.id);
          };
        });
      // parent.appendChild(childLayout);
      // editor.execCommand(command.id);
      }

      if (command.id === 'color') {
        const parent = elem.parentElement?.parentElement as HTMLElement;
        if (parent.querySelector('.child-layout')) {
          parent.removeChild(parent.querySelector('.child-layout') as Element);
          return;
        }
        const childLayout = createElement('div', ['child-layout'], parent);
        ([{ name: '背景色' }] as const).forEach((item) => {
          const childItem = createElement('div', ['child-item'], childLayout, item.name);
          childItem.ontouchend = () => {
            if (item.name === '背景色') {
              changeColor(editor);
              parent.removeChild(parent.querySelector('.child-layout') as Element);
            }
          // editor.execCommand(item.id);
          };
        });
      }
    };
  });
  return fragment;
};

// let scroll = null;
// let clientHeightContainer = null;

export function createCommandBar(editor: OnesEditor) {
  const div = createElement('div', ['command-m-bar'], null);
  div.setAttribute('data-keep-editor-focus', '');
  const container = createElement('div', ['command-m-container'], div);
  const fragment = createCommands(editor);
  container.appendChild(fragment);
  document.body.appendChild(div);

  // scroll = createElement('div', ['command-item'], container, '');

  // const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  // clientHeightContainer = createElement('div', ['command-item'], container, clientHeight.toString());

  // scroll
  // editor.scrollContainer.addEventListener('scroll', (event) => {
  //   scroll.innerText = `${Math.round(document.body.scrollTop)}`;
  // });
}

const initVirtualViewportHeight = (window as any).visualViewport.height;

window.onresize = function () {
  const isKeyboardShow = initVirtualViewportHeight > (window as any).visualViewport?.height;
  if (isKeyboardShow) {
    // 软键盘弹出，调整浮动元素的位置
    // alert('软键盘弹出');
    const bar = document.querySelector('.command-m-bar') as HTMLElement;
    if (bar) {
      const offsetHeight = Math.max(document.body.clientHeight - (window as any).visualViewport.height - document.documentElement.scrollTop, 0);
      bar.style.bottom = `${offsetHeight}px`;
    }
  } else {
    // 软键盘收起，恢复浮动元素的位置
    const bar = document.querySelector('.command-m-bar') as HTMLElement;
    if (bar) {
      bar.style.bottom = '0px';
    }
  }

  // const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  // clientHeightContainer.innerText = `${clientHeight}`;

  // this.setTimeout(() => {
  //   scroll.innerText = `async: ${Math.round(document.documentElement.scrollTop)} ${Math.round(document.body.scrollTop)} ${Math.round(window.editor?.scrollContainer.scrollTop)}`;
  // }, 1000);
};

document.addEventListener('focusin', (event) => {
  // TODO: 回调的异步问题，软键盘还没有弹出，就已经执行了
  // 浮动
  setTimeout(() => {
    const bar = document.querySelector('.command-m-bar') as HTMLElement;
    if (bar) {
      const offsetHeight = Math.max(document.body.clientHeight - (window as any).visualViewport.height - document.documentElement.scrollTop, 0);
      bar.style.bottom = `${offsetHeight}px`;
    }
  }, 100);
  // scroll.innerText = `${Math.round(document.body.scrollTop)}`;
  // const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  // clientHeightContainer.innerText = `${clientHeight}`;
});

document.addEventListener('focusout', (event) => {
  // 浮动
  const bar = document.querySelector('.command-m-bar') as HTMLElement;
  if (bar) {
    bar.style.bottom = '0px';
  }
  // scroll.innerText = `${Math.round(window.editor?.scrollContainer.scrollTop)}`;
  // const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  // clientHeightContainer.innerText = `${clientHeight}`;
});
