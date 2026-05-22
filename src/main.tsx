import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import './styles/theme.css';

import { createTheme, MantineProvider, type MantineColorsTuple } from '@mantine/core';

const mint: MantineColorsTuple = ['#e8fdf6', '#d3f6ea', '#a6ecd5', '#76e1be', '#52d8ad', '#3dd4a3', '#2fd29c', '#1eb988', '#0ba578', '#008f66'];

const theme = createTheme({
  fontFamily: "'IBM Plex Sans', system-ui, -apple-system, sans-serif",
  fontFamilyMonospace: "'JetBrains Mono', ui-monospace, monospace",
  headings: {
    fontFamily: "'Chakra Petch', system-ui, sans-serif",
    fontWeight: '600',
  },
  colors: { mint },
  primaryColor: 'mint',
  primaryShade: { light: 6, dark: 4 },
  defaultRadius: 'sm',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>
);
