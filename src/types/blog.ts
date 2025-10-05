// Blog post data structure for the listing page
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

// Blog post content structure for individual posts
export interface BlogPostContent {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}