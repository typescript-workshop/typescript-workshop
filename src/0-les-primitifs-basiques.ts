import { expectTypeOf } from "vitest";

/**
 * Basiques
 *
 * Dans ce premier exercice, remplacer ______ par le type souhaité
 */

export function testBasics() {
  /**
   * Les types primitifs
   */
  const firstName: ______ = "Charlotte"; // "Charlotte" is a text value
  expectTypeOf(firstName).toEqualTypeOf("Charlotte");
  const age: _____ = 30; // Age is a number
  expectTypeOf(age).toEqualTypeOf(30);
  const isEven = (num: number) => num % 2 === 0;
  const isLoggedIn: _____ = true; // True/false value
  expectTypeOf(isLoggedIn).toEqualTypeOf(isEven(2));
  const emptyValue: _____ = null; // Represents intentional absence
  expectTypeOf(emptyValue).toEqualTypeOf(null);
  const notAssignedYet: _____ = undefined; // Declared but not yet given a value
  expectTypeOf(notAssignedYet).toEqualTypeOf(undefined);
  const uniqueId: _____ = Symbol("id"); // Unique and immutable identifier
  expectTypeOf(uniqueId).toEqualTypeOf(Symbol("id"));
  // (note: needs ES2020 or later)
  let reallyBigNumber: _____ = 1234567890123456789012345678901234567890n;
  expectTypeOf(reallyBigNumber).toEqualTypeOf(
    1234567890123456789012345678901234567890n
  );
}

/**
 * Les types par références
 */
export function testReferences() {
  /**
   * Array
   */
  // const scores: _____ = [85, 92, 78];
  // expectTypeOf(scores).toEqualTypeOf([85, 92, 78]);
  // const fruits: _____ = ["apple", "banana", "cherry"]; // Hint: strings only
  // expectTypeOf(fruits).toEqualTypeOf(["apple", "banana", "cherry"]);
  // // Syntaxe générique
  // const answers: Array<_____> = [true, false, true];
  // expectTypeOf(answers).toEqualTypeOf([true, false, true]);
  /**
   * Tuples
   */
  // const tuple: _____ = ["Alice", 25];
  // expectTypeOf(tuple).toMatchTypeOf(["Alice", 25]);
  /**
   * Les objets
   */
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
}

/**
 * Type of, keyof, lookup type
 */
export function testOperators() {
  /**
   * typeof
   */
  // const username = _____;
  // type UsernameType = typeof username;
  // expectTypeOf<UsernameType>().toMatchTypeOf<string>();
  // const config = _____;
  // type ConfigType = typeof config;
  // expectTypeOf<ConfigType>().toEqualTypeOf<{
  //   darkMode: boolean;
  //   version: number;
  // }>();
  /**
   * keyof
   */
  // type User = _____
  // type UserKeys = keyof User;
  // expectTypeOf<UserKeys>().toEqualTypeOf<"id" | "name" | "email">();
  /**
   * lookup type
   */
  // type Company = _____
  // type CompanyNameType = Company["name"];
  // expectTypeOf<CompanyNameType>().toEqualTypeOf<string>();
}

/**
 * Les types génériques
 */
export function testGenericsTypes() {
  /**
   * Utiliser un type générique pour typer la sortie
   */
  // function parseJSON<______>(input: string): ______ {
  //     return JSON.parse(input)
  // }
  // const inferredFromOutput: {otherProp: string} = parseJSON('{otherProp:"tata"}');
  // expectTypeOf(inferredFromOutput).toEqualTypeOf<{otherProp: string}>();
  //
  // const explicitGenericOutput = parseJSON<{ prop: string }>('{prop:"toto"}');
  // expectTypeOf(explicitGenericOutput).toEqualTypeOf<{ prop: string }>();
  /**
   * Utiliser un type générique pour typer un paramètre
   */
  // function addProp<______>(input: ______) {
  //     return {...input, newProp: 'yeahh'}
  // }
  //
  // const inferredFromInput = addProp({toto: "tata" as const});
  // expectTypeOf(inferredFromInput).toMatchTypeOf<{toto: "tata"; newProp: string}>();
  //
  // const explicitGenericInput = addProp<{prop1: string}>({prop1: "toto" });
  // expectTypeOf(explicitGenericInput).toMatchTypeOf<{prop1: string; newProp: string}>();
  /**
   * Utiliser plusieurs types génériques
   */
  // function transform<______, ______>(input: ______, fn: (input: ______) => ______): ______ {
  //     return fn(input)
  // }
  // function stringify(data: any) {
  //     return String(data)
  // }
  // function length(data: string) {
  //     return data.length
  // }
  // const transformStringifyOutput = transform(42, stringify)
  // expectTypeOf(transformStringifyOutput).toEqualTypeOf<string>();
  //
  // const transformLengthOutput = transform("four", length)
  // expectTypeOf(transformLengthOutput).toEqualTypeOf<number>();
  /**
   * Ajouter des contraintes
   */
  // function lookup<______, ______ extends ______>(data: ______, prop: ______) {
  //     return data[prop]
  // }
  // const userName = lookup({ name: "Max", age: 42}, 'name')
  // expectTypeOf(userName).toEqualTypeOf<string>();
  //
  // const stringLength = lookup("four", "length")
  // expectTypeOf(stringLength).toEqualTypeOf<number>();
}

export function testLiteralTypes() {
  /**
   * Construire un type template
   */
  // type FirstName = "Alice" | "Bob";
  // type LastName = "Erlandwon" | "Razowsky";
  // type AllFullNames = `${string}`;
  // expectTypeOf<AllFullNames>().toEqualTypeOf<
  //   "Alice Erlandwon" | "Alice Razowsky" | "Bob Erlandwon" | "Bob Razowsky"
  // >();
  /**
   * Inférer depuis un template
   */
  // type ExtractFeeling<Statement> =
  //   Statement extends `${infer firstPerson} ${string} ${infer secondPerson}`
  //     ? firstPerson
  //     : "";
  // type BobFeeling = ExtractFeeling<"Bob likes Alice">;
  // type AliceFeeling = ExtractFeeling<"Alice hates Bob">;
  // expectTypeOf<BobFeeling>().toEqualTypeOf<"likes">();
  // expectTypeOf<AliceFeeling>().toEqualTypeOf<"hates">();
}
