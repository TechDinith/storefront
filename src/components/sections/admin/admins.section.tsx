import { iAdminSection } from "./interface.admin.section";
import { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { dynamicCellMembers } from "../../templates/admin/dynamicCells.template";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AlertDialog from "../../templates/dialog/dialog.template";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NewAdminModal from "./newAdminModal.section";
import { Tooltip } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getAdmins } from "../../../auth/firebase/firebase.admin.functions";

// Generate Order Data
function createData(
  id: string,
  assignedDate: string,
  role: string,
  email: string
) {
  return {
    id,
    assignedDate,
    role,
    email,
  };
}

export default function Admins({
  sectionName,
  admins,
  dialogProps,
}: iAdminSection) {
  const [open, setOpen] = useState(false);
  const { state }: any = useLocation();
  const [rows, setRows] = useState<any>();

  useEffect(() => {
    getAdmins().then((admins: any) => {
      let adminData: any = [];
      admins.forEach((doc: any) => {
        adminData.push({ ...doc.data(), id: doc.id });
      });
      console.log(adminData);
    });
  }, []);

  setRows(
    admins.map((admin) => {
      return createData(admin.id, admin.assignedDate, admin.role, admin.email);
    })
  );

  const withoutId = Object.keys(rows && rows[0]);

  const columns: GridColDef[] = withoutId.map((rowKey, i) => {
    return {
      field: rowKey,
      flex: 1,
      minWidth: 120,
      headerName:
        rowKey === "id" ? "Delete" : (rowKey.toLocaleUpperCase() as any),
      renderCell: (params: GridRenderCellParams<any>) =>
        dynamicCellMembers(params, handleDelete, state.role),
    };
  });

  const handleDelete = (prodId: string) => {
    dialogProps?.setOpenDialog({ value: true, id: prodId });
  };

  const handleRemove = () => {
    const newAdmins = admins.filter(
      (admin: any) => admin.id !== dialogProps.openDialog.id
    );
    console.log(newAdmins);
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
            <Tooltip title="Only Pedros-Admins can Add new Admins!">
              <Button
                startIcon={<AddIcon />}
                sx={{ mb: 1 }}
                onClick={() => setOpen(true)}
                disabled={state.role === "admin" ? true : false}
              >
                New Admin
              </Button>
            </Tooltip>

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

      <NewAdminModal open={open} setOpen={setOpen} />
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
