import { Container, Title, Text, Badge, Group, Button, Stack, Anchor } from '@mantine/core';
import { IconCalendar, IconArrowLeft } from '@tabler/icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPostContent } from '../../data/blogData';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = slug ? blogPostContent[slug] : null;

  // Function to parse markdown-style links [text](url)
  const parseMarkdownLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // Add the link
      const linkText = match[1];
      const linkUrl = match[2];

      if (linkUrl.startsWith('/')) {
        // Internal link - use navigate
        parts.push(
          <Anchor key={match.index} onClick={() => navigate(linkUrl)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            {linkText}
          </Anchor>
        );
      } else {
        // External link
        parts.push(
          <Anchor key={match.index} href={linkUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold' }}>
            {linkText}
          </Anchor>
        );
      }

      lastIndex = linkRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 1 ? parts : text;
  };

  if (!post) {
    return (
      <Container size="md" py="xl">
        <Title order={1}>Post Not Found</Title>
        <Text mt="md">The blog post you're looking for doesn't exist.</Text>
        <Button leftSection={<IconArrowLeft size={16} />} onClick={() => navigate('/blog')} mt="md">
          Back to Blog
        </Button>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Button leftSection={<IconArrowLeft size={16} />} variant="subtle" onClick={() => navigate('/blog')} mb="xl">
        Back to Blog
      </Button>

      <Stack gap="md" mb="xl">
        <Title order={1}>{post.title}</Title>

        <Group>
          <Group gap="xs">
            <IconCalendar size={16} />
            <Text size="sm" c="dimmed">
              {new Date(post.date).toLocaleDateString()}
            </Text>
          </Group>
          <Text size="sm" c="dimmed">
            •
          </Text>
          <Text size="sm" c="dimmed">
            {post.readTime}
          </Text>
        </Group>

        <Group gap="xs">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="light">
              {tag}
            </Badge>
          ))}
        </Group>
      </Stack>

      <div style={{ lineHeight: 1.6 }}>
        {post.content.split('\n').map((paragraph: string, index: number) => {
          if (paragraph.trim() === '') return null;

          if (paragraph.startsWith('# ')) {
            return (
              <Title key={index} order={1} mt="xl" mb="md">
                {paragraph.slice(2)}
              </Title>
            );
          }
          if (paragraph.startsWith('## ')) {
            return (
              <Title key={index} order={2} mt="lg" mb="sm">
                {paragraph.slice(3)}
              </Title>
            );
          }
          if (paragraph.startsWith('### ')) {
            return (
              <Title key={index} order={3} mt="md" mb="xs">
                {paragraph.slice(4)}
              </Title>
            );
          }
          if (paragraph.startsWith('```')) {
            return null; // Handle code blocks separately if needed
          }
          if (paragraph.startsWith('- ')) {
            return (
              <Text key={index} component="li" ml="md">
                {paragraph.slice(2)}
              </Text>
            );
          }

          const parsedContent = parseMarkdownLinks(paragraph);

          return (
            <Text key={index} mb="sm">
              {parsedContent}
            </Text>
          );
        })}
      </div>
    </Container>
  );
}
