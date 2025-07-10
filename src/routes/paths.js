const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};

export const paths = {
  auth: {
    login: `/`,
  },

  dashboard: {
    root: ROOTS.DASHBOARD,

    todo: {
      root: `${ROOTS.DASHBOARD}/todo`,

      todoItem: `${ROOTS.DASHBOARD}/todo/todoItem`,
    },

    auth: {
      root: `${ROOTS.DASHBOARD}/auth`,

      user: `${ROOTS.DASHBOARD}/auth/user`,
    },
  },
};
