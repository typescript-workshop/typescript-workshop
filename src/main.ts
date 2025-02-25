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
  _where: WhereClauses<DB, TB>;
};
type AnyDB = Record<string, any>;
type SelectQuery<DB extends AnyDB, TB extends keyof DB> = SelectQueryData<
  DB,
  TB
> & {
  selectFields: (fieldNames: (keyof DB[TB] & string)[]) => SelectQuery<DB, TB>;
  selectAll: () => SelectQuery<DB, TB>;
  where: (
    field: WhereClause["field"],
    operator: WhereClause["operator"],
    value: WhereClause["value"]
  ) => SelectQuery<DB, TB>;
};

export const buildDb = <T extends Record<string, any>>() => ({
  selectFrom: <U extends keyof T>(tableName: U & string) =>
    initSelectQuery<T, U>(tableName),
});

const initSelectQuery = <DB extends AnyDB, TB extends keyof DB>(
  tableName: TB
): SelectQuery<DB, TB> => {
  return withSelectMethods({
    _operation: "select",
    _table: tableName,
    _fields: [],
    _where: [],
  });
};

const updateSelectQuery = <DB extends AnyDB, TB extends keyof DB>(
  baseData: SelectQueryData<DB, TB>,
  fields: (keyof DB[TB] & string)[] | "ALL"
): SelectQuery<DB, TB> => {
  return withSelectMethods({
    ...baseData,
    _fields: fields,
  });
};

const withSelectMethods = <DB extends AnyDB, TB extends keyof DB>(
  baseData: SelectQueryData<DB, TB>
): SelectQuery<DB, TB> => {
  return {
    ...baseData,
    selectFields: <F extends keyof DB[TB]>(fieldNames: (F & string)[]) =>
      updateSelectQuery(baseData, fieldNames),
    selectAll: () => updateSelectQuery(baseData, "ALL"),
    where: () => updateSelectQuery(baseData, "ALL"),
  };
};

export const toSql = <DB extends AnyDB, TB extends keyof DB>(
  query: SelectQuery<DB, TB>
) =>
  match(query)
    .with(
      { _operation: "select" },
      (selectQuery) =>
        `SELECT ${
          selectQuery._fields === "ALL" ? "*" : selectQuery._fields.join(", ")
        } FROM ${String(selectQuery._table)}${
          selectQuery._where.length > 0
            ? `WHERE ${selectQuery._where
                .map(
                  ({ field, operator, value }) =>
                    `${field} ${operator} ${value}`
                )
                .join(" AND ")}`
            : ""
        }`
    )
    .exhaustive();
