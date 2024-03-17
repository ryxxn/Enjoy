import { Suspense, lazy, ElementType } from 'react';
// components
import { Splash as LoadingScreen } from '../pages/common/splash/Splash';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<></>}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/common/login')));
export const PendingPage = Loadable(
  lazy(() => import('../pages/common/pending'))
);
export const RejectPage = Loadable(
  lazy(() => import('../pages/common/reject'))
);

// Admin:
export const AdminMainPage = Loadable(
  lazy(() => import('../pages/admin/main'))
);
export const AdminUserPage = Loadable(
  lazy(() => import('../pages/admin/users'))
);
export const AdminStampPage = Loadable(
  lazy(() => import('../pages/admin/stamps'))
);
export const AdminStampAddPage = Loadable(
  lazy(() => import('../pages/admin/stamps/add'))
);
export const AdminStampDetailPage = Loadable(
  lazy(() => import('../pages/admin/stamps/detail'))
);
export const AdminNoticePage = Loadable(
  lazy(() => import('../pages/admin/notice'))
);
export const AdminNoticeAddPage = Loadable(
  lazy(() => import('../pages/admin/notice/add'))
);
export const AdminNoticeDetailPage = Loadable(
  lazy(() => import('../pages/admin/notice/detail'))
);
export const AdminMediaPage = Loadable(
  lazy(() => import('../pages/admin/media'))
);

// APP
export const ProfilePage = Loadable(
  lazy(() => import('../pages/user/profile'))
);
export const StampsPage = Loadable(lazy(() => import('../pages/user/stamps')));
export const NoticesPage = Loadable(
  lazy(() => import('../pages/user/notices'))
);
export const NoticeDetailPage = Loadable(
  lazy(() => import('../pages/user/notices/detail'))
);
export const MediaPage = Loadable(lazy(() => import('../pages/user/media')));

// export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
// export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
// export const Page404 = Loadable(lazy(() => import('../pages/Page404')));

// components
