import { paths } from "src/routes/paths";

export const CONFIG = {
  appName: "TodoList – Personal To-Do Page",
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? "",

  todoServiceUrl: import.meta.env.VITE_TODO_SERVICE_URL ?? "",

  authServiceUrl: import.meta.env.VITE_AUTH_SERVICE_URL ?? "",

  auth: {
    skip: false,
    redirectPath: paths.dashboard.root,
  },
};
