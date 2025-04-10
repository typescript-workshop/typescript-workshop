import { describe, it } from "vitest";
import { buildContext, deleteFrom, ShoppingDatabase, where, type CustomerDatabase } from "./db";

describe("Supprimer des enregistrements d'une table", () => {
  it.todo("On peut spécifier une opération 'delete' à notre contexte", () => {
    const customerContext = buildContext<CustomerDatabase>();
    deleteFrom(customerContext, "users");
    // @ts-expect-error
    deleteFrom(customerContext, "products");
    
    const shoppingContext = buildContext<ShoppingDatabase>();
    deleteFrom(shoppingContext, "products");
    // @ts-expect-error
    deleteFrom(shoppingContext, "productzz");
  });
  
  it.todo("On peut appliquer un filtre sur une opération 'delete'", () => {
    const customerContext = buildContext<CustomerDatabase>();
    const deleteUsersQuery = deleteFrom(customerContext, "users");
    where(deleteUsersQuery, "firstName", "=", "Marjo");
  });
});
