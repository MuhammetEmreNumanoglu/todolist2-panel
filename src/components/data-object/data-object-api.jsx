import { lazy } from "react";

import { useDataObjectContext } from "../nav-section/data/context/index.js";

const TodoGetTodoItemApiPage = lazy(
  () => import("src/pages/dashboard/todo/todoitem/gettodoitem-api"),
);

const TodoCreateTodoItemApiPage = lazy(
  () => import("src/pages/dashboard/todo/todoitem/createtodoitem-api"),
);

const TodoUpdateTodoItemApiPage = lazy(
  () => import("src/pages/dashboard/todo/todoitem/updatetodoitem-api"),
);

const TodoDeleteTodoItemApiPage = lazy(
  () => import("src/pages/dashboard/todo/todoitem/deletetodoitem-api"),
);

const TodoListTodoItemsApiPage = lazy(
  () => import("src/pages/dashboard/todo/todoitem/listtodoitems-api"),
);

const AuthRegisterUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/registeruser-api"),
);

const AuthUpdateUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/updateuser-api"),
);

const AuthDeleteUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/deleteuser-api"),
);

const AuthUpdateUserRoleApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/updateuserrole-api"),
);

const AuthUpdatePasswordApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/updatepassword-api"),
);

const AuthGetUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/getuser-api"),
);

const AuthListUsersApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/listusers-api"),
);

const APIComponents = {
  TodoGetTodoItemApiPage: <TodoGetTodoItemApiPage />,

  TodoCreateTodoItemApiPage: <TodoCreateTodoItemApiPage />,

  TodoUpdateTodoItemApiPage: <TodoUpdateTodoItemApiPage />,

  TodoDeleteTodoItemApiPage: <TodoDeleteTodoItemApiPage />,

  TodoListTodoItemsApiPage: <TodoListTodoItemsApiPage />,

  AuthRegisterUserApiPage: <AuthRegisterUserApiPage />,

  AuthUpdateUserApiPage: <AuthUpdateUserApiPage />,

  AuthDeleteUserApiPage: <AuthDeleteUserApiPage />,

  AuthUpdateUserRoleApiPage: <AuthUpdateUserRoleApiPage />,

  AuthUpdatePasswordApiPage: <AuthUpdatePasswordApiPage />,

  AuthGetUserApiPage: <AuthGetUserApiPage />,

  AuthListUsersApiPage: <AuthListUsersApiPage />,
};
export function DataObjectApi() {
  const { state } = useDataObjectContext();

  if (!state.selectedApi) return <h2>{state.name} API</h2>;

  return <>{state.selectedApi && APIComponents[state.selectedApi]}</>;
}
