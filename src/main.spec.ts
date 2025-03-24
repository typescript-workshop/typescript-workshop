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

  it("should allow field alias", () => {
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
    const query = db
      .selectFrom("companies")
      .selectFields(["name as companyName"]);
    expect(toSql(query)).toEqual("SELECT name as companyName FROM companies");
  });

  it("should allow table alias", () => {
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
    const query = db
      .selectFrom("companies c")
      .selectFields(["c.name as contact_name"]);
    expect(toSql(query)).toEqual(
      "SELECT c.name as contact_name FROM companies c"
    );
  });
  it("should allow explicit table in field name", () => {
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
    const query = db
      .selectFrom("companies")
      .selectFields(["companies.name as contact_name"]);
    expect(toSql(query)).toEqual(
      "SELECT companies.name as contact_name FROM companies"
    );
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

describe("Initialisation de votre database", () => {
  it("UserTable doit avoir les bonnes propriétés", () => {
    expectTypeOf<UserTable>().toMatchTypeOf<{
      id: string;
      firstName: string;
      lastName: string;
      birthDate: Date;
    }>();
  });

  it("Database doit contenir une table 'users'", () => {
    expectTypeOf<Database>().toHaveProperty("users");
  });

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

  type InitContext<DB> = {
    _db: DB;
  };
  type SelectableQuery<DB, TB extends keyof DB> = InitContext<DB> & {
    _operation: "select";
    _table: TB;
  };
  type SelectableQueryWithFields<DB, TB extends keyof DB> = SelectableQuery<
    DB,
    TB
  > & {
    _fields: [] | "ALL";
  };

  type WhereClause<F, V> = {
    field: F;
    operator: "=";
    value: V;
  };
  type WhereClauses<DB, TB extends keyof DB> = {
    [Field in keyof DB[TB]]: WhereClause<Field, DB[TB][Field]>;
  }[keyof DB[TB]];
  type SelectableFilteredQuery<DB, TB extends keyof DB> = {
    _db: DB;
    _operation: "select";
    _table: TB;
    _fields: [];
    _where: WhereClauses<DB, TB>;
  };
  type AnyInitContext = InitContext<any>;
  type AnySelectableQuery = SelectableQuery<any, any>;

  type Table<Ctx extends AnySelectableQuery> = Ctx["_db"][Ctx["_table"]];
  type Field<
    Ctx extends AnySelectableQuery,
    F extends AnyFieldName<Ctx>
  > = Table<Ctx>[F];
  type AnyFieldName<Ctx extends AnySelectableQuery> = keyof Table<Ctx>;
  type AllFieldNames<Ctx extends AnySelectableQuery> = AnyFieldName<Ctx>[];

  type AnySelectableQueryWithFields = SelectableQueryWithFields<any, any>;

  /**
   * Implem
   */
  const selectFrom = <Ctx extends AnyInitContext>(_table: keyof Ctx["_db"]) => {
    return {
      _operation: "select",
      _table,
      _fields: [],
    };
  };
  const selectAll = <Ctx extends AnySelectableQuery>(_ctx: Ctx) => {
    return {
      ..._ctx,
      _fields: "ALL" as const,
    };
  };
  const selectFields = <Ctx extends AnySelectableQuery>(
    _fields: AllFieldNames<Ctx>,
    _ctx: Ctx
  ) => {
    return {
      ..._ctx,
      _fields,
    };
  };
  const where = <
    Ctx extends AnySelectableQueryWithFields,
    F extends AnyFieldName<Ctx>
  >(
    field: F,
    operator: "=",
    value: Field<Ctx, F>,
    _ctx: Ctx
  ) => {
    return {
      ..._ctx,
      _where: { field, operator, value },
    };
  };

  it("On peut sélectionner depuis une table de notre DB", () => {
    type Context = {
      _db: Database;
    };

    expectTypeOf(selectFrom<Context>)
      .parameter(0)
      .toEqualTypeOf<"users" | "companies">();
  });

  it("On peut sélectionner tous les champs d'une table", () => {
    type Context = {
      _db: Database;
      _operation: "select";
      _table: "users";
    };

    expectTypeOf(selectAll<Context>)
      .parameter(0)
      .toEqualTypeOf<Context>();

    expectTypeOf(selectAll<Context>).returns.toEqualTypeOf<
      Context & { _fields: "ALL" }
    >();
  });

  it("On peut sélectionner parmi tous les champs d'une table", () => {
    type UserContext = {
      _db: Database;
      _operation: "select";
      _table: "users";
    };
    type CompanyContext = {
      _db: Database;
      _operation: "select";
      _table: "companies";
    };

    expectTypeOf(selectFields<UserContext>)
      .parameter(0)
      .toEqualTypeOf<("id" | "firstName" | "lastName" | "birthDate")[]>();
    expectTypeOf(selectFields<CompanyContext>)
      .parameter(0)
      .toEqualTypeOf<("id" | "name")[]>();

    expectTypeOf(selectFields<UserContext>)
      .parameter(1)
      .toEqualTypeOf<UserContext>();

    expectTypeOf(selectFields<UserContext>).returns.toEqualTypeOf<
      UserContext & {
        _fields: ("id" | "firstName" | "lastName" | "birthDate")[];
      }
    >();
    expectTypeOf(selectFields<CompanyContext>).returns.toEqualTypeOf<
      CompanyContext & {
        _fields: ("id" | "name")[];
      }
    >();
  });

  it("On peut sélectionner des filtres", () => {
    type Context = {
      _db: Database;
      _operation: "select";
      _table: "users";
      _fields: "ALL";
    };

    expectTypeOf(where<Context, "firstName">)
      .parameter(0)
      .toEqualTypeOf<"firstName">();
    expectTypeOf(where<Context, "firstName">)
      .parameter(1)
      .toEqualTypeOf<"=">();
    expectTypeOf(where<Context, "firstName">)
      .parameter(2)
      .toEqualTypeOf<string>();

    expectTypeOf(where<Context, "birthDate">)
      .parameter(0)
      .toEqualTypeOf<"birthDate">();
    expectTypeOf(where<Context, "birthDate">)
      .parameter(1)
      .toEqualTypeOf<"=">();
    expectTypeOf(where<Context, "birthDate">)
      .parameter(2)
      .toEqualTypeOf<Date>();

    expectTypeOf<Context>().toMatchTypeOf<
      Parameters<typeof where<Context, any>>[3]
    >();

    expectTypeOf(where<Context, "birthDate">).returns.toMatchTypeOf<
      Context & {
        _where: { field: "birthDate"; operator: "="; value: Date };
      }
    >();

    expectTypeOf(where<Context, "firstName">).returns.toEqualTypeOf<
      Context & {
        _where: { field: "firstName"; operator: "="; value: string };
      }
    >();
  });
});
