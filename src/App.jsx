import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import GlobalStyles from '../src/styles/GlobalStyles';
import Account from '../src/pages/Account';
import Bookings from '../src/pages/Bookings';
import DashBoard from '../src/pages/Dashboard';
import Booking from '../src/pages/Booking';
import Cabins from '../src/pages/Cabins';
import Login from '../src/pages/Login';
import Settings from '../src/pages/Settings';
import Users from '../src/pages/Users';
import PageNotFound from '../src/pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import Checkin from './pages/Checkin';
import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      // staleTime: 60 * 1000,
    },
  },
});
function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              color: 'var(--color-grey-700)',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="account" element={<Account />} />
              <Route path="users" element={<Users />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
