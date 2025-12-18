import { useMantineColorScheme } from '@mantine/core';
import { HeaderMenu } from './components/HeaderMenu/HeaderMenu';
import { SessionProvider } from './context/SessionContext/SessionContext';
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ResumePage from './pages/ResumePage/ResumePage';
import BlogListPage from './pages/BlogListPage/BlogListPage';
import BlogPostPage from './pages/BlogPostPage/BlogPostPage';
import ContactPage from './pages/ContactPage/ContactPage';
import MatrixCanvas from './BlogPosts/MatrixCanvas/MatrixCanvas';
import CreateBlogPost from './pages/CreateBlogPost/CreateBlogPost';
import EditBlogPostPage from './pages/EditBlogPostPage/EditBlogPostPage';
import { useEffect } from 'react';
import classes from './App.module.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
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
    </Route>
  )
);

function App() {
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setColorScheme('dark');
  }, [setColorScheme]);

  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

function AppLayout() {
  return (
    <>
      <HeaderMenu />
      <div className={classes.mainView}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
