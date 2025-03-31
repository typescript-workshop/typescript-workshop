const uniqueOpaqueProperty = Symbol();
export type Opaque<A, B extends string> = A & {
  [uniqueOpaqueProperty]: B;
};

export type UUID<T extends string> = Opaque<string, `${T}_uuid`>;
