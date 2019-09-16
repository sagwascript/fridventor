import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Modal, Form, Button } from 'react-bootstrap'

const ItemForm = (props) => {
  const { show, handleHide } = props
  const placement = useQuery(gql`
    {
      placements {
        placement
        id
      }
    }
  `)
  const category = useQuery(gql`
    {
      categories {
        name
        id
      }
    }
  `)

  const [input, setInput] = useState({
    name: '',
    statusAdded: '',
    category: '',
    placement: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    props.onHandleSubmit(input)
    setInput({
      name: '',
      statusAdded: '',
      category: '',
      placement: '',
    })
    handleHide()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }

  const renderPlacements = () => {
    if (!placement.error) {
      if (!placement.loading) {
        return placement.data.placements.map((item) => (
          <option key={item.id}>{item.placement}</option>
        ))
      }
      return <option>Loading Data</option>
    }
    return <option>Error Loading Data</option>
  }

  const renderCategories = () => {
    if (!category.error) {
      if (!category.loading) {
        return category.data.categories.map((item) => (
          <option key={item.id}>{item.name}</option>
        ))
      }
      return <option>Loading Data</option>
    }
    return <option>Error Loading Data</option>
  }

  return (
    <Modal show={show} onHide={handleHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formItemName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              value={input.name}
              placeholder="Enter item name"
            />
          </Form.Group>
          <Form.Group controlId="formItemCondition">
            <Form.Label>Condition</Form.Label>
            <Form.Control
              type="text"
              name="statusAdded"
              onChange={handleChange}
              value={input.statusAdded}
              placeholder="Enter condition of the item"
            />
          </Form.Group>
          <Form.Group controlId="formItemCategories">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              onChange={handleChange}
              value={input.category}
            >
              <option>Choose...</option>
              {renderCategories()}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formItemPlacement">
            <Form.Label>Placement</Form.Label>
            <Form.Control
              as="select"
              name="placement"
              onChange={handleChange}
              value={input.placement}
            >
              <option>Choose...</option>
              {renderPlacements()}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleHide}>
            Close
          </Button>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default ItemForm
