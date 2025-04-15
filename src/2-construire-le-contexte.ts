import {expectTypeOf} from "vitest";
import {buildContext, type CustomerDatabase} from "./db";

/**
 * Construire le contexte
 */
export function testContextBuilder() {
    /**
     * On peut propager le type de la base dans le contexte
     *
     * Go to ./db.ts to implement working type
     */
    // const customerContext = buildContext<CustomerDatabase>();
    // expectTypeOf(customerContext).toEqualTypeOf<{
    //     $db: CustomerDatabase;
    // }>();
}
