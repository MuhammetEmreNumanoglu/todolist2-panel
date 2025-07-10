import { Outlet } from "react-router";
import { lazy, Suspense } from "react";

import { CONFIG } from "src/global-config";
import { DashboardLayout, DataObjectLayout } from "src/layouts/dashboard";

import { LoadingScreen } from "src/components/loading-screen";

import { AuthGuard } from "src/auth/guard";

import { usePathname } from "../hooks";

const IndexPage = lazy(() => import("src/pages/dashboard"));

const TodoTodoItemAppPage = lazy(
  () => import("src/pages/dashboard/todo/todoitem"),
);

const AuthUserAppPage = lazy(() => import("src/pages/dashboard/auth/user"));

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: "dashboard",
    element: CONFIG.auth.skip ? (
      dashboardLayout()
    ) : (
      <AuthGuard>{dashboardLayout()}</AuthGuard>
    ),
    children: [
      { index: true, element: <IndexPage /> },

      {
        path: "todo",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <TodoTodoItemAppPage />,
          },

          {
            path: "todoItem",
            element: <TodoTodoItemAppPage />,
          },
        ],
      },

      {
        path: "auth",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <AuthUserAppPage />,
          },

          {
            path: "user",
            element: <AuthUserAppPage />,
          },
        ],
      },
    ],
  },
];
