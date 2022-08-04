import DataTable from "../../templates/admin/dataTable.template";
import { iProductsSection } from "./interface.admin.section";

// Generate Order Data
function createData(
  id: string,
  image: string | null,
  isColor: boolean,
  name: string,
  price: string | undefined,
  desc: string,
  category: string,
  enteredOn: string,
  colors?: { [x: string]: any } | undefined
) {
  return {
    id,
    enteredOn,
    name,
    image,
    desc,
    category,
    price,
    colors,
  };
}

const Products = ({ sectionName, products }: iProductsSection) => {
  const rows = products.map((product) => {
    let productImages: any = product.image;
    let productColors: any = product.colors;

    if (product.image === null) {
      productImages = productColors.map((color: any) => color.image);
      productColors = productColors.map((color: any) => color.color);
    }

    return createData(
      product.id,
      productImages,
      product.isColor,
      product.name,
      product.price,
      product.desc,
      product.category,
      product.enteredOn,
      productColors
    );
  });

  return <DataTable sectionName={sectionName} rows={rows} />;
};

export default Products;
