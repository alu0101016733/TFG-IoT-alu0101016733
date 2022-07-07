import { FC, useEffect, useMemo, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useTheme } from "../../ThemeProvider";

type columOptionsType = "id" | "name" | "description" | "base" | "number";
type possibleOperation = "delete" | "modify" | "add";

type CrudComponentsProps = {
  data?: any[];
  columns?: {
    field: string;
    type: columOptionsType;
    headerName?: string;
    editable?: boolean;
    width?: number;
  }[];
  operations?: possibleOperation[];
  cbFunction?: (data: {}) => void;
};

export const CrudComponents: FC<CrudComponentsProps> = ({
  data = [],
  columns = [
    { field: "id", type: "id" },
    { field: "name", type: "name" },
    { field: "description", type: "description" },
  ],
  operations = ["delete", "modify"],
  cbFunction = (data: {}) => {
    console.log("Crud: ", data);
  },
  ...props
}) => {
  console.log("crud Components");
  const [saveWasClicked, setSaveWasClicked] = useState(["init"] as any[]);

  const saveCurrentValue = (params: any) => {
    if (saveWasClicked?.[0] === "click") {
      console.log("Updating to: ", params.row);
      setSaveWasClicked(() => ["done"]);
      cbFunction(params);
    }
  };

  const columOptions = useMemo(
    () => ({
      id: { field: "id", headerName: "ID", width: 70 },
      name: { field: "name", headerName: "Name", width: 160, editable: true },
      number: {
        field: "number",
        headerName: "Number",
        width: 70,
        editable: true,
      },
      description: {
        field: "description",
        headerName: "Description",
        width: 300,
        editable: true,
      },
      delete: {
        field: "delete",
        headerName: "Delete",
        width: 80,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params: any) => {
          const cellOnlick = (e: any) => {
            e.stopPropagation();
            if (params.id) {
              cbFunction(params);
            }
          };
          return (
            <Button onClick={cellOnlick} variant="contained" color="error">
              Delete
            </Button>
          );
        },
      },
      add: {
        field: "add",
        headerName: "Add",
        width: 105,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params: any) => {
          const cellOnlick = (e: any) => {
            e.stopPropagation();
            if (params.id) {
              cbFunction(params);
            }
          };
          return (
            <Button onClick={cellOnlick} variant="contained" color="info">
              See & Add
            </Button>
          );
        },
      },
      modify: {
        field: "modify",
        headerName: "Save",
        width: 80,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params: any) => {
          if (
            saveWasClicked?.[0] === "click" &&
            saveWasClicked?.[1].id === params.id
          ) {
            saveCurrentValue(params);
          }
          const cellOnlick = (e: any) => {
            if (params.id) {
              console.log("saved data set");
              setSaveWasClicked(() => ["click", params]);
            }
          };
          return (
            <Button onClick={cellOnlick} variant="contained">
              Save
            </Button>
          );
        },
      },
      base: { field: "field", headerName: "field" },
    }),
    [saveWasClicked]
  );

  const rows = useMemo(() => {
    let rows: any = [];
    for (let i = 0; i < data.length; i++) {
      let currentRow: any = {};
      for (let j = 0; j < columns.length; j++) {
        currentRow[columns[j].field] = data[i][columns[j].field];
      }
      rows.push(currentRow);
    }
    return rows;
  }, [data]);

  // existing columns
  const columConfig = useMemo(() => {
    let col: any = [];
    for (let j = 0; j < columns.length; j++) {
      col.push({ ...columOptions[columns[j].type], ...columns[j] });
    }
    operations.includes("modify") && col.push(columOptions.modify);
    operations.includes("delete") && col.push(columOptions.delete);
    operations.includes("add") && col.push(columOptions.add);
    return col;
  }, [saveWasClicked]);

  const { theme } = useTheme();

  return (
    <div style={{ height: 600, width: "100%", color: theme.color }}>
      <DataGrid
        sx={{ color: theme.color }}
        rows={rows}
        columns={columConfig}
        //pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
        //checkboxSelection
      />
    </div>
  );
};

export default CrudComponents;
