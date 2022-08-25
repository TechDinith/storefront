import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";
import { useCallback, useEffect, useState } from "react";
import { EnhancedTableHead } from "../../templates/admin/enchancedTabledHead.template";
import { EnhancedTableToolbar } from "../../templates/admin/enchancedTableToolbar.template";
import { iOrder, Order } from "../../sections/admin/interface.admin.section";
import { iDataTable } from "./admin.template.interface";
import dynamicCells from "./dynamicCells.template";
import AlertDialog from "../dialog/dialog.template";
import NotifyUse from "../notify/notify.template.use";
import {
  deleteOrder,
  getOrders,
  updateOrder,
} from "../../../auth/firebase/firebase.orders.functions";
import { iMessage } from "../notify/notify.interfaces";
import { status } from "../../../auth/auth.interface";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function DataTable({
  rows,
  sectionName,
  dialogProps,
  setOrderList,
}: iDataTable) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof iOrder>(
    "deliveredDate" || "enteredOn"
  );
  const [selected, setSelected] = useState<readonly string[]>(
    rows.filter((row) => row.deliveredDate && row.id).map((item) => item.id)
  );
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [notify, setNotify] = useState<iMessage>();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof iOrder
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: { id: string }) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleRemove = useCallback(() => {
    selected.map((orderId) => {
      deleteOrder(orderId as string)
        .then((notification) => setNotify(notification))
        .then(() => {
          getOrders().then((res) => {
            if (res.status === status.success) {
              let rows: any[] = [];
              res.data.forEach((order: any) => {
                const organizedOrder = {
                  id: order.id,
                  orderedDate: order.data().orderedOn,
                  deliveredDate: order.data().deliveredDate
                    ? order.data().deliveredDate
                    : null,
                  name:
                    order.data().deliveryDetails.firstname +
                    " " +
                    order.data().deliveryDetails.lastname,
                  shipTo:
                    order.data().deliveryDetails.address +
                    ", " +
                    order.data().deliveryDetails.area +
                    ", " +
                    order.data().deliveryDetails.city +
                    ", " +
                    order.data().deliveryDetails.country +
                    " ," +
                    order.data().deliveryDetails.zip,
                  contacts:
                    order.data().deliveryDetails.email +
                    ", " +
                    order.data().deliveryDetails.phone,
                  products: order
                    .data()
                    .products.map((product: any) =>
                      product.color === "transparent"
                        ? product.name
                        : product.name + "-" + product.colors
                    ),
                  paymentMethod: "Cashon delevery!",
                  image: order
                    .data()
                    .products.map((product: any) => product.urlList),
                  totalAmount: order.data().total,
                };

                rows.push(organizedOrder);
              });
              if (rows) setOrderList(rows);
            }
          });
        });
      return false;
    });

    dialogProps.setOpenDialog({ value: false, id: "" });
  }, [dialogProps, selected]);

  const handleDeliveredDate = (orderId: string, value: boolean) => {
    if (value) {
      updateOrder(orderId, {
        deliveredDate: new Date().toLocaleString(),
      }).then((res) => {
        if (res.status === status.success) {
          getOrders().then((res) => {
            if (res.status === status.success) {
              let rows: any[] = [];
              res.data.forEach((order: any) => {
                const organizedOrder = {
                  id: order.id,
                  orderedDate: order.data().orderedOn,
                  deliveredDate: order.data().deliveredDate
                    ? order.data().deliveredDate
                    : null,
                  name:
                    order.data().deliveryDetails.firstname +
                    " " +
                    order.data().deliveryDetails.lastname,
                  shipTo:
                    order.data().deliveryDetails.address +
                    ", " +
                    order.data().deliveryDetails.area +
                    ", " +
                    order.data().deliveryDetails.city +
                    ", " +
                    order.data().deliveryDetails.country +
                    " ," +
                    order.data().deliveryDetails.zip,
                  contacts:
                    order.data().deliveryDetails.email +
                    ", " +
                    order.data().deliveryDetails.phone,
                  products: order
                    .data()
                    .products.map((product: any) =>
                      product.color === "transparent"
                        ? product.name
                        : product.name + "-" + product.colors
                    ),
                  paymentMethod: "Cashon delevery!",
                  image: order
                    .data()
                    .products.map((product: any) => product.urlList),
                  totalAmount: order.data().total,
                };

                rows.push(organizedOrder);
              });
              if (rows) setOrderList(rows);
            }
          });
        }
      });
    } else {
      updateOrder(orderId, {
        deliveredDate: null,
      }).then((res) => {
        if (res.status === status.success) {
          getOrders().then((res) => {
            if (res.status === status.success) {
              let rows: any[] = [];
              res.data.forEach((order: any) => {
                const organizedOrder = {
                  id: order.id,
                  orderedDate: order.data().orderedOn,
                  deliveredDate: order.data().deliveredDate
                    ? order.data().deliveredDate
                    : null,
                  name:
                    order.data().deliveryDetails.firstname +
                    " " +
                    order.data().deliveryDetails.lastname,
                  shipTo:
                    order.data().deliveryDetails.address +
                    ", " +
                    order.data().deliveryDetails.area +
                    ", " +
                    order.data().deliveryDetails.city +
                    ", " +
                    order.data().deliveryDetails.country +
                    " ," +
                    order.data().deliveryDetails.zip,
                  contacts:
                    order.data().deliveryDetails.email +
                    ", " +
                    order.data().deliveryDetails.phone,
                  products: order
                    .data()
                    .products.map((product: any) =>
                      product.color === "transparent"
                        ? product.name
                        : product.name + "-" + product.colors
                    ),
                  paymentMethod: "Cashon delevery!",
                  image: order
                    .data()
                    .products.map((product: any) => product.urlList),
                  totalAmount: order.data().total,
                };

                rows.push(organizedOrder);
              });
              if (rows) setOrderList(rows);
            }
          });
        }
      });
    }
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          sectionName={sectionName}
          numSelected={selected}
          dialogProps={dialogProps}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              rows={rows}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isDelivered = isSelected(row.id as string);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id as string)}
                      role="checkbox"
                      aria-checked={isDelivered}
                      tabIndex={-1}
                      key={row.id}
                      selected={isDelivered}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="success"
                          icon={<InventoryOutlinedIcon />}
                          checkedIcon={<InventoryTwoToneIcon />}
                          checked={isDelivered}
                          onChange={(e) =>
                            handleDeliveredDate(
                              row.id as string,
                              e.target.checked
                            )
                          }
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      {dynamicCells(row, labelId).map((item: any) => item)}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Small"
      />
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
    </Box>
  );
}
