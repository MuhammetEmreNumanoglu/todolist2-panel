import { paths } from "src/routes/paths";

import { CONFIG } from "src/global-config";

import { SvgColor } from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  folder: icon("ic-folder"),
  dashboard: icon("ic-dashboard"),
};

// ----------------------------------------------------------------------

export const navData = [
  {
    items: [
      {
        title: "Admin Panel",
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
      },
    ],
  },
  {
    subheader: "Modules",
    items: [
      {
        title: "Todo Module",
        path: paths.dashboard.todo.root,
        icon: ICONS.folder,

        children: [
          {
            title: "TodoItem Data",
            path: paths.dashboard.todo.todoItem,
          },
        ],
      },

      {
        title: "Auth Module",
        path: paths.dashboard.auth.root,
        icon: ICONS.folder,

        children: [
          {
            title: "User Data",
            path: paths.dashboard.auth.user,
          },
        ],
      },
    ],
  },
];
