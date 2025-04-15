import { expectTypeOf } from "vitest";
import { type Opaque, type UUID } from "./utils";

/**
 * Opaque
 */
export function opaque() {
    /**
     * Ajouter un type opaque
     *
     * L'erreur dans le premier it indique uniquement que l'import UUID n'est pas utilisé.
     * vous devez fixer le typage dans le fichier utils.ts
     */
    type Basic = number;
    type UserId = Opaque<number, "user">;
    type CompanyId = Opaque<number, "company">;

    expectTypeOf<Basic>().not.toEqualTypeOf<UserId>();
    expectTypeOf<UserId>().not.toEqualTypeOf<CompanyId>();

    /**
     * Pouvoir utiliser un uuid
     *
     * Go to ./utils.ts to implement working type
     * Attention, ici on ne cherche PAS la similitude
     * Il est discret mais dans l'expect vous avez un .not.toEqualTypeOf<>
     */
    // type Basic = string;
    // type UserId = UUID<"user">;
    // type CompanyId = UUID<"company">;

    // expectTypeOf<Basic>().not.toEqualTypeOf<UserId>();
    // expectTypeOf<UserId>().not.toEqualTypeOf<CompanyId>();

    /**
     * Pouvoir ajouter séparément uuid et types opaque
     *
     * Attention, ici comme dans le cas précédent on ne cherche PAS la similitude
     * Il est discret mais dans l'expect vous avez un .not.toEqualTypeOf<>
     */
    // type OpaqueUserId = Opaque<string, "user">;
    // type UserUUID = UUID<"user">;

    // expectTypeOf<OpaqueUserId>().not.toEqualTypeOf<UserUUID>();
}
