import { Container, Card, Text, Group, Badge, Stack, Button } from '@mantine/core';
import { IconCalendar, IconEye, IconTrash, IconEdit } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { blogPostsFetcher } from '../../utilities/fetcher';
import useSWR from 'swr';
import type { BlogPost } from '../../types/blog';
import { useSessionContext } from '../../context/SessionContext/useSessionContext';
import { supabase } from '../../lib/supabase';

export default function BlogListPage() {
  const navigate = useNavigate();
  const { userRoleLoading, userRole } = useSessionContext();

  console.log('User role in BlogListPage:', userRole);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      // Delete the blog post from the database
      const { error: deletePostError } = await supabase.from('blog_posts').delete().eq('slug', slug);

      if (deletePostError) {
        console.error('Error deleting blog post:', deletePostError);
        alert('Failed to delete the blog post.');
        return;
      }

      // Fetch all images in the folder
      const { data: images, error: listError } = await supabase.storage.from('blog-images').list(slug);

      if (listError) {
        console.error('Error listing blog images:', listError);
        alert('Failed to list blog images.');
        return;
      }

      if (images && images.length > 0) {
        // Extract file paths and delete them
        const filePaths = images.map((image) => `${slug}/${image.name}`);
        const { error: deleteImagesError } = await supabase.storage.from('blog-images').remove(filePaths);

        if (deleteImagesError) {
          console.error('Error deleting blog images:', deleteImagesError);
          alert('Failed to delete blog images.');
          return;
        }
      }

      alert('Blog post and associated images deleted successfully!');

      window.location.reload();
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred.');
    }
  };

  const { data, error, isLoading } = useSWR<BlogPost[]>('blog-posts', blogPostsFetcher);

  if (isLoading) {
    return <>Loading</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  if (!data) {
    return <>No blog entries yet</>;
  }

  console.log(data);

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        {userRoleLoading ? <>Loading...</> : userRole === 'admin' ? <Button onClick={() => navigate('/blog/new')}>Create Post</Button> : null}
        {data.map((post) => (
          <Card key={post.id} shadow="sm" padding="lg" radius="md" withBorder style={{ cursor: 'pointer' }} onClick={() => handlePostClick(post.slug)}>
            <Group justify="space-between" mb="xs">
              <Text fw={500} size="lg">
                {post.title}
              </Text>
              <Group gap="xs">
                <IconCalendar size={16} />
                <Text size="sm" c="dimmed">
                  {new Date(post.date).toLocaleDateString()}
                </Text>
                {userRoleLoading ? (
                  <>Loading...</>
                ) : userRole === 'admin' ? (
                  <>
                    <IconTrash
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation
                        handleDelete(post.slug);
                      }}
                      size={16}
                    />
                    <IconEdit onClick={() => navigate(`/blog/${post.slug}/edit`)} size={16} />
                  </>
                ) : null}
              </Group>
            </Group>

            <Text size="sm" c="dimmed" mb="md">
              {post.excerpt}
            </Text>

            <Group justify="space-between">
              <Group gap="xs">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="light" size="sm">
                    {tag}
                  </Badge>
                ))}
              </Group>

              <Group gap="xs">
                <IconEye size={16} />
                <Text size="sm" c="dimmed">
                  {`${post.read_time} min read`}
                </Text>
              </Group>
            </Group>

            <Button
              variant="light"
              size="sm"
              mt="md"
              onClick={(e) => {
                e.stopPropagation();
                handlePostClick(post.slug);
              }}
            >
              Read More
            </Button>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
