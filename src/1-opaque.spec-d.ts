import { describe, expectTypeOf, it } from "vitest";
import { type Opaque, type UUID } from "./utils";

describe("Opaque", () => {
  //L'erreur dans le premier it indique uniquement que l'import.
  //vous devez fixer le typage dans le fichier utils.ts
  it("Ajouter un type opaque", () => {
    type Basic = number;
    type UserId = Opaque<number, "user">;
    type CompanyId = Opaque<number, "company">;

    expectTypeOf<Basic>().not.toEqualTypeOf<UserId>();
    expectTypeOf<UserId>().not.toEqualTypeOf<CompanyId>();
  });

  it("Pouvoir utiliser un uuid ", () => {
    // type Basic = string;
    // type UserId = UUID<"user">;
    // type CompanyId = UUID<"company">;
    // // Go to ./utils.ts to implement working type
    // expectTypeOf<Basic>().not.toEqualTypeOf<UserId>();
    // expectTypeOf<UserId>().not.toEqualTypeOf<CompanyId>();
  });

  // it("Pouvoir ajouter séparement uuid et types opaque", () => {
  //   type OpaqueUserId = Opaque<string, "user">;
  //   type UserUUID = UUID<"user">;

  //   expectTypeOf<OpaqueUserId>().not.toEqualTypeOf<UserUUID>();
  // });
});
