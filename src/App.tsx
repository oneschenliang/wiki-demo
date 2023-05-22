import { Modal } from '@ones-design/core';
import { Book } from '@ones-design/icons';
import React from 'react';
import { useQuery } from 'react-query';

export default function App() {

  // const sd = useQuery
  

  return <div>
    <Modal visible={true} >hello world<Book /> </Modal>
  </div>
}