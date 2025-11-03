import { useState } from 'react';
import { Container, TextInput, Textarea, Button, Group, Title, Stack, Divider, NumberInput } from '@mantine/core';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { BlogPostContentContainer } from '../BlogPostPage/BlogPostPage';

export const CreateBlogPost = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [readTime, setReadTime] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('blog_posts').insert([
        {
          slug,
          title,
          excerpt,
          date: new Date().toISOString(),
          read_time: readTime.toString(),
          tags,
          content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published: true, // Adjust based on your requirements
        },
      ]);

      if (error) {
        console.error('Error creating blog post:', error);
        alert('Failed to create blog post.');
      } else {
        alert('Blog post created successfully!');
        navigate('/blog'); // Redirect to the blog list page
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSetTags = (value: string) => {
    const tagsArray = value.split(',').map((tag) => tag.trim());
    setTags(tagsArray);
  };

  const handleSetReadTime = (value: number | string | null | undefined) => {
    // Normalize possible number/string/null/undefined from NumberInput to a number or undefined
    const parsed = typeof value === 'number' ? value : value ? Number(value) : undefined;
    setReadTime(parsed ?? 0);
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Title>Create a New Blog Post</Title>
        <Divider />

        <TextInput label="Title" placeholder="Enter the blog post title" value={title} onChange={(event) => setTitle(event.currentTarget.value)} required />
        <TextInput label="Slug" placeholder="Enter the blog post slug" value={slug} onChange={(event) => setSlug(event.currentTarget.value)} required />
        <TextInput label="Excerpt" placeholder="Enter a short excerpt" value={excerpt} onChange={(event) => setExcerpt(event.currentTarget.value)} required />
        <NumberInput label="Read Time (min)" placeholder="Enter the read time (e.g., 5 min)" value={readTime} onChange={(value) => handleSetReadTime(value)} required />
        <TextInput label="Tags" placeholder="Enter tags separated by commas" value={tags.join(', ')} onChange={(event) => handleSetTags(event.currentTarget.value)} required />

        <Textarea label="Content" placeholder="Write your blog post content here..." value={content} onChange={(event) => setContent(event.currentTarget.value)} minRows={10} required />

        <Title order={3}>Preview</Title>
        <Divider />
        <BlogPostContentContainer
          post={{
            id: '1',
            title,
            content,
            tags,
            slug,
            read_time: readTime.toString(),
            date: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            published: true,
          }}
        />

        <Group style={{ justifyContent: 'flex-end' }}>
          <Button onClick={handleSubmit} loading={isSubmitting}>
            Publish
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default CreateBlogPost;
