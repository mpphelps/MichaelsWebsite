import { Container, Title, Card, Text, Group, Badge, Stack, Button } from '@mantine/core';
import { IconCalendar, IconEye } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../../data/blogData';

export default function BlogListPage() {
  const navigate = useNavigate();

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl" ta="center">
        Blog
      </Title>

      <Stack gap="lg">
        {blogPosts.map((post) => (
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
                  {post.readTime}
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
