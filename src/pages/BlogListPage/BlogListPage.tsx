import { Container, Card, Text, Group, Badge, Stack, Button } from '@mantine/core';
import { IconCalendar, IconEye, IconTrash, IconEdit } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { blogPostsFetcher } from '../../utilities/fetcher';
import useSWR from 'swr';
import type { BlogPost } from '../../types/blog';
import { useSessionContext } from '../../context/SessionContext/useSessionContext';

export default function BlogListPage() {
  const navigate = useNavigate();
  const { userRoleLoading, userRole } = useSessionContext();

  console.log('User role in BlogListPage:', userRole);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
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
                    <IconTrash onClick={() => navigate(`/blog/${post.slug}/delete`)} size={16} />
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
