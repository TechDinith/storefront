import { Carousel } from "antd";
import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Slider: React.FC<any> = (items: any | undefined | null) => (
  <Carousel autoplay>
    {items &&
      items!.items.map((item: any, i: number) => {
        return (
          <Box key={i} position="relative" overflow="hidden">
            {items.isButton && (
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  borderWidth: "4px",
                  marginTop: "40%",
                  marginLeft: "4%",
                  position: "absolute",
                }}
                color="error"
              >
                {items.btnText}
              </Button>
            )}
            {item}
          </Box>
        );
      })}
    {!items && (
      <div>
        <h3 style={contentStyle}>Nothing to show</h3>
      </div>
    )}
  </Carousel>
);

export default Slider;
