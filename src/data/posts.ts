/**
 * Editorial content.
 *
 * Empty until the client supplies real articles. The blog route renders its
 * own empty state rather than lorem-ipsum posts, and no Article structured
 * data is emitted while this array is empty.
 */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author?: string;
  cover?: string;
  tags?: string[];
};

export const posts: Post[] = [];
