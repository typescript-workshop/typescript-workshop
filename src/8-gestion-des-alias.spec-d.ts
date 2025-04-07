import { describe, it } from "vitest";
import { buildContext, selectFields, selectFrom, type Database } from "./db";

describe("Supprimer des enregistrements d'une table", () => {
  it.todo("should allow table alias", () => {
    const context = buildContext<Database>();
    selectFrom(context, "users");
    selectFrom(context, "users u");
    selectFrom(context, "companies");
    selectFrom(context, "companies c");
  });

  it.todo("should allow field alias", () => {
    const context = buildContext<Database>();
    const selectUsersQuery = selectFrom(context, "companies");
    selectFields(selectUsersQuery, ["id"]);
    selectFields(selectUsersQuery, ["id as userId"]);
    selectFields(selectUsersQuery, ["name"]);
    selectFields(selectUsersQuery, ["name as userName"]);
    // @ts-expect-error
    selectFields(selectUsersQuery, ["fail"]);
  });

  it.todo("should allow explicit table in field name", () => {
    //given
    const context = buildContext<Database>();
    const selectUsersQuery = selectFrom(context, "users");
    selectFields(selectUsersQuery, ["users.firstName"]);
    selectFields(selectUsersQuery, ["firstName"]);
    // @ts-expect-error
    selectFields(selectUsersQuery, ["s.firstName"]);

    const selectUsersAliasedQuery = selectFrom(context, "users u");
    selectFields(selectUsersAliasedQuery, ["u.firstName"]);
    selectFields(selectUsersAliasedQuery, ["firstName"]);
    // @ts-expect-error
    selectFields(selectUsersAliasedQuery, ["users.firstName"]);
    // @ts-expect-error
    selectFields(selectUsersAliasedQuery, ["s.firstName"]);
  });
});
