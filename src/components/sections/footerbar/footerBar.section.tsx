import Typography from "@mui/material/Typography";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const FooterBar = () => {
  return (
    <>
      <Grid item xs={12} display="flex" justifyContent="center">
        <CopyrightIcon fontSize="small" sx={{ mr: "0.5%" }} />
        <Typography
          variant="subtitle2"
          color="inherit"
          textTransform="uppercase"
        >
          {new Date().getFullYear()} | Logo All Rights Reserved
        </Typography>
      </Grid>

      <Grid item xs={12} container direction="row" justifyContent="flex-end">
        <Typography
          variant="subtitle2"
          color="cyan"
          fontStyle="revert"
          my="auto"
          py="0"
          component={Link}
          to="#"
        >
          by iTrans
        </Typography>
      </Grid>
    </>
  );
};

export default FooterBar;
