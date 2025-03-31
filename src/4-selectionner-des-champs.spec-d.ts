import { describe, expectTypeOf, it } from "vitest";
import { buildContext, type Database, selectFrom, selectFields } from "./db";

describe("Selectionner des champs dans une table", () => {
  it("On peut sélectionner parmi tous les champs d'une table", () => {
    const context = buildContext<Database>();
    const selectUsersQuery = selectFrom(context, "users");
    const selectCompaniesQuery = selectFrom(context, "companies");

    type UserContext = typeof selectUsersQuery;
    type CompanyContext = typeof selectCompaniesQuery;

    expectTypeOf(selectFields<UserContext>)
      .parameter(0)
      .toEqualTypeOf<UserContext>();

    expectTypeOf(selectFields<UserContext>)
      .parameter(1)
      .toEqualTypeOf<("id" | "firstName" | "lastName" | "birthDate")[]>();
    expectTypeOf(selectFields<CompanyContext>)
      .parameter(1)
      .toEqualTypeOf<("id" | "name")[]>();


    const usersQueryWithFields = selectFields(selectUsersQuery, ["birthDate"]);
    expectTypeOf(usersQueryWithFields).toEqualTypeOf<
      UserContext & {
        _fields: ("id" | "firstName" | "lastName" | "birthDate")[];
      }
    >();

    const companiesQueryWithFields = selectFields(
        selectCompaniesQuery,
      ["name"],
    );
    expectTypeOf(companiesQueryWithFields).toEqualTypeOf<
      CompanyContext & {
        _fields: ("id" | "name")[];
      }
    >();
  });
});
