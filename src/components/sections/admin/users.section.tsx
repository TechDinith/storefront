import { iUserSection } from "./interface.admin.section";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { dynamicCellMembers } from "../../templates/admin/dynamicCells.template";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AlertDialog from "../../templates/dialog/dialog.template";

// Generate Order Data
function createData(
  id: string,
  joinedDate: string,
  name: string,
  email: string
) {
  return {
    id,
    joinedDate,
    name,
    email,
  };
}

export default function Users({
  sectionName,
  users,
  dialogProps,
}: iUserSection) {
  let rows = users.map((user) => {
    return createData(user.id, user.joinedDate, user.name, user.email);
  });

  const withoutId = Object.keys(rows[0]);

  const columns: GridColDef[] = withoutId.map((rowKey, i) => {
    return {
      field: rowKey,
      flex: 1,
      minWidth: 120,
      headerName:
        rowKey === "id" ? "Delete" : (rowKey.toLocaleUpperCase() as any),
      renderCell: (params: GridRenderCellParams<any>) =>
        dynamicCellMembers(params, handleDelete),
    };
  });

  const handleDelete = (prodId: string) => {
    dialogProps?.setOpenDialog({ value: true, id: prodId });
  };

  const handleRemove = () => {
    const newUser = users.filter(
      (user: any) => user.id !== dialogProps.openDialog.id
    );
    console.log(newUser);
  };

  return (
    <>
      <Toolbar>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          textTransform="capitalize"
        >
          {sectionName}
        </Typography>
      </Toolbar>
      <div style={{ height: 400, width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              autoHeight
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </div>
        </div>
      </div>

      <AlertDialog
        attributes={{
          title: "Lorem ipsum?",
          content:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, incidunt minus. Molestiae error soluta culpa autem saepe aliquam dolor eius, quibusdam, ipsam corporis quis enim alias eligendi optio. Suscipit, at?",
          yesBtn: "Lorem ipsum",
          yesFunction: handleRemove,
          noBtn: "dolor sit",
        }}
        openDialog={
          dialogProps?.openDialog ? dialogProps?.openDialog : { value: false }
        }
        setOpenDialog={dialogProps?.setOpenDialog}
      />
    </>
  );
}
