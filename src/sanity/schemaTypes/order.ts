import { defineType } from "sanity";

export const orderSchema = defineType({
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "orderId",
      title: "Order ID",
      type: "string",
    },
    {
      name: "customerName",
      title: "Customer Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
    },
    {
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Failed", value: "failed" },
        ],
      },
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "productId",
              title: "Product ID",
              type: "string",
            },
            {
              name: "productName",
              title: "Product Name",
              type: "string",
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
            },
            {
              name: "price",
              title: "Price",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      name: "paymentDate",
      title: "Payment Date",
      type: "datetime",
    },
  ],
});
