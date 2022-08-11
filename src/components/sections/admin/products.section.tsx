import { iProductsSection } from "./interface.admin.section";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { dynamicCell } from "../../templates/admin/dynamicCells.template";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ProductUpdateModal from "../../templates/admin/productUpdate.template";
import AlertDialog from "../../templates/dialog/dialog.template";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// Generate Order Data
function createData(
  id: string,
  image: string | null,
  isColor: boolean,
  name: string,
  price: string | undefined,
  desc: string,
  category: string,
  enteredOn: string,
  colors?: { [x: string]: any } | undefined
) {
  return {
    id,
    enteredOn,
    name,
    image,
    desc,
    category,
    price,
    colors,
    isColor,
  };
}

export default function Products({
  sectionName,
  products,
  dialogProps,
}: iProductsSection) {
  const [openModal, setOpenModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  let rows = products.map((product) => {
    let productImages: any = product.image;
    let productColors: any = product.colors;

    if (product.image === null) {
      productImages = productColors.map((color: any) => color.image);
      productColors = productColors.map((color: any) => color.color);
    }

    return createData(
      product.id,
      productImages,
      product.isColor,
      product.name,
      product.price,
      product.desc,
      product.category,
      product.enteredOn,
      productColors
    );
  });

  const withoutId = Object.keys(rows[0]);
  withoutId.shift();

  const columns: GridColDef[] = withoutId.map((rowKey, i) => {
    return {
      field: rowKey,
      flex: 1,
      minWidth: 120,
      headerName:
        rowKey === "isColor"
          ? "Edit / Delete"
          : (rowKey.toLocaleUpperCase() as any),
      renderCell: (params: GridRenderCellParams<any>) =>
        dynamicCell(params, handleCurrentProduct, handleDelete),
    };
  });

  const handleCurrentProduct = (crruentProd: any) => {
    setCurrentProduct(crruentProd);
    setOpenModal(true);
  };

  const handleDelete = (prodId: string) => {
    dialogProps?.setOpenDialog({ value: true, id: prodId });
  };

  const handleRemove = () => {
    const newProducts = products.filter(
      (product: any) => product.id !== dialogProps.openDialog.id
    );
    console.log(newProducts);
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
            <Button
              startIcon={<AddIcon />}
              sx={{ mb: 1 }}
              onClick={() => setOpenModal(true)}
            >
              New Product
            </Button>
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

      <ProductUpdateModal
        modalProps={{ openModal, setOpenModal }}
        product={currentProduct}
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
    </>
  );
}
