import { Modal } from '@ones-design/core';
import { Book } from '@ones-design/icons';
import React from 'react';
import { useQuery } from 'react-query';
import { getLocaleHelper } from './get-local-helper';


export default function App() {
  
  const i18n = getLocaleHelper();
  // const sd = useQuery
  

  return <div>
    <Modal visible={true} title={i18n.t('wiki.demo')} >{i18n.t('wiki.demo')}<Book /> </Modal>
  </div>
}