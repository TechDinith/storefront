import Grid from "@mui/material/Grid";
import men from "../../../images/simage1.jpg";
import women from "../../../images/simage4.jpg";
import accwide from "../../../images/accwide.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import ProDetails from "../../templates/product-details/product.details";
import { Fragment, useEffect, useState } from "react";
import { iCategories, iCategory } from "./category.interfaces";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Quote from "../../templates/quote/quote.section";

const Category = ({ countProps, notifyProps, products }: iCategories) => {
  const [categories, setCategories] = useState<iCategory[]>([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);

  const handleClickOpenSearchResult = () => {
    setOpenSearchResult(true);
  };

  const handleClickCloseSearchResult = () => {
    setOpenSearchResult(false);
  };

  const location: any = useLocation();
  const category = location.pathname.substring(1);

  useEffect(() => {
    if (products) setCategories(products);

    if (location.state)
      if (location.state.value.id) handleClickOpenSearchResult();
  }, [location.state]);

  return (
    <>
      <Quote
        bgImage={
          category === "men"
            ? men
            : category === "women"
            ? women
            : category === "accessories"
            ? accwide
            : null
        }
      />

      <Grid item xs={10} mt="5%" mb="1%">
        <Typography variant="h4" textAlign="center" color="white">
          <b>{category.toLocaleUpperCase()}</b>
        </Typography>
      </Grid>

      <Grid container spacing={2} m="auto" justifyContent="center">
        <Grid item xs={10} mt="1%" mb="1%">
          <Grid container spacing={2} direction="row">
            {categories.map((item, i) => (
              <Fragment key={i}>
                {location.state ? (
                  location.state.value.id === item.id ? (
                    <Dialog
                      open={openSearchResult}
                      onClose={handleClickCloseSearchResult}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogContent sx={{ backgroundColor: "transparent" }}>
                        <Box display="flex" justifyContent="center">
                          <Box width="90%">
                            <ProDetails
                              handleClickCloseSearchResult={
                                handleClickCloseSearchResult
                              }
                              notifyProps={notifyProps}
                              countProps={countProps}
                              preview={false}
                              cart={item}
                            />
                          </Box>
                        </Box>
                      </DialogContent>
                    </Dialog>
                  ) : null
                ) : null}
                {item.category === category ? (
                  <Grid item xs={10} sm={4}>
                    <ProDetails
                      notifyProps={notifyProps}
                      countProps={countProps}
                      preview={true}
                      cart={item}
                    />
                  </Grid>
                ) : null}
              </Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Category;
