import { describe, expect, expectTypeOf, it } from "vitest";
import { buildContext, type Database, selectFrom, selectFields } from "./db";

describe("Selectionner des champs dans une table", () => {
  it.todo("On peut sélectionner parmi tous les champs d'une table", () => {
    const context = buildContext<Database>();
    const selectUsersQuery = selectFrom(context, "users");
    const selectCompaniesQuery = selectFrom(context, "companies");

    type UserContext = typeof selectUsersQuery;

    expectTypeOf(selectFields<UserContext>)
      .parameter(0)
      .toEqualTypeOf<UserContext>();

    const usersQueryWithFields = selectFields(selectUsersQuery, [
      "id",
      "firstName",
      "lastName",
      "birthDate",
    ]);
    expect(usersQueryWithFields._fields).toEqual(["id", "name"]);

    const companiesQueryWithFields = selectFields(selectCompaniesQuery, [
      "id",
      "name",
    ]);
    expect(companiesQueryWithFields._fields).toEqual(["id", "name"]);
  });
});
