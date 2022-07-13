
import Home from "./screens/Home";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Home/>
    </ApolloProvider>
  )
}