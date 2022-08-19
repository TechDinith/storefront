import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import ImageUpload from "../imageUpload/imageupload.template";
import { Fragment, useEffect, useState } from "react";
import { iUpdateProduct } from "./admin.template.interface";
import CloseIcon from "@mui/icons-material/Close";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  getProductById,
  updateProduct,
} from "../../../auth/firebase/firebase.products.functions";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: { xs: "90%", sm: "70%", md: "40%" },
};

const math = Math;

const formSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required!"),
  price: Yup.number().required("Price is Required!"),
  desc: Yup.string().required("Description is Required!"),
  category: Yup.string().required("Category is Required!"),
});

export default function ProductUpdateModal({
  modalProps,
  product,
  setNotify,
}: iUpdateProduct) {
  const [colors, setColors] = useState(false);

  console.log(product);

  const fields = [
    {
      name: "Name",
      id: "name",
      defaultValue: product && product !== null ? product.name : "",
    },
    {
      name: "Price",
      id: "price",
      defaultValue: product && product !== null ? product.price : "",
    },
    {
      name: "Description",
      id: "desc",
      defaultValue: product && product !== null ? product.desc : "",
    },
  ];

  const [fileList, setFileList] = useState<any>([]);

  useEffect(() => {
    setTimeout(() => {
      if (product && product !== null) {
        getProductById(product.id).then((prod) => {
          const prodById = prod.data.data();
          console.log("pro", prodById);
          setFileList(
            prodById.isColor
              ? prodById.colors.map((pro: any, i: number) => ({
                  uid: pro.id,
                  name: pro.image,
                  url: product.image[i],
                  type: "image/jpeg",
                  status: "done",
                }))
              : [
                  {
                    uid: prodById.image.slice(0, -5),
                    name: prodById.image,
                    url: product.image[0],
                    type: "image/jpeg",
                    status: "done",
                  },
                ]
          );
        });
      }
    }, 10);

    setColors(product && product !== null ? product.isColor : false);
    if (product && product !== null) {
      reset({
        name: product.name,
        price: product.price,
        desc: product.desc,
      });
    }
  }, [product, modalProps]);

  const handleClose = () => modalProps.setOpenModal(false);

  const formOptions = { resolver: yupResolver(formSchema), defaultValues: {} };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm(formOptions);

  const onSubmit: SubmitHandler<any> = (data) => {
    const colorList = colors
      ? typeof data.colors === "object"
        ? data.colors
        : data.colors.split(",")
      : colors;
    console.log("col", colorList);
    const fileWithColorList = fileList.map((file: any, i: number) => ({
      ...file,
      color: colors ? colorList[i] : colorList,
    }));
    console.log("file", fileList);
    const OrganizedProduct = {
      image: !colors
        ? fileList[0].uid + "." + fileList[0].type.split("/")[1]
        : null,
      isColor: colors,
      name: data.name,
      desc: data.desc,
      price: String(data.price),
      colors:
        fileList.length < 2
          ? null
          : fileWithColorList.map((file: any) => ({
              id: file.uid,
              image: file.uid + "." + file.type.split("/")[1],
              color: file.color,
            })),
      category: data.category,
      enteredOn: new Date().toLocaleString(),
    };

    updateProduct(product.id, OrganizedProduct).then((res) => {
      if (res.status === "success") {
        setNotify({ message: "Product Updated!", severity: res.status });
      } else {
        setNotify({ message: res.data, severity: res.status });
      }
    });

    modalProps.setOpenModal(false);
  };

  return (
    <div>
      <Modal
        open={modalProps.openModal}
        onClose={handleClose}
        sx={{ overflow: "scroll" }}
      >
        <Box sx={style}>
          <Grid container justifyContent="center" color="white">
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                color="inherit"
                variant="h6"
                component="h2"
                textAlign="center"
              >
                New Product
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((fieldItems: any, i: number) => (
                  <Fragment key={i}>
                    <Controller
                      name={fieldItems.id}
                      control={control}
                      defaultValue={fieldItems.defaultValue}
                      render={({ field }) => (
                        <TextField
                          margin="normal"
                          fullWidth
                          label={fieldItems.name}
                          autoComplete={fieldItems.id}
                          autoFocus={i === 0}
                          variant="standard"
                          {...field}
                          error={Boolean(errors[fieldItems.id])}
                        />
                      )}
                    />

                    {errors[fieldItems.id] && (
                      <Typography color="red" variant="caption">
                        {errors[fieldItems.id]?.message as any}
                      </Typography>
                    )}
                  </Fragment>
                ))}
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        name="isColor"
                        onChange={(e) => setColors(e.target.checked)}
                        color="warning"
                        value={colors}
                        // defaultChecked={colors}
                        checked={colors}
                      />
                    }
                    label="Any Colors"
                  />
                </Box>
                <ImageUpload
                  colors={colors}
                  fileProps={{ fileList, setFileList }}
                />
                {colors && (
                  <Box my={1}>
                    <Controller
                      name="colors"
                      control={control}
                      defaultValue={
                        product !== null && product.isColor
                          ? product.colors
                          : ""
                      }
                      render={({ field }) => (
                        <TextField
                          helperText="Enter comma separated color names or #codes"
                          fullWidth
                          label="Colors"
                          {...field}
                        />
                      )}
                    />
                  </Box>
                )}
                <Box my={2}>
                  <Controller
                    name="category"
                    control={control}
                    defaultValue={
                      product && product !== null ? product.category : "men"
                    }
                    render={({ field }) => (
                      <TextField fullWidth select label="Category" {...field}>
                        <MenuItem value="men">Men</MenuItem>
                        <MenuItem value="women">Women</MenuItem>
                        <MenuItem value="accessories">Accessories</MenuItem>
                      </TextField>
                    )}
                  />
                </Box>

                <Box width="100%" display="flex" justifyContent="right">
                  <IconButton
                    sx={{ mt: 3 }}
                    color="error"
                    onClick={() => modalProps.setOpenModal(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                  <IconButton type="submit" sx={{ mt: 3 }} color="success">
                    <EventAvailableIcon />
                  </IconButton>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
