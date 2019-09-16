import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

const CategoryForm = (props) => (
  <InputGroup style={{ marginBottom: 10 }}>
    <FormControl
      placeholder="Add new category"
      aria-label="Add new category"
      aria-describedby="basic-addon2"
      value={props.data}
      onChange={props.onHandleChange}
    />

    <InputGroup.Append>
      <Button variant="secondary" onClick={props.onHandleSubmit}>Add</Button>
    </InputGroup.Append>
  </InputGroup>
)

export default CategoryForm
