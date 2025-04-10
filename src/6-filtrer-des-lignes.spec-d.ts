import { describe, it } from "vitest";
import { buildContext, type CustomerDatabase, selectFrom, where } from "./db";

describe("Filtrer les lignes d'une table", () => {
  it.todo("On peut fournir un critère afin de ne récupérer que des lignes qui le satisfont", () => {
    const customerContext = buildContext<CustomerDatabase>();
    const selectUsersQuery = selectFrom(customerContext, "users");

    where(selectUsersQuery, "firstName", "=", "Max");
    where(selectUsersQuery, "birthDate", "=", new Date());
    // @ts-expect-error
    where(selectUsersQuery, "firstName", "=", 42);
    // @ts-expect-error
    where(selectUsersQuery, "birthDate", "=", "not a date");
    // @ts-expect-error
    where(selectUsersQuery, "first_name", "=", "Max");
  });
});
