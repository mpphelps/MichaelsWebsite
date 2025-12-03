import { useState } from 'react';
import { Container, TextInput, Textarea, Button, Group, Title, Stack, Divider, NumberInput, Text, Card } from '@mantine/core';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { BlogPostContentContainer } from '../BlogPostPage/BlogPostPage';
import { ImageUpload } from '../../components/ImageUpload/ImageUpload';

export const CreateBlogPost = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [readTime, setReadTime] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const navigate = useNavigate();

  const [pendingImages, setPendingImages] = useState<File[]>([]);

  const handleDrop = (files: File[]) => {
    const file = files[0];
    const tempUrl = URL.createObjectURL(file);
    setPendingImages((prev) => [...prev, ...files]);
    setContent((prevContent) => prevContent + `\n\n![${file.name}](${tempUrl})\n\n`);
  };

  const handleDeleteImage = async (imageUrl: string) => {
    const imagePath = decodeURIComponent(imageUrl.split('/blog-images/')[1]);
    const { error } = await supabase.storage.from('blog-images').remove([imagePath]);
    if (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image.');
      return;
    }
    setUploadedImages((prevImages) => prevImages.filter((img) => img !== imageUrl));
    setContent((prevContent) => prevContent.replace(`![${imagePath}](${imageUrl})`, ''));
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
      for (const file of pendingImages) {
        const { data, error } = await supabase.storage.from('blog-images').upload(`${folderName}/${file.name}`, file);
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
      pendingImages.forEach((file, index) => {
        const tempUrl = URL.createObjectURL(file);
        updatedContent = updatedContent.replace(`![${file.name}](${tempUrl})`, `![${file.name}](${uploadedImageUrls[index]})`);
      });

      const { error } = await supabase.from('blog_posts').insert([
        {
          slug,
          title,
          excerpt,
          date: new Date().toISOString(),
          read_time: readTime.toString(),
          tags,
          content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published: true,
        },
      ]);

      if (error) {
        console.error('Error creating blog post:', error);
        alert('Failed to create blog post.');
      } else {
        alert('Blog post created successfully!');
        navigate('/blog');
      }
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
    // Normalize possible number/string/null/undefined from NumberInput to a number or undefined
    const parsed = typeof value === 'number' ? value : value ? Number(value) : undefined;
    setReadTime(parsed ?? 0);
  };

  return (
    <Container size="md" py="xl" style={{ maxWidth: '50%', overflowX: 'hidden' }}>
      <Stack gap="lg">
        <Title>Create a New Blog Post</Title>
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
        {/* Need to display uploaded images here with a X button to delete them */}
        {uploadedImages.length > 0 && (
          <Stack>
            <Title order={4}>Uploaded Images</Title>
            {uploadedImages.map((image, index) => (
              <Group key={index} align="center">
                <Card withBorder padding="sm" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                  <Text>{decodeURIComponent(image.split('/blog-images/')[1])}</Text>
                  <Button
                    color="red"
                    onClick={() => {
                      handleDeleteImage(image);
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
            id: '1',
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
            Publish
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default CreateBlogPost;
