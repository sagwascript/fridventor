import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Card } from 'react-bootstrap'
import Octicon, { Trashcan } from '@primer/octicons-react'
import CategoryForm from './CategoryForm'

const Category = () => {
  const [category, setCategory] = useState('')

  const categoryQuery = gql`
    {
      categories {
        name
        id
      }
    }
  `

  const addCategoryMutation = gql`
    mutation($input:CategoryInput!) {
      addCategory(input:$input) {
        name
        id
      }
    }
  `

  const removeCategoryMutation = gql`
    mutation($id:ID!) {
      id: removeCategory(id:$id)
    }
  `

  const { loading, error, data } = useQuery(categoryQuery)

  const [addCategory] = useMutation(addCategoryMutation, {
    update(cache, { data: { addCategory } }) {
      const { categories } = cache.readQuery({ query: categoryQuery })
      cache.writeQuery({
        query: categoryQuery,
        data: { categories: categories.concat([addCategory]) }
      })
    },
  })

  const [removeCategory] = useMutation(removeCategoryMutation, {
    update(cache, { data: { id } }) {
      const { categories } = cache.readQuery({ query: categoryQuery })
      cache.writeQuery({
        query: categoryQuery,
        data: { categories: categories.filter((category) => category.id !== id) },
      })
    },
  })

  const renderData = () => {
    if (!error) {
      if (!loading) {
        const categoryList = data.categories.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <a href="#_" onClick={() => handleDelete(item.id)} style={{ marginLeft: 2 }}>
              <Octicon icon={Trashcan} verticalAlign="text-bottom" />
            </a>
          </li>
        ))
        return <ul>{categoryList}</ul>
      }
      return 'Loading data'
    }
    return 'Error loading data'
  }

  const handleSubmit = () => {
    addCategory({ variables: { input: { name: category } } })
    setCategory('')
  }

  const handleDelete = (id) => {
    removeCategory({ variables: { id } })
  }

  return (
    <Card>
      <Card.Header as="h6">Category</Card.Header>
      <Card.Body>
        <CategoryForm
          onHandleSubmit={handleSubmit}
          onHandleChange={(event) => setCategory(event.target.value)}
          data={category}
        />
        {renderData()}
      </Card.Body>
    </Card>
  )
}

export default Category
