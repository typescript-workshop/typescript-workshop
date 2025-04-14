import { describe, expectTypeOf, it } from "vitest";
import { type Opaque, type UUID } from "./utils";

describe("Opaque", () => {
  //L'erreur dans le premier it indique uniquement que l'import UUID n'est pas utilisé.
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
    // // Attention, ici on ne cherche PAS la similitude
    // // Il est discret mais dans l'expect vous avez un .not.toEqualTypeOf<>
    // expectTypeOf<Basic>().not.toEqualTypeOf<UserId>();
    // expectTypeOf<UserId>().not.toEqualTypeOf<CompanyId>();
  });

  // it("Pouvoir ajouter séparement uuid et types opaque", () => {
  //   type OpaqueUserId = Opaque<string, "user">;
  //   type UserUUID = UUID<"user">;

  // // Attention, ici comme dans le cas précédent on ne cherche PAS la similitude
  // // Il est discret mais dans l'expect vous avez un .not.toEqualTypeOf<>
  //   expectTypeOf<OpaqueUserId>().not.toEqualTypeOf<UserUUID>();
  // });
});
