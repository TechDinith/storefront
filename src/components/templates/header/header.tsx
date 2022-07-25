import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

const Header = ({ count }: any) => {
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
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          sx={{ color: "white" }}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Badge
          badgeContent={count}
          color="primary"
          sx={{
            mx: "1%",
            "& .MuiBadge-badge": {
              right: 8,
              top: 8,
              padding: "4px 4px",
            },
          }}
        >
          <IconButton>
            <ShoppingCartSharpIcon color="secondary" />
          </IconButton>
        </Badge>
      </Grid>
    </Grid>
  );
};

export default Header;
