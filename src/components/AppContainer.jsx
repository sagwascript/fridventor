import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import PlacementPanel from './PlacementPanel'
import ItemForm from './ItemForm'
import ItemList from './ItemList'
import Category from './Category'
import Pagination from './Pagination'

const AppContainer = ({ modalState, setModalState }) => {
  const displayItem = 6
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const itemQuery = gql`
    query($filter: String, $skip: Int, $limit: Int) {
      getItems: items(filter: $filter, skip: $skip, limit: $limit) {
        count
        items {
          name
          statusAdded
          dateAdded
          category
          id
        }
      }
    }
  `


  const { loading, data, refetch } = useQuery(itemQuery, {
    variables: {
      filter: search,
      skip: displayItem * (currentPage - 1),
      limit: displayItem,
    },
    onCompleted({ getItems }) {
      setPageCount(pageCount || getItems.count)
    },
  })

  if (loading) {
    console.log('data is reloading')
  }
 
  const addItemMutation = gql`
    mutation($input: ItemInput!) {
      addItem(input: $input) {
        name
        statusAdded
        dateAdded
        category
        id
      }
    }
  `
  const [addItem] = useMutation(addItemMutation, {
    update(cache, { data: { addItem } }) {
      const { getItems: { count, items } } = cache.readQuery({
        query: itemQuery,
        variables: {
          filter: search,
          skip: displayItem * (currentPage - 1),
          limit: displayItem,
        },
      })
      if (items.length < displayItem) {
        cache.writeQuery({
          query: itemQuery,
          variables: {
            filter: search,
            skip: displayItem * (currentPage - 1),
            limit: displayItem,
          },
          data: {
            getItems: {
              __typename: 'FilterItem',
              count,
              items: items.concat([addItem]),
            },
          },
        })
      }
    },
  })

  const removeItemMutation = gql`
    mutation($id:ID!) {
      id: removeItem(id:$id)
    }
  `

  const [removeItem] = useMutation(removeItemMutation, {
    update(cache, { data: { id } }) {
      const { getItems: { count, items } } = cache.readQuery({
        query: itemQuery,
        variables: {
          filter: search,
          skip: displayItem * (currentPage - 1),
          limit: displayItem,
        },
      })
      cache.writeQuery({
        query: itemQuery,
        variables: {
          filter: search,
          skip: displayItem * (currentPage - 1),
          limit: displayItem,
        },
        data: {
          getItems: {
            __typename: 'FilterItem',
            count: count - 1,
            items: items.filter((item) => item.id !== id),
          },
        },
      })
    },
  })

  const handleSearch = (text) => {
    refetch()
    setPageCount(data.getItems.count)
    setCurrentPage(1)
    setSearch(text)
  }

  const handleSubmit = (input) => {
    addItem({ variables: { input } })
    if (data.getItems.items.length === displayItem) {
      setPageCount(pageCount + 1)
    }
    refetch()
  }

  const handleDelete = (id) => {
    removeItem({ variables: { id } })
    if (data.getItems.items.length === 1 && currentPage > 1) {
      setPageCount(pageCount - 1)
      setCurrentPage(currentPage - 1)
    }
    refetch()
  }

  const handleChangePage = (page) => {
    refetch()
    setCurrentPage(page)
  }

  return (
    <Container style={{ marginTop: 10 }}>
      <Row>
        <Col md={8}>
          <ItemList
            items={!loading ? data.getItems.items : []}
            onDelete={(id) => handleDelete(id)}
            search={search}
            onSetSearch={(text) => handleSearch(text)}
          />
          <Pagination
            count={pageCount}
            handleChangePage={(i) => handleChangePage(i)}
            currentPage={currentPage}
            displayItem={displayItem}
          />
        </Col>
        <Col md={4}>
          <Category />
          <div style={{ marginBottom: 10 }} />
          <PlacementPanel />
        </Col>
      </Row>
      <ItemForm
        show={modalState}
        handleHide={() => setModalState(false)}
        onHandleSubmit={(input) => handleSubmit(input)}
      />
    </Container>
  )
}

export default AppContainer
