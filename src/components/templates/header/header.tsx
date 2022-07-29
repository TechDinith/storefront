import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { iHeader } from "./header.interfaces";
import Search from "../../sections/search/search.section";

const Header = ({ products }: iHeader) => {
  return (
    <Grid
      container
      bgcolor="black"
      sx={{
        py: "1%",
        display: { xs: "none", sm: "none", md: "flex" },
        mb: "1%",
        p: "1%",
      }}
    >
      <Grid item xs={6}>
        <Typography
          variant="body2"
          color="white"
          textTransform="uppercase"
          sx={{ mt: "1%" }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
      </Grid>

      <Grid item xs={6} container direction="row" justifyContent="flex-end">
        <Search
          label="Search"
          options={products}
          inputAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Grid>
    </Grid>
  );
};

export default Header;
