import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const SubSlogan = () => {
  return (
    <Grid container spacing={2} mb="2%">
      <Grid item xs={6}>
        <Typography variant="h6" color="white" sx={{ background: "gray" }}>
          Lorem Ipsum. <b>SIT Amet</b>
        </Typography>
      </Grid>

      <Grid item xs={6} container direction="row" justifyContent="flex-end">
        <Typography
          variant="h6"
          color="white"
          textAlign={"right"}
          sx={{ textDecoration: "underline" }}
        >
          <Link to="#" style={{ textDecoration: "none", color: "white" }}>
            Shop Now
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SubSlogan;
