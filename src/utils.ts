export type Opaque<A, B extends string> = A & {
  "$uniqueOpaqueProperty": B;
};

export type UUID = Opaque<string, "Fix_me">;