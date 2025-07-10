import { useState } from "react";
import { useBoolean } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import {
  Link,
  Table,
  Paper,
  Dialog,
  TableRow,
  TableBody,
  TableCell,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
} from "@mui/material";
import {
  DataGrid,
  gridClasses,
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import { EmptyContent } from "src/components/empty-content";

import { Iconify } from "../iconify/index.js";
import { TableHeadCustom } from "../table/index.js";
import { useDataObjectContext } from "../nav-section/data/context/index.js";

const ADD_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

export function DataObjectList({ columns, rows }) {
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const { state } = useDataObjectContext();
  const theme = useTheme();
  const openAddDialog = useBoolean();

  const getTogglableColumns = () => columns.map((column) => column.field);

  return (
    <>
      <h2>{state.name} List</h2>

      <Divider />

      <DataGrid
        checkboxSelection
        disableRowSelectionOnClick
        columns={columns}
        rows={rows == null ? [] : rows}
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectedRows(newSelectionModel);
        }}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[5, 10, 20, 50, { value: -1, label: "All" }]}
        slots={{
          toolbar: CustomToolbar,
          noRowsOverlay: () => <EmptyContent />,
          noResultsOverlay: () => <EmptyContent title="No results found" />,
        }}
        slotProps={{
          panel: { anchorEl: filterButtonEl },
          toolbar: {
            setFilterButtonEl,
            showQuickFilter: true,
            dataObject: state.name,
            onAddClickHandler: openAddDialog.onTrue,
          },
          columnsManagement: { getTogglableColumns },
        }}
        sx={{
          [`& .${gridClasses.cell}`]: {
            alignItems: "center",
            display: "inline-flex",
          },
        }}
      />

      <Dialog open={openAddDialog.value} maxWidth="md">
        <DialogTitle>Add {state.name}</DialogTitle>

        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }}>
              <TableHeadCustom headCells={ADD_TABLE_HEAD} />

              <TableBody>
                {columns
                  .filter((column) => column.field !== "actions")
                  .map((column) => (
                    <TableRow key={column.field}>
                      <TableCell
                        sx={{ backgroundColor: theme.palette.grey[100] }}
                      >
                        {column.field}
                      </TableCell>
                      <TableCell>
                        <input type="text" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions className="gap-2">
          <Link
            component="button"
            underline="always"
            onClick={openAddDialog.onFalse}
          >
            Cancel
          </Link>
          <Button
            onClick={openAddDialog.onFalse}
            startIcon={<Iconify icon="material-symbols:save-outline" />}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function CustomToolbar({ setFilterButtonEl, dataObject, onAddClickHandler }) {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton ref={setFilterButtonEl} />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Button
        onClick={onAddClickHandler}
        startIcon={<Iconify icon="material-symbols:add" />}
      >
        Add {dataObject}
      </Button>
      <Button color="warning" startIcon={<Iconify icon="mdi:pencil" />}>
        Update
      </Button>
      <Button color="error" startIcon={<Iconify icon="icomoon-free:bin" />}>
        Delete
      </Button>
    </GridToolbarContainer>
  );
}
