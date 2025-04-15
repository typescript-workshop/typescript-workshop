import {buildContext, type CustomerDatabase, deleteFrom, ShoppingDatabase, where,} from "./db";

/**
 * Supprimer des enregistrements d'une table
 */
export function testDeleteFrom() {
    /**
     * On peut spécifier une opération 'delete' à notre contexte
     */
    // const customerContext = buildContext<CustomerDatabase>();
    // deleteFrom(customerContext, "users");
    // // @ts-expect-error
    // deleteFrom(customerContext, "products");
    //
    // const shoppingContext = buildContext<ShoppingDatabase>();
    // deleteFrom(shoppingContext, "products");
    // // @ts-expect-error
    // deleteFrom(shoppingContext, "productzz");

    /**
     * On peut appliquer un filtre sur une opération 'delete'
     */
    // const deleteUsersQuery = deleteFrom(customerContext, "users");
    // where(deleteUsersQuery, "firstName", "=", "Marjo");
}
