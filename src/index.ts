
import {
  getLogger, createLocalEditor, createEmptyDoc,
} from '@ones-editor/editor';

import './index.css';

async function startEdit() {
  //
  //
  const app = document.querySelector<HTMLDivElement>('#app') as HTMLElement;
  const editor = await createLocalEditor(app, createEmptyDoc(), {
    id: 'markdown-editor',
  });
  //
  (window as any).editor = editor;


  editor.addListener('blur', () => { console.trace(11111) });
}

startEdit().catch((err) => {
  console.error(err)
});
