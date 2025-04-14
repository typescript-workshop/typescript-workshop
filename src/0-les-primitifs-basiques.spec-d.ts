import { describe, expectTypeOf, it } from "vitest";

describe("Basiques", () => {
  // Dans ce premier exercice, remplacer ______ par le type souhaité

  it("Les types primitifs", () => {
    // const firstName: ______ = "Charlotte"; // "Charlotte" is a text value
    // expectTypeOf(firstName).toEqualTypeOf("Charlotte");
    // const age: _____ = 30; // Age is a number
    // expectTypeOf(age).toEqualTypeOf(30);
    // const isLoggedIn: _____ = true; // True/false value
    // expectTypeOf(isLoggedIn).toEqualTypeOf(true);
    // const emptyValue: _____ = null; // Represents intentional absence
    // expectTypeOf(emptyValue).toEqualTypeOf(null);
    // const notAssignedYet: _____ = undefined; // Declared but not yet given a value
    // expectTypeOf(notAssignedYet).toEqualTypeOf(undefined);
    // const uniqueId: _____ = Symbol("id"); // Unique and immutable identifier
    // expectTypeOf(uniqueId).toEqualTypeOf(Symbol("id"));
    // //(note: needs ES2020 or later)
    // let reallyBigNumber: _____ = 1234567890123456789012345678901234567890n;
    // expectTypeOf(reallyBigNumber).toEqualTypeOf(
    //   1234567890123456789012345678901234567890n
    // );
  });

  describe("Les types par références", () => {
    it("Array", () => {
      // const scores: _____ = [85, 92, 78];
      // expectTypeOf(scores).toEqualTypeOf([85, 92, 78]);
      // const fruits: _____ = ["apple", "banana", "cherry"]; // Hint: strings only
      // expectTypeOf(fruits).toEqualTypeOf(["apple", "banana", "cherry"]);
      // // Syntaxe générique
      // const answers: Array<_____> = [true, false, true];
      // expectTypeOf(answers).toEqualTypeOf([true, false, true]);
    });

    it("Tuples", () => {
      // const user: _____ = ["Alice", 25];
      // expectTypeOf(user).toMatchTypeOf(["Alice", 25]);
    });

    it("Les objets", () => {
      // const user: _____ = {
      //   name: "Eléanore",
      //   age: 30,
      //   isEmployed: true,
      // };
      // expectTypeOf(user).toEqualTypeOf({
      //   name: "Max",
      //   age: 42,
      //   isEmployed: false,
      // });
      // const company: _____ = {
      //   name: "Devoxx",
      //   address: {
      //     city: "Paris",
      //     zip: 75000,
      //   },
      // };
      // expectTypeOf(company).toEqualTypeOf({
      //   name: "Comet",
      //   address: {
      //     city: "Paris",
      //     zip: 75002,
      //   },
      // });
    });
  });
});

describe("Type of, keyof, lookup type", () => {
  it("typeof", () => {
    // const username = _____;
    // type UsernameType = typeof username;
    // expectTypeOf<UsernameType>().toMatchTypeOf<string>();
    // const config = _____;
    // type ConfigType = typeof config;
    // expectTypeOf<ConfigType>().toEqualTypeOf<{
    //   darkMode: boolean;
    //   version: number;
    // }>();
  });
  it("keyof", () => {
    // type User = _____
    // type UserKeys = keyof User;
    // expectTypeOf<UserKeys>().toEqualTypeOf<"id" | "name" | "email">();
  });
  
  it("lookup type", () => {
    // type User = _____
    // type UserEmailType = User["email"];
    // expectTypeOf<UserEmailType>().toEqualTypeOf<string>();
  });
});
