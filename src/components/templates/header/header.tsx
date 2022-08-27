import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { iHeader } from "./header.interfaces";
import Search from "../../sections/search/search.section";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnnouncementById } from "../../../auth/firebase/firebase.announcement.functions";
import { status } from "../../../auth/auth.interface";

const Header = ({ products }: iHeader) => {
  const [announcement, setAnnouncement] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    getAnnouncementById().then((res) => {
      if (res.status === status.success) {
        setAnnouncement(res.data.data().announcement);
      }
    });
  }, [location]);

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
      <Grid item xs={9}>
        <Typography
          variant="body2"
          color="white"
          textTransform="uppercase"
          sx={{ mt: "1%" }}
        >
          {announcement}
        </Typography>
      </Grid>

      <Grid item xs={3} container direction="row" justifyContent="flex-end">
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
