import { iAdminSection } from "../interface.admin.section";
import { useCallback, useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { dynamicCellMembers } from "../../../templates/admin/dynamicCells.template";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AlertDialog from "../../../templates/dialog/dialog.template";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NewAdminModal from "../newAdminModal.section";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import {
  deleteAdmins,
  getAdmins,
} from "../../../../auth/firebase/firebase.admin.functions";
import { iMessage } from "../../../templates/notify/notify.interfaces";
import NotifyUse from "../../../templates/notify/notify.template.use";
import Box from "@mui/material/Box";
import * as Yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton } from "@mui/material";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import {
  addAnnouncement,
  getAnnouncementById,
} from "../../../../auth/firebase/firebase.announcement.functions";
import { status } from "../../../../auth/auth.interface";

// Generate Order Data
function createData(
  id: string,
  assignedDate: Date,
  role: string,
  email: string
) {
  return {
    id,
    assignedDate: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(new Date(assignedDate)),
    role,
    email,
  };
}

export default function Admins({
  sectionName,
  dialogProps,
  authUser,
}: iAdminSection) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<any>();
  const [notify, setNotify] = useState<iMessage>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const formSchema = Yup.object().shape({
    announcement: Yup.string().required("Announcement is Required!"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm(formOptions);

  const onSubmit: SubmitHandler<any> = (data) => {
    setIsDisabled(true);
    addAnnouncement(data.announcement).then((res) => {
      if (res.status === status.success) {
        setNotify({
          message: "Announcement updated!",
          severity: res.status,
        });
      } else {
        setNotify({
          message: res.data,
          severity: res.status,
        });
        setIsDisabled(false);
      }
    });
    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
  };

  const handleRemove = useCallback(() => {
    deleteAdmins(dialogProps.openDialog.id as string).then((notification) =>
      setNotify(notification)
    );
    dialogProps.setOpenDialog({ value: false, id: "" });
  }, [dialogProps]);

  useEffect(() => {
    let adminData: any = [];
    getAdmins().then((admins: any) => {
      admins.forEach((doc: any) => {
        adminData.push({ ...doc.data(), id: doc.id });
      });

      setRows(
        adminData.map((admin: any) => {
          return createData(
            admin.id,
            admin.assignedDate,
            admin.role,
            admin.email
          );
        })
      );
      getAnnouncementById().then((announcement) => {
        if (announcement.status === status.success) {
          reset({
            announcement: announcement.data.data().announcement,
          });
        }
      });
    });
  }, [open, dialogProps.openDialog, handleRemove, notify]);

  const withoutId = rows && Object.keys(rows[0]);

  const columns: GridColDef[] =
    rows &&
    withoutId.map((rowKey: string, i: number) => {
      return {
        field: rowKey,
        flex: 1,
        minWidth: 120,
        headerName:
          rowKey === "id" ? "Delete" : (rowKey.toLocaleUpperCase() as any),
        renderCell: (params: GridRenderCellParams<any>) =>
          dynamicCellMembers(params, handleDelete, authUser.role, setNotify),
      };
    });

  const handleDelete = useCallback(
    (prodId: string) => {
      dialogProps?.setOpenDialog({ value: true, id: prodId });
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
            <Tooltip title="Only Pedros-Admins can Add new Admins!">
              <Box component="span">
                <Button
                  startIcon={<AddIcon />}
                  sx={{ mb: 1 }}
                  onClick={() => setOpen(true)}
                  disabled={authUser.role === "admin" ? true : false}
                >
                  New Admin
                </Button>
              </Box>
            </Tooltip>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="announcement"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Announcement"
                    autoFocus
                    variant="standard"
                    {...field}
                    error={Boolean(errors["announcement"])}
                  />
                )}
              />
              {errors["announcement"] && (
                <Typography color="red" variant="caption">
                  {errors["announcement"]?.message as any}
                </Typography>
              )}

              <Box width="100%" display="flex" justifyContent="right" mb={2}>
                <IconButton
                  disabled={authUser.role === "admin" ? true : isDisabled}
                  type="submit"
                  sx={{ mt: 3 }}
                  color="success"
                >
                  <NotificationAddIcon />
                </IconButton>
              </Box>
            </form>

            {rows ? (
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
                No admins yet
              </Typography>
            )}
          </div>
        </div>
      </div>

      <NewAdminModal setNotify={setNotify} open={open} setOpen={setOpen} />
      <AlertDialog
        attributes={{
          title: "Remove Admin?",
          content: "Are you sure, you want to Remove this admin?",
          yesBtn: "Yes",
          yesFunction: handleRemove,
          noBtn: "No",
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
