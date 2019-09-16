import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Card } from 'react-bootstrap'
import Octicon, { Inbox } from '@primer/octicons-react'

const PlacementPanel = () => {
  const { loading, error, data } = useQuery(gql`
    {
      placements {
        placement
        id
      }
    }
  `)

  const renderData = () => {
    if (!error) {
      if (!loading) {
        const placementList = data.placements.map((item) => (
          <li key={item.id}>{item.placement}</li>
        ))
        return <ul>{placementList}</ul>
      }
      return 'Loading data'
    }
    return 'Error loading data'
  }

  return (
    <Card>
      <Card.Header>
        <Octicon icon={Inbox} />
        <h6 style={{ display: 'inline', marginLeft: 5, position: 'relative', top: 1.5  }}>Placement</h6>
      </Card.Header>
      <Card.Body>
        {renderData()}
      </Card.Body>
    </Card>
  )
}

export default PlacementPanel
