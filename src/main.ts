import { match } from "ts-pattern";

export type WhereClause<F, V> = {
  field: F;
  operator: "=";
  value: V;
};

export type WhereClauses<DB, TB extends keyof DB> = {
  [Field in keyof DB[TB]]: WhereClause<Field, DB[TB][Field]>;
}[keyof DB[TB]];

type SelectQueryData<DB, TB extends keyof DB> = {
  _operation: "select";
  _table: TB;
  _fields: string[] | "ALL";
  _where?: WhereClauses<DB, TB>;
};

type AnyDB = Record<string, any>;

type SelectQuery<DB extends AnyDB, TB extends keyof DB> = SelectQueryData<
  DB,
  TB
> & {
  selectFields: (fieldNames: (keyof DB[TB] & string)[]) => SelectQuery<DB, TB>;
  selectAll: () => SelectQuery<DB, TB>;
  where: <F extends keyof DB[TB]>(
    field: F,
    operator: "=",
    value: DB[TB][F]
  ) => SelectQuery<DB, TB>;
};

export const buildDb = <T extends Record<string, any>>() => ({
  selectFrom: <U extends keyof T>(tableName: U & string) =>
    initSelectQuery<T, U>(tableName),
});

const initSelectQuery = <DB extends AnyDB, TB extends keyof DB>(
  tableName: TB
): SelectQuery<DB, TB> => {
  const query: SelectQueryData<DB, TB> = {
    _operation: "select",
    _table: tableName,
    _fields: [],
  };
  return withSelectMethods(query);
};

const updateSelectQuery = <DB extends AnyDB, TB extends keyof DB>(
  baseData: SelectQueryData<DB, TB>,
  update: Partial<SelectQueryData<DB, TB>>
): SelectQuery<DB, TB> => {
  return withSelectMethods({ ...baseData, ...update });
};

const withSelectMethods = <DB extends AnyDB, TB extends keyof DB>(
  baseData: SelectQueryData<DB, TB>
): SelectQuery<DB, TB> => {
  return {
    ...baseData,
    selectFields: (fieldNames) =>
      updateSelectQuery(baseData, { _fields: fieldNames }),
    selectAll: () => updateSelectQuery(baseData, { _fields: "ALL" }),
    where: (field, operator, value) =>
      updateSelectQuery(baseData, {
        _where: { field, operator, value } as WhereClauses<DB, TB>,
      }),
  };
};

export const toSql = <DB extends AnyDB, TB extends keyof DB>(
  query: SelectQuery<DB, TB>
) =>
  match(query)
    .with({ _operation: "select" }, (selectQuery) => {
      const whereClause = selectQuery._where
        ? ` WHERE ${String(selectQuery._where.field)} ${
            selectQuery._where.operator
          } '${selectQuery._where.value}'`
        : "";
      return `SELECT ${
        selectQuery._fields === "ALL" ? "*" : selectQuery._fields.join(", ")
      } FROM ${String(selectQuery._table)}${whereClause}`;
    })
    .exhaustive();
