import {buildContext, type CustomerDatabase, selectFrom, type ShoppingDatabase,} from "./db";
import {expectTypeOf} from "vitest";

/**
 * Selectionner une table
 */
export function testSelectFrom() {
    /**
     * On peut sélectionner depuis une table de notre DB
     *
     * Go to ./db.ts to implement working type
     */
    // const customerContext = buildContext<CustomerDatabase>();
    // selectFrom(customerContext, "users");
    // selectFrom(customerContext, "companies");
    // expectTypeOf(selectFrom(customerContext, "companies")._table).toEqualTypeOf<'companies'>()
    // // @ts-expect-error
    // selectFrom(customerContext, "products");
    // // @ts-expect-error
    // selectFrom(customerContext, "companiz");
    //
    // const shoppingContext = buildContext<ShoppingDatabase>();
    // selectFrom(shoppingContext, "products");
    // selectFrom(shoppingContext, "carts");
    // // @ts-expect-error
    // selectFrom(shoppingContext, "users");
    // // @ts-expect-error
    // selectFrom(shoppingContext, "cartz");
}
