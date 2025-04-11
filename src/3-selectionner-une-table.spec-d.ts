import { describe, it } from "vitest";
import {
  buildContext,
  selectFrom,
  type CustomerDatabase,
  type ShoppingDatabase,
} from "./db";

describe("Selectionner une table", () => {
  // it("On peut sélectionner depuis une table de notre DB", () => {
  //   // Go to ./db.ts to implement working type

  //   const customerContext = buildContext<CustomerDatabase>();
  //   selectFrom(customerContext, "users");
  //   selectFrom(customerContext, "companies");
  //   // @ts-expect-error
  //   selectFrom(customerContext, "products");
  //   // @ts-expect-error
  //   selectFrom(customerContext, "companiz");

  //   const shoppingContext = buildContext<ShoppingDatabase>();
  //   selectFrom(shoppingContext, "products");
  //   selectFrom(shoppingContext, "carts");
  //   // @ts-expect-error
  //   selectFrom(shoppingContext, "users");
  //   // @ts-expect-error
  //   selectFrom(shoppingContext, "cartz");
  // });
});
