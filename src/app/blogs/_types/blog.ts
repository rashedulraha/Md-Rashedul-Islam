export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readingTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  author: {
    name: string;
    avatar: string;
  };
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}
