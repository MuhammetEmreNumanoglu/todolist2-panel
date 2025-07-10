import axios from "axios";

import { CONFIG } from "src/global-config";

const todoAxiosInstance = axios.create({ baseURL: CONFIG.todoServiceUrl });

todoAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default todoAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await todoAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const todoEndpoints = {
  todoItem: {
    getTodoItem: "/todoitems/:todoItemId",
    createTodoItem: "/todoitems",
    updateTodoItem: "/todoitems/:todoItemId",
    deleteTodoItem: "/todoitems/:todoItemId",
    listTodoItems: "/todoitems",
  },
};
