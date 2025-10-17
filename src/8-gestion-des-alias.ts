import {buildContext, type CustomerDatabase, selectFields, selectFrom,} from "./db";
import {expectTypeOf} from "vitest";

/**
 * Aliaser les tables et leurs champs
 */
export function testAliases() {
    /**
     * On peut aliaser à une table
     */
    // const customerContext = buildContext<CustomerDatabase>();
    // selectFrom(customerContext, "users");
    // selectFrom(customerContext, "users u");
    // selectFrom(customerContext, "companies");
    // selectFrom(customerContext, "companies c");
    // expectTypeOf(selectFrom(customerContext, "companies c")._table).toEqualTypeOf<'companies c'>()

    /**
     * On peut aliaser un champ
     */
    // const selectCompaniesQuery = selectFrom(customerContext, "companies");
    // selectFields(selectCompaniesQuery, ["id"]);
    // selectFields(selectCompaniesQuery, ["id as userId"]);
    // selectFields(selectCompaniesQuery, ["name"]);
    // selectFields(selectCompaniesQuery, ["name as userName"]);
    // // @ts-expect-error
    // selectFields(selectCompaniesQuery, ["fail"]);

    /**
     * On peut expliciter un champ avec le nom de la table
     */
    // const selectUsersQuery = selectFrom(customerContext, "users");
    // selectFields(selectUsersQuery, ["users.firstName"]);
    // selectFields(selectUsersQuery, ["firstName"]);
    // // @ts-expect-error
    // selectFields(selectUsersQuery, ["s.firstName"]);
    //
    // const selectUsersAliasedQuery = selectFrom(customerContext, "users u");
    // selectFields(selectUsersAliasedQuery, ["u.firstName"]);
    // selectFields(selectUsersAliasedQuery, ["firstName"]);
    // // @ts-expect-error
    // selectFields(selectUsersAliasedQuery, ["users.firstName"]);
    // // @ts-expect-error
    // selectFields(selectUsersAliasedQuery, ["s.firstName"]);
}
