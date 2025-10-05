import type { BlogPost, BlogPostContent } from '../types/blog';

// Blog posts for the listing page
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable React Applications with TypeScript',
    excerpt: 'Learn how to structure large React applications using TypeScript, best practices for component architecture, and state management patterns.',
    date: '2024-10-01',
    readTime: '8 min read',
    tags: ['React', 'TypeScript', 'Architecture'],
    slug: 'building-scalable-react-applications',
  },
  {
    id: '2',
    title: 'Kubernetes in Production: Lessons Learned',
    excerpt: 'Real-world experiences deploying and managing Kubernetes clusters in production environments, including common pitfalls and solutions.',
    date: '2024-09-15',
    readTime: '12 min read',
    tags: ['Kubernetes', 'DevOps', 'Production'],
    slug: 'kubernetes-in-production-lessons-learned',
  },
  {
    id: '3',
    title: 'AI-Powered Development: Integrating OpenAI APIs',
    excerpt: 'A comprehensive guide to integrating OpenAI APIs into your applications, with practical examples and best practices.',
    date: '2024-08-20',
    readTime: '10 min read',
    tags: ['AI', 'OpenAI', 'APIs'],
    slug: 'ai-powered-development-openai-apis',
  },
  {
    id: '4',
    title: 'Matrix Rain Effect with HTML5 Canvas',
    excerpt: 'Create a mesmerizing matrix rain effect using HTML5 Canvas and JavaScript.',
    date: '2025-10-04',
    readTime: '5 min read',
    tags: ['HTML5', 'Canvas', 'JavaScript'],
    slug: 'matrix-rain-effect-html5-canvas',
  },
];

// Full blog post content
export const blogPostContent: Record<string, BlogPostContent> = {
  'building-scalable-react-applications': {
    title: 'Building Scalable React Applications with TypeScript',
    date: '2024-10-01',
    readTime: '8 min read',
    tags: ['React', 'TypeScript', 'Architecture'],
    content: `
# Building Scalable React Applications with TypeScript

When building large-scale React applications, proper architecture and TypeScript integration become crucial for maintainability and developer productivity.

## Component Architecture

The foundation of a scalable React application lies in its component architecture. Here are key principles:

### 1. Component Composition
- Keep components small and focused
- Use composition over inheritance
- Create reusable building blocks

### 2. TypeScript Integration
- Define clear interfaces for props
- Use strict TypeScript configuration
- Leverage type inference where possible

## State Management

For complex applications, consider these state management patterns:

- **Local State**: Use useState for component-specific state
- **Context API**: For shared state across component trees
- **External Libraries**: Redux Toolkit or Zustand for complex global state

## Best Practices

1. **Folder Structure**: Organize by feature, not by file type
2. **Error Boundaries**: Implement proper error handling
3. **Testing**: Write comprehensive tests for critical paths
4. **Performance**: Use React.memo and useMemo strategically

Building scalable applications is an iterative process that requires careful planning and continuous refactoring.
    `,
  },
  'kubernetes-in-production-lessons-learned': {
    title: 'Kubernetes in Production: Lessons Learned',
    date: '2024-09-15',
    readTime: '12 min read',
    tags: ['Kubernetes', 'DevOps', 'Production'],
    content: `
# Kubernetes in Production: Lessons Learned

After managing Kubernetes clusters in production for several years, here are the key lessons I've learned.

## Resource Management

Proper resource allocation is critical:

- **Requests vs Limits**: Always set resource requests
- **Horizontal Pod Autoscaling**: Configure HPA for variable workloads
- **Cluster Autoscaling**: Scale nodes based on demand

## Monitoring and Observability

Essential monitoring components:

- **Prometheus**: For metrics collection
- **Grafana**: For visualization
- **Jaeger**: For distributed tracing
- **ELK Stack**: For log aggregation

## Security Best Practices

1. **Network Policies**: Implement proper network segmentation
2. **RBAC**: Use role-based access control
3. **Pod Security Standards**: Enforce security constraints
4. **Image Scanning**: Scan container images for vulnerabilities

Production Kubernetes requires careful planning, monitoring, and continuous improvement.
    `,
  },
  'ai-powered-development-openai-apis': {
    title: 'AI-Powered Development: Integrating OpenAI APIs',
    date: '2024-08-20',
    readTime: '10 min read',
    tags: ['AI', 'OpenAI', 'APIs'],
    content: `
# AI-Powered Development: Integrating OpenAI APIs

Integrating AI capabilities into your applications can dramatically enhance user experience and functionality.

## Getting Started with OpenAI APIs

### API Setup
1. Create an OpenAI account
2. Generate API keys
3. Install the OpenAI SDK

### Basic Integration

\`\`\`typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  messages: [{ role: "user", content: "Hello, world!" }],
  model: "gpt-3.5-turbo",
});
\`\`\`

## Use Cases

### 1. Content Generation
- Blog post writing
- Code documentation
- Marketing copy

### 2. Data Analysis
- Text summarization
- Sentiment analysis
- Data insights

### 3. Interactive Features
- Chatbots
- Code assistance
- Creative writing tools

## Best Practices

- **Rate Limiting**: Implement proper rate limiting
- **Error Handling**: Handle API failures gracefully
- **Cost Management**: Monitor usage and costs
- **Prompt Engineering**: Craft effective prompts

AI integration opens up endless possibilities for enhancing your applications.
    `,
  },
  'matrix-rain-effect-html5-canvas': {
    title: 'Matrix Rain Effect with HTML5 Canvas',
    date: '2025-10-04',
    readTime: '5 min read',
    tags: ['HTML5', 'Canvas', 'JavaScript'],
    content: `
# Matrix Rain Effect with HTML5 Canvas

Creating a Matrix-style digital rain effect is a great way to learn about HTML5 Canvas and animation techniques.

**[🎮 View Live Demo](/matrix)** - See the effect in action!

## Setting Up the Canvas

First, let's create a full-screen canvas:

\`\`\`typescript
const canvas = canvasRef.current;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
\`\`\`

## Character Selection

Use a mix of Japanese characters and alphanumeric characters for authenticity:

\`\`\`typescript
const characters = 'アァカサタナハマヤラワガザダバパ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
\`\`\`

## Animation Loop

Create columns of falling characters with different speeds and opacities:

- **Multiple font sizes** for depth perception
- **Random starting positions** to avoid synchronized waves
- **Glow effects** using shadowBlur for that authentic matrix look

## Performance Tips

- Use \`requestAnimationFrame\` for smooth animation
- Throttle frame rate for performance
- Clear background with semi-transparent overlay for fade trails

The key to a convincing matrix effect is layering multiple streams with different characteristics.

**[🎮 Try the Live Demo](/matrix)** to see all these techniques in action!
    `,
  },
};