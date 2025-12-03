import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import CreateBlogPost from '../CreateBlogPost/CreateBlogPost';

export default function EditBlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [blogPost, setBlogPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();

      if (error) {
        console.error('Error fetching blog post:', error);
        alert('Failed to fetch blog post.');
        return;
      }

      setBlogPost(data);
      setIsLoading(false);
    };

    fetchBlogPost();
  }, [slug]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return <CreateBlogPost initialData={blogPost} />;
}
