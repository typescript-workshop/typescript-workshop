import { describe, expectTypeOf, it } from "vitest";
import { buildContext, type CustomerDatabase } from "./db";

describe("Construire le contexte", () => {
  it.todo("On peut propager le type de la base dans le contexte", () => {
    const customerContext = buildContext<CustomerDatabase>();

    // Go to ./db.ts to implement working type
    expectTypeOf(customerContext).toEqualTypeOf<{
      $db: CustomerDatabase;
    }>();
  });
});
