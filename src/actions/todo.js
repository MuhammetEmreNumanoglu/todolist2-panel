import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, todoEndpoints } from "src/lib/todo-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useTodoGetTodoItem(todoItemId) {
  let url = todoItemId ? [todoEndpoints.todoItem.getTodoItem] : "";

  url = url && url.map((u) => u.replace(":todoItemId", todoItemId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      todoitem: data?.todoItem,
      todoitemLoading: isLoading,
      todoitemError: error,
      todoitemValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useTodoListTodoItems() {
  const url = [todoEndpoints.todoItem.listTodoItems];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.todoitems || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.todoitems?.length,
    }),
    [data?.todoitems, error, isLoading, isValidating],
  );

  return memoizedValue;
}
