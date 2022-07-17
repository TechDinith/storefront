import { Carousel } from "antd";
import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const textStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Slider = ({ items, isButton, btnText, slidesToShow, draggable }: any) => {
  return !items ? (
    <Carousel autoplay>
      <div>
        <h3 style={textStyle}>Nothing to show</h3>
      </div>
    </Carousel>
  ) : (
    <Carousel
      autoplay
      slidesToShow={slidesToShow ? slidesToShow : null}
      draggable={draggable ? draggable : false}
    >
      {items.map((item: any, i: number) => {
        return (
          <Box key={i} position="relative" overflow="hidden">
            {isButton && (
              <Button
                variant="contained"
                sx={{
                  marginTop: "35%",
                  marginLeft: "4%",
                  position: "absolute",
                  zIndex: "1",
                }}
                color="error"
              >
                {btnText}
              </Button>
            )}
            {item}
          </Box>
        );
      })}
    </Carousel>
  );
};

export default Slider;
