import { describe, expectTypeOf, it, expect } from "vitest";
import { buildContext, deleteFrom, where, type Database } from "./db";

describe("Supprimer des enregistrements d'une table", () => {
  it("On peut spécifier une opération 'delete' à notre contexte", () => {
    const context = buildContext<Database>();
    type Context = typeof context;
    const deleteUsersQuery = deleteFrom(context, "users");
    where(deleteUsersQuery, "firstName", "=", "Marjo");

    expectTypeOf(deleteFrom<Context, "users" | "companies">)
      .parameter(1)
      .toEqualTypeOf<"users" | "companies">();

    const deleteQuery = deleteFrom(context, "users");
    type ExpectedContext = Context & {
      _operation: "delete";
      _table: "users";
    };
    expectTypeOf(deleteQuery).toMatchTypeOf<ExpectedContext>();
    expect(deleteQuery).toEqual({
      _operation: "delete",
      _table: "users",
    });
  });
});
