import { Image } from "antd";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import DescriptionIcon from "@mui/icons-material/Description";
import CollectionsIcon from "@mui/icons-material/Collections";
import PaletteIcon from "@mui/icons-material/Palette";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";

const dynamicCells = (row: any, labelId: string) => {
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
            id={labelId}
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

export default dynamicCells;
