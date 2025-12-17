import { Title, Text, Badge, Group, Button, Stack, Anchor, Image } from '@mantine/core';
import { IconCalendar, IconArrowLeft } from '@tabler/icons-react';
import type { BlogPostContent } from '../../types/blog';
import { CodeHighlight, CodeHighlightAdapterProvider, createShikiAdapter } from '@mantine/code-highlight';
import { useNavigate } from 'react-router-dom';

let cachedHighlighter: unknown = null; // Cache for the highlighter instance

const supportedLanguages = ['javascript', 'jsx', 'typescript', 'tsx', 'css', 'scss', 'html', 'bash', 'json', 'csharp', 'c++', 'plaintext'];

async function loadShiki() {
  if (cachedHighlighter) {
    return cachedHighlighter; // Return the cached instance if it exists
  }

  const { createHighlighter } = await import('shiki');
  cachedHighlighter = await createHighlighter({
    langs: [...supportedLanguages],
    themes: [],
  });

  return cachedHighlighter;
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
    <>
      <Stack gap="md" mb="xl" align="flex-start">
        <Button leftSection={<IconArrowLeft size={16} />} variant="subtle" onClick={() => navigate('/blog')}>
          Back to Blog
        </Button>

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
              const validLanguage = supportedLanguages.includes(codeBlockLanguage) ? codeBlockLanguage : 'plaintext'; // Fallback to plaintext if language is invalid

              elements.push(
                <>
                  <CodeHighlightAdapterProvider key={i} adapter={shikiAdapter}>
                    <div>{validLanguage}</div>
                    <CodeHighlight language={validLanguage} code={validLanguage + '\n' + codeBlockContent.join('\n')} radius="md" />
                  </CodeHighlightAdapterProvider>
                </>
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
    </>
  );
};
