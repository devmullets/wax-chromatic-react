import React from 'react';
import { Table } from 'semantic-ui-react'

const CollectionItem = (props) => {
  
  const { released, title, cat_no, notes, artist} = props.vinyl
  return (
    <>
      <Table.Row>
        <Table.Cell>{released}</Table.Cell>
        <Table.Cell>{artist}</Table.Cell>
        <Table.Cell>{title}</Table.Cell>
        <Table.Cell>{cat_no}</Table.Cell>
        <Table.Cell>{notes}</Table.Cell>
      </Table.Row>
    </>
  );
}

export default CollectionItem;