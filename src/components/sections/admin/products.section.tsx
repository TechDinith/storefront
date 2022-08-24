import { iProductsSection } from "./interface.admin.section";
import { useCallback, useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { dynamicCell } from "../../templates/admin/dynamicCells.template";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ProductUpdateModal from "../../templates/admin/productUpdate.template";
import AlertDialog from "../../templates/dialog/dialog.template";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NewProductModal from "../../templates/admin/newProduct.template";
import NotifyUse from "../../templates/notify/notify.template.use";
import { iMessage } from "../../templates/notify/notify.interfaces";
import {
  deleteProduct,
  getProductById,
  getProducts,
} from "../../../auth/firebase/firebase.products.functions";
import {
  deleteImageFromStorage,
  handleImageUrl,
} from "../../../auth/firebase/firebase.storage";

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
  dialogProps,
}: iProductsSection) {
  const [notify, setNotify] = useState<iMessage>();
  const [openModal, setOpenModal] = useState(false);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>();
  const [columns, setColumns] = useState<GridColDef[]>();

  const handleDelete = useCallback(
    (prodId: string) => {
      dialogProps?.setOpenDialog({ value: true, id: prodId });
    },
    [dialogProps]
  );

  useEffect(() => {
    getProducts().then((res) => {
      if (res.status === "success" && res.data.docs.length) {
        let rawRows: any[] = [];
        res.data.forEach((doc: any) =>
          rawRows.push({ ...doc.data(), id: doc.id })
        );

        let rows = rawRows.map((product: any) => {
          let productImages: any = product.image;
          let productColors: any = product.colors;

          if (product.image === null) {
            let imageUrls: any[] = [];

            productColors.map((color: any) =>
              handleImageUrl(color.image).then((url) => imageUrls.push(url))
            );

            productImages = imageUrls;

            productColors = productColors.map((color: any) => color.color);
          }

          if (product.image !== null) {
            let imgUrl: any[] = [];

            handleImageUrl(product.image).then((url) => imgUrl.push(url));

            productImages = imgUrl;
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
        const withoutId = rows && Object.keys(rows[0]);
        withoutId.shift();

        setColumns(
          withoutId.map((rowKey, i) => {
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
          }) as any
        );

        setProducts(rows);
      }
    });
  }, [notify, openModal, openNewModal, dialogProps.openDialog, handleDelete]);

  const handleCurrentProduct = (crruentProd: any) => {
    setCurrentProduct(crruentProd);
    setOpenModal(true);
  };

  const handleRemove = () => {
    getProductById(dialogProps.openDialog.id as string).then((prod: any) => {
      if (prod.data.data().image === null) {
        prod.data
          .data()
          .colors.map((prodImages: any) =>
            deleteImageFromStorage(prodImages.image)
          );
        deleteProduct(dialogProps.openDialog.id as string).then((res) =>
          setNotify(res)
        );
        dialogProps.setOpenDialog(false);
      } else {
        deleteImageFromStorage(prod.data.data().image);
        deleteProduct(dialogProps.openDialog.id as string).then((res) =>
          setNotify(res)
        );
        dialogProps.setOpenDialog(false);
      }
    });
  };

  const handleNewProduct = useCallback(() => {
    setOpenNewModal(true);
  }, []);

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
              onClick={handleNewProduct}
            >
              New Product
            </Button>
            {columns && products ? (
              <DataGrid
                rows={products!}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            ) : (
              <Typography variant="body1" color="orange" textAlign="center">
                No Products yet
              </Typography>
            )}
          </div>
        </div>
      </div>

      {openModal && (
        <ProductUpdateModal
          modalProps={{ openModal, setOpenModal }}
          product={currentProduct}
          setNotify={setNotify}
        />
      )}
      {openNewModal && (
        <NewProductModal
          setNotify={setNotify}
          modalProps={{ openNewModal, setOpenNewModal }}
        />
      )}

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
