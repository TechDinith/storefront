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
      <Grid item xs={10} mt="5%" display={{ xs: "block", sm: "flex" }}>
        {group.map((item, i) => (
          <Grid item xs={12} sm={4} justifyContent={"center"}>
            <Box width={"34%"} key={i * 2}>
              <Typography variant="h6" color="white">
                {item.name.toUpperCase()}
              </Typography>
            </Box>
            <Box className="image-group" key={i * 3}>
              <Link to={"/" + item.name.toLowerCase()}>
                <Image src={item.image} alt={item.name} preview={false} />
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Catogories;
