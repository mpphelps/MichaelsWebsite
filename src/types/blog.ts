// Blog post data structure for the listing page
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read_time: string; // Changed from readTime to match database
  tags: string[];
  featured_image?: string; // Fixed typo from feature_image
  published: boolean;
  created_at: string;
  updated_at: string;
}

// Blog post content structure for individual posts
export interface BlogPostContent {
  id: string;
  slug: string;
  title: string;
  date: string;
  read_time: string;
  tags: string[];
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}
