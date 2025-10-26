import { Container, Title, Text, Badge, Group, Button, Stack, Anchor, Code } from '@mantine/core';
import { IconCalendar, IconArrowLeft } from '@tabler/icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPostContentFetcher } from '../../utilities/fetcher';
import useSWR from 'swr';
import type { BlogPostContent } from '../../types/blog';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: post, error, isLoading } = useSWR<BlogPostContent>(slug, blogPostContentFetcher);

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

  if (isLoading) {
    return <>Loading</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  console.log('post', post);

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
            {post.read_time}
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
        {(() => {
          const lines = post.content.split('\n');
          const elements = [];
          let i = 0;
          let inCodeBlock = false;
          let codeBlockContent: string[] = [];

          while (i < lines.length) {
            const line = lines[i];

            // Handle code block start
            if (line.startsWith('```')) {
              if (!inCodeBlock) {
                // Starting a code block
                inCodeBlock = true;
                codeBlockContent = [];
              } else {
                // Ending a code block
                inCodeBlock = false;
                elements.push(
                  <Code key={i} block mt="md" mb="md">
                    {codeBlockContent.join('\n')}
                  </Code>
                );
                codeBlockContent = [];
              }
              i++;
              continue;
            }

            // If inside code block, collect lines
            if (inCodeBlock) {
              codeBlockContent.push(line);
              i++;
              continue;
            }

            // Skip empty lines
            if (line.trim() === '') {
              i++;
              continue;
            }

            // Handle headings
            if (line.startsWith('# ')) {
              elements.push(
                <Title key={i} order={1} mt="xl" mb="md">
                  {line.slice(2)}
                </Title>
              );
              i++;
              continue;
            }
            if (line.startsWith('## ')) {
              elements.push(
                <Title key={i} order={2} mt="lg" mb="sm">
                  {line.slice(3)}
                </Title>
              );
              i++;
              continue;
            }
            if (line.startsWith('### ')) {
              elements.push(
                <Title key={i} order={3} mt="md" mb="xs">
                  {line.slice(4)}
                </Title>
              );
              i++;
              continue;
            }

            // Handle list items
            if (line.startsWith('- ')) {
              elements.push(
                <Text key={i} component="li" ml="md">
                  {line.slice(2)}
                </Text>
              );
              i++;
              continue;
            }

            // Handle regular paragraphs with links
            const parsedContent = parseMarkdownLinks(line);
            elements.push(
              <Text key={i} mb="sm">
                {parsedContent}
              </Text>
            );
            i++;
          }

          return elements;
        })()}
      </div>
    </Container>
  );
}
