import { QueryClient, QueryClientProvider } from 'react-query';

import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import theme from '../theme';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const customRender = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

const customHookRender = (ui, options) => {
  return renderHook(() => ui, { wrapper: AllTheProviders, ...options });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render, customHookRender as renderHook };
