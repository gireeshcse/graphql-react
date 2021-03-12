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