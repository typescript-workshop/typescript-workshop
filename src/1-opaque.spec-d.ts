import { describe, expectTypeOf, it } from "vitest";
import { type Opaque, type UUID } from "./utils";

describe("Opaque", () => {
  it("should add opaque util", () => {
    type Basic = number;
    type UserId = Opaque<number, "user">;
    type CompanyId = Opaque<number, "company">;

    expectTypeOf<Basic>().not.toEqualTypeOf<UserId>();
    expectTypeOf<UserId>().not.toEqualTypeOf<CompanyId>();
  });
  
  it("should add uuid util", () => {
    type Basic = string;
    type UserId = UUID<"user">;
    type CompanyId = UUID<"company">;
    
    // Go to ./utils.ts to implement working type
    expectTypeOf<Basic>().not.toEqualTypeOf<UserId>();
    expectTypeOf<UserId>().not.toEqualTypeOf<CompanyId>();
  });

  // it("should add separate uuid & opaque types", () => {
  //   type OpaqueUserId = Opaque<string, "user">;
  //   type UserUUID = UUID<"user">;

  //   expectTypeOf<OpaqueUserId>().not.toEqualTypeOf<UserUUID>();
  // });
});
