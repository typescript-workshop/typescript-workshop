import { describe, it } from "vitest";
import {
  buildContext,
  selectFields,
  selectFrom,
  type CustomerDatabase,
  type ShoppingDatabase,
} from "./db";

describe("Selectionner des champs dans une table", () => {
  // it("On peut sélectionner parmi tous les champs d'une table", () => {
  //   const customerContext = buildContext<CustomerDatabase>();
  //   const selectUsersQuery = selectFrom(customerContext, "users");
  //   selectFields(selectUsersQuery, [
  //     "id",
  //     "firstName",
  //     "lastName",
  //     "birthDate",
  //   ]);
  //   // @ts-expect-error
  //   selectFields(selectUsersQuery, ["idi"]);

  //   const selectCompaniesQuery = selectFrom(customerContext, "companies");
  //   selectFields(selectCompaniesQuery, ["id", "name"]);
  //   // @ts-expect-error
  //   selectFields(selectCompaniesQuery, ["id", "firstName"]);

  //   const shoppingContext = buildContext<ShoppingDatabase>();
  //   const selectProductsQuery = selectFrom(shoppingContext, "products");
  //   selectFields(selectProductsQuery, ["id", "name", "description"]);
  //   // @ts-expect-error
  //   selectFields(selectProductsQuery, ["id", "firstName"]);
  // });
});
