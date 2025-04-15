import {expectTypeOf} from "vitest";
import {buildContext, type CustomerDatabase, selectAll, selectFrom,} from "./db";

/**
 * Selectionner tous les champs d'une table
 */
export function testSelectAll() {
    /**
     * On peut sélectionner tous les champs d'une table
     */
    // const customerContext = buildContext<CustomerDatabase>();
    // const selectUsersQuery = selectFrom(customerContext, "users");
    //
    // type Context = typeof selectUsersQuery;
    //
    // expectTypeOf(selectAll<Context>)
    //     .parameter(0)
    //     .toEqualTypeOf<Context>();
    //
    // type ExpectedContext = Context & { _fields: "ALL" };
    // const selectAllFieldsQuery = selectAll(selectUsersQuery);
    // expectTypeOf(selectAllFieldsQuery).toEqualTypeOf<ExpectedContext>();
}
