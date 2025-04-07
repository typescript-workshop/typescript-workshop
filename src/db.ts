import { type UUID } from "./utils.ts";

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

export const buildContext = () => {
  return {
    _db: undefined,
  };
};

export const selectFrom = (
  ctx: any,
  tableName: any
) => ({
  ...ctx,
  _operation: "select",
  _table: tableName,
});

export const selectFields = (
  ctx: any,
  fieldNames: any[]
) => ({
  ...ctx,
  _fields: fieldNames,
});

export const selectAll = (ctx: any) => ({
  ...ctx,
  _fields: "ALL",
});

export const where = (
  ctx: any,
  field: any,
  operator: "=",
  value: any
) => ({
  ...ctx,
  _where: {
    field,
    operator,
    value,
  },
});

export const deleteFrom = (
  ctx: any,
  tableName: any
) => ({
  ...ctx,
  _operation: "delete",
  _table: tableName,
});
