import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Image } from "antd";
import men from "../../../images/men.jpg";
import women from "../../../images/women.jpg";
import acc from "../../../images/acc.jpg";
import { Link } from "react-router-dom";

const group = [
  { name: "Men", image: men },
  { name: "Women", image: women },
  { name: "Accessories", image: acc },
];

const Catogories = () => {
  return (
    <>
      <Grid item xs={10} mt="5%" sx={{ display: { xs: "block", sm: "none" } }}>
        {group.map((item, i) => (
          <Link to={"/" + item.name.toLowerCase()} key={i}>
            <Box className="image-group-vertical" mb="2%" key={i++}>
              <Typography
                variant="h4"
                color="white"
                sx={{
                  width: "85%",
                  height: "57%",
                  position: "absolute",
                  py: "40%",
                  textAlign: "center",
                }}
              >
                {item.name}
              </Typography>
              <Image src={item.image} alt={item.name} preview={false} />
            </Box>
          </Link>
        ))}
      </Grid>

      <Grid item xs={10} mt="5%" sx={{ display: { xs: "none", sm: "block" } }}>
        <Box display={"flex"}>
          {group.map((item, i) => (
            <Box width={"34%"} key={i * 2}>
              <Typography variant="h6" color="white">
                {item.name.toUpperCase()}
              </Typography>
            </Box>
          ))}
        </Box>

        <Image.PreviewGroup>
          <Box display={"flex"}>
            {group.map((item, i) => (
              <Box className="image-group" width={"34%"} key={i * 3}>
                <Link to={"/" + item.name.toLowerCase()}>
                  <Image src={item.image} alt={item.name} preview={false} />
                </Link>
              </Box>
            ))}
          </Box>
        </Image.PreviewGroup>
      </Grid>
    </>
  );
};

export default Catogories;
