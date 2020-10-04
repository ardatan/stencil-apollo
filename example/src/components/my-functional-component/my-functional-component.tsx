import { Component, Prop, h } from '@stencil/core';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import gql from 'graphql-tag';
import { ApolloProvider, Query, Mutation } from 'stencil-apollo';

const ALL_POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      votes
      author {
        id
        firstName
        lastName
      }
    }
  }
`;

const UPVOTE_POST = gql`
mutation upvotePost($postId: Int!) {
  upvotePost(postId: $postId) {
    id
    votes
  }
}
`;

const client = new ApolloClient({
    uri: 'https://graphql-voter-app.herokuapp.com/',
    cache: new InMemoryCache()
  });

@Component({
  tag: 'my-functional-component',
  styleUrl: 'my-functional-component.css'
})
export class MyComponent {

  @Prop() first: string;
  @Prop() last: string;

  renderUpvoteButton(postId){
    return (
      <Mutation mutation={UPVOTE_POST}>
        { 
          upvotePost => (
            <button onClick={() => upvotePost({ variables: { postId } })}>Upvote</button>
          )
       }
      </Mutation>
    )
  }

  render() {
    return [
      <ApolloProvider client={client as any}>
        <Query query={ALL_POSTS_QUERY}>
          {
            ({ data, loading }) => {
              if (loading) return 'Loading...';
              return (
                <ul>
                  {data['posts'].map(post => (
                    <li>
                      {post.title}
                      {' '}
                      by {post.author.firstName} {post.author.lastName}
                      {' '}
                      ({post.votes} votes)
                      {' '}
                      {this.renderUpvoteButton(post.id)}
                    </li>
                  ))}
                </ul>
              );
          }
          }
        </Query>
      </ApolloProvider>
  ];
  }
}
