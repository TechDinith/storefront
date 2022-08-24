import { Carousel } from "antd";
import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ArrowBackIosNewOutlined, ArrowForwardIos } from "@mui/icons-material";
import "./slider.scss";
import { Link } from "react-router-dom";

const textStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Slider = ({
  items,
  isButton,
  btnText,
  slidesToShow,
  draggable,
  isArrows,
  speed,
  effect,
}: any) => {
  const PrevArrow = ({ currentSlide, slideCount, ...props }: any) => (
    <div {...props}>
      <ArrowBackIosNewOutlined />
    </div>
  );
  const NextArrow = ({ currentSlide, slideCount, ...props }: any) => (
    <div {...props}>
      <ArrowForwardIos />
    </div>
  );

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
      arrows={isArrows}
      prevArrow={<PrevArrow />}
      nextArrow={<NextArrow />}
      effect={effect}
      speed={speed}
      autoplaySpeed={5000}
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
                component={Link}
                to={"/" + item.category}
                color="error"
              >
                {btnText}
              </Button>
            )}
            {item.image ? item.image : item}
          </Box>
        );
      })}
    </Carousel>
  );
};

export default Slider;
