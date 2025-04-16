import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './main/App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './main/theme';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
