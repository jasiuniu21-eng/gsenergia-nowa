import { getLatestPosts, type LatestPost } from "@/lib/content";
import { NewsClient } from "./NewsClient";

export function News() {
  const posts = getLatestPosts(3);
  if (posts.length === 0) return null;
  return <NewsClient posts={posts} />;
}

export type { LatestPost };
