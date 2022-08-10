import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import ImageUpload from "../imageUpload/imageupload.template";
import { Fragment, useEffect, useState } from "react";
import { iUpdateProduct } from "./admin.template.interface";
import CloseIcon from "@mui/icons-material/Close";

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

export default function ProductUpdateModal({
  modalProps,
  product,
}: iUpdateProduct) {
  const [colors, setColors] = useState(false);
  const [fields, setFields] = useState<any>([]);
  const handleClose = () => modalProps.setOpenModal(false);

  console.log("prod", product);

  const [fileList, setFileList] = useState<any>(
    product.isColor
      ? product.colors.map((pro: any, i: number) => ({
          uid: math.random(),
          name: product.image[i],
          url: require(`../../../images/${product.image[i]}`),
          status: "done",
        }))
      : [
          {
            uid: product.id,
            name: product.image,
            url: require(`../../../images/${product.image}`),
            status: "done",
          },
        ]
  );

  useEffect(() => {
    setFields([
      {
        name: "Name",
        id: "name",
        defaultValue: product ? product.name : "",
      },
      {
        name: "Price",
        id: "price",
        defaultValue: product ? product.price : "",
      },
      {
        name: "Description",
        id: "desc",
        defaultValue: product ? product.desc : "",
      },
    ]);

    setColors(product ? product.isColor : false);
  }, [product]);

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required!"),
    price: Yup.number().required("Price is Required!"),
    desc: Yup.string().required("Description is Required!"),
    category: Yup.string().required("Category is Required!"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm(formOptions);

  const onSubmit: SubmitHandler<any> = (data) => {
    const colorList =
      typeof colors === "string"
        ? data.colors.split(",")
        : colors
        ? data.colors
        : null;

    const fileWithColorList = fileList.map((file: any, i: number) => ({
      ...file,
      color: colors ? colorList[i] : colorList,
    }));

    const OrganizedProduct = {
      image: !colors ? fileList[0].name : null,
      isColor: colors,
      name: data.name,
      desc: data.desc,
      price: String(data.price),
      colors:
        fileList.length < 2
          ? null
          : fileWithColorList.map((file: any) => ({
              id: file.uid,
              image: file.name,
              color: file.color,
            })),
      category: data.category,
      enteredOn: new Date(),
    };
    console.log("organized prod", OrganizedProduct);
    // navigate("/admin/dashboard", {
    //   state: { id: params.id, email: data.email },
    // });
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
            <Grid item xs={12} sm={8}>
              <Typography
                color="inherit"
                variant="h6"
                component="h2"
                textAlign="center"
              >
                New Product
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                      defaultValue={product.isColor ? product.colors : ""}
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
                    defaultValue={product ? product.category : "men"}
                    render={({ field }) => (
                      <TextField fullWidth select label="Category" {...field}>
                        <MenuItem value="men">Men</MenuItem>
                        <MenuItem value="women">Women</MenuItem>
                        <MenuItem value="acc">Accessories</MenuItem>
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
