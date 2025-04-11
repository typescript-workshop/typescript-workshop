import { describe, it } from "vitest";
import {
  buildContext,
  selectFields,
  selectFrom,
  type CustomerDatabase,
} from "./db";

describe("Supprimer des enregistrements d'une table", () => {
  // it("On peut aliaser à une table", () => {
  //   const customerContext = buildContext<CustomerDatabase>();
  //   selectFrom(customerContext, "users");
  //   selectFrom(customerContext, "users u");
  //   selectFrom(customerContext, "companies");
  //   selectFrom(customerContext, "companies c");
  // });

  // it("On peut aliaser un champ", () => {
  //   const customerContext = buildContext<CustomerDatabase>();
  //   const selectUsersQuery = selectFrom(customerContext, "companies");
  //   selectFields(selectUsersQuery, ["id"]);
  //   selectFields(selectUsersQuery, ["id as userId"]);
  //   selectFields(selectUsersQuery, ["name"]);
  //   selectFields(selectUsersQuery, ["name as userName"]);
  //   // @ts-expect-error
  //   selectFields(selectUsersQuery, ["fail"]);
  // });

  // it("On peut expliciter un champ avec le nom de la table", () => {
  //   //given
  //   const customerContext = buildContext<CustomerDatabase>();
  //   const selectUsersQuery = selectFrom(customerContext, "users");
  //   selectFields(selectUsersQuery, ["users.firstName"]);
  //   selectFields(selectUsersQuery, ["firstName"]);
  //   // @ts-expect-error
  //   selectFields(selectUsersQuery, ["s.firstName"]);

  //   const selectUsersAliasedQuery = selectFrom(customerContext, "users u");
  //   selectFields(selectUsersAliasedQuery, ["u.firstName"]);
  //   selectFields(selectUsersAliasedQuery, ["firstName"]);
  //   // @ts-expect-error
  //   selectFields(selectUsersAliasedQuery, ["users.firstName"]);
  //   // @ts-expect-error
  //   selectFields(selectUsersAliasedQuery, ["s.firstName"]);
  // });
});
