import React, { useState } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import MainNavbar from './components/layout/MainNavbar'
import AppContainer from './components/AppContainer'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

const App = () => {
  const [modalState, setModalState] = useState(false)
  return (
    <ApolloProvider client={client}>
      <MainNavbar handleClick={() => setModalState(true)} />
      <AppContainer modalState={modalState} setModalState={setModalState} />
    </ApolloProvider>
  )
}

export default App
