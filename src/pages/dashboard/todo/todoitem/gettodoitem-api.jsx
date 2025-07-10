import { useState } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  Button,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { useTodoGetTodoItem } from "src/actions/todo";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function TodoGetTodoItemApiPage() {
  const [view, setView] = useState("Table");

  const [inputTodoItemId, setInputTodoItemId] = useState("");
  const [submittedTodoItemId, setSubmittedTodoItemId] = useState(null);

  const { todoitem, todoitemLoading, todoitemError } =
    useTodoGetTodoItem(submittedTodoItemId);

  const handleGetTodoitem = () => {
    setSubmittedTodoItemId(inputTodoItemId);
  };

  return (
    <>
      <Box marginY="2rem">
        <Typography variant="h4" marginBottom="1.5rem">
          GET
        </Typography>

        <Box component="div" gap="1rem" display="flex" key="0">
          <Box minWidth="35%">
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              label="todoItemId"
              value={inputTodoItemId}
              onChange={(e) => setInputTodoItemId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetTodoitem}
            disabled={!inputTodoItemId || todoitemLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!todoitemLoading && (todoitemError || todoitem) && (
        <Box paddingTop="2rem">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">
              STATUS:{" "}
              <Typography
                component="span"
                variant="subtitle1"
                color={todoitemError ? "error" : "success"}
                display="inline"
              >
                {todoitemError ? todoitemError.status : "200"}
              </Typography>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
              <ToggleButtonGroup
                color="standard"
                value={view}
                exclusive
                onChange={(_, val) => val && setView(val)}
              >
                <ToggleButton value="Table" sx={{ paddingX: "2rem" }}>
                  Table
                </ToggleButton>
                <ToggleButton value="JSON" sx={{ paddingX: "2rem" }}>
                  JSON
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
          <Box>
            {view === "Table" ? (
              <TableResponse content={todoitem} error={todoitemError} />
            ) : (
              <JsonResponse content={todoitem || todoitemError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
