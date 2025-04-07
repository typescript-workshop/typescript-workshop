import { describe, expectTypeOf, it } from "vitest";
import { buildContext, type Database, selectFrom, where } from "./db";

describe("Filtrer les lignes d'une table", () => {
  it.todo("On peut fournir un critère afin de ne récupérer que des lignes qui le satisfont", () => {
    const context = buildContext<Database>();
    const selectUsersQuery = selectFrom(context, "users");

    type Context = typeof selectUsersQuery;

    expectTypeOf<Context>().toMatchTypeOf<
      Parameters<typeof where<Context, any>>[0]
    >();

    expectTypeOf(where<Context, "firstName">)
      .parameter(1)
      .toEqualTypeOf<"firstName">();
    expectTypeOf(where<Context, "firstName">)
      .parameter(2)
      .toEqualTypeOf<"=">();
    expectTypeOf(where<Context, "firstName">)
      .parameter(3)
      .toEqualTypeOf<string>();

    expectTypeOf(where<Context, "birthDate">)
      .parameter(1)
      .toEqualTypeOf<"birthDate">();
    expectTypeOf(where<Context, "birthDate">)
      .parameter(2)
      .toEqualTypeOf<"=">();
    expectTypeOf(where<Context, "birthDate">)
      .parameter(3)
      .toEqualTypeOf<Date>();

    type ExpectedBirthDateContext = Context & {
      _where: { field: "birthDate"; operator: "="; value: Date };
    };
    const birthDateFilteredQuery = where(
      selectUsersQuery,
      "birthDate",
      "=",
      new Date()
    );
    expectTypeOf(
      birthDateFilteredQuery
    ).toMatchTypeOf<ExpectedBirthDateContext>();

    type ExpectedFirstNameContext = Context & {
      _where: { field: "firstName"; operator: "="; value: string };
    };
    const firstNameFilteredQuery = where(
      selectUsersQuery,
      "firstName",
      "=",
      "Max"
    );
    expectTypeOf(
      firstNameFilteredQuery
    ).toMatchTypeOf<ExpectedFirstNameContext>();
  });
});
