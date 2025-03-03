import { describe, it, expect, expectTypeOf } from "vitest";
import {
  buildDb,
  toSql,
  type DeleteQueryData,
  type Opaque,
  type UUID,
  type WhereClause,
  type WhereClauses,
} from "./main";

describe("buildDb", () => {
  it("should add uuid util", () => {
    type Basic = string;
    type UserId = UUID<"user">;
    type CompanyId = UUID<"company">;

    expectTypeOf<Basic>().not.toEqualTypeOf<UserId>();
    expectTypeOf<UserId>().not.toEqualTypeOf<CompanyId>();
  });

  it("should add opaque util", () => {
    type Basic = number;
    type UserId = Opaque<number, "user">;
    type CompanyId = Opaque<number, "company">;

    expectTypeOf<Basic>().not.toEqualTypeOf<UserId>();
    expectTypeOf<UserId>().not.toEqualTypeOf<CompanyId>();
  });

  it("should add separate uuid & opaque types", () => {
    type OpaqueUserId = Opaque<string, "user">;
    type UserUUID = UUID<"user">;

    expectTypeOf<OpaqueUserId>().not.toEqualTypeOf<UserUUID>();
  });

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

  it("should add where clause", () => {
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
    const date = new Date("1990");
    const query = db
      .selectFrom("users")
      .selectFields(["id"])
      .where("birthDate", "=", date);

    expect(toSql(query)).toEqual(
      "SELECT id FROM users WHERE birthDate = '1990-01-01'"
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

  it("should delete selected rows", () => {
    //given
    type UserTable = {
      id: string;
      firstName: string;
      lastName: string;
    };
    type Database = {
      users: UserTable;
    };

    const deleteQuery: DeleteQueryData<Database, "users"> = {
      _operation: "delete",
      _table: "users",
      _where: { field: "firstName", operator: "=", value: "John" },
    };
    expect(toSql(deleteQuery)).toEqual(
      "DELETE FROM users WHERE firstName = 'John'"
    );
  });
});
