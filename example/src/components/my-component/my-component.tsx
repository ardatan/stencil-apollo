import { Component, Prop } from '@stencil/core';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

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
    uri: 'https://0vw9j9w0l5.lp.gql.zone/graphql'
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
