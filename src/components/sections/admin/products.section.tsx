import { iProductsSection } from "./interface.admin.section";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { dynamicCell } from "../../templates/admin/dynamicCells.template";
import { useLocation } from "react-router-dom";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ProductUpdateModal from "../../templates/admin/productUpdate.template";

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

export default function Products({ sectionName, products }: iProductsSection) {
  const rows = products.map((product) => {
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
  // withoutId.pop();

  const columns: GridColDef[] = withoutId.map((rowKey, i) => {
    return {
      field: rowKey,
      flex: 1,
      minWidth: 120,
      headerName:
        rowKey === "isColor" ? (
          <Typography color="orange">Edit</Typography>
        ) : (
          (rowKey.toLocaleUpperCase() as any)
        ),
      renderCell: (params: GridRenderCellParams<any>) =>
        dynamicCell(params, handleCurrentProduct),
    };
  });

  const [adminProducts, setAdminProducts] = useState<any>();
  const { pathname }: any = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>();

  // useEffect(() => {
  //   if (products) {
  //     setAdminProducts(
  //       products.map((product) => {
  //         let productImages: any = product.image;
  //         let productColors: any = product.colors;
  //         if (product.image === null) {
  //           productImages = productColors.map((color: any) => color.image);
  //           productColors = productColors.map((color: any) => color.color);
  //         }
  //         return createData(
  //           product.id,
  //           productImages,
  //           product.isColor,
  //           product.name,
  //           product.price,
  //           product.desc,
  //           product.category,
  //           product.enteredOn,
  //           productColors
  //         );
  //       })
  //     );
  //   }
  // }, [products]);

  const handleCurrentProduct = (crruentProd: any) => {
    setCurrentProduct(crruentProd);
    setOpenModal(true);
  };

  //category must be a select
  //delete icon should be added

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

      {currentProduct && (
        <ProductUpdateModal
          modalProps={{ openModal, setOpenModal }}
          product={currentProduct}
        />
      )}
    </>
  );
}
