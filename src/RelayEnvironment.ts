// your-app-name/src/RelayEnvironment.js
import {
  Environment, Network, RecordSource,
  Store, RequestParameters, Variables,
} from 'relay-runtime';

async function fetchGraphQL(text: string, variables: Variables) {
  try {
    const REACT_APP_GITHUB_AUTH_TOKEN = process.env.REACT_APP_GITHUB_AUTH_TOKEN;
    const response = await fetch('http://localhost:4000/graphql', {
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
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
}

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchRelay(params:RequestParameters, variables:any) {
  return fetchGraphQL(<string>params.text, variables);
}

// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});