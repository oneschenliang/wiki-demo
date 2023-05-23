import { Modal } from '@ones-design/core';
import { Book, Edit } from '@ones-design/icons';
import React from 'react';
import { useQuery } from 'react-query';
import { getLocaleHelper } from './get-local-helper';
import EditorContainer from './Editor';
import C from 'kiwi-intl';
import D from '@ones-editor/editor';

console.log(C, D);


export default function App() {
  const i18n = getLocaleHelper();
  // const sd = useQuery

  return (
    <div className='oc'>
      ehllo
      {/* <EditorContainer /> */}
    </div>
  );
}
