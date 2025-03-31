import { UUID } from "./utils";

export type UserTable = {
  id: UUID<"user">;
  firstName: string;
  lastName: string;
  birthDate: Date;
};
export type CompanyTable = {
  id: UUID<"company">;
  name: string;
};
export type Database = {
  users: UserTable;
  companies: CompanyTable;
};

// voir pour sortir les implem à typer de façon bien isolées
type EmptyContext<DB> = {
  _db: DB;
};
type SelectableContext<DB> = EmptyContext<DB> & {
  _operation: "select";
  _table: keyof DB;
};
type DeletableContext<DB> = EmptyContext<DB> & {
  _operation: "delete";
  _table: keyof DB;
};
type AnyEmptyContext = EmptyContext<any>;
type AnySelectableContext = SelectableContext<any>;
type AnyQueryableContext = SelectableContext<any> | DeletableContext<any>;

export const buildContext = <DB>() => {
  return {
    _db: undefined as any as DB,
  };
};

export const selectFrom = <
  Ctx extends AnyEmptyContext,
  TB extends keyof Ctx["_db"]
>(
  ctx: Ctx,
  tableName: TB
) => ({
  ...ctx,
  _operation: "select" as const,
  _table: tableName,
});

export const selectFields = <Ctx extends AnySelectableContext>(
  ctx: Ctx,
  fieldNames: (keyof Ctx["_db"][Ctx["_table"]])[]
) => ({
  ...ctx,
  _fields: fieldNames,
});

export const selectAll = <Ctx extends AnySelectableContext>(ctx: Ctx) => ({
  ...ctx,
  _fields: "ALL" as const,
});

export const where = <
  Ctx extends AnyQueryableContext,
  Field extends keyof Ctx["_db"][Ctx["_table"]]
>(
  ctx: Ctx,
  field: Field,
  operator: "=",
  value: Ctx["_db"][Ctx["_table"]][Field]
) => ({
  ...ctx,
  _where: {
    field,
    operator,
    value,
  },
});

export const deleteFrom = <
  Ctx extends AnyEmptyContext,
  TB extends keyof Ctx["_db"]
>(
  ctx: Ctx,
  tableName: TB
) => ({
  ...ctx,
  _operation: "delete" as const,
  _table: tableName,
});
