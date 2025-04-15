import {buildContext, type CustomerDatabase, selectAll, selectFrom, where} from "./db";

/**
 * Filtrer les lignes d'une table
 */
export function testWhere() {
    /**
     * On peut fournir un critère afin de ne récupérer que des lignes qui le satisfont
     */
    const customerContext = buildContext<CustomerDatabase>();
    const selectUsersQuery = selectFrom(customerContext, "users");
    const selectAllUsersFieldsQuery = selectAll(selectUsersQuery);
    
    where(selectAllUsersFieldsQuery, "firstName", "=", "Max");
    where(selectAllUsersFieldsQuery, "birthDate", "=", new Date());
    // @ts-expect-error
    where(selectAllUsersFieldsQuery, "firstName", "=", 42);
    // @ts-expect-error
    where(selectAllUsersFieldsQuery, "birthDate", "=", "not a date");
    // @ts-expect-error
    where(selectAllUsersFieldsQuery, "first_name", "=", "Max");
}
