export type UserTable = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
};
export type CompanyTable = {
  id: string;
  name: string;
};

export type CustomerDatabase = {
  users: UserTable;
  companies: CompanyTable;
};

type Quantity = number;
type Price = number;

export type ProductTable = {
  id: string;
  name: string;
  description: string;
  unitPrice: Price;
};

export type CartTable = {
  id: string;
  items: [Quantity, [ProductTable["id"]]][];
};

export type ShoppingDatabase = {
  carts: CartTable;
  products: ProductTable;
};

export const buildContext = () => {
  return {
    _db: undefined,
  };
};

export const selectFrom = (ctx: any, tableName: any) => ({
  ...ctx,
  _operation: "select",
  _table: tableName,
});

export const selectFields = (ctx: any, fieldNames: any[]) => ({
  ...ctx,
  _fields: fieldNames,
});

export const selectAll = (ctx: any) => ({
  ...ctx,
  _fields: "ALL",
});

export const where = (ctx: any, field: any, operator: "=", value: any) => ({
  ...ctx,
  _where: {
    field,
    operator,
    value,
  },
});

export const deleteFrom = (ctx: any, tableName: any) => ({
  ...ctx,
  _operation: "delete",
  _table: tableName,
});
