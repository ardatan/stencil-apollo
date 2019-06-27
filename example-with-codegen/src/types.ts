/* tslint:disable */
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Author = {
  __typename?: "Author";
  id: Scalars["Int"];
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

/** this schema allows the following mutation: */
export type Mutation = {
  __typename?: "Mutation";
  upvotePost?: Maybe<Post>;
};

/** this schema allows the following mutation: */
export type MutationUpvotePostArgs = {
  postId: Scalars["Int"];
};

export type Post = {
  __typename?: "Post";
  id: Scalars["Int"];
  title?: Maybe<Scalars["String"]>;
  author?: Maybe<Author>;
  votes?: Maybe<Scalars["Int"]>;
};

/** the schema allows the following query: */
export type Query = {
  __typename?: "Query";
  posts?: Maybe<Array<Maybe<Post>>>;
  postsOf?: Maybe<Array<Maybe<Post>>>;
  authors?: Maybe<Array<Maybe<Author>>>;
};

/** the schema allows the following query: */
export type QueryPostsOfArgs = {
  authorId?: Maybe<Scalars["Int"]>;
};
