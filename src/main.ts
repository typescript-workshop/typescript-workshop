import { match } from "ts-pattern";

export type AnyDB = Record<string, any>;
export type WhereClause<F, V> = {
  field: F;
  operator: "=";
  value: V;
};

export type WhereClauses<DB, TB extends keyof DB> = {
  [Field in keyof DB[TB]]: WhereClause<Field, DB[TB][Field]>;
}[keyof DB[TB]];

type SelectQueryData<DB extends AnyDB, TB extends TableOrAlias<DB>> = {
  _operation: "select";
  _table: TB;
  _fields: string[] | "ALL";
  _where?: WhereClauses<DB, TB>;
};

export type DeleteQueryData<DB, TB extends keyof DB> = {
  _operation: "delete";
  _table: TB;
  _where?: WhereClauses<DB, TB>;
};

type QueryData<DB extends AnyDB, TB extends keyof DB> =
  | SelectQueryData<DB, TB>
  | DeleteQueryData<DB, TB>;

type ExplicitableField<
  DB extends AnyDB,
  TB extends TableOrAlias<DB>
> = TB extends `${infer Table} ${infer TableAlias}`
  ? `${TableAlias}.${keyof DB[Table] & string}`
  : `${TB & string}.${keyof DB[TB] & string}` | (keyof DB[TB] & string);

type AliasableField<DB extends AnyDB, TB extends TableOrAlias<DB>> =
  | ExplicitableField<DB, TB>
  | `${ExplicitableField<DB, TB>} as ${string}`;

type TableOrAlias<DB extends AnyDB> =
  | keyof DB
  | `${keyof DB & string} ${string}`;

type SelectQuery<DB extends AnyDB, TB extends keyof DB> = SelectQueryData<
  DB,
  TB
> & {
  selectFields: (fieldNames: AliasableField<DB, TB>[]) => SelectQuery<DB, TB>;
  selectAll: () => SelectQuery<DB, TB>;
  where: <F extends keyof DB[TB]>(
    field: F,
    operator: "=",
    value: DB[TB][F]
  ) => SelectQuery<DB, TB>;
};

export const buildDb = <T extends AnyDB>() => ({
  selectFrom: <U extends TableOrAlias<T>>(tableName: U & string) =>
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
  query: QueryData<DB, TB>
) =>
  match(query)
    .with({ _operation: "select" }, (selectQuery) => {
      const whereClause = toWhereSql(selectQuery._where);
      return `SELECT ${
        selectQuery._fields === "ALL" ? "*" : selectQuery._fields.join(", ")
      } FROM ${String(selectQuery._table)}${whereClause}`;
    })
    .with({ _operation: "delete" }, (deleteQuery) => {
      const whereClause = toWhereSql(deleteQuery._where);
      return `DELETE FROM ${String(deleteQuery._table)}${whereClause}`;
    })
    .exhaustive();

const toWhereSql = <F, V>(whereClause: WhereClause<F, V> | undefined) =>
  whereClause
    ? ` WHERE ${String(whereClause.field)} ${whereClause.operator} '${
        isDate(whereClause.value)
          ? whereClause.value.toISOString().split("T")[0]
          : whereClause.value
      }'`
    : "";

const isDate = (value: unknown): value is Date => {
  return value instanceof Date;
};

const uniqueOpaqueProperty = Symbol();
export type Opaque<A, B extends string> = A & {
  [uniqueOpaqueProperty]: B;
};

export type UUID<B extends string> = Opaque<string, `${B}_uuid`>;
