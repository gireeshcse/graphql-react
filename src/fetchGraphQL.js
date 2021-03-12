// your-app-name/src/fetchGraphQL.js
export async function fetchGraphQLGithub(text, variables) {
    const REACT_APP_GITHUB_AUTH_TOKEN = process.env.REACT_APP_GITHUB_AUTH_TOKEN;
  
    // Fetch data from GitHub's GraphQL API:
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: text,
        variables,
      }),
    });
  
    // Get the response as JSON
    return await response.json();
  }

  async function fetchGraphQL(text, variables) {

    // Fetch data from GitHub's GraphQL API:
    const response = await fetch('http://localhost:8080/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: text,
        variables,
      }),
    });
  
    // Get the response as JSON
    return await response.json();
  }
  
  export default fetchGraphQL;