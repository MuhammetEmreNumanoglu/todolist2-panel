import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useAuthListUsers } from "src/actions/auth";

import { Iconify } from "src/components/iconify";

import { DashboardContent } from "../../../../layouts/dashboard/index.js";
import { useDataObjectContext } from "../../../../components/nav-section/data/context";
import {
  DataObjectApi,
  DataObjectList,
} from "../../../../components/data-object/index.js";

// ----------------------------------------------------------------------

const metadata = { title: `User data - Auth module - ${CONFIG.appName}` };

export default function AuthUserAppPage() {
  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } = useAuthListUsers();

  useEffect(() => {
    setField("name", "User");
    setField("selectedApi", null);
    setField("cruds", [
      {
        name: "RegisterUser",
        method: "CREATE",
        color: "success",
        componentName: "AuthRegisterUserApiPage",
      },

      {
        name: "UpdateUser",
        method: "UPDATE",
        color: "info",
        componentName: "AuthUpdateUserApiPage",
      },

      {
        name: "DeleteUser",
        method: "DELETE",
        color: "error",
        componentName: "AuthDeleteUserApiPage",
      },

      {
        name: "UpdateUserRole",
        method: "UPDATE",
        color: "info",
        componentName: "AuthUpdateUserRoleApiPage",
      },

      {
        name: "UpdatePassword",
        method: "UPDATE",
        color: "info",
        componentName: "AuthUpdatePasswordApiPage",
      },

      {
        name: "GetUser",
        method: "GET",
        color: "primary",
        componentName: "AuthGetUserApiPage",
      },

      {
        name: "ListUsers",
        method: "LIST",
        color: "primary",
        componentName: "AuthListUsersApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "email", headerName: "email", flex: 1 },

    { field: "password", headerName: "password", flex: 1 },

    { field: "fullname", headerName: "fullname", flex: 1 },

    { field: "avatar", headerName: "avatar", flex: 1 },

    {
      type: "boolean",
      field: "emailVerified",
      headerName: "emailVerified",
      width: 80,
      renderCell: (params) =>
        params.row.emailVerified ? (
          <Iconify
            icon="eva:checkmark-circle-2-fill"
            sx={{ color: "primary.main" }}
          />
        ) : (
          "-"
        ),
    },
    {
      type: "actions",
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => console.info("EDIT", params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => console.info("DELETE", params.row.id)}
          sx={{ color: "error.main" }}
        />,
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {state.display === "List" ? (
          <DataObjectList columns={columns} rows={options} />
        ) : (
          <DataObjectApi />
        )}
      </DashboardContent>
    </>
  );
}
