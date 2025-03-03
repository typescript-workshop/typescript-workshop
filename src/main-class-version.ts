import type { WhereClauses, AnyDB } from "./main";

export class SelectQuery<DB extends AnyDB, TB extends keyof DB> {
  //les paramètres de la classe
  private _operation: "select" = "select";
  private _table: TB;
  private _fields: string[] | "ALL" = [];
  private _where?: WhereClauses<DB, TB>;

  constructor(table: TB) {
    this._table = table;
  }

  selectFields(fieldNames: (keyof DB[TB] & string)[]): this {
    this._fields = fieldNames;
    return this;
  }

  selectAll(): this {
    this._fields = "ALL";
    return this;
  }

  where<F extends keyof DB[TB]>(
    field: F,
    operator: "=",
    value: DB[TB][F]
  ): this {
    this._where = { field, operator, value } as WhereClauses<DB, TB>;
    return this;
  }

  toSql(): string {
    const whereClause = this._where
      ? ` WHERE ${String(this._where.field)} ${this._where.operator} '${
          this._where.value
        }'`
      : "";
    return `${this._operation.toUpperCase()} ${
      this._fields === "ALL" ? "*" : this._fields.join(", ")
    } FROM ${String(this._table)}${whereClause}`;
  }
}

export class Database<DB extends AnyDB> {
  selectFrom<TB extends keyof DB>(tableName: TB & string): SelectQuery<DB, TB> {
    return new SelectQuery<DB, TB>(tableName);
  }
}

export const uniqueProperty = Symbol();

// export class Opaque<A, B extends string> {
//   static readonly opaque = A & { [uniqueProperty]: B };
// }
