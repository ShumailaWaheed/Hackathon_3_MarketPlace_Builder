import { type SchemaTypeDefinition } from "sanity";
import { productSchema } from "./products";
import { categorySchema } from "./categories";
import { orderSchema } from "./order";  // ✅ Import Order Schema
import { orderItemSchema } from "./orderItem"; // ✅ Import Order Item Schema

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categorySchema, orderSchema, orderItemSchema],  // ✅ Add Orders & Order Items
};
