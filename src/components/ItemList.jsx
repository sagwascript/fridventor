import React from 'react'
import { Card, Container, Row, Col, Alert, Badge } from 'react-bootstrap'
import moment from 'moment'
import Octicon, { Trashcan } from '@primer/octicons-react'
import SearchBar from './SearchBar'

const ItemList = ({ items, onDelete, search, onSetSearch }) => {
  const renderItems = () => {
    if (!items.error) {
      if (!items.loading) {
        if (items.length) {
          return items.reduce(
            (acc, eachItem, index, itemsSrc) => {
              const card = (
                <Col md={4} key={eachItem.id}>
                  <Card>
                    <Card.Body>
                      <Card.Title as="h6" style={{ marginBottom: 0 }}>
                        {eachItem.name}
                      </Card.Title>
                      <Card.Subtitle as="small" className="text-muted">
                        {eachItem.category}
                      </Card.Subtitle>
                      <Card.Text>
                        <Badge variant="dark">
                          {moment(+eachItem.dateAdded).fromNow()}
                        </Badge>
                      </Card.Text>
                      <div className="text-right">
                        <Card.Link
                          as="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => onDelete(eachItem.id)}
                        >
                          <Octicon icon={Trashcan} />
                        </Card.Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              )
              acc.group = acc.group.concat(card)
              if ((index + 1) % 3 === 0 || index === itemsSrc.length - 1) {
                acc.allItem = acc.allItem.concat(
                  <Row key={eachItem.id} style={{ marginTop: 10 }}>
                    {acc.group}
                  </Row>
                )
                acc.group = []
                return acc
              }
              return acc
            },
            { allItem: [], group: [] }
          ).allItem
        }
        return <Alert variant="secondary">Empty data</Alert>
      }
      return 'Loading data'
    }
    return 'Error loading data'
  }

  return (
    <Card>
      <Card.Header as="h6">All items in fridge</Card.Header>
      <Card.Body>
        <SearchBar
          onHandleSearch={(text) => onSetSearch(text)}
          search={search}
        />
        <Container style={{ padding: 0 }}>{renderItems()}</Container>
      </Card.Body>
    </Card>
  )
}

export default ItemList
