import { Container, Title, Text, Badge, Group, Button, Stack, Anchor, Image } from '@mantine/core';
import { IconCalendar, IconArrowLeft } from '@tabler/icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPostContentFetcher } from '../../utilities/fetcher';
import useSWR from 'swr';
import type { BlogPostContent } from '../../types/blog';
import { CodeHighlight, CodeHighlightAdapterProvider, createShikiAdapter } from '@mantine/code-highlight';

async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['javascript', 'jsx', 'typescript', 'tsx', 'css', 'scss', 'html', 'bash', 'json', 'csharp', 'c++'],
    themes: [],
  });
  return shiki;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: post, error, isLoading } = useSWR<BlogPostContent>(slug, blogPostContentFetcher);

  if (isLoading) {
    return <>Loading</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

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

  return <BlogPostContentContainer post={post} />;
}

export const BlogPostContentContainer: React.FC<{ post: BlogPostContent }> = ({ post }) => {
  const shikiAdapter = createShikiAdapter(loadShiki);
  const navigate = useNavigate();

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

  return (
    <Container size="md" py="xl" px={{ base: 'md', sm: 'lg' }} style={{ maxWidth: '100%', overflowX: 'hidden' }}>
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
            {`${post.read_time} min read`}
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

      <div style={{ lineHeight: 1.6, maxWidth: '100%', overflowWrap: 'break-word', wordWrap: 'break-word' }}>
        {(() => {
          const lines = post.content.split('\n');
          const elements = [];
          let i = 0;
          let inCodeBlock = false;
          let codeBlockContent: string[] = [];
          let codeBlockLanguage = '';

          while (i < lines.length) {
            const line = lines[i];

            // Handle code block start
            if (line.startsWith('```')) {
              if (!inCodeBlock) {
                // Starting a code block
                inCodeBlock = true;
                codeBlockContent = [];
                codeBlockLanguage = line.slice(3).trim();
              } else {
                // Ending a code block
                inCodeBlock = false;
                //elements.push(<CodeHighlight key={i} language="tsx" code={codeBlockContent.join('\n')} radius="md" />);
                elements.push(
                  <CodeHighlightAdapterProvider key={i} adapter={shikiAdapter}>
                    <CodeHighlight language={codeBlockLanguage} code={codeBlockContent.join('\n')} radius="md" />
                  </CodeHighlightAdapterProvider>
                );
                codeBlockContent = [];
                codeBlockLanguage = '';
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

            // Handle images
            if (line.startsWith('![')) {
              const altTextMatch = line.match(/!\[([^\]]*)\]/);
              const urlMatch = line.match(/\(([^)]+)\)/);
              const altText = altTextMatch ? altTextMatch[1] : '';
              const url = urlMatch ? urlMatch[1] : '';
              elements.push(<Image key={i} src={url} alt={altText} style={{ maxWidth: '100%', margin: '16px 0' }} />);
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
};
