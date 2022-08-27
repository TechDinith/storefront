import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { iQuote } from "./quote.interface";

const Quote = ({ bgImage, quote }: iQuote) => {
  return (
    <Grid
      item
      xs={10}
      sx={{ backgroundImage: `url( ${bgImage})`, backgroundSize: "100%" }}
      mt="2%"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Box>
        <Typography
          variant="h5"
          color="white"
          my="10%"
          mx="auto"
          fontStyle="oblique"
          sx={{ background: "rgb(0,0,0,0.80)", width: "fit-content" }}
        >
          {quote}
        </Typography>
      </Box>
    </Grid>
  );
};

export default Quote;
