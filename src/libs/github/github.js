import { TOKEN } from '../secrets';

export async function gh(query) {
  const githubGraphQL = 'https://api.github.com/graphql';

  class HTTPError extends Error {}
  const response = await fetch(githubGraphQL, {
    method: 'POST',
    body: JSON.stringify({ query }),
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
