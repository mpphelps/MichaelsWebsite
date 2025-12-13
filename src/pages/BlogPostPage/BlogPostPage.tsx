import { Container, Title, Text, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPostContentFetcher } from '../../utilities/fetcher';
import useSWR from 'swr';
import type { BlogPostContent } from '../../types/blog';
import { BlogPostContentContainer } from '../../components/BlogPostContent/BlogPostContent';

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
