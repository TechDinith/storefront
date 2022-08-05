import Button from "@mui/material/Button";
import { useState } from "react";
import ProductUpdateModal from "../admin/productUpdate.template";

const SandBox = () => {
  const [openModal, setOpenModal] = useState(false);
  const products = [
    {
      id: "1",
      image: "prod1.jpg",
      isColor: false,
      name: "Sample Item 1",
      price: "1500.5",
      category: "men",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
      enteredOn: "02/04/2022",
    },
    {
      id: "2",
      image: "prod2.jpg",
      isColor: false,
      name: "Sample Item 2",
      price: 1400.5,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
      category: "men",
      enteredOn: "02/05/2022",
    },
    {
      id: "3",
      image: "prod3.jpg",
      isColor: false,
      name: "Sample Item 3",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
      price: "1540.5",
      category: "women",
      enteredOn: "02/06/2022",
    },
    {
      id: "4",
      image: "prod4.jpg",
      isColor: false,
      name: "Sample Item 4",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
      price: "1504.5",
      category: "women",
      enteredOn: "02/07/2022",
    },
    {
      id: "5",
      image: null,
      isColor: true,
      name: "Sample Item 5",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
      price: "150.5",
      colors: [
        { id: "7", image: "prod5-black.jpg", color: "black" },
        { id: "8", image: "prod5-red.jpg", color: "red" },
        { id: "9", image: "prod5-white.jpg", color: "white" },
      ],
      category: "women",
      enteredOn: "02/08/2022",
    },
    {
      id: "6",
      image: "prod6.jpg",
      category: "women",
      isColor: false,
      name: "Sample Item 6",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rem aliquid, deleniti suscipit aliquam excepturi odit voluptas id est ratione eius perspiciatis, odio vel ullam fugiat voluptate quaerat eos temporibus.",
      price: "1500",
      enteredOn: "02/09/2022",
    },
  ];
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Open</Button>
      <ProductUpdateModal
        modalProps={{ openModal, setOpenModal }}
        product={products[4]}
      />
    </>
  );
};

export default SandBox;
