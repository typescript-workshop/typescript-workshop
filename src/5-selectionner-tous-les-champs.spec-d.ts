import { describe, expectTypeOf, it } from "vitest";
import { buildContext, type Database, selectAll, selectFrom } from "./db";

describe("Selectionner tous les champs d'une table", () => {
  it.todo("On peut sélectionner tous les champs d'une table", () => {
    const context = buildContext<Database>();
    const selectUsersQuery = selectFrom(context, "users");

    type Context = typeof selectUsersQuery;

    expectTypeOf(selectAll<Context>)
      .parameter(0)
      .toEqualTypeOf<Context>();

    type ExpectedContext = Context & { _fields: "ALL" };
    const selectAllFieldsQuery = selectAll(selectUsersQuery);
    expectTypeOf(selectAllFieldsQuery).toEqualTypeOf<ExpectedContext>();
  });
});
