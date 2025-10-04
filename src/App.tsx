import { useMantineColorScheme } from '@mantine/core';
import { HeaderMenu } from './components/HeaderMenu/HeaderMenu';
import { SessionProvider } from './context/SessionContext/SessionContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProjectsPage from './pages/ProjectsPage';
import ResumePage from './pages/ResumePage';
import BlogPage from './pages/BlogPage';

function App() {
  const { setColorScheme } = useMantineColorScheme();
  setColorScheme('dark');

  return (
    <>
      <SessionProvider>
        <BrowserRouter>
          <HeaderMenu />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </>
  );
}

export default App;
