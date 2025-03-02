import { describe, it, expect, expectTypeOf } from "vitest";
import { buildDb, toSql, type WhereClause, type WhereClauses } from "./main";

describe("buildDb", () => {
  it("should work", () => {
    //given
    type UserTable = {
      id: string;
      firstName: string;
      lastName: string;
      birthDate: Date;
    };
    type CompanyTable = {
      id: string;
      name: string;
    };
    type Database = {
      users: UserTable;
      companies: CompanyTable;
    };
    const db = buildDb<Database>();
    const query = db.selectFrom("companies").selectFields(["id", "name"]);
    expect(toSql(query)).toEqual("SELECT id, name FROM companies");
  });

  it("should select all fields", () => {
    //given
    type UserTable = {
      id: string;
      firstName: string;
      lastName: string;
    };
    type Database = {
      users: UserTable;
    };
    const db = buildDb<Database>();
    const query = db.selectFrom("users").selectAll();
    expect(toSql(query)).toEqual("SELECT * FROM users");
  });

  it.skip("should add where clause", () => {
    //given
    type UserTable = {
      id: string;
      firstName: string;
      lastName: string;
      birthDate: Date;
    };
    type Database = {
      users: UserTable;
    };
    const db = buildDb<Database>();
    const date = new Date(1990);
    const query = db
      .selectFrom("users")
      .selectFields(["id"])
      .where("lastName", "=", date.toISOString());

    expect(toSql(query)).toEqual(
      "SELECT id FROM users WHERE birthDate = 1990-01-01"
    );
  });

  it("should add where clause", () => {
    //given
    type UserTable = {
      lastName: string;
      birthDate: Date;
    };
    type Database = {
      users: UserTable;
    };
    type Result = WhereClauses<Database, "users">;

    expectTypeOf<Result>().toEqualTypeOf<
      WhereClause<"lastName", string> | WhereClause<"birthDate", Date>
    >();
  });
});
