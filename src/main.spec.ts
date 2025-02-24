import { describe, it, expect } from "vitest";
import { buildDb, toSql } from "./main";

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
    const date = new Date(1990);
    const query = db
      .selectFrom("users")
      .selectFields(["id"])
      .where("birthDate", "=", date);
    expect(toSql(query)).toEqual(
      "SELECT id FROM users WHERE birthDate = 1990-01-01"
    );
  });
});
