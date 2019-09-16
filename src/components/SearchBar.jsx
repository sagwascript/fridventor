import React, { useState } from 'react'
import {
  InputGroup,
  Dropdown,
  DropdownButton,
  FormControl,
} from 'react-bootstrap'

const SearchBar = (props) => (
  <InputGroup style={{ marginBottom: 10 }}>
    <FormControl
      placeholder="Search item"
      aria-label="Search item"
      aria-describedby="basic-addon2"
      value={props.search}
      onChange={(event) => props.onHandleSearch(event.target.value)}
    />

    <DropdownButton
      as={InputGroup.Append}
      variant="dark"
      title="Sort"
      id="input-group-dropdown-2"
    >
      <Dropdown.Item href="#">Name</Dropdown.Item>
      <Dropdown.Item href="#">Category</Dropdown.Item>
      <Dropdown.Item href="#">Placement</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#">Separated link</Dropdown.Item>
    </DropdownButton>
  </InputGroup>
)

export default SearchBar
