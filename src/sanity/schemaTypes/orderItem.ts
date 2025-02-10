import { defineType } from "sanity";

export const orderItemSchema = defineType({
  name: "orderItem",
  title: "Order Item",
  type: "object",
  fields: [
    {
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "products" }],
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
});
