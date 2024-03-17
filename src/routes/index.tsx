import { Navigate, useRoutes } from 'react-router-dom';
// auth
// import AuthGuard from '../auth/AuthGuard';
// layouts
// import AdminLayout from '../layouts/admin/main';
//
import {
  // Auth
  LoginPage,
  RejectPage,
  PendingPage,
  // Admin
  AdminMainPage,
  AdminUserPage,
  AdminStampPage,
  AdminStampAddPage,
  AdminStampDetailPage,
  AdminNoticePage,
  AdminNoticeAddPage,
  AdminNoticeDetailPage,
  AdminMediaPage,
  // APP
  ProfilePage,
  StampsPage,
  NoticeDetailPage,
  MediaPage,
  NoticesPage,
} from './elements';
import AdminLayout from 'src/layouts/admin';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: '',
      children: [
        {
          path: 'login',
          element: <LoginPage />,
        },
        { path: 'pending', element: <PendingPage /> },
        { path: 'rejected', element: <RejectPage /> },
      ],
    },
    // Admin
    {
      path: 'admin',
      element: <AdminLayout />,
      children: [
        // { element: <Navigate to={PATH.LOGIN} replace />, index: true },
        { element: <AdminMainPage />, index: true },
        { path: 'main', element: <AdminMainPage /> },
        { path: 'users', element: <AdminUserPage /> },
        { path: 'stamps', element: <AdminStampPage /> },
        { path: 'stamps/add', element: <AdminStampAddPage /> },
        { path: 'stamps/:id', element: <AdminStampDetailPage /> },
        { path: 'notice', element: <AdminNoticePage /> },
        { path: 'notice/add', element: <AdminNoticeAddPage /> },
        { path: 'notice/:id', element: <AdminNoticeDetailPage /> },
        { path: 'media', element: <AdminMediaPage /> },
      ],
    },
    // App
    {
      // element: <MainLayout />,
      path: '',
      children: [
        { element: <ProfilePage />, index: true },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'stamps', element: <StampsPage /> },
        { path: 'notice', element: <NoticesPage /> },
        { path: 'notice/:id', element: <NoticeDetailPage /> },
        { path: 'media', element: <MediaPage /> },
      ],
    },
    { path: '*', element: <Navigate to='/' replace /> },
  ]);
}
