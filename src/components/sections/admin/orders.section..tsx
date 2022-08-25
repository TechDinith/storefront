import { useEffect, useState } from "react";
import { status } from "../../../auth/auth.interface";
import { getOrders } from "../../../auth/firebase/firebase.orders.functions";
import DataTable from "../../templates/admin/dataTable.template";
import { iOrderSection } from "./interface.admin.section";

const Orders = ({ sectionName, dialogProps }: iOrderSection) => {
  const [orderList, setOrderList] = useState<any[]>([]);

  useEffect(() => {
    getOrders().then((res) => {
      if (res.status === status.success) {
        let rows: any[] = [];
        res.data.forEach((order: any) => {
          const organizedOrder = {
            id: order.id,
            orderedDate: order.data().orderedOn,
            deliveredDate: order.data().deliveredDate
              ? order.data().deliveredDate
              : null,
            name:
              order.data().deliveryDetails.firstname +
              " " +
              order.data().deliveryDetails.lastname,
            shipTo:
              order.data().deliveryDetails.address +
              ", " +
              order.data().deliveryDetails.area +
              ", " +
              order.data().deliveryDetails.city +
              ", " +
              order.data().deliveryDetails.country +
              " ," +
              order.data().deliveryDetails.zip,
            contacts:
              order.data().deliveryDetails.email +
              ", " +
              order.data().deliveryDetails.phone,
            products: order
              .data()
              .products.map((product: any) =>
                product.color === "transparent"
                  ? product.name
                  : product.name + "-" + product.colors
              ),
            paymentMethod: "Cashon delevery!",
            image: order.data().products.map((product: any) => product.urlList),
            totalAmount: order.data().total,
          };

          rows.push(organizedOrder);
        });
        if (rows) setOrderList(rows);
      }
    });
  }, [sectionName]);

  return orderList.length > 0 ? (
    <DataTable
      sectionName={sectionName}
      dialogProps={dialogProps}
      rows={orderList}
    />
  ) : (
    <p>No Orders yet!</p>
  );
};

export default Orders;
