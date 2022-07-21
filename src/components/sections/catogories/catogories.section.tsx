import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Image } from "antd";
import men from "../../../images/men.jpg";
import women from "../../../images/women.jpg";
import acc from "../../../images/acc.jpg";

const Catogories = () => {
  return (
    <>
      <Grid item xs={10} mt="5%" sx={{ display: { xs: "block", sm: "none" } }}>
        <Box className="image-group-vertical" mb="2%">
          <Typography
            variant="h4"
            color="white"
            sx={{ position: "absolute", p: "37%" }}
          >
            MEN
          </Typography>
          <Image src={men} alt="1" preview={false} />
        </Box>

        <Box className="image-group-vertical" mb="2%">
          <Typography
            variant="h4"
            color="white"
            sx={{ position: "absolute", py: "40%", px: "30%" }}
          >
            WOMEN
          </Typography>
          <Image src={women} alt="3" preview={false} />
        </Box>

        <Box className="image-group-vertical" mb="2%">
          <Typography
            variant="h4"
            color="white"
            sx={{ position: "absolute", py: "40%", px: "25%" }}
          >
            ACCESSORIES
          </Typography>
          <Image src={acc} alt="4" preview={false} />
        </Box>
      </Grid>

      <Grid item xs={10} mt="5%" sx={{ display: { xs: "none", sm: "block" } }}>
        <Box display={"flex"}>
          <Box className="image-group" width={"34%"}>
            <Typography variant="h6" color="white">
              MEN
            </Typography>
          </Box>
          <Box className="image-group" width={"34%"}>
            <Typography variant="h6" color="white">
              WOMEN
            </Typography>
          </Box>
          <Box className="image-group" width={"34%"}>
            <Typography variant="h6" color="white">
              ACCESSORIES
            </Typography>
          </Box>
        </Box>

        <Image.PreviewGroup>
          <Box display={"flex"}>
            <Box className="image-group" width={"34%"}>
              <Image src={men} alt="1" preview={false} />
            </Box>
            <Box className="image-group" width={"34%"}>
              <Image src={women} alt="3" preview={false} />
            </Box>
            <Box className="image-group" width={"34%"}>
              <Image src={acc} alt="4" preview={false} />
            </Box>
          </Box>
        </Image.PreviewGroup>
      </Grid>
    </>
  );
};

export default Catogories;
