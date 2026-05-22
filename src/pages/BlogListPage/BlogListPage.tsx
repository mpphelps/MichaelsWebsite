import { Container, Text, Group, Badge, Stack, Button, ActionIcon } from '@mantine/core';
import { IconCalendar, IconEye, IconTrash, IconEdit, IconArrowRight, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { blogPostsFetcher } from '../../utilities/fetcher';
import useSWR from 'swr';
import type { BlogPost } from '../../types/blog';
import { useSessionContext } from '../../context/SessionContext/useSessionContext';
import { supabase } from '../../lib/supabase';
import { HoloPanel } from '../../components/HoloPanel/HoloPanel';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import classes from './BlogListPage.module.css';

export default function BlogListPage() {
  const navigate = useNavigate();
  const { userRoleLoading, userRole } = useSessionContext();

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const { error: deletePostError } = await supabase.from('blog_posts').delete().eq('slug', slug);

      if (deletePostError) {
        console.error('Error deleting blog post:', deletePostError);
        alert('Failed to delete the blog post.');
        return;
      }

      const { data: images, error: listError } = await supabase.storage.from('blog-images').list(slug);

      if (listError) {
        console.error('Error listing blog images:', listError);
        alert('Failed to list blog images.');
        return;
      }

      if (images && images.length > 0) {
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
    return (
      <Container size="md" py="xl">
        <div className={classes.loading}>
          <span className={classes.loadingDot} />
          DECODING TRANSMISSION…
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="md" py="xl">
        <div className={classes.error}>// ERROR: {error.message}</div>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <div className={classes.headRow}>
          <SectionHeading index={`// ${String(data?.length ?? 0).padStart(3, '0')}`} label="archive" title="Blog Log" />
          {!userRoleLoading && userRole === 'admin' && (
            <Button variant="default" leftSection={<IconPlus size={16} />} onClick={() => navigate('/blog/new')}>
              New Entry
            </Button>
          )}
        </div>

        {!data || data.length === 0 ? (
          <HoloPanel label="empty" variant="subtle">
            <Text c="dimmed">No transmissions logged yet.</Text>
          </HoloPanel>
        ) : (
          <Stack gap="md">
            {data.map((post, idx) => (
              <HoloPanel key={post.id} label={`entry · ${String(idx + 1).padStart(3, '0')}`} status="online">
                <div className={classes.postRow} onClick={() => handlePostClick(post.slug)}>
                  <div className={classes.postBody}>
                    <Group justify="space-between" align="flex-start" wrap="nowrap">
                      <Text className={classes.postTitle}>{post.title}</Text>
                      <Group gap={6} wrap="nowrap" className={classes.postMeta}>
                        <IconCalendar size={14} stroke={1.5} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </Group>
                    </Group>

                    <Text className={classes.postExcerpt}>{post.excerpt}</Text>

                    <Group justify="space-between" align="center" mt="md">
                      <Group gap="xs" wrap="wrap">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" color="mint" size="sm" className={classes.tag}>
                            {tag}
                          </Badge>
                        ))}
                      </Group>

                      <Group gap="md" wrap="nowrap">
                        <Group gap={6} className={classes.postMeta}>
                          <IconEye size={14} stroke={1.5} />
                          <span>{`${post.read_time} min`}</span>
                        </Group>

                        {!userRoleLoading && userRole === 'admin' && (
                          <Group gap={4}>
                            <ActionIcon
                              size="sm"
                              variant="subtle"
                              color="gray"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/blog/${post.slug}/edit`);
                              }}
                              aria-label="Edit"
                            >
                              <IconEdit size={14} />
                            </ActionIcon>
                            <ActionIcon
                              size="sm"
                              variant="subtle"
                              color="red"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(post.slug);
                              }}
                              aria-label="Delete"
                            >
                              <IconTrash size={14} />
                            </ActionIcon>
                          </Group>
                        )}

                        <Button
                          variant="subtle"
                          color="mint"
                          size="xs"
                          rightSection={<IconArrowRight size={14} />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePostClick(post.slug);
                          }}
                        >
                          OPEN
                        </Button>
                      </Group>
                    </Group>
                  </div>
                </div>
              </HoloPanel>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
