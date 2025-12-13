import { useMantineColorScheme } from '@mantine/core';
import { HeaderMenu } from './components/HeaderMenu/HeaderMenu';
import { SessionProvider } from './context/SessionContext/SessionContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ResumePage from './pages/ResumePage/ResumePage';
import BlogListPage from './pages/BlogListPage/BlogListPage';
import BlogPostPage from './pages/BlogPostPage/BlogPostPage';
import ContactPage from './pages/ContactPage/ContactPage';
import MatrixCanvas from './BlogPosts/MatrixCanvas/MatrixCanvas';
import classes from './App.module.css';
import CreateBlogPost from './pages/CreateBlogPost/CreateBlogPost';
import EditBlogPostPage from './pages/EditBlogPostPage/EditBlogPostPage';

function App() {
  const { setColorScheme } = useMantineColorScheme();

  setColorScheme('dark');

  return (
    <SessionProvider>
      <BrowserRouter>
        <HeaderMenu />
        <div className={classes.mainView}>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/new" element={<CreateBlogPost />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/blog/:slug/edit" element={<EditBlogPostPage />} />
            <Route path="/matrix" element={<MatrixCanvas />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SessionProvider>
  );
}

export default App;
