import Pages from "./Pages";
import { ApolloClient,ApolloProvider,InMemoryCache,createHttpLink, gql } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { IS_LOGGED_IN } from './gql/Query'

function App() {
  const uri = process.env.REACT_APP_API_URL
  const httpLink = createHttpLink({uri})
  const cache = new InMemoryCache()
  const authLink = setContext((_,{headers})=>{
    return{
      headers:{
        ...headers,
        authorization: localStorage.getItem('Token') || ''
      }
    }
  })
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    // uri,
    cache,
    resolvers:{},
    connectToDevTools: true
  })
  cache.writeQuery({
    query: IS_LOGGED_IN,
    data:{isLoggedIn : !!localStorage.getItem('Token')}
  })
  client.onClearStore(()=>{
    client.cache.writeQuery({
      query:gql`{
        isLoggedIn @client }
      `,
      data:{isLoggedIn : !!localStorage.getItem('Token')}
    })
  })
  return (
      <ApolloProvider client={client}>
        <Pages/>
      </ApolloProvider>
  );
}

export default App;
