import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Terms = () => {
  return (
    <>
      <Grid item xs={10} justifyContent="center" textAlign="center">
        <Typography variant="h5" color="white" textTransform="uppercase">
          Terms & Conditons
        </Typography>

        <Typography variant="body1" color="white" textAlign="left">
          1.Lorem
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, qui
          at. Inventore nesciunt necessitatibus magni totam labore ad corporis,
          pariatur nostrum! Reiciendis hic in illum ratione quos sunt nesciunt
          laborum?
          <br />
          1.Ipsum
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, qui
          at. Inventore nesciunt necessitatibus magni totam labore ad corporis,
          pariatur nostrum! Reiciendis hic in illum ratione quos sunt nesciunt
          laborum?
        </Typography>
      </Grid>
    </>
  );
};

export default Terms;
