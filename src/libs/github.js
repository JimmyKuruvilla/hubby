import { TOKEN } from './secrets';

//how ot make sure we have all comments/issues/whatvers?
const queries = {
  test: `{repository(owner:"RMSone", name:"miu-insights") {
    issues(last:100, states:OPEN) {
      edges {
        node {
          title
          url
          id
          number
          assignees(first: 5){
            nodes{
              avatarUrl
              name
            }
          }
          comments(first:30){
            edges{
              node{
                id
                author{
                  login
                }
                url
                bodyHTML
              }
            }
          }
          labels(first:20) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }}`
};
export async function gh() {
  const githubGraphQL = 'https://api.github.com/graphql';
  const jsonEndpoint =
    'http://echo.jsontest.com/insert-key-here/insert-value-here/key/value';
  class HTTPError extends Error {}
  const response = await fetch(githubGraphQL, {
    method: 'POST',
    body: JSON.stringify({ query: queries['test'] }),
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application-json'
    }
  });

  if (!response.ok) {
    throw new HTTPError('Fetch error:', response.statusText);
  }

  return response.json();
}
