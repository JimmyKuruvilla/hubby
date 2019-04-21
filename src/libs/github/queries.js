export const queries = (repo) => ({
  init: `{${repo} {
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
});