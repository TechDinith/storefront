import { Image } from "antd";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import DescriptionIcon from "@mui/icons-material/Description";
import CollectionsIcon from "@mui/icons-material/Collections";
import PaletteIcon from "@mui/icons-material/Palette";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { iDialog } from "../dialog/dialog.interface";

const dynamicCells = (row: any, labelId?: string) => {
  let elements: any[] = [];
  let uniqueKey = 0;
  for (let x in row) {
    if (x !== "id" && x !== "isColor") {
      elements = [
        ...elements,
        uniqueKey === 1 ? (
          <TableCell
            key={uniqueKey}
            component="th"
            id={labelId || row.id}
            scope="row"
            padding="none"
          >
            {row[x]}
          </TableCell>
        ) : x === "image" && typeof row[x] === "object" ? (
          <TableCell key={uniqueKey} align="center">
            <Tooltip
              title={
                <Image.PreviewGroup>
                  {row[x].map((image: string, i: number) => (
                    <Image
                      width="40%"
                      key={i}
                      src={require(`../../../images/${image}`)}
                    />
                  ))}
                </Image.PreviewGroup>
              }
            >
              <CollectionsIcon />
            </Tooltip>
          </TableCell>
        ) : x === "image" ? (
          <TableCell key={uniqueKey} align="center">
            <Image width="30%" src={require(`../../../images/${row[x]}`)} />
          </TableCell>
        ) : x === "colors" && typeof row[x] === "object" ? (
          <TableCell key={uniqueKey} align="center">
            <Tooltip
              title={
                <Box display="flex">
                  {row[x].map((color: string, i: number) => (
                    <CircleIcon key={i} sx={{ color: color }} />
                  ))}
                </Box>
              }
            >
              <PaletteIcon />
            </Tooltip>
          </TableCell>
        ) : x === "colors" ? (
          <TableCell key={uniqueKey} align="center">
            None
          </TableCell>
        ) : x === "desc" ? (
          <TableCell key={uniqueKey} align="left">
            <Tooltip title={row[x]}>
              <DescriptionIcon />
            </Tooltip>
          </TableCell>
        ) : (
          <TableCell key={uniqueKey} align="left">
            {row[x]}
          </TableCell>
        ),
      ];
    }
    uniqueKey++;
  }

  return elements;
};

const dynamicCell = (
  row: any,
  handleCurrentProduct: any,
  handleDelete: any
) => {
  let element: any;
  if (row.field !== "id" && row.field !== "isColor") {
    element =
      row.field === "enteredOn" ? (
        new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }).format(new Date(row.value))
      ) : row.field === "image" && typeof row.value === "object" ? (
        <Tooltip
          title={
            <Image.PreviewGroup>
              {row.value.map((image: string, i: number) => (
                <Image
                  width="40%"
                  key={i}
                  src={require(`../../../images/${image}`)}
                />
              ))}
            </Image.PreviewGroup>
          }
        >
          <CollectionsIcon />
        </Tooltip>
      ) : row.field === "image" ? (
        <Image width="30%" src={require(`../../../images/${row.value}`)} />
      ) : row.field === "colors" && typeof row.value === "object" ? (
        <Tooltip
          title={
            <Box display="flex">
              {row.value.map((color: string, i: number) => (
                <CircleIcon key={i} sx={{ color: color }} />
              ))}
            </Box>
          }
        >
          <PaletteIcon />
        </Tooltip>
      ) : row.field === "colors" ? (
        "None"
      ) : row.field === "desc" ? (
        <Tooltip title={row.value}>
          <DescriptionIcon />
        </Tooltip>
      ) : (
        row.value
      );
  } else if (row.field === "isColor") {
    element = (
      <Box display="flex">
        <IconButton
          color="secondary"
          onClick={() => handleCurrentProduct(row.row)}
        >
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => handleDelete(row.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  }

  return element;
};

const dynamicCellMembers = (row: any, handleDelete: any, admin?: string) => {
  let element: any;

  if (row.field === "id") {
    element = (
      <Box display="flex">
        <Tooltip title="Only Pedros-Admins can Delete Admins!">
          <IconButton
            color="error"
            disabled={admin === "admin" ? true : false || false}
            onClick={() => handleDelete(row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  } else element = row.value;

  return element;
};

export { dynamicCell, dynamicCellMembers };

export default dynamicCells;
