import React from 'react'
import { Button } from 'react-bootstrap'

const Pagination = (props) => {
  const pages = Math.ceil(props.count / props.displayItem)
  const pageButtons = []
  for (let i = 1; i <= pages && pages > 1; i += 1) {
    pageButtons.push(
      <Button
        key={i}
        onClick={props.currentPage !== i ? (() => props.handleChangePage(i)) : (() => {})}
        style={{ marginLeft: 5 }}
        variant={props.currentPage === i ? 'primary' : 'outline-primary'}
      >
        {i}
      </Button>,
    )
  }

  return pageButtons
}

export default Pagination
