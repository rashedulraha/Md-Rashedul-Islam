import BlogClient from "./_Conponents/blog/BlogClient";
import {
  getBlogPosts,
  getCategories,
  getFeaturedPost,
} from "./_Utilities/blog";

export const metadata = {
  title: "Blog | Rashedul Islam - Tech Insights & Tutorials",
  description:
    "Explore in-depth articles on Next.js, TypeScript, modern CSS, API design, and web development best practices. Learn from real-world engineering experiences.",
  keywords: [
    "web development",
    "Next.js",
    "TypeScript",
    "React",
    "programming blog",
    "tech tutorials",
  ],
  openGraph: {
    title: "Blog | Rashedul Islam - Tech Insights & Tutorials",
    description:
      "Explore in-depth articles on modern web development and engineering best practices.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const featuredPost = getFeaturedPost();
  const categories = getCategories();

  return (
    <BlogClient
      posts={posts}
      featuredPost={featuredPost}
      categories={categories}
    />
  );
}
