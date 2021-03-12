### GraphQL React

React application using Relay Client

#### Adding Relay client packages

```
yarn add relay-runtime react-relay
yarn add --dev relay-compiler graphql babel-plugin-relay
```

#### Add a GraphQL schema 

This schema is a contract between backend and frontend.
Copied from the GraphQL backend project.

```
cd app-directory
curl https://raw.githubusercontent.com/gireeshcse/graphlq-golang/main/graph/schema.graphqls > schema.graphql

```

Or install the get-graphql-schema and get the schema from the endpoint

```
npm install -g get-graphql-schema
get-graphql-schema http://localhost:8080/query > schema1.graphql
```

#### Configure Relay Compiler

Update 
```
// your-app-name/package.json
{
  ...
  "scripts": {
    ...
    "start": "yarn run relay && react-scripts start",
    "build": "yarn run relay && react-scripts build",
    "relay": "yarn run relay-compiler --schema schema.graphql --src ./src/ --watchman false $@"
    ...
  },
  ...
}
```

Run the app

```
yarn start
```

####  Configure Relay Runtime

```
// your-app-name/src/RelayEnvironment.js
import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import fetchGraphQL from './fetchGraphQL';

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchRelay(params, variables) {
  console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`);
  return fetchGraphQL(params.text, variables);
}

// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
```

#### Fetching a Query With Relay

```
// your-app-name/src/App.js
import React from 'react';
import './App.css';
import fetchGraphQL from './fetchGraphQL';
import graphql from 'babel-plugin-relay';
import { RelayEnvironmentProvider, preloadQuery, usePreloadedQuery} from 'react-relay/hooks';
import RelayEnvironment from "./RelayEnvironment";

const { Suspense } = React;

// Define a query 
const DummyLinksQuery = graphql`
query AppDummyLinksQuery{
  dummyLinks{
    title
    address,
    user{
      name
    }
  }
}
`;

// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.
const preloadedQuery = preloadQuery(RelayEnvironment, DummyLinksQuery, {
  /* query variables */
});

const { useState, useEffect } = React;

// Inner component that reads the preloaded query results via `usePreloadedQuery()`.
// This works as follows:
// - If the query has completed, it returns the results of the query.
// - If the query is still pending, it "suspends" (indicates to React is isn't
//   ready to render yet). This will show the nearest <Suspense> fallback.
// - If the query failed, it throws the failure error. For simplicity we aren't
//   handling the failure case here.
function SampleApp(props) {
  const data = usePreloadedQuery(DummyLinksQuery, props.preloadQuery)

  // Render "Loading" until the query completes
  return (
    <div className="App">
      <header className="App-header">
        <p>
          From relay : {data["dummyLinks"][0].title}
        </p>
      </header>
    </div>
  );
}
function App() {
  // We'll load the name of a repository, initially setting it to null
  const [title, setTitle] = useState(null);

  // When the component mounts we'll fetch a repository name
  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
      query {
        dummyLinks{
          title
          address,
          user{
            name
          }
        }
      }
    `).then(response => {
      // Avoid updating state if the component unmounted before the fetch completes
      if (!isMounted) {
        return;
      }
      const data = response.data;
      console.log(data)
      setTitle(data["dummyLinks"][0].title);
    }).catch(error => {
      console.error(error);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Render "Loading" until the query completes
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {title != null ? `Link Title: ${title}` : "Loading"}
        </p>
      </header>
    </div>
  );
}

// export default App;

// The above component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
function AppRoot(props) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <App preloadedQuery={preloadedQuery} />
        <SampleApp preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
```

**Issue:**BabelPluginRelay: Expected plugin context to include "types"