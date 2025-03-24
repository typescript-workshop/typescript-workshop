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
  type EmptyQuery<DB> = {
    _db: DB;
  };
  const selectFrom = <Ctx extends EmptyQuery<any>>(
    _table: keyof Ctx["_db"]
  ) => {
    return {
      _operation: "select",
      _table,
      _fields: [],
    };
  };
  type SelectableQuery<DB, TB extends keyof DB> = EmptyQuery<DB> & {
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
  type SelectableFilteredQuery<
    DB,
    TB extends keyof DB
  > = SelectableQueryWithFields<DB, TB> & {
    _where: WhereClauses<DB, TB>;
  };
  type AnySelectableQuery = SelectableQuery<any, any>;
  const selectAll = <Ctx extends AnySelectableQuery>(_ctx: Ctx) => {
    return {
      ..._ctx,
      _fields: "ALL",
    };
  };
  type Table<Ctx extends AnySelectableQuery> = Ctx["_db"][Ctx["_table"]];
  type Field<
    Ctx extends AnySelectableQuery,
    F extends AnyFieldName<Ctx>
  > = Table<Ctx>[F];
  type AnyFieldName<Ctx extends AnySelectableQuery> = keyof Table<Ctx>;
  type AllFieldNames<Ctx extends AnySelectableQuery> = AnyFieldName<Ctx>[];
  const selectFields = <Ctx extends AnySelectableQuery>(
    _fields: AllFieldNames<Ctx>,
    _ctx: Ctx
  ) => {
    return {
      ..._ctx,
      _fields,
    };
  };

  type AnySelectableQueryWithFields = SelectableQueryWithFields<any, any>;
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
    type Context = EmptyQuery<Database>;
    const result = selectFrom<Context>("users");

    expectTypeOf<Parameters<typeof selectFrom<Context>>[0]>().toEqualTypeOf<
      "users" | "companies"
    >();
    expect(result).toEqual({
      _operation: "select",
      _table: "users",
      _fields: [],
    });
  });

  it("On peut sélectionner tous les champs d'une table", () => {
    type Context = SelectableQuery<Database, "users">;
    const ctx: Context = {
      _db: undefined as any as Database,
      _operation: "select",
      _table: "users",
    };
    const result = selectAll(ctx);

    expectTypeOf<Parameters<typeof selectAll<Context>>[0]>().toMatchTypeOf<{
      _operation: "select";
      _table: "users";
    }>();

    expect(result).toEqual({
      _operation: "select",
      _table: "users",
      _fields: "ALL",
    });
  });
  it("On peut sélectionner parmi tous les champs d'une table", () => {
    type Context = SelectableQuery<Database, "users">;
    const ctx: Context = {
      _db: undefined as any as Database,
      _operation: "select",
      _table: "users",
    };
    const result = selectFields(["firstName", "lastName"], ctx);

    expectTypeOf<Parameters<typeof selectFields<Context>>[0]>().toEqualTypeOf<
      ("id" | "firstName" | "lastName" | "birthDate")[]
    >();

    expectTypeOf<{
      _db: Database;
      _operation: "select";
      _table: "users";
    }>().toMatchTypeOf<Parameters<typeof selectFields<Context>>[1]>();

    expect(result).toEqual({
      _operation: "select",
      _table: "users",
      _fields: ["firstName", "lastName"],
    });
  });

  it("On peut sélectionner des filtres", () => {
    type Context = SelectableQueryWithFields<Database, "users">;
    const ctx: Context = {
      _db: undefined as any as Database,
      _operation: "select",
      _table: "users",
      _fields: "ALL",
    };
    const result = where("firstName", "=", "Johnny", ctx);

    type WhereFirstNameParameters = Parameters<
      typeof where<Context, "firstName">
    >;
    expectTypeOf<"firstName">().toEqualTypeOf<WhereFirstNameParameters[0]>();
    expectTypeOf<"=">().toEqualTypeOf<WhereFirstNameParameters[1]>();
    expectTypeOf<string>().toEqualTypeOf<WhereFirstNameParameters[2]>();

    type WhereBirthDateParameters = Parameters<
      typeof where<Context, "birthDate">
    >;
    expectTypeOf<"birthDate">().toEqualTypeOf<WhereBirthDateParameters[0]>();
    expectTypeOf<"=">().toEqualTypeOf<WhereBirthDateParameters[1]>();
    expectTypeOf<Date>().toEqualTypeOf<WhereBirthDateParameters[2]>();

    expectTypeOf<Context>().toMatchTypeOf<WhereFirstNameParameters[3]>();

    expect(result).toEqual({
      _operation: "select",
      _table: "users",
      _fields: "ALL",
      _where: { field: "firstName", operator: "=", value: "Johnny" },
    });
  });
});
