import { describe, expectTypeOf, it, expect } from "vitest";
import { buildContext, selectFrom, type Database } from "./db";

describe("Selectionner une table", () => {
  it.todo("On peut sélectionner depuis une table de notre DB", () => {
    const context = buildContext<Database>();
    type Context = typeof context;

    // Go to ./db.ts to implement working type
    expectTypeOf(selectFrom<Context, "users" | "companies">)
      .parameter(1)
      .toEqualTypeOf<"users" | "companies">();

    const selectQuery = selectFrom(context, "users");
    type ExpectedContext = Context & {
      _operation: "select";
      _table: "users";
    };
    expectTypeOf(selectQuery).toMatchTypeOf<ExpectedContext>();
    expect(selectQuery).toEqual({
      _operation: "select",
      _table: "users",
    });
  });
});
