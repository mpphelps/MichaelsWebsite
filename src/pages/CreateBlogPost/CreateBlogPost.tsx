import { useEffect, useState } from 'react';
import { Container, TextInput, Textarea, Button, Group, Title, Stack, Divider, NumberInput, Card, Text } from '@mantine/core';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { ImageUpload } from '../../components/ImageUpload/ImageUpload';
import { BlogPostContentContainer } from '../../components/BlogPostContent/BlogPostContent';

interface BlogPostData {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  read_time?: number;
  tags?: string[];
  content?: string;
}

interface ImageInfo {
  image: File;
  tempUrl: string;
}

export const CreateBlogPost = ({ initialData }: { initialData?: BlogPostData | null }) => {
  const [title, setTitle] = useState<string>(initialData?.title || '');
  const [slug, setSlug] = useState<string>(initialData?.slug || '');
  const [excerpt, setExcerpt] = useState<string>(initialData?.excerpt || '');
  const [readTime, setReadTime] = useState<number>(initialData?.read_time || 0);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [content, setContent] = useState<string>(initialData?.content || '');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [pendingImages, setPendingImages] = useState<ImageInfo[]>([]);
  const navigate = useNavigate();

  // Update state when initialData changes (e.g., when loaded asynchronously)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSlug(initialData.slug || '');
      setExcerpt(initialData.excerpt || '');
      setReadTime(initialData.read_time || 0);
      setTags(initialData.tags || []);
      setContent(initialData.content || '');
    }
  }, [initialData]);

  const handleDrop = (files: File[]) => {
    const file = files[0];
    const tempUrl = URL.createObjectURL(file);
    setPendingImages((prev) => [...prev, { image: file, tempUrl }]);
    setContent((prevContent) => prevContent + `\n\n![${file.name}](${tempUrl})\n\n`);
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const folderName = slug;
      const uploadedImageUrls: string[] = [];

      // If editing and the slug has changed, move existing images
      if (initialData && initialData.slug !== slug) {
        const { data: images, error: listError } = await supabase.storage.from('blog-images').list(initialData.slug);

        if (listError) {
          console.error('Error listing images in old folder:', listError);
          alert('Failed to list images in the old folder.');
          return;
        }

        if (images && images.length > 0) {
          for (const image of images) {
            const oldPath = `${initialData.slug}/${image.name}`;
            const newPath = `${slug}/${image.name}`;

            const { error: moveError } = await supabase.storage.from('blog-images').move(oldPath, newPath);

            if (moveError) {
              console.error(`Error moving image ${image.name}:`, moveError);
              alert(`Failed to move image ${image.name}.`);
              return;
            }

            // Update content to reflect the new image path
            setContent((prevContent) => prevContent.replace(`/${initialData.slug}/${image.name}`, `/${slug}/${image.name}`));
          }
        }
      }

      // Upload pending images
      for (const { image } of pendingImages) {
        const { data, error } = await supabase.storage.from('blog-images').upload(`${folderName}/${image.name}`, image);
        if (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image.');
          return;
        }
        const imageUrl = supabase.storage.from('blog-images').getPublicUrl(data.path).data.publicUrl;
        uploadedImageUrls.push(imageUrl);
      }

      // Replace placeholders in content with uploaded image URLs
      let updatedContent = content;
      pendingImages.forEach(({ image, tempUrl }, index) => {
        updatedContent = updatedContent.replace(`![${image.name}](${tempUrl})`, `![${image.name}](${uploadedImageUrls[index]})`);
      });

      if (initialData) {
        // Update existing blog post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title,
            slug,
            excerpt,
            read_time: readTime.toString(),
            tags,
            content: updatedContent,
            updated_at: new Date().toISOString(),
          })
          .eq('id', initialData.id);

        if (error) {
          console.error('Error updating blog post:', error);
          alert('Failed to update blog post.');
          return;
        }

        alert('Blog post updated successfully!');
      } else {
        // Create new blog post
        const { error } = await supabase.from('blog_posts').insert([
          {
            slug,
            title,
            excerpt,
            date: new Date().toISOString(),
            read_time: readTime.toString(),
            tags,
            content: updatedContent,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            published: true,
          },
        ]);

        if (error) {
          console.error('Error creating blog post:', error);
          alert('Failed to create blog post.');
          return;
        }

        alert('Blog post created successfully!');
      }

      navigate('/blog');
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
      setPendingImages([]);
    }
  };

  const handleSetTags = (value: string) => {
    const tagsArray = value.split(',').map((tag) => tag.trim());
    setTags(tagsArray);
  };

  const handleSetReadTime = (value: number | string | null | undefined) => {
    const parsed = typeof value === 'number' ? value : value ? Number(value) : undefined;
    setReadTime(parsed ?? 0);
  };

  function handleDeleteImage(image: File, tempUrl: string) {
    setPendingImages((prev) => prev.filter((img) => img.image !== image));

    setContent(
      (prevContent) => prevContent.replace(`![${image.name}](${tempUrl})`, '') // Remove the Markdown placeholder
    );
    console.log('Revoking URL:', tempUrl);

    URL.revokeObjectURL(tempUrl);
  }

  return (
    <Container size="md" py="xl" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <Stack gap="lg">
        <Title>{initialData ? 'Edit Blog Post' : 'Create a New Blog Post'}</Title>
        <Divider />

        <TextInput label="Title" placeholder="Enter the blog post title" value={title} onChange={(event) => setTitle(event.currentTarget.value)} required />
        <TextInput label="Slug" placeholder="Enter the blog post slug" value={slug} onChange={(event) => setSlug(event.currentTarget.value)} required />
        <TextInput label="Excerpt" placeholder="Enter a short excerpt" value={excerpt} onChange={(event) => setExcerpt(event.currentTarget.value)} required />
        <NumberInput label="Read Time (min)" placeholder="Enter the read time (e.g., 5 min)" value={readTime} onChange={(value) => handleSetReadTime(value)} required />
        <TextInput label="Tags" placeholder="Enter tags separated by commas" value={tags.join(', ')} onChange={(event) => handleSetTags(event.currentTarget.value)} required />
        <Textarea
          label="Content"
          placeholder="Write your blog post content here..."
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
          required
          styles={{
            input: {
              height: '300px', // Set a fixed height
            },
          }}
        />
        <ImageUpload onDrop={handleDrop} />
        {pendingImages.length > 0 && (
          <Stack>
            <Title order={4}>Uploaded Images</Title>
            {pendingImages.map(({ image, tempUrl }, index) => (
              <Group key={index} align="center">
                <Card withBorder padding="xs" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                  <Text>{image.name}</Text>
                  <Button
                    color="red"
                    onClick={() => {
                      handleDeleteImage(image, tempUrl);
                    }}
                    size="xs"
                    style={{
                      marginLeft: 'auto',
                      padding: '2px 8px',
                      fontSize: '12px',
                      minWidth: 'unset',
                      height: '24px',
                      lineHeight: 1,
                    }}
                  >
                    X
                  </Button>
                </Card>
              </Group>
            ))}
          </Stack>
        )}

        <Title order={3}>Preview</Title>
        <Divider />
        <BlogPostContentContainer
          post={{
            id: initialData?.id || '1',
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
            {initialData ? 'Update' : 'Publish'}
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default CreateBlogPost;
