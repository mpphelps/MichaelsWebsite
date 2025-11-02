import { supabase } from '../lib/supabase';
import type { BlogPost, BlogPostContent } from '../types/blog';
import type { UserRole } from '../types/userRole';

// Generic fetcher for any table with optional filters
export const fetcher = async <T = unknown>(
  tableName: string,
  options?: {
    select?: string;
    filters?: Array<{ column: string; value: unknown }>;
    orderBy?: { column: string; ascending?: boolean };
    single?: boolean;
  }
): Promise<T | T[]> => {
  let query = supabase.from(tableName).select(options?.select || '*');

  // Apply filters
  if (options?.filters) {
    options.filters.forEach(({ column, value }) => {
      query = query.eq(column, value);
    });
  }

  // Apply ordering
  if (options?.orderBy) {
    query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? true });
  }

  // Single or multiple results
  if (options?.single) {
    const { data, error } = await query.single();
    if (error) throw error;
    return data as T;
  } else {
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as T[];
  }
};

// Convenience wrapper for blog posts listing
export const blogPostsFetcher = async (): Promise<BlogPost[]> =>
  fetcher<BlogPost>('blog_posts', {
    select: 'id, slug, title, excerpt, date, read_time, tags, featured_image, published, created_at, updated_at',
    filters: [{ column: 'published', value: true }],
    orderBy: { column: 'date', ascending: false },
  }) as Promise<BlogPost[]>;

// Convenience wrapper for single blog post by slug
export const blogPostContentFetcher = async (slug: string): Promise<BlogPostContent> =>
  fetcher<BlogPostContent>('blog_posts', {
    select: 'id, slug, title, date, read_time, tags, content, published, created_at, updated_at',
    filters: [
      { column: 'slug', value: slug },
      { column: 'published', value: true },
    ],
    single: true,
  }) as Promise<BlogPostContent>;

// Convenience wrapper for getting user role
export const userRoleFetcher = async (userId: string): Promise<UserRole> => {
  return fetcher<UserRole>('user_role', {
    select: 'id, role',
    filters: [{ column: 'id', value: userId }],
    single: true,
  }) as Promise<UserRole>;
};
