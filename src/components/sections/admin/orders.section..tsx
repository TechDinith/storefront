import { useEffect, useState } from "react";
import DataTable from "../../templates/admin/dataTable.template";
import { iOrder, iOrderSection } from "./interface.admin.section";

// Generate Order Data
function createData(
  id: string,
  date: string,
  name: string,
  shipTo: string,
  products: string,
  paymentMethod: string,
  amount: number
): iOrder {
  return { id, date, name, shipTo, products, paymentMethod, amount };
}

const rows = [
  createData(
    "0",
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "Sample Item 1,Sample Item 1,Sample Item 1,Sample Item 1,Sample Item 1,Sample Item 1,",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    "1",
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "Sample Item 2",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    "2",
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "Sample Item 3",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    "3",
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "Sample Item 4",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    "4",
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "Sample Item 5",
    "VISA ⠀•••• 5919",
    212.79
  ),
  createData(
    "5",
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "Sample Item 5",
    "VISA ⠀•••• 5919",
    212.79
  ),
  createData(
    "6",
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "Sample Item 5",
    "VISA ⠀•••• 5919",
    212.79
  ),
  createData(
    "7",
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "Sample Item 5",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

const Orders = ({ sectionName }: iOrderSection) => {
  const [orderList, setOrderList] = useState<any[]>();

  useEffect(() => {
    if (rows) setOrderList(rows);
  }, [rows]);

  return orderList ? (
    <DataTable sectionName={sectionName} rows={orderList} />
  ) : (
    <p>Loading</p>
  );
};

export default Orders;
