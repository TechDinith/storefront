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
import { Fragment, useState } from "react";
import { iNewProduct } from "./admin.template.interface";
import CloseIcon from "@mui/icons-material/Close";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { addProduct } from "../../../auth/firebase/firebase.products.functions";

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

export default function NewProductModal({
  modalProps,
  setNotify,
}: iNewProduct) {
  const [colors, setColors] = useState(false);

  const fields = [
    {
      name: "Name",
      id: "name",
      defaultValue: "",
    },
    {
      name: "Price",
      id: "price",
      defaultValue: "",
    },
    {
      name: "Description",
      id: "desc",
      defaultValue: "",
    },
  ];

  const [fileList, setFileList] = useState<any>([]);
  const [urlList, setUrlList] = useState<any>([]);

  const handleClose = () => modalProps.setOpenNewModal(false);

  const formOptions = { resolver: yupResolver(formSchema), defaultValues: {} };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm(formOptions);

  const onSubmit: SubmitHandler<any> = (data) => {
    const colorList = colors ? data.colors.split(",") : colors;

    const fileWithColorList = fileList.map((file: any, i: number) => ({
      ...file,
      color: colors ? colorList[i] : colorList,
    }));

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
      urlList: urlList,
    };

    addProduct(OrganizedProduct).then((res) => {
      if (res.status === "success") {
        setNotify({ message: "Product Added!", severity: res.status });
      } else {
        setNotify({ message: res.data, severity: res.status });
      }
    });
    modalProps.setOpenNewModal(false);
  };

  return (
    <div>
      <Modal
        open={modalProps.openNewModal}
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
                        checked={colors}
                      />
                    }
                    label="Any Colors"
                  />
                </Box>
                <ImageUpload
                  colors={colors}
                  fileProps={{ fileList, setFileList }}
                  urlProps={{ urlList, setUrlList }}
                />
                {colors && (
                  <Box my={1}>
                    <Controller
                      name="colors"
                      control={control}
                      defaultValue=""
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
                    defaultValue="men"
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
                    onClick={() => modalProps.setOpenNewModal(false)}
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
