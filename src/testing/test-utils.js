import { QueryClient, QueryClientProvider } from 'react-query';

import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import theme from '../theme';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </MuiPickersUtilsProvider>
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
