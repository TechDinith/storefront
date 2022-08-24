import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { EnhancedTableToolbarProps } from "../../sections/admin/interface.admin.section";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, sectionName, dialogProps } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected.length > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected.length} Delivered
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          textTransform="capitalize"
        >
          {sectionName}
        </Typography>
      )}
      {numSelected.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() =>
              dialogProps?.setOpenDialog({ value: true, id: numSelected[0] })
            }
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
