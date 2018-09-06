import { Component, Prop } from '@stencil/core';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const ALL_POSTS_QUERY = gql`
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

export const UPVOTE_POST = gql`
mutation upvotePost($postId: Int!) {
  upvotePost(postId: $postId) {
    id
    votes
  }
}
`;


const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://simple-posts-authors-graphql.glitch.me'
  }),
  cache: new InMemoryCache()
});

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css'
})
export class MyComponent {

  @Prop() first: string;
  @Prop() last: string;

  renderUpvoteButton(postId){
    return (
      <apollo-mutation mutation={UPVOTE_POST} onReady={ upvotePost => (
        <button onClick={() => upvotePost({ variables: { postId } })}>Upvote</button>
       )} />
    )
  }

  render() {
    return (
      <apollo-provider client={client}>
        <apollo-query query={ALL_POSTS_QUERY} onReady={({ data, loading }) => {
            if (loading) return 'Loading...';
            return (
              <ul>
                {data.posts.map(post => (
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
        }}/>
      </apollo-provider>
    );
  }
}
