import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from './pages/NotFound';
import Project from './pages/Project';
import DevelopersList from './components/DevelopersList';



const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        client: {
          merge(existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          }
        },
        developers: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: cache
})


function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>

          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/projects/:id' element={<Project />} />
              <Route path='/developers' element={<DevelopersList/>}/>
              
              <Route path='*' element={<NotFound />} />
              
            </Routes>
          </div>

        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
