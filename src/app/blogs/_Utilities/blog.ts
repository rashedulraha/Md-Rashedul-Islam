import { BlogCategory, BlogPost } from "../_types/blog";

export const blogPosts: BlogPost[] = [
  {
    slug: "building-scalable-nextjs-applications",
    title: "Building Scalable Next.js Applications with Server Components",
    excerpt:
      "Learn how to leverage React Server Components and Next.js 14 features to build blazing-fast, SEO-friendly web applications that scale effortlessly.",
    content: `
# Building Scalable Next.js Applications

Next.js 14 introduced revolutionary features that changed how we build web applications. In this comprehensive guide, we'll explore...

## Why Server Components Matter

Server Components allow you to render components on the server, reducing the JavaScript bundle size sent to the client...

## Key Benefits

- **Improved Performance**: Reduced client-side JavaScript
- **Better SEO**: Server-rendered content is immediately indexable
- **Enhanced Security**: Sensitive logic stays on the server

## Implementation Example

\`\`\`typescript
// app/page.tsx
export default async function HomePage() {
  const data = await fetchServerData();
  return <ClientComponent data={data} />;
}
\`\`\`

## Conclusion

By embracing Server Components and modern Next.js patterns, you can build applications that are both performant and maintainable...
    `,
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    publishedAt: "2026-06-10",
    readingTime: 8,
    category: "Next.js",
    tags: ["React", "Server Components", "Performance", "SEO"],
    featured: true,
    author: {
      name: "Rashedul Islam",
      avatar: "/avatar.jpg",
    },
  },
  {
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript Generics: A Practical Guide",
    excerpt:
      "Dive deep into TypeScript generics and learn how to write type-safe, reusable code that catches errors at compile time.",
    content: `
# Mastering TypeScript Generics

TypeScript generics are one of the most powerful features...

## What are Generics?

Generics allow you to write flexible, reusable code while maintaining type safety...

## Real-World Examples

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello");
\`\`\`

## Advanced Patterns

Learn about conditional types, mapped types, and more advanced generic patterns...
    `,
    coverImage:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    publishedAt: "2026-06-05",
    readingTime: 6,
    category: "TypeScript",
    tags: ["TypeScript", "Type Safety", "Best Practices"],
    featured: false,
    author: {
      name: "Rashedul Islam",
      avatar: "/avatar.jpg",
    },
  },
  {
    slug: "modern-css-techniques-2026",
    title: "Modern CSS Techniques Every Developer Should Know in 2026",
    excerpt:
      "Explore cutting-edge CSS features like Container Queries, Cascade Layers, and the new color functions that are changing web development.",
    content: `
# Modern CSS Techniques 2026

CSS has evolved dramatically in recent years...

## Container Queries

Finally, we can style components based on their container size...

## Cascade Layers

Organize your CSS with @layer for better specificity management...

## New Color Functions

oklch() and other perceptual color spaces...
    `,
    coverImage:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop",
    publishedAt: "2026-06-01",
    readingTime: 5,
    category: "CSS",
    tags: ["CSS", "Modern Web", "Design"],
    featured: false,
    author: {
      name: "Rashedul Islam",
      avatar: "/avatar.jpg",
    },
  },
  {
    slug: "api-design-best-practices",
    title: "API Design Best Practices for Modern Web Applications",
    excerpt:
      "Learn the principles of RESTful API design, versioning strategies, and how to build APIs that developers love to use.",
    content: `
# API Design Best Practices

A well-designed API is crucial for the success of any application...

## RESTful Principles

Follow these core principles for clean, intuitive APIs...

## Versioning Strategies

How to handle API versions without breaking existing clients...

## Error Handling

Consistent error responses and meaningful status codes...
    `,
    coverImage:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop",
    publishedAt: "2026-05-28",
    readingTime: 7,
    category: "Backend",
    tags: ["API", "REST", "Architecture"],
    featured: false,
    author: {
      name: "Rashedul Islam",
      avatar: "/avatar.jpg",
    },
  },
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find((post) => post.featured);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getCategories(): BlogCategory[] {
  const categoryMap = new Map<string, number>();

  blogPosts.forEach((post) => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    count,
  }));
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase(),
  );
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
