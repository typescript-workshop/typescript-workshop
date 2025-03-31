import { describe, expect, expectTypeOf, it } from "vitest";
import { buildContext, type Database } from "./db";

describe("Construire le contexte", () => {
  it("should create a context", () => {
    const context = buildContext<Database>();

    // Go to ./db.ts to implement working type
    expectTypeOf(context).toEqualTypeOf<{
      _db: Database;
    }>();
    expect(context._db).toBeUndefined();
  });
});
