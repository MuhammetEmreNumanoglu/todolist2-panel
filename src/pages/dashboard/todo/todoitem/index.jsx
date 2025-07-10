import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useTodoListTodoItems } from "src/actions/todo";

import { Iconify } from "src/components/iconify";

import { DashboardContent } from "../../../../layouts/dashboard/index.js";
import { useDataObjectContext } from "../../../../components/nav-section/data/context";
import {
  DataObjectApi,
  DataObjectList,
} from "../../../../components/data-object/index.js";

// ----------------------------------------------------------------------

const metadata = { title: `TodoItem data - Todo module - ${CONFIG.appName}` };

export default function TodoTodoItemAppPage() {
  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useTodoListTodoItems();

  useEffect(() => {
    setField("name", "TodoItem");
    setField("selectedApi", null);
    setField("cruds", [
      {
        name: "GetTodoItem",
        method: "GET",
        color: "primary",
        componentName: "TodoGetTodoItemApiPage",
      },

      {
        name: "CreateTodoItem",
        method: "CREATE",
        color: "success",
        componentName: "TodoCreateTodoItemApiPage",
      },

      {
        name: "UpdateTodoItem",
        method: "UPDATE",
        color: "info",
        componentName: "TodoUpdateTodoItemApiPage",
      },

      {
        name: "DeleteTodoItem",
        method: "DELETE",
        color: "error",
        componentName: "TodoDeleteTodoItemApiPage",
      },

      {
        name: "ListTodoItems",
        method: "LIST",
        color: "primary",
        componentName: "TodoListTodoItemsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "userId", headerName: "userId", flex: 1 },

    { field: "text", headerName: "text", flex: 1 },

    {
      type: "boolean",
      field: "completed",
      headerName: "completed",
      width: 80,
      renderCell: (params) =>
        params.row.completed ? (
          <Iconify
            icon="eva:checkmark-circle-2-fill"
            sx={{ color: "primary.main" }}
          />
        ) : (
          "-"
        ),
    },

    { field: "completedAt", headerName: "completedAt", flex: 1 },

    { field: "createdBy", headerName: "createdBy", flex: 1 },

    { field: "updatedBy", headerName: "updatedBy", flex: 1 },
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
