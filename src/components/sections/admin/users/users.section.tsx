import { iUser, iUserSection } from "../interface.admin.section";
import { useCallback, useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { dynamicCellMembers } from "../../../templates/admin/dynamicCells.template";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AlertDialog from "../../../templates/dialog/dialog.template";
import { iMessage } from "../../../templates/notify/notify.interfaces";
import {
  deleteAUser,
  getUsers,
} from "../../../../auth/firebase/firebase.users.functions";
import NotifyUse from "../../../templates/notify/notify.template.use";

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

export default function Users({ sectionName, dialogProps }: iUserSection) {
  const [rows, setRows] = useState<any>();
  const [notify, setNotify] = useState<iMessage>();

  const handleRemove = useCallback(() => {
    deleteAUser(dialogProps.openDialog.id as string).then((notification) =>
      setNotify(notification)
    );
    dialogProps.setOpenDialog({ value: false, id: "" });
  }, [dialogProps]);

  useEffect(() => {
    let userData: any[] = [];
    getUsers().then((users: any) => {
      users.forEach((doc: any) => {
        userData.push({ ...doc.data(), id: doc.id });
      });

      setRows(
        userData &&
          userData.map((user: iUser) => {
            return createData(user.id, user.joinedDate, user.name, user.email);
          })
      );
    });
  }, [dialogProps, handleRemove]);

  const withoutId = rows && rows.length > 0 && Object.keys(rows[0]);

  const columns: GridColDef[] =
    rows &&
    rows.length > 0 &&
    withoutId.map((rowKey: string, i: number) => {
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

  const handleDelete = useCallback(
    (userId: string) => {
      dialogProps?.setOpenDialog({ value: true, id: userId });
    },
    [dialogProps]
  );

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
            {rows && rows.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            ) : (
              <Typography variant="body1" color="orange" textAlign="center">
                No Users yet
              </Typography>
            )}
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
      <NotifyUse messageProps={notify} />
    </>
  );
}
