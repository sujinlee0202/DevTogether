import { RouterProvider } from 'react-router-dom';
import { routers } from './router';
import LoginProvider from './context/loginContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <RouterProvider router={routers} />
      </LoginProvider>
    </QueryClientProvider>
  );
}

export default App;
