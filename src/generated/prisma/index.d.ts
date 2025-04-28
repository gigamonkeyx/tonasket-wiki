
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Business
 * 
 */
export type Business = $Result.DefaultSelection<Prisma.$BusinessPayload>
/**
 * Model BusinessSubmission
 * 
 */
export type BusinessSubmission = $Result.DefaultSelection<Prisma.$BusinessSubmissionPayload>
/**
 * Model EconomicData
 * 
 */
export type EconomicData = $Result.DefaultSelection<Prisma.$EconomicDataPayload>
/**
 * Model NewsArticle
 * 
 */
export type NewsArticle = $Result.DefaultSelection<Prisma.$NewsArticlePayload>
/**
 * Model WeatherData
 * 
 */
export type WeatherData = $Result.DefaultSelection<Prisma.$WeatherDataPayload>
/**
 * Model TradeImpactData
 * 
 */
export type TradeImpactData = $Result.DefaultSelection<Prisma.$TradeImpactDataPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.business`: Exposes CRUD operations for the **Business** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Businesses
    * const businesses = await prisma.business.findMany()
    * ```
    */
  get business(): Prisma.BusinessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.businessSubmission`: Exposes CRUD operations for the **BusinessSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BusinessSubmissions
    * const businessSubmissions = await prisma.businessSubmission.findMany()
    * ```
    */
  get businessSubmission(): Prisma.BusinessSubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.economicData`: Exposes CRUD operations for the **EconomicData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EconomicData
    * const economicData = await prisma.economicData.findMany()
    * ```
    */
  get economicData(): Prisma.EconomicDataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsArticle`: Exposes CRUD operations for the **NewsArticle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsArticles
    * const newsArticles = await prisma.newsArticle.findMany()
    * ```
    */
  get newsArticle(): Prisma.NewsArticleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weatherData`: Exposes CRUD operations for the **WeatherData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeatherData
    * const weatherData = await prisma.weatherData.findMany()
    * ```
    */
  get weatherData(): Prisma.WeatherDataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tradeImpactData`: Exposes CRUD operations for the **TradeImpactData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TradeImpactData
    * const tradeImpactData = await prisma.tradeImpactData.findMany()
    * ```
    */
  get tradeImpactData(): Prisma.TradeImpactDataDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Business: 'Business',
    BusinessSubmission: 'BusinessSubmission',
    EconomicData: 'EconomicData',
    NewsArticle: 'NewsArticle',
    WeatherData: 'WeatherData',
    TradeImpactData: 'TradeImpactData'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "business" | "businessSubmission" | "economicData" | "newsArticle" | "weatherData" | "tradeImpactData"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Business: {
        payload: Prisma.$BusinessPayload<ExtArgs>
        fields: Prisma.BusinessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          findFirst: {
            args: Prisma.BusinessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          findMany: {
            args: Prisma.BusinessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[]
          }
          create: {
            args: Prisma.BusinessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          createMany: {
            args: Prisma.BusinessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusinessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[]
          }
          delete: {
            args: Prisma.BusinessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          update: {
            args: Prisma.BusinessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          deleteMany: {
            args: Prisma.BusinessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BusinessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[]
          }
          upsert: {
            args: Prisma.BusinessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          aggregate: {
            args: Prisma.BusinessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusiness>
          }
          groupBy: {
            args: Prisma.BusinessGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessCountAggregateOutputType> | number
          }
        }
      }
      BusinessSubmission: {
        payload: Prisma.$BusinessSubmissionPayload<ExtArgs>
        fields: Prisma.BusinessSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessSubmissionPayload>
          }
          findFirst: {
            args: Prisma.BusinessSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessSubmissionPayload>
          }
          findMany: {
            args: Prisma.BusinessSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessSubmissionPayload>[]
          }
          create: {
            args: Prisma.BusinessSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessSubmissionPayload>
          }
          createMany: {
            args: Prisma.BusinessSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusinessSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessSubmissionPayload>[]
          }
          delete: {
            args: Prisma.BusinessSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessSubmissionPayload>
          }
          update: {
            args: Prisma.BusinessSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.BusinessSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BusinessSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.BusinessSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessSubmissionPayload>
          }
          aggregate: {
            args: Prisma.BusinessSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusinessSubmission>
          }
          groupBy: {
            args: Prisma.BusinessSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessSubmissionCountAggregateOutputType> | number
          }
        }
      }
      EconomicData: {
        payload: Prisma.$EconomicDataPayload<ExtArgs>
        fields: Prisma.EconomicDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EconomicDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EconomicDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EconomicDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EconomicDataPayload>
          }
          findFirst: {
            args: Prisma.EconomicDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EconomicDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EconomicDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EconomicDataPayload>
          }
          findMany: {
            args: Prisma.EconomicDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EconomicDataPayload>[]
          }
          create: {
            args: Prisma.EconomicDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EconomicDataPayload>
          }
          createMany: {
            args: Prisma.EconomicDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EconomicDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EconomicDataPayload>[]
          }
          delete: {
            args: Prisma.EconomicDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EconomicDataPayload>
          }
          update: {
            args: Prisma.EconomicDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EconomicDataPayload>
          }
          deleteMany: {
            args: Prisma.EconomicDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EconomicDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EconomicDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EconomicDataPayload>[]
          }
          upsert: {
            args: Prisma.EconomicDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EconomicDataPayload>
          }
          aggregate: {
            args: Prisma.EconomicDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEconomicData>
          }
          groupBy: {
            args: Prisma.EconomicDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<EconomicDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.EconomicDataCountArgs<ExtArgs>
            result: $Utils.Optional<EconomicDataCountAggregateOutputType> | number
          }
        }
      }
      NewsArticle: {
        payload: Prisma.$NewsArticlePayload<ExtArgs>
        fields: Prisma.NewsArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          findFirst: {
            args: Prisma.NewsArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          findMany: {
            args: Prisma.NewsArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>[]
          }
          create: {
            args: Prisma.NewsArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          createMany: {
            args: Prisma.NewsArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewsArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>[]
          }
          delete: {
            args: Prisma.NewsArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          update: {
            args: Prisma.NewsArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          deleteMany: {
            args: Prisma.NewsArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewsArticleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>[]
          }
          upsert: {
            args: Prisma.NewsArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsArticlePayload>
          }
          aggregate: {
            args: Prisma.NewsArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsArticle>
          }
          groupBy: {
            args: Prisma.NewsArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsArticleCountArgs<ExtArgs>
            result: $Utils.Optional<NewsArticleCountAggregateOutputType> | number
          }
        }
      }
      WeatherData: {
        payload: Prisma.$WeatherDataPayload<ExtArgs>
        fields: Prisma.WeatherDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeatherDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeatherDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherDataPayload>
          }
          findFirst: {
            args: Prisma.WeatherDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeatherDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherDataPayload>
          }
          findMany: {
            args: Prisma.WeatherDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherDataPayload>[]
          }
          create: {
            args: Prisma.WeatherDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherDataPayload>
          }
          createMany: {
            args: Prisma.WeatherDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeatherDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherDataPayload>[]
          }
          delete: {
            args: Prisma.WeatherDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherDataPayload>
          }
          update: {
            args: Prisma.WeatherDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherDataPayload>
          }
          deleteMany: {
            args: Prisma.WeatherDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeatherDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WeatherDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherDataPayload>[]
          }
          upsert: {
            args: Prisma.WeatherDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeatherDataPayload>
          }
          aggregate: {
            args: Prisma.WeatherDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeatherData>
          }
          groupBy: {
            args: Prisma.WeatherDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeatherDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeatherDataCountArgs<ExtArgs>
            result: $Utils.Optional<WeatherDataCountAggregateOutputType> | number
          }
        }
      }
      TradeImpactData: {
        payload: Prisma.$TradeImpactDataPayload<ExtArgs>
        fields: Prisma.TradeImpactDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeImpactDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeImpactDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeImpactDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeImpactDataPayload>
          }
          findFirst: {
            args: Prisma.TradeImpactDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeImpactDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeImpactDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeImpactDataPayload>
          }
          findMany: {
            args: Prisma.TradeImpactDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeImpactDataPayload>[]
          }
          create: {
            args: Prisma.TradeImpactDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeImpactDataPayload>
          }
          createMany: {
            args: Prisma.TradeImpactDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeImpactDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeImpactDataPayload>[]
          }
          delete: {
            args: Prisma.TradeImpactDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeImpactDataPayload>
          }
          update: {
            args: Prisma.TradeImpactDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeImpactDataPayload>
          }
          deleteMany: {
            args: Prisma.TradeImpactDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeImpactDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradeImpactDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeImpactDataPayload>[]
          }
          upsert: {
            args: Prisma.TradeImpactDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeImpactDataPayload>
          }
          aggregate: {
            args: Prisma.TradeImpactDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTradeImpactData>
          }
          groupBy: {
            args: Prisma.TradeImpactDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeImpactDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeImpactDataCountArgs<ExtArgs>
            result: $Utils.Optional<TradeImpactDataCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    business?: BusinessOmit
    businessSubmission?: BusinessSubmissionOmit
    economicData?: EconomicDataOmit
    newsArticle?: NewsArticleOmit
    weatherData?: WeatherDataOmit
    tradeImpactData?: TradeImpactDataOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Business
   */

  export type AggregateBusiness = {
    _count: BusinessCountAggregateOutputType | null
    _avg: BusinessAvgAggregateOutputType | null
    _sum: BusinessSumAggregateOutputType | null
    _min: BusinessMinAggregateOutputType | null
    _max: BusinessMaxAggregateOutputType | null
  }

  export type BusinessAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type BusinessSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type BusinessMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    address: string | null
    phone: string | null
    email: string | null
    website: string | null
    category: string | null
    subcategory: string | null
    hours: string | null
    founded: string | null
    employees: string | null
    featured: boolean | null
    image: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    address: string | null
    phone: string | null
    email: string | null
    website: string | null
    category: string | null
    subcategory: string | null
    hours: string | null
    founded: string | null
    employees: string | null
    featured: boolean | null
    image: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessCountAggregateOutputType = {
    id: number
    name: number
    description: number
    address: number
    phone: number
    email: number
    website: number
    category: number
    subcategory: number
    hours: number
    founded: number
    employees: number
    featured: number
    image: number
    services: number
    products: number
    tags: number
    socialMedia: number
    latitude: number
    longitude: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BusinessAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type BusinessSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type BusinessMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    category?: true
    subcategory?: true
    hours?: true
    founded?: true
    employees?: true
    featured?: true
    image?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    category?: true
    subcategory?: true
    hours?: true
    founded?: true
    employees?: true
    featured?: true
    image?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    category?: true
    subcategory?: true
    hours?: true
    founded?: true
    employees?: true
    featured?: true
    image?: true
    services?: true
    products?: true
    tags?: true
    socialMedia?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BusinessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Business to aggregate.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Businesses
    **/
    _count?: true | BusinessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BusinessAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BusinessSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessMaxAggregateInputType
  }

  export type GetBusinessAggregateType<T extends BusinessAggregateArgs> = {
        [P in keyof T & keyof AggregateBusiness]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusiness[P]>
      : GetScalarType<T[P], AggregateBusiness[P]>
  }




  export type BusinessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessWhereInput
    orderBy?: BusinessOrderByWithAggregationInput | BusinessOrderByWithAggregationInput[]
    by: BusinessScalarFieldEnum[] | BusinessScalarFieldEnum
    having?: BusinessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessCountAggregateInputType | true
    _avg?: BusinessAvgAggregateInputType
    _sum?: BusinessSumAggregateInputType
    _min?: BusinessMinAggregateInputType
    _max?: BusinessMaxAggregateInputType
  }

  export type BusinessGroupByOutputType = {
    id: string
    name: string
    description: string | null
    address: string | null
    phone: string | null
    email: string | null
    website: string | null
    category: string | null
    subcategory: string | null
    hours: string | null
    founded: string | null
    employees: string | null
    featured: boolean
    image: string | null
    services: string[]
    products: string[]
    tags: string[]
    socialMedia: JsonValue | null
    latitude: number | null
    longitude: number | null
    createdAt: Date
    updatedAt: Date
    _count: BusinessCountAggregateOutputType | null
    _avg: BusinessAvgAggregateOutputType | null
    _sum: BusinessSumAggregateOutputType | null
    _min: BusinessMinAggregateOutputType | null
    _max: BusinessMaxAggregateOutputType | null
  }

  type GetBusinessGroupByPayload<T extends BusinessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessGroupByOutputType[P]>
        }
      >
    >


  export type BusinessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    category?: boolean
    subcategory?: boolean
    hours?: boolean
    founded?: boolean
    employees?: boolean
    featured?: boolean
    image?: boolean
    services?: boolean
    products?: boolean
    tags?: boolean
    socialMedia?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["business"]>

  export type BusinessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    category?: boolean
    subcategory?: boolean
    hours?: boolean
    founded?: boolean
    employees?: boolean
    featured?: boolean
    image?: boolean
    services?: boolean
    products?: boolean
    tags?: boolean
    socialMedia?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["business"]>

  export type BusinessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    category?: boolean
    subcategory?: boolean
    hours?: boolean
    founded?: boolean
    employees?: boolean
    featured?: boolean
    image?: boolean
    services?: boolean
    products?: boolean
    tags?: boolean
    socialMedia?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["business"]>

  export type BusinessSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    category?: boolean
    subcategory?: boolean
    hours?: boolean
    founded?: boolean
    employees?: boolean
    featured?: boolean
    image?: boolean
    services?: boolean
    products?: boolean
    tags?: boolean
    socialMedia?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BusinessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "address" | "phone" | "email" | "website" | "category" | "subcategory" | "hours" | "founded" | "employees" | "featured" | "image" | "services" | "products" | "tags" | "socialMedia" | "latitude" | "longitude" | "createdAt" | "updatedAt", ExtArgs["result"]["business"]>

  export type $BusinessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Business"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      address: string | null
      phone: string | null
      email: string | null
      website: string | null
      category: string | null
      subcategory: string | null
      hours: string | null
      founded: string | null
      employees: string | null
      featured: boolean
      image: string | null
      services: string[]
      products: string[]
      tags: string[]
      socialMedia: Prisma.JsonValue | null
      latitude: number | null
      longitude: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["business"]>
    composites: {}
  }

  type BusinessGetPayload<S extends boolean | null | undefined | BusinessDefaultArgs> = $Result.GetResult<Prisma.$BusinessPayload, S>

  type BusinessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BusinessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BusinessCountAggregateInputType | true
    }

  export interface BusinessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Business'], meta: { name: 'Business' } }
    /**
     * Find zero or one Business that matches the filter.
     * @param {BusinessFindUniqueArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessFindUniqueArgs>(args: SelectSubset<T, BusinessFindUniqueArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Business that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BusinessFindUniqueOrThrowArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Business that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindFirstArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessFindFirstArgs>(args?: SelectSubset<T, BusinessFindFirstArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Business that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindFirstOrThrowArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Businesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Businesses
     * const businesses = await prisma.business.findMany()
     * 
     * // Get first 10 Businesses
     * const businesses = await prisma.business.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessWithIdOnly = await prisma.business.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BusinessFindManyArgs>(args?: SelectSubset<T, BusinessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Business.
     * @param {BusinessCreateArgs} args - Arguments to create a Business.
     * @example
     * // Create one Business
     * const Business = await prisma.business.create({
     *   data: {
     *     // ... data to create a Business
     *   }
     * })
     * 
     */
    create<T extends BusinessCreateArgs>(args: SelectSubset<T, BusinessCreateArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Businesses.
     * @param {BusinessCreateManyArgs} args - Arguments to create many Businesses.
     * @example
     * // Create many Businesses
     * const business = await prisma.business.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessCreateManyArgs>(args?: SelectSubset<T, BusinessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Businesses and returns the data saved in the database.
     * @param {BusinessCreateManyAndReturnArgs} args - Arguments to create many Businesses.
     * @example
     * // Create many Businesses
     * const business = await prisma.business.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Businesses and only return the `id`
     * const businessWithIdOnly = await prisma.business.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusinessCreateManyAndReturnArgs>(args?: SelectSubset<T, BusinessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Business.
     * @param {BusinessDeleteArgs} args - Arguments to delete one Business.
     * @example
     * // Delete one Business
     * const Business = await prisma.business.delete({
     *   where: {
     *     // ... filter to delete one Business
     *   }
     * })
     * 
     */
    delete<T extends BusinessDeleteArgs>(args: SelectSubset<T, BusinessDeleteArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Business.
     * @param {BusinessUpdateArgs} args - Arguments to update one Business.
     * @example
     * // Update one Business
     * const business = await prisma.business.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessUpdateArgs>(args: SelectSubset<T, BusinessUpdateArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Businesses.
     * @param {BusinessDeleteManyArgs} args - Arguments to filter Businesses to delete.
     * @example
     * // Delete a few Businesses
     * const { count } = await prisma.business.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessDeleteManyArgs>(args?: SelectSubset<T, BusinessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Businesses
     * const business = await prisma.business.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessUpdateManyArgs>(args: SelectSubset<T, BusinessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Businesses and returns the data updated in the database.
     * @param {BusinessUpdateManyAndReturnArgs} args - Arguments to update many Businesses.
     * @example
     * // Update many Businesses
     * const business = await prisma.business.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Businesses and only return the `id`
     * const businessWithIdOnly = await prisma.business.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BusinessUpdateManyAndReturnArgs>(args: SelectSubset<T, BusinessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Business.
     * @param {BusinessUpsertArgs} args - Arguments to update or create a Business.
     * @example
     * // Update or create a Business
     * const business = await prisma.business.upsert({
     *   create: {
     *     // ... data to create a Business
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Business we want to update
     *   }
     * })
     */
    upsert<T extends BusinessUpsertArgs>(args: SelectSubset<T, BusinessUpsertArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessCountArgs} args - Arguments to filter Businesses to count.
     * @example
     * // Count the number of Businesses
     * const count = await prisma.business.count({
     *   where: {
     *     // ... the filter for the Businesses we want to count
     *   }
     * })
    **/
    count<T extends BusinessCountArgs>(
      args?: Subset<T, BusinessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Business.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusinessAggregateArgs>(args: Subset<T, BusinessAggregateArgs>): Prisma.PrismaPromise<GetBusinessAggregateType<T>>

    /**
     * Group by Business.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BusinessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessGroupByArgs['orderBy'] }
        : { orderBy?: BusinessGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BusinessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Business model
   */
  readonly fields: BusinessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Business.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Business model
   */
  interface BusinessFieldRefs {
    readonly id: FieldRef<"Business", 'String'>
    readonly name: FieldRef<"Business", 'String'>
    readonly description: FieldRef<"Business", 'String'>
    readonly address: FieldRef<"Business", 'String'>
    readonly phone: FieldRef<"Business", 'String'>
    readonly email: FieldRef<"Business", 'String'>
    readonly website: FieldRef<"Business", 'String'>
    readonly category: FieldRef<"Business", 'String'>
    readonly subcategory: FieldRef<"Business", 'String'>
    readonly hours: FieldRef<"Business", 'String'>
    readonly founded: FieldRef<"Business", 'String'>
    readonly employees: FieldRef<"Business", 'String'>
    readonly featured: FieldRef<"Business", 'Boolean'>
    readonly image: FieldRef<"Business", 'String'>
    readonly services: FieldRef<"Business", 'String[]'>
    readonly products: FieldRef<"Business", 'String[]'>
    readonly tags: FieldRef<"Business", 'String[]'>
    readonly socialMedia: FieldRef<"Business", 'Json'>
    readonly latitude: FieldRef<"Business", 'Float'>
    readonly longitude: FieldRef<"Business", 'Float'>
    readonly createdAt: FieldRef<"Business", 'DateTime'>
    readonly updatedAt: FieldRef<"Business", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Business findUnique
   */
  export type BusinessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business findUniqueOrThrow
   */
  export type BusinessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business findFirst
   */
  export type BusinessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Businesses.
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Businesses.
     */
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[]
  }

  /**
   * Business findFirstOrThrow
   */
  export type BusinessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Businesses.
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Businesses.
     */
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[]
  }

  /**
   * Business findMany
   */
  export type BusinessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Filter, which Businesses to fetch.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Businesses.
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[]
  }

  /**
   * Business create
   */
  export type BusinessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * The data needed to create a Business.
     */
    data: XOR<BusinessCreateInput, BusinessUncheckedCreateInput>
  }

  /**
   * Business createMany
   */
  export type BusinessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Businesses.
     */
    data: BusinessCreateManyInput | BusinessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Business createManyAndReturn
   */
  export type BusinessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * The data used to create many Businesses.
     */
    data: BusinessCreateManyInput | BusinessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Business update
   */
  export type BusinessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * The data needed to update a Business.
     */
    data: XOR<BusinessUpdateInput, BusinessUncheckedUpdateInput>
    /**
     * Choose, which Business to update.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business updateMany
   */
  export type BusinessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Businesses.
     */
    data: XOR<BusinessUpdateManyMutationInput, BusinessUncheckedUpdateManyInput>
    /**
     * Filter which Businesses to update
     */
    where?: BusinessWhereInput
    /**
     * Limit how many Businesses to update.
     */
    limit?: number
  }

  /**
   * Business updateManyAndReturn
   */
  export type BusinessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * The data used to update Businesses.
     */
    data: XOR<BusinessUpdateManyMutationInput, BusinessUncheckedUpdateManyInput>
    /**
     * Filter which Businesses to update
     */
    where?: BusinessWhereInput
    /**
     * Limit how many Businesses to update.
     */
    limit?: number
  }

  /**
   * Business upsert
   */
  export type BusinessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * The filter to search for the Business to update in case it exists.
     */
    where: BusinessWhereUniqueInput
    /**
     * In case the Business found by the `where` argument doesn't exist, create a new Business with this data.
     */
    create: XOR<BusinessCreateInput, BusinessUncheckedCreateInput>
    /**
     * In case the Business was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessUpdateInput, BusinessUncheckedUpdateInput>
  }

  /**
   * Business delete
   */
  export type BusinessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Filter which Business to delete.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business deleteMany
   */
  export type BusinessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Businesses to delete
     */
    where?: BusinessWhereInput
    /**
     * Limit how many Businesses to delete.
     */
    limit?: number
  }

  /**
   * Business without action
   */
  export type BusinessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
  }


  /**
   * Model BusinessSubmission
   */

  export type AggregateBusinessSubmission = {
    _count: BusinessSubmissionCountAggregateOutputType | null
    _min: BusinessSubmissionMinAggregateOutputType | null
    _max: BusinessSubmissionMaxAggregateOutputType | null
  }

  export type BusinessSubmissionMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    address: string | null
    phone: string | null
    email: string | null
    website: string | null
    category: string | null
    subcategory: string | null
    hours: string | null
    founded: string | null
    status: string | null
    submittedAt: Date | null
    reviewedAt: Date | null
    reviewedBy: string | null
    reviewNotes: string | null
    businessId: string | null
  }

  export type BusinessSubmissionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    address: string | null
    phone: string | null
    email: string | null
    website: string | null
    category: string | null
    subcategory: string | null
    hours: string | null
    founded: string | null
    status: string | null
    submittedAt: Date | null
    reviewedAt: Date | null
    reviewedBy: string | null
    reviewNotes: string | null
    businessId: string | null
  }

  export type BusinessSubmissionCountAggregateOutputType = {
    id: number
    name: number
    description: number
    address: number
    phone: number
    email: number
    website: number
    category: number
    subcategory: number
    hours: number
    founded: number
    services: number
    products: number
    socialMedia: number
    status: number
    submittedAt: number
    reviewedAt: number
    reviewedBy: number
    reviewNotes: number
    businessId: number
    _all: number
  }


  export type BusinessSubmissionMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    category?: true
    subcategory?: true
    hours?: true
    founded?: true
    status?: true
    submittedAt?: true
    reviewedAt?: true
    reviewedBy?: true
    reviewNotes?: true
    businessId?: true
  }

  export type BusinessSubmissionMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    category?: true
    subcategory?: true
    hours?: true
    founded?: true
    status?: true
    submittedAt?: true
    reviewedAt?: true
    reviewedBy?: true
    reviewNotes?: true
    businessId?: true
  }

  export type BusinessSubmissionCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    phone?: true
    email?: true
    website?: true
    category?: true
    subcategory?: true
    hours?: true
    founded?: true
    services?: true
    products?: true
    socialMedia?: true
    status?: true
    submittedAt?: true
    reviewedAt?: true
    reviewedBy?: true
    reviewNotes?: true
    businessId?: true
    _all?: true
  }

  export type BusinessSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessSubmission to aggregate.
     */
    where?: BusinessSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessSubmissions to fetch.
     */
    orderBy?: BusinessSubmissionOrderByWithRelationInput | BusinessSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BusinessSubmissions
    **/
    _count?: true | BusinessSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessSubmissionMaxAggregateInputType
  }

  export type GetBusinessSubmissionAggregateType<T extends BusinessSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateBusinessSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusinessSubmission[P]>
      : GetScalarType<T[P], AggregateBusinessSubmission[P]>
  }




  export type BusinessSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessSubmissionWhereInput
    orderBy?: BusinessSubmissionOrderByWithAggregationInput | BusinessSubmissionOrderByWithAggregationInput[]
    by: BusinessSubmissionScalarFieldEnum[] | BusinessSubmissionScalarFieldEnum
    having?: BusinessSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessSubmissionCountAggregateInputType | true
    _min?: BusinessSubmissionMinAggregateInputType
    _max?: BusinessSubmissionMaxAggregateInputType
  }

  export type BusinessSubmissionGroupByOutputType = {
    id: string
    name: string
    description: string
    address: string
    phone: string
    email: string | null
    website: string | null
    category: string
    subcategory: string | null
    hours: string | null
    founded: string | null
    services: string[]
    products: string[]
    socialMedia: JsonValue | null
    status: string
    submittedAt: Date
    reviewedAt: Date | null
    reviewedBy: string | null
    reviewNotes: string | null
    businessId: string | null
    _count: BusinessSubmissionCountAggregateOutputType | null
    _min: BusinessSubmissionMinAggregateOutputType | null
    _max: BusinessSubmissionMaxAggregateOutputType | null
  }

  type GetBusinessSubmissionGroupByPayload<T extends BusinessSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type BusinessSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    category?: boolean
    subcategory?: boolean
    hours?: boolean
    founded?: boolean
    services?: boolean
    products?: boolean
    socialMedia?: boolean
    status?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    reviewNotes?: boolean
    businessId?: boolean
  }, ExtArgs["result"]["businessSubmission"]>

  export type BusinessSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    category?: boolean
    subcategory?: boolean
    hours?: boolean
    founded?: boolean
    services?: boolean
    products?: boolean
    socialMedia?: boolean
    status?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    reviewNotes?: boolean
    businessId?: boolean
  }, ExtArgs["result"]["businessSubmission"]>

  export type BusinessSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    category?: boolean
    subcategory?: boolean
    hours?: boolean
    founded?: boolean
    services?: boolean
    products?: boolean
    socialMedia?: boolean
    status?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    reviewNotes?: boolean
    businessId?: boolean
  }, ExtArgs["result"]["businessSubmission"]>

  export type BusinessSubmissionSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    website?: boolean
    category?: boolean
    subcategory?: boolean
    hours?: boolean
    founded?: boolean
    services?: boolean
    products?: boolean
    socialMedia?: boolean
    status?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    reviewNotes?: boolean
    businessId?: boolean
  }

  export type BusinessSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "address" | "phone" | "email" | "website" | "category" | "subcategory" | "hours" | "founded" | "services" | "products" | "socialMedia" | "status" | "submittedAt" | "reviewedAt" | "reviewedBy" | "reviewNotes" | "businessId", ExtArgs["result"]["businessSubmission"]>

  export type $BusinessSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BusinessSubmission"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      address: string
      phone: string
      email: string | null
      website: string | null
      category: string
      subcategory: string | null
      hours: string | null
      founded: string | null
      services: string[]
      products: string[]
      socialMedia: Prisma.JsonValue | null
      status: string
      submittedAt: Date
      reviewedAt: Date | null
      reviewedBy: string | null
      reviewNotes: string | null
      businessId: string | null
    }, ExtArgs["result"]["businessSubmission"]>
    composites: {}
  }

  type BusinessSubmissionGetPayload<S extends boolean | null | undefined | BusinessSubmissionDefaultArgs> = $Result.GetResult<Prisma.$BusinessSubmissionPayload, S>

  type BusinessSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BusinessSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BusinessSubmissionCountAggregateInputType | true
    }

  export interface BusinessSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BusinessSubmission'], meta: { name: 'BusinessSubmission' } }
    /**
     * Find zero or one BusinessSubmission that matches the filter.
     * @param {BusinessSubmissionFindUniqueArgs} args - Arguments to find a BusinessSubmission
     * @example
     * // Get one BusinessSubmission
     * const businessSubmission = await prisma.businessSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessSubmissionFindUniqueArgs>(args: SelectSubset<T, BusinessSubmissionFindUniqueArgs<ExtArgs>>): Prisma__BusinessSubmissionClient<$Result.GetResult<Prisma.$BusinessSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BusinessSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BusinessSubmissionFindUniqueOrThrowArgs} args - Arguments to find a BusinessSubmission
     * @example
     * // Get one BusinessSubmission
     * const businessSubmission = await prisma.businessSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessSubmissionClient<$Result.GetResult<Prisma.$BusinessSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusinessSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessSubmissionFindFirstArgs} args - Arguments to find a BusinessSubmission
     * @example
     * // Get one BusinessSubmission
     * const businessSubmission = await prisma.businessSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessSubmissionFindFirstArgs>(args?: SelectSubset<T, BusinessSubmissionFindFirstArgs<ExtArgs>>): Prisma__BusinessSubmissionClient<$Result.GetResult<Prisma.$BusinessSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusinessSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessSubmissionFindFirstOrThrowArgs} args - Arguments to find a BusinessSubmission
     * @example
     * // Get one BusinessSubmission
     * const businessSubmission = await prisma.businessSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessSubmissionClient<$Result.GetResult<Prisma.$BusinessSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BusinessSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BusinessSubmissions
     * const businessSubmissions = await prisma.businessSubmission.findMany()
     * 
     * // Get first 10 BusinessSubmissions
     * const businessSubmissions = await prisma.businessSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessSubmissionWithIdOnly = await prisma.businessSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BusinessSubmissionFindManyArgs>(args?: SelectSubset<T, BusinessSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BusinessSubmission.
     * @param {BusinessSubmissionCreateArgs} args - Arguments to create a BusinessSubmission.
     * @example
     * // Create one BusinessSubmission
     * const BusinessSubmission = await prisma.businessSubmission.create({
     *   data: {
     *     // ... data to create a BusinessSubmission
     *   }
     * })
     * 
     */
    create<T extends BusinessSubmissionCreateArgs>(args: SelectSubset<T, BusinessSubmissionCreateArgs<ExtArgs>>): Prisma__BusinessSubmissionClient<$Result.GetResult<Prisma.$BusinessSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BusinessSubmissions.
     * @param {BusinessSubmissionCreateManyArgs} args - Arguments to create many BusinessSubmissions.
     * @example
     * // Create many BusinessSubmissions
     * const businessSubmission = await prisma.businessSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessSubmissionCreateManyArgs>(args?: SelectSubset<T, BusinessSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BusinessSubmissions and returns the data saved in the database.
     * @param {BusinessSubmissionCreateManyAndReturnArgs} args - Arguments to create many BusinessSubmissions.
     * @example
     * // Create many BusinessSubmissions
     * const businessSubmission = await prisma.businessSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BusinessSubmissions and only return the `id`
     * const businessSubmissionWithIdOnly = await prisma.businessSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusinessSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, BusinessSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BusinessSubmission.
     * @param {BusinessSubmissionDeleteArgs} args - Arguments to delete one BusinessSubmission.
     * @example
     * // Delete one BusinessSubmission
     * const BusinessSubmission = await prisma.businessSubmission.delete({
     *   where: {
     *     // ... filter to delete one BusinessSubmission
     *   }
     * })
     * 
     */
    delete<T extends BusinessSubmissionDeleteArgs>(args: SelectSubset<T, BusinessSubmissionDeleteArgs<ExtArgs>>): Prisma__BusinessSubmissionClient<$Result.GetResult<Prisma.$BusinessSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BusinessSubmission.
     * @param {BusinessSubmissionUpdateArgs} args - Arguments to update one BusinessSubmission.
     * @example
     * // Update one BusinessSubmission
     * const businessSubmission = await prisma.businessSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessSubmissionUpdateArgs>(args: SelectSubset<T, BusinessSubmissionUpdateArgs<ExtArgs>>): Prisma__BusinessSubmissionClient<$Result.GetResult<Prisma.$BusinessSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BusinessSubmissions.
     * @param {BusinessSubmissionDeleteManyArgs} args - Arguments to filter BusinessSubmissions to delete.
     * @example
     * // Delete a few BusinessSubmissions
     * const { count } = await prisma.businessSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessSubmissionDeleteManyArgs>(args?: SelectSubset<T, BusinessSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BusinessSubmissions
     * const businessSubmission = await prisma.businessSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessSubmissionUpdateManyArgs>(args: SelectSubset<T, BusinessSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessSubmissions and returns the data updated in the database.
     * @param {BusinessSubmissionUpdateManyAndReturnArgs} args - Arguments to update many BusinessSubmissions.
     * @example
     * // Update many BusinessSubmissions
     * const businessSubmission = await prisma.businessSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BusinessSubmissions and only return the `id`
     * const businessSubmissionWithIdOnly = await prisma.businessSubmission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BusinessSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, BusinessSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BusinessSubmission.
     * @param {BusinessSubmissionUpsertArgs} args - Arguments to update or create a BusinessSubmission.
     * @example
     * // Update or create a BusinessSubmission
     * const businessSubmission = await prisma.businessSubmission.upsert({
     *   create: {
     *     // ... data to create a BusinessSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BusinessSubmission we want to update
     *   }
     * })
     */
    upsert<T extends BusinessSubmissionUpsertArgs>(args: SelectSubset<T, BusinessSubmissionUpsertArgs<ExtArgs>>): Prisma__BusinessSubmissionClient<$Result.GetResult<Prisma.$BusinessSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BusinessSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessSubmissionCountArgs} args - Arguments to filter BusinessSubmissions to count.
     * @example
     * // Count the number of BusinessSubmissions
     * const count = await prisma.businessSubmission.count({
     *   where: {
     *     // ... the filter for the BusinessSubmissions we want to count
     *   }
     * })
    **/
    count<T extends BusinessSubmissionCountArgs>(
      args?: Subset<T, BusinessSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BusinessSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusinessSubmissionAggregateArgs>(args: Subset<T, BusinessSubmissionAggregateArgs>): Prisma.PrismaPromise<GetBusinessSubmissionAggregateType<T>>

    /**
     * Group by BusinessSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessSubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BusinessSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: BusinessSubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BusinessSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BusinessSubmission model
   */
  readonly fields: BusinessSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BusinessSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BusinessSubmission model
   */
  interface BusinessSubmissionFieldRefs {
    readonly id: FieldRef<"BusinessSubmission", 'String'>
    readonly name: FieldRef<"BusinessSubmission", 'String'>
    readonly description: FieldRef<"BusinessSubmission", 'String'>
    readonly address: FieldRef<"BusinessSubmission", 'String'>
    readonly phone: FieldRef<"BusinessSubmission", 'String'>
    readonly email: FieldRef<"BusinessSubmission", 'String'>
    readonly website: FieldRef<"BusinessSubmission", 'String'>
    readonly category: FieldRef<"BusinessSubmission", 'String'>
    readonly subcategory: FieldRef<"BusinessSubmission", 'String'>
    readonly hours: FieldRef<"BusinessSubmission", 'String'>
    readonly founded: FieldRef<"BusinessSubmission", 'String'>
    readonly services: FieldRef<"BusinessSubmission", 'String[]'>
    readonly products: FieldRef<"BusinessSubmission", 'String[]'>
    readonly socialMedia: FieldRef<"BusinessSubmission", 'Json'>
    readonly status: FieldRef<"BusinessSubmission", 'String'>
    readonly submittedAt: FieldRef<"BusinessSubmission", 'DateTime'>
    readonly reviewedAt: FieldRef<"BusinessSubmission", 'DateTime'>
    readonly reviewedBy: FieldRef<"BusinessSubmission", 'String'>
    readonly reviewNotes: FieldRef<"BusinessSubmission", 'String'>
    readonly businessId: FieldRef<"BusinessSubmission", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BusinessSubmission findUnique
   */
  export type BusinessSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessSubmission
     */
    select?: BusinessSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessSubmission
     */
    omit?: BusinessSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which BusinessSubmission to fetch.
     */
    where: BusinessSubmissionWhereUniqueInput
  }

  /**
   * BusinessSubmission findUniqueOrThrow
   */
  export type BusinessSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessSubmission
     */
    select?: BusinessSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessSubmission
     */
    omit?: BusinessSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which BusinessSubmission to fetch.
     */
    where: BusinessSubmissionWhereUniqueInput
  }

  /**
   * BusinessSubmission findFirst
   */
  export type BusinessSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessSubmission
     */
    select?: BusinessSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessSubmission
     */
    omit?: BusinessSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which BusinessSubmission to fetch.
     */
    where?: BusinessSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessSubmissions to fetch.
     */
    orderBy?: BusinessSubmissionOrderByWithRelationInput | BusinessSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessSubmissions.
     */
    cursor?: BusinessSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessSubmissions.
     */
    distinct?: BusinessSubmissionScalarFieldEnum | BusinessSubmissionScalarFieldEnum[]
  }

  /**
   * BusinessSubmission findFirstOrThrow
   */
  export type BusinessSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessSubmission
     */
    select?: BusinessSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessSubmission
     */
    omit?: BusinessSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which BusinessSubmission to fetch.
     */
    where?: BusinessSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessSubmissions to fetch.
     */
    orderBy?: BusinessSubmissionOrderByWithRelationInput | BusinessSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessSubmissions.
     */
    cursor?: BusinessSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessSubmissions.
     */
    distinct?: BusinessSubmissionScalarFieldEnum | BusinessSubmissionScalarFieldEnum[]
  }

  /**
   * BusinessSubmission findMany
   */
  export type BusinessSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessSubmission
     */
    select?: BusinessSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessSubmission
     */
    omit?: BusinessSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which BusinessSubmissions to fetch.
     */
    where?: BusinessSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessSubmissions to fetch.
     */
    orderBy?: BusinessSubmissionOrderByWithRelationInput | BusinessSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BusinessSubmissions.
     */
    cursor?: BusinessSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessSubmissions.
     */
    skip?: number
    distinct?: BusinessSubmissionScalarFieldEnum | BusinessSubmissionScalarFieldEnum[]
  }

  /**
   * BusinessSubmission create
   */
  export type BusinessSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessSubmission
     */
    select?: BusinessSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessSubmission
     */
    omit?: BusinessSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to create a BusinessSubmission.
     */
    data: XOR<BusinessSubmissionCreateInput, BusinessSubmissionUncheckedCreateInput>
  }

  /**
   * BusinessSubmission createMany
   */
  export type BusinessSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BusinessSubmissions.
     */
    data: BusinessSubmissionCreateManyInput | BusinessSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusinessSubmission createManyAndReturn
   */
  export type BusinessSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessSubmission
     */
    select?: BusinessSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessSubmission
     */
    omit?: BusinessSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many BusinessSubmissions.
     */
    data: BusinessSubmissionCreateManyInput | BusinessSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusinessSubmission update
   */
  export type BusinessSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessSubmission
     */
    select?: BusinessSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessSubmission
     */
    omit?: BusinessSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to update a BusinessSubmission.
     */
    data: XOR<BusinessSubmissionUpdateInput, BusinessSubmissionUncheckedUpdateInput>
    /**
     * Choose, which BusinessSubmission to update.
     */
    where: BusinessSubmissionWhereUniqueInput
  }

  /**
   * BusinessSubmission updateMany
   */
  export type BusinessSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BusinessSubmissions.
     */
    data: XOR<BusinessSubmissionUpdateManyMutationInput, BusinessSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which BusinessSubmissions to update
     */
    where?: BusinessSubmissionWhereInput
    /**
     * Limit how many BusinessSubmissions to update.
     */
    limit?: number
  }

  /**
   * BusinessSubmission updateManyAndReturn
   */
  export type BusinessSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessSubmission
     */
    select?: BusinessSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessSubmission
     */
    omit?: BusinessSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update BusinessSubmissions.
     */
    data: XOR<BusinessSubmissionUpdateManyMutationInput, BusinessSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which BusinessSubmissions to update
     */
    where?: BusinessSubmissionWhereInput
    /**
     * Limit how many BusinessSubmissions to update.
     */
    limit?: number
  }

  /**
   * BusinessSubmission upsert
   */
  export type BusinessSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessSubmission
     */
    select?: BusinessSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessSubmission
     */
    omit?: BusinessSubmissionOmit<ExtArgs> | null
    /**
     * The filter to search for the BusinessSubmission to update in case it exists.
     */
    where: BusinessSubmissionWhereUniqueInput
    /**
     * In case the BusinessSubmission found by the `where` argument doesn't exist, create a new BusinessSubmission with this data.
     */
    create: XOR<BusinessSubmissionCreateInput, BusinessSubmissionUncheckedCreateInput>
    /**
     * In case the BusinessSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessSubmissionUpdateInput, BusinessSubmissionUncheckedUpdateInput>
  }

  /**
   * BusinessSubmission delete
   */
  export type BusinessSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessSubmission
     */
    select?: BusinessSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessSubmission
     */
    omit?: BusinessSubmissionOmit<ExtArgs> | null
    /**
     * Filter which BusinessSubmission to delete.
     */
    where: BusinessSubmissionWhereUniqueInput
  }

  /**
   * BusinessSubmission deleteMany
   */
  export type BusinessSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessSubmissions to delete
     */
    where?: BusinessSubmissionWhereInput
    /**
     * Limit how many BusinessSubmissions to delete.
     */
    limit?: number
  }

  /**
   * BusinessSubmission without action
   */
  export type BusinessSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessSubmission
     */
    select?: BusinessSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessSubmission
     */
    omit?: BusinessSubmissionOmit<ExtArgs> | null
  }


  /**
   * Model EconomicData
   */

  export type AggregateEconomicData = {
    _count: EconomicDataCountAggregateOutputType | null
    _min: EconomicDataMinAggregateOutputType | null
    _max: EconomicDataMaxAggregateOutputType | null
  }

  export type EconomicDataMinAggregateOutputType = {
    id: string | null
    category: string | null
    title: string | null
    value: string | null
    date: Date | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EconomicDataMaxAggregateOutputType = {
    id: string | null
    category: string | null
    title: string | null
    value: string | null
    date: Date | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EconomicDataCountAggregateOutputType = {
    id: number
    category: number
    title: number
    value: number
    date: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EconomicDataMinAggregateInputType = {
    id?: true
    category?: true
    title?: true
    value?: true
    date?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EconomicDataMaxAggregateInputType = {
    id?: true
    category?: true
    title?: true
    value?: true
    date?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EconomicDataCountAggregateInputType = {
    id?: true
    category?: true
    title?: true
    value?: true
    date?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EconomicDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EconomicData to aggregate.
     */
    where?: EconomicDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EconomicData to fetch.
     */
    orderBy?: EconomicDataOrderByWithRelationInput | EconomicDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EconomicDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EconomicData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EconomicData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EconomicData
    **/
    _count?: true | EconomicDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EconomicDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EconomicDataMaxAggregateInputType
  }

  export type GetEconomicDataAggregateType<T extends EconomicDataAggregateArgs> = {
        [P in keyof T & keyof AggregateEconomicData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEconomicData[P]>
      : GetScalarType<T[P], AggregateEconomicData[P]>
  }




  export type EconomicDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EconomicDataWhereInput
    orderBy?: EconomicDataOrderByWithAggregationInput | EconomicDataOrderByWithAggregationInput[]
    by: EconomicDataScalarFieldEnum[] | EconomicDataScalarFieldEnum
    having?: EconomicDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EconomicDataCountAggregateInputType | true
    _min?: EconomicDataMinAggregateInputType
    _max?: EconomicDataMaxAggregateInputType
  }

  export type EconomicDataGroupByOutputType = {
    id: string
    category: string
    title: string
    value: string
    date: Date
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: EconomicDataCountAggregateOutputType | null
    _min: EconomicDataMinAggregateOutputType | null
    _max: EconomicDataMaxAggregateOutputType | null
  }

  type GetEconomicDataGroupByPayload<T extends EconomicDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EconomicDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EconomicDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EconomicDataGroupByOutputType[P]>
            : GetScalarType<T[P], EconomicDataGroupByOutputType[P]>
        }
      >
    >


  export type EconomicDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    title?: boolean
    value?: boolean
    date?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["economicData"]>

  export type EconomicDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    title?: boolean
    value?: boolean
    date?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["economicData"]>

  export type EconomicDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    title?: boolean
    value?: boolean
    date?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["economicData"]>

  export type EconomicDataSelectScalar = {
    id?: boolean
    category?: boolean
    title?: boolean
    value?: boolean
    date?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EconomicDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "category" | "title" | "value" | "date" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["economicData"]>

  export type $EconomicDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EconomicData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      category: string
      title: string
      value: string
      date: Date
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["economicData"]>
    composites: {}
  }

  type EconomicDataGetPayload<S extends boolean | null | undefined | EconomicDataDefaultArgs> = $Result.GetResult<Prisma.$EconomicDataPayload, S>

  type EconomicDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EconomicDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EconomicDataCountAggregateInputType | true
    }

  export interface EconomicDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EconomicData'], meta: { name: 'EconomicData' } }
    /**
     * Find zero or one EconomicData that matches the filter.
     * @param {EconomicDataFindUniqueArgs} args - Arguments to find a EconomicData
     * @example
     * // Get one EconomicData
     * const economicData = await prisma.economicData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EconomicDataFindUniqueArgs>(args: SelectSubset<T, EconomicDataFindUniqueArgs<ExtArgs>>): Prisma__EconomicDataClient<$Result.GetResult<Prisma.$EconomicDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EconomicData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EconomicDataFindUniqueOrThrowArgs} args - Arguments to find a EconomicData
     * @example
     * // Get one EconomicData
     * const economicData = await prisma.economicData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EconomicDataFindUniqueOrThrowArgs>(args: SelectSubset<T, EconomicDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EconomicDataClient<$Result.GetResult<Prisma.$EconomicDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EconomicData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EconomicDataFindFirstArgs} args - Arguments to find a EconomicData
     * @example
     * // Get one EconomicData
     * const economicData = await prisma.economicData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EconomicDataFindFirstArgs>(args?: SelectSubset<T, EconomicDataFindFirstArgs<ExtArgs>>): Prisma__EconomicDataClient<$Result.GetResult<Prisma.$EconomicDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EconomicData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EconomicDataFindFirstOrThrowArgs} args - Arguments to find a EconomicData
     * @example
     * // Get one EconomicData
     * const economicData = await prisma.economicData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EconomicDataFindFirstOrThrowArgs>(args?: SelectSubset<T, EconomicDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__EconomicDataClient<$Result.GetResult<Prisma.$EconomicDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EconomicData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EconomicDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EconomicData
     * const economicData = await prisma.economicData.findMany()
     * 
     * // Get first 10 EconomicData
     * const economicData = await prisma.economicData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const economicDataWithIdOnly = await prisma.economicData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EconomicDataFindManyArgs>(args?: SelectSubset<T, EconomicDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EconomicDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EconomicData.
     * @param {EconomicDataCreateArgs} args - Arguments to create a EconomicData.
     * @example
     * // Create one EconomicData
     * const EconomicData = await prisma.economicData.create({
     *   data: {
     *     // ... data to create a EconomicData
     *   }
     * })
     * 
     */
    create<T extends EconomicDataCreateArgs>(args: SelectSubset<T, EconomicDataCreateArgs<ExtArgs>>): Prisma__EconomicDataClient<$Result.GetResult<Prisma.$EconomicDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EconomicData.
     * @param {EconomicDataCreateManyArgs} args - Arguments to create many EconomicData.
     * @example
     * // Create many EconomicData
     * const economicData = await prisma.economicData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EconomicDataCreateManyArgs>(args?: SelectSubset<T, EconomicDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EconomicData and returns the data saved in the database.
     * @param {EconomicDataCreateManyAndReturnArgs} args - Arguments to create many EconomicData.
     * @example
     * // Create many EconomicData
     * const economicData = await prisma.economicData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EconomicData and only return the `id`
     * const economicDataWithIdOnly = await prisma.economicData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EconomicDataCreateManyAndReturnArgs>(args?: SelectSubset<T, EconomicDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EconomicDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EconomicData.
     * @param {EconomicDataDeleteArgs} args - Arguments to delete one EconomicData.
     * @example
     * // Delete one EconomicData
     * const EconomicData = await prisma.economicData.delete({
     *   where: {
     *     // ... filter to delete one EconomicData
     *   }
     * })
     * 
     */
    delete<T extends EconomicDataDeleteArgs>(args: SelectSubset<T, EconomicDataDeleteArgs<ExtArgs>>): Prisma__EconomicDataClient<$Result.GetResult<Prisma.$EconomicDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EconomicData.
     * @param {EconomicDataUpdateArgs} args - Arguments to update one EconomicData.
     * @example
     * // Update one EconomicData
     * const economicData = await prisma.economicData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EconomicDataUpdateArgs>(args: SelectSubset<T, EconomicDataUpdateArgs<ExtArgs>>): Prisma__EconomicDataClient<$Result.GetResult<Prisma.$EconomicDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EconomicData.
     * @param {EconomicDataDeleteManyArgs} args - Arguments to filter EconomicData to delete.
     * @example
     * // Delete a few EconomicData
     * const { count } = await prisma.economicData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EconomicDataDeleteManyArgs>(args?: SelectSubset<T, EconomicDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EconomicData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EconomicDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EconomicData
     * const economicData = await prisma.economicData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EconomicDataUpdateManyArgs>(args: SelectSubset<T, EconomicDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EconomicData and returns the data updated in the database.
     * @param {EconomicDataUpdateManyAndReturnArgs} args - Arguments to update many EconomicData.
     * @example
     * // Update many EconomicData
     * const economicData = await prisma.economicData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EconomicData and only return the `id`
     * const economicDataWithIdOnly = await prisma.economicData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EconomicDataUpdateManyAndReturnArgs>(args: SelectSubset<T, EconomicDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EconomicDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EconomicData.
     * @param {EconomicDataUpsertArgs} args - Arguments to update or create a EconomicData.
     * @example
     * // Update or create a EconomicData
     * const economicData = await prisma.economicData.upsert({
     *   create: {
     *     // ... data to create a EconomicData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EconomicData we want to update
     *   }
     * })
     */
    upsert<T extends EconomicDataUpsertArgs>(args: SelectSubset<T, EconomicDataUpsertArgs<ExtArgs>>): Prisma__EconomicDataClient<$Result.GetResult<Prisma.$EconomicDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EconomicData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EconomicDataCountArgs} args - Arguments to filter EconomicData to count.
     * @example
     * // Count the number of EconomicData
     * const count = await prisma.economicData.count({
     *   where: {
     *     // ... the filter for the EconomicData we want to count
     *   }
     * })
    **/
    count<T extends EconomicDataCountArgs>(
      args?: Subset<T, EconomicDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EconomicDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EconomicData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EconomicDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EconomicDataAggregateArgs>(args: Subset<T, EconomicDataAggregateArgs>): Prisma.PrismaPromise<GetEconomicDataAggregateType<T>>

    /**
     * Group by EconomicData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EconomicDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EconomicDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EconomicDataGroupByArgs['orderBy'] }
        : { orderBy?: EconomicDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EconomicDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEconomicDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EconomicData model
   */
  readonly fields: EconomicDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EconomicData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EconomicDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EconomicData model
   */
  interface EconomicDataFieldRefs {
    readonly id: FieldRef<"EconomicData", 'String'>
    readonly category: FieldRef<"EconomicData", 'String'>
    readonly title: FieldRef<"EconomicData", 'String'>
    readonly value: FieldRef<"EconomicData", 'String'>
    readonly date: FieldRef<"EconomicData", 'DateTime'>
    readonly source: FieldRef<"EconomicData", 'String'>
    readonly createdAt: FieldRef<"EconomicData", 'DateTime'>
    readonly updatedAt: FieldRef<"EconomicData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EconomicData findUnique
   */
  export type EconomicDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EconomicData
     */
    select?: EconomicDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EconomicData
     */
    omit?: EconomicDataOmit<ExtArgs> | null
    /**
     * Filter, which EconomicData to fetch.
     */
    where: EconomicDataWhereUniqueInput
  }

  /**
   * EconomicData findUniqueOrThrow
   */
  export type EconomicDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EconomicData
     */
    select?: EconomicDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EconomicData
     */
    omit?: EconomicDataOmit<ExtArgs> | null
    /**
     * Filter, which EconomicData to fetch.
     */
    where: EconomicDataWhereUniqueInput
  }

  /**
   * EconomicData findFirst
   */
  export type EconomicDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EconomicData
     */
    select?: EconomicDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EconomicData
     */
    omit?: EconomicDataOmit<ExtArgs> | null
    /**
     * Filter, which EconomicData to fetch.
     */
    where?: EconomicDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EconomicData to fetch.
     */
    orderBy?: EconomicDataOrderByWithRelationInput | EconomicDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EconomicData.
     */
    cursor?: EconomicDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EconomicData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EconomicData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EconomicData.
     */
    distinct?: EconomicDataScalarFieldEnum | EconomicDataScalarFieldEnum[]
  }

  /**
   * EconomicData findFirstOrThrow
   */
  export type EconomicDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EconomicData
     */
    select?: EconomicDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EconomicData
     */
    omit?: EconomicDataOmit<ExtArgs> | null
    /**
     * Filter, which EconomicData to fetch.
     */
    where?: EconomicDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EconomicData to fetch.
     */
    orderBy?: EconomicDataOrderByWithRelationInput | EconomicDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EconomicData.
     */
    cursor?: EconomicDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EconomicData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EconomicData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EconomicData.
     */
    distinct?: EconomicDataScalarFieldEnum | EconomicDataScalarFieldEnum[]
  }

  /**
   * EconomicData findMany
   */
  export type EconomicDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EconomicData
     */
    select?: EconomicDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EconomicData
     */
    omit?: EconomicDataOmit<ExtArgs> | null
    /**
     * Filter, which EconomicData to fetch.
     */
    where?: EconomicDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EconomicData to fetch.
     */
    orderBy?: EconomicDataOrderByWithRelationInput | EconomicDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EconomicData.
     */
    cursor?: EconomicDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EconomicData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EconomicData.
     */
    skip?: number
    distinct?: EconomicDataScalarFieldEnum | EconomicDataScalarFieldEnum[]
  }

  /**
   * EconomicData create
   */
  export type EconomicDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EconomicData
     */
    select?: EconomicDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EconomicData
     */
    omit?: EconomicDataOmit<ExtArgs> | null
    /**
     * The data needed to create a EconomicData.
     */
    data: XOR<EconomicDataCreateInput, EconomicDataUncheckedCreateInput>
  }

  /**
   * EconomicData createMany
   */
  export type EconomicDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EconomicData.
     */
    data: EconomicDataCreateManyInput | EconomicDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EconomicData createManyAndReturn
   */
  export type EconomicDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EconomicData
     */
    select?: EconomicDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EconomicData
     */
    omit?: EconomicDataOmit<ExtArgs> | null
    /**
     * The data used to create many EconomicData.
     */
    data: EconomicDataCreateManyInput | EconomicDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EconomicData update
   */
  export type EconomicDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EconomicData
     */
    select?: EconomicDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EconomicData
     */
    omit?: EconomicDataOmit<ExtArgs> | null
    /**
     * The data needed to update a EconomicData.
     */
    data: XOR<EconomicDataUpdateInput, EconomicDataUncheckedUpdateInput>
    /**
     * Choose, which EconomicData to update.
     */
    where: EconomicDataWhereUniqueInput
  }

  /**
   * EconomicData updateMany
   */
  export type EconomicDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EconomicData.
     */
    data: XOR<EconomicDataUpdateManyMutationInput, EconomicDataUncheckedUpdateManyInput>
    /**
     * Filter which EconomicData to update
     */
    where?: EconomicDataWhereInput
    /**
     * Limit how many EconomicData to update.
     */
    limit?: number
  }

  /**
   * EconomicData updateManyAndReturn
   */
  export type EconomicDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EconomicData
     */
    select?: EconomicDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EconomicData
     */
    omit?: EconomicDataOmit<ExtArgs> | null
    /**
     * The data used to update EconomicData.
     */
    data: XOR<EconomicDataUpdateManyMutationInput, EconomicDataUncheckedUpdateManyInput>
    /**
     * Filter which EconomicData to update
     */
    where?: EconomicDataWhereInput
    /**
     * Limit how many EconomicData to update.
     */
    limit?: number
  }

  /**
   * EconomicData upsert
   */
  export type EconomicDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EconomicData
     */
    select?: EconomicDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EconomicData
     */
    omit?: EconomicDataOmit<ExtArgs> | null
    /**
     * The filter to search for the EconomicData to update in case it exists.
     */
    where: EconomicDataWhereUniqueInput
    /**
     * In case the EconomicData found by the `where` argument doesn't exist, create a new EconomicData with this data.
     */
    create: XOR<EconomicDataCreateInput, EconomicDataUncheckedCreateInput>
    /**
     * In case the EconomicData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EconomicDataUpdateInput, EconomicDataUncheckedUpdateInput>
  }

  /**
   * EconomicData delete
   */
  export type EconomicDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EconomicData
     */
    select?: EconomicDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EconomicData
     */
    omit?: EconomicDataOmit<ExtArgs> | null
    /**
     * Filter which EconomicData to delete.
     */
    where: EconomicDataWhereUniqueInput
  }

  /**
   * EconomicData deleteMany
   */
  export type EconomicDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EconomicData to delete
     */
    where?: EconomicDataWhereInput
    /**
     * Limit how many EconomicData to delete.
     */
    limit?: number
  }

  /**
   * EconomicData without action
   */
  export type EconomicDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EconomicData
     */
    select?: EconomicDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EconomicData
     */
    omit?: EconomicDataOmit<ExtArgs> | null
  }


  /**
   * Model NewsArticle
   */

  export type AggregateNewsArticle = {
    _count: NewsArticleCountAggregateOutputType | null
    _min: NewsArticleMinAggregateOutputType | null
    _max: NewsArticleMaxAggregateOutputType | null
  }

  export type NewsArticleMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    source: string | null
    url: string | null
    imageUrl: string | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsArticleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    source: string | null
    url: string | null
    imageUrl: string | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsArticleCountAggregateOutputType = {
    id: number
    title: number
    content: number
    source: number
    url: number
    imageUrl: number
    publishedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NewsArticleMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    source?: true
    url?: true
    imageUrl?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsArticleMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    source?: true
    url?: true
    imageUrl?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsArticleCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    source?: true
    url?: true
    imageUrl?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NewsArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsArticle to aggregate.
     */
    where?: NewsArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsArticles to fetch.
     */
    orderBy?: NewsArticleOrderByWithRelationInput | NewsArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsArticles
    **/
    _count?: true | NewsArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsArticleMaxAggregateInputType
  }

  export type GetNewsArticleAggregateType<T extends NewsArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsArticle[P]>
      : GetScalarType<T[P], AggregateNewsArticle[P]>
  }




  export type NewsArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsArticleWhereInput
    orderBy?: NewsArticleOrderByWithAggregationInput | NewsArticleOrderByWithAggregationInput[]
    by: NewsArticleScalarFieldEnum[] | NewsArticleScalarFieldEnum
    having?: NewsArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsArticleCountAggregateInputType | true
    _min?: NewsArticleMinAggregateInputType
    _max?: NewsArticleMaxAggregateInputType
  }

  export type NewsArticleGroupByOutputType = {
    id: string
    title: string
    content: string
    source: string
    url: string
    imageUrl: string | null
    publishedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: NewsArticleCountAggregateOutputType | null
    _min: NewsArticleMinAggregateOutputType | null
    _max: NewsArticleMaxAggregateOutputType | null
  }

  type GetNewsArticleGroupByPayload<T extends NewsArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsArticleGroupByOutputType[P]>
            : GetScalarType<T[P], NewsArticleGroupByOutputType[P]>
        }
      >
    >


  export type NewsArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    source?: boolean
    url?: boolean
    imageUrl?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsArticle"]>

  export type NewsArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    source?: boolean
    url?: boolean
    imageUrl?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsArticle"]>

  export type NewsArticleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    source?: boolean
    url?: boolean
    imageUrl?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsArticle"]>

  export type NewsArticleSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    source?: boolean
    url?: boolean
    imageUrl?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NewsArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "source" | "url" | "imageUrl" | "publishedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["newsArticle"]>

  export type $NewsArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsArticle"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      source: string
      url: string
      imageUrl: string | null
      publishedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["newsArticle"]>
    composites: {}
  }

  type NewsArticleGetPayload<S extends boolean | null | undefined | NewsArticleDefaultArgs> = $Result.GetResult<Prisma.$NewsArticlePayload, S>

  type NewsArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsArticleCountAggregateInputType | true
    }

  export interface NewsArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsArticle'], meta: { name: 'NewsArticle' } }
    /**
     * Find zero or one NewsArticle that matches the filter.
     * @param {NewsArticleFindUniqueArgs} args - Arguments to find a NewsArticle
     * @example
     * // Get one NewsArticle
     * const newsArticle = await prisma.newsArticle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsArticleFindUniqueArgs>(args: SelectSubset<T, NewsArticleFindUniqueArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsArticle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsArticleFindUniqueOrThrowArgs} args - Arguments to find a NewsArticle
     * @example
     * // Get one NewsArticle
     * const newsArticle = await prisma.newsArticle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsArticle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleFindFirstArgs} args - Arguments to find a NewsArticle
     * @example
     * // Get one NewsArticle
     * const newsArticle = await prisma.newsArticle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsArticleFindFirstArgs>(args?: SelectSubset<T, NewsArticleFindFirstArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsArticle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleFindFirstOrThrowArgs} args - Arguments to find a NewsArticle
     * @example
     * // Get one NewsArticle
     * const newsArticle = await prisma.newsArticle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsArticles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsArticles
     * const newsArticles = await prisma.newsArticle.findMany()
     * 
     * // Get first 10 NewsArticles
     * const newsArticles = await prisma.newsArticle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsArticleWithIdOnly = await prisma.newsArticle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsArticleFindManyArgs>(args?: SelectSubset<T, NewsArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsArticle.
     * @param {NewsArticleCreateArgs} args - Arguments to create a NewsArticle.
     * @example
     * // Create one NewsArticle
     * const NewsArticle = await prisma.newsArticle.create({
     *   data: {
     *     // ... data to create a NewsArticle
     *   }
     * })
     * 
     */
    create<T extends NewsArticleCreateArgs>(args: SelectSubset<T, NewsArticleCreateArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsArticles.
     * @param {NewsArticleCreateManyArgs} args - Arguments to create many NewsArticles.
     * @example
     * // Create many NewsArticles
     * const newsArticle = await prisma.newsArticle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsArticleCreateManyArgs>(args?: SelectSubset<T, NewsArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsArticles and returns the data saved in the database.
     * @param {NewsArticleCreateManyAndReturnArgs} args - Arguments to create many NewsArticles.
     * @example
     * // Create many NewsArticles
     * const newsArticle = await prisma.newsArticle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsArticles and only return the `id`
     * const newsArticleWithIdOnly = await prisma.newsArticle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewsArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, NewsArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewsArticle.
     * @param {NewsArticleDeleteArgs} args - Arguments to delete one NewsArticle.
     * @example
     * // Delete one NewsArticle
     * const NewsArticle = await prisma.newsArticle.delete({
     *   where: {
     *     // ... filter to delete one NewsArticle
     *   }
     * })
     * 
     */
    delete<T extends NewsArticleDeleteArgs>(args: SelectSubset<T, NewsArticleDeleteArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsArticle.
     * @param {NewsArticleUpdateArgs} args - Arguments to update one NewsArticle.
     * @example
     * // Update one NewsArticle
     * const newsArticle = await prisma.newsArticle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsArticleUpdateArgs>(args: SelectSubset<T, NewsArticleUpdateArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsArticles.
     * @param {NewsArticleDeleteManyArgs} args - Arguments to filter NewsArticles to delete.
     * @example
     * // Delete a few NewsArticles
     * const { count } = await prisma.newsArticle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsArticleDeleteManyArgs>(args?: SelectSubset<T, NewsArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsArticles
     * const newsArticle = await prisma.newsArticle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsArticleUpdateManyArgs>(args: SelectSubset<T, NewsArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsArticles and returns the data updated in the database.
     * @param {NewsArticleUpdateManyAndReturnArgs} args - Arguments to update many NewsArticles.
     * @example
     * // Update many NewsArticles
     * const newsArticle = await prisma.newsArticle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewsArticles and only return the `id`
     * const newsArticleWithIdOnly = await prisma.newsArticle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NewsArticleUpdateManyAndReturnArgs>(args: SelectSubset<T, NewsArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewsArticle.
     * @param {NewsArticleUpsertArgs} args - Arguments to update or create a NewsArticle.
     * @example
     * // Update or create a NewsArticle
     * const newsArticle = await prisma.newsArticle.upsert({
     *   create: {
     *     // ... data to create a NewsArticle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsArticle we want to update
     *   }
     * })
     */
    upsert<T extends NewsArticleUpsertArgs>(args: SelectSubset<T, NewsArticleUpsertArgs<ExtArgs>>): Prisma__NewsArticleClient<$Result.GetResult<Prisma.$NewsArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleCountArgs} args - Arguments to filter NewsArticles to count.
     * @example
     * // Count the number of NewsArticles
     * const count = await prisma.newsArticle.count({
     *   where: {
     *     // ... the filter for the NewsArticles we want to count
     *   }
     * })
    **/
    count<T extends NewsArticleCountArgs>(
      args?: Subset<T, NewsArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NewsArticleAggregateArgs>(args: Subset<T, NewsArticleAggregateArgs>): Prisma.PrismaPromise<GetNewsArticleAggregateType<T>>

    /**
     * Group by NewsArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NewsArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsArticleGroupByArgs['orderBy'] }
        : { orderBy?: NewsArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NewsArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsArticle model
   */
  readonly fields: NewsArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsArticle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NewsArticle model
   */
  interface NewsArticleFieldRefs {
    readonly id: FieldRef<"NewsArticle", 'String'>
    readonly title: FieldRef<"NewsArticle", 'String'>
    readonly content: FieldRef<"NewsArticle", 'String'>
    readonly source: FieldRef<"NewsArticle", 'String'>
    readonly url: FieldRef<"NewsArticle", 'String'>
    readonly imageUrl: FieldRef<"NewsArticle", 'String'>
    readonly publishedAt: FieldRef<"NewsArticle", 'DateTime'>
    readonly createdAt: FieldRef<"NewsArticle", 'DateTime'>
    readonly updatedAt: FieldRef<"NewsArticle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsArticle findUnique
   */
  export type NewsArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticle to fetch.
     */
    where: NewsArticleWhereUniqueInput
  }

  /**
   * NewsArticle findUniqueOrThrow
   */
  export type NewsArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticle to fetch.
     */
    where: NewsArticleWhereUniqueInput
  }

  /**
   * NewsArticle findFirst
   */
  export type NewsArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticle to fetch.
     */
    where?: NewsArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsArticles to fetch.
     */
    orderBy?: NewsArticleOrderByWithRelationInput | NewsArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsArticles.
     */
    cursor?: NewsArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsArticles.
     */
    distinct?: NewsArticleScalarFieldEnum | NewsArticleScalarFieldEnum[]
  }

  /**
   * NewsArticle findFirstOrThrow
   */
  export type NewsArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticle to fetch.
     */
    where?: NewsArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsArticles to fetch.
     */
    orderBy?: NewsArticleOrderByWithRelationInput | NewsArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsArticles.
     */
    cursor?: NewsArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsArticles.
     */
    distinct?: NewsArticleScalarFieldEnum | NewsArticleScalarFieldEnum[]
  }

  /**
   * NewsArticle findMany
   */
  export type NewsArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter, which NewsArticles to fetch.
     */
    where?: NewsArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsArticles to fetch.
     */
    orderBy?: NewsArticleOrderByWithRelationInput | NewsArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsArticles.
     */
    cursor?: NewsArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsArticles.
     */
    skip?: number
    distinct?: NewsArticleScalarFieldEnum | NewsArticleScalarFieldEnum[]
  }

  /**
   * NewsArticle create
   */
  export type NewsArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The data needed to create a NewsArticle.
     */
    data: XOR<NewsArticleCreateInput, NewsArticleUncheckedCreateInput>
  }

  /**
   * NewsArticle createMany
   */
  export type NewsArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsArticles.
     */
    data: NewsArticleCreateManyInput | NewsArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsArticle createManyAndReturn
   */
  export type NewsArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The data used to create many NewsArticles.
     */
    data: NewsArticleCreateManyInput | NewsArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsArticle update
   */
  export type NewsArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The data needed to update a NewsArticle.
     */
    data: XOR<NewsArticleUpdateInput, NewsArticleUncheckedUpdateInput>
    /**
     * Choose, which NewsArticle to update.
     */
    where: NewsArticleWhereUniqueInput
  }

  /**
   * NewsArticle updateMany
   */
  export type NewsArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsArticles.
     */
    data: XOR<NewsArticleUpdateManyMutationInput, NewsArticleUncheckedUpdateManyInput>
    /**
     * Filter which NewsArticles to update
     */
    where?: NewsArticleWhereInput
    /**
     * Limit how many NewsArticles to update.
     */
    limit?: number
  }

  /**
   * NewsArticle updateManyAndReturn
   */
  export type NewsArticleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The data used to update NewsArticles.
     */
    data: XOR<NewsArticleUpdateManyMutationInput, NewsArticleUncheckedUpdateManyInput>
    /**
     * Filter which NewsArticles to update
     */
    where?: NewsArticleWhereInput
    /**
     * Limit how many NewsArticles to update.
     */
    limit?: number
  }

  /**
   * NewsArticle upsert
   */
  export type NewsArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * The filter to search for the NewsArticle to update in case it exists.
     */
    where: NewsArticleWhereUniqueInput
    /**
     * In case the NewsArticle found by the `where` argument doesn't exist, create a new NewsArticle with this data.
     */
    create: XOR<NewsArticleCreateInput, NewsArticleUncheckedCreateInput>
    /**
     * In case the NewsArticle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsArticleUpdateInput, NewsArticleUncheckedUpdateInput>
  }

  /**
   * NewsArticle delete
   */
  export type NewsArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
    /**
     * Filter which NewsArticle to delete.
     */
    where: NewsArticleWhereUniqueInput
  }

  /**
   * NewsArticle deleteMany
   */
  export type NewsArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsArticles to delete
     */
    where?: NewsArticleWhereInput
    /**
     * Limit how many NewsArticles to delete.
     */
    limit?: number
  }

  /**
   * NewsArticle without action
   */
  export type NewsArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsArticle
     */
    select?: NewsArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsArticle
     */
    omit?: NewsArticleOmit<ExtArgs> | null
  }


  /**
   * Model WeatherData
   */

  export type AggregateWeatherData = {
    _count: WeatherDataCountAggregateOutputType | null
    _avg: WeatherDataAvgAggregateOutputType | null
    _sum: WeatherDataSumAggregateOutputType | null
    _min: WeatherDataMinAggregateOutputType | null
    _max: WeatherDataMaxAggregateOutputType | null
  }

  export type WeatherDataAvgAggregateOutputType = {
    temperature: number | null
    humidity: number | null
    windSpeed: number | null
  }

  export type WeatherDataSumAggregateOutputType = {
    temperature: number | null
    humidity: number | null
    windSpeed: number | null
  }

  export type WeatherDataMinAggregateOutputType = {
    id: string | null
    date: Date | null
    temperature: number | null
    conditions: string | null
    humidity: number | null
    windSpeed: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeatherDataMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    temperature: number | null
    conditions: string | null
    humidity: number | null
    windSpeed: number | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeatherDataCountAggregateOutputType = {
    id: number
    date: number
    temperature: number
    conditions: number
    humidity: number
    windSpeed: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WeatherDataAvgAggregateInputType = {
    temperature?: true
    humidity?: true
    windSpeed?: true
  }

  export type WeatherDataSumAggregateInputType = {
    temperature?: true
    humidity?: true
    windSpeed?: true
  }

  export type WeatherDataMinAggregateInputType = {
    id?: true
    date?: true
    temperature?: true
    conditions?: true
    humidity?: true
    windSpeed?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeatherDataMaxAggregateInputType = {
    id?: true
    date?: true
    temperature?: true
    conditions?: true
    humidity?: true
    windSpeed?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeatherDataCountAggregateInputType = {
    id?: true
    date?: true
    temperature?: true
    conditions?: true
    humidity?: true
    windSpeed?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WeatherDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeatherData to aggregate.
     */
    where?: WeatherDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeatherData to fetch.
     */
    orderBy?: WeatherDataOrderByWithRelationInput | WeatherDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeatherDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeatherData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeatherData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeatherData
    **/
    _count?: true | WeatherDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WeatherDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WeatherDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeatherDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeatherDataMaxAggregateInputType
  }

  export type GetWeatherDataAggregateType<T extends WeatherDataAggregateArgs> = {
        [P in keyof T & keyof AggregateWeatherData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeatherData[P]>
      : GetScalarType<T[P], AggregateWeatherData[P]>
  }




  export type WeatherDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeatherDataWhereInput
    orderBy?: WeatherDataOrderByWithAggregationInput | WeatherDataOrderByWithAggregationInput[]
    by: WeatherDataScalarFieldEnum[] | WeatherDataScalarFieldEnum
    having?: WeatherDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeatherDataCountAggregateInputType | true
    _avg?: WeatherDataAvgAggregateInputType
    _sum?: WeatherDataSumAggregateInputType
    _min?: WeatherDataMinAggregateInputType
    _max?: WeatherDataMaxAggregateInputType
  }

  export type WeatherDataGroupByOutputType = {
    id: string
    date: Date
    temperature: number
    conditions: string
    humidity: number | null
    windSpeed: number | null
    source: string
    createdAt: Date
    updatedAt: Date
    _count: WeatherDataCountAggregateOutputType | null
    _avg: WeatherDataAvgAggregateOutputType | null
    _sum: WeatherDataSumAggregateOutputType | null
    _min: WeatherDataMinAggregateOutputType | null
    _max: WeatherDataMaxAggregateOutputType | null
  }

  type GetWeatherDataGroupByPayload<T extends WeatherDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeatherDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeatherDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeatherDataGroupByOutputType[P]>
            : GetScalarType<T[P], WeatherDataGroupByOutputType[P]>
        }
      >
    >


  export type WeatherDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    temperature?: boolean
    conditions?: boolean
    humidity?: boolean
    windSpeed?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["weatherData"]>

  export type WeatherDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    temperature?: boolean
    conditions?: boolean
    humidity?: boolean
    windSpeed?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["weatherData"]>

  export type WeatherDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    temperature?: boolean
    conditions?: boolean
    humidity?: boolean
    windSpeed?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["weatherData"]>

  export type WeatherDataSelectScalar = {
    id?: boolean
    date?: boolean
    temperature?: boolean
    conditions?: boolean
    humidity?: boolean
    windSpeed?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WeatherDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "temperature" | "conditions" | "humidity" | "windSpeed" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["weatherData"]>

  export type $WeatherDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeatherData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      temperature: number
      conditions: string
      humidity: number | null
      windSpeed: number | null
      source: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["weatherData"]>
    composites: {}
  }

  type WeatherDataGetPayload<S extends boolean | null | undefined | WeatherDataDefaultArgs> = $Result.GetResult<Prisma.$WeatherDataPayload, S>

  type WeatherDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeatherDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeatherDataCountAggregateInputType | true
    }

  export interface WeatherDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeatherData'], meta: { name: 'WeatherData' } }
    /**
     * Find zero or one WeatherData that matches the filter.
     * @param {WeatherDataFindUniqueArgs} args - Arguments to find a WeatherData
     * @example
     * // Get one WeatherData
     * const weatherData = await prisma.weatherData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeatherDataFindUniqueArgs>(args: SelectSubset<T, WeatherDataFindUniqueArgs<ExtArgs>>): Prisma__WeatherDataClient<$Result.GetResult<Prisma.$WeatherDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WeatherData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeatherDataFindUniqueOrThrowArgs} args - Arguments to find a WeatherData
     * @example
     * // Get one WeatherData
     * const weatherData = await prisma.weatherData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeatherDataFindUniqueOrThrowArgs>(args: SelectSubset<T, WeatherDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeatherDataClient<$Result.GetResult<Prisma.$WeatherDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeatherData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherDataFindFirstArgs} args - Arguments to find a WeatherData
     * @example
     * // Get one WeatherData
     * const weatherData = await prisma.weatherData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeatherDataFindFirstArgs>(args?: SelectSubset<T, WeatherDataFindFirstArgs<ExtArgs>>): Prisma__WeatherDataClient<$Result.GetResult<Prisma.$WeatherDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeatherData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherDataFindFirstOrThrowArgs} args - Arguments to find a WeatherData
     * @example
     * // Get one WeatherData
     * const weatherData = await prisma.weatherData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeatherDataFindFirstOrThrowArgs>(args?: SelectSubset<T, WeatherDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeatherDataClient<$Result.GetResult<Prisma.$WeatherDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WeatherData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeatherData
     * const weatherData = await prisma.weatherData.findMany()
     * 
     * // Get first 10 WeatherData
     * const weatherData = await prisma.weatherData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weatherDataWithIdOnly = await prisma.weatherData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeatherDataFindManyArgs>(args?: SelectSubset<T, WeatherDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeatherDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WeatherData.
     * @param {WeatherDataCreateArgs} args - Arguments to create a WeatherData.
     * @example
     * // Create one WeatherData
     * const WeatherData = await prisma.weatherData.create({
     *   data: {
     *     // ... data to create a WeatherData
     *   }
     * })
     * 
     */
    create<T extends WeatherDataCreateArgs>(args: SelectSubset<T, WeatherDataCreateArgs<ExtArgs>>): Prisma__WeatherDataClient<$Result.GetResult<Prisma.$WeatherDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WeatherData.
     * @param {WeatherDataCreateManyArgs} args - Arguments to create many WeatherData.
     * @example
     * // Create many WeatherData
     * const weatherData = await prisma.weatherData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeatherDataCreateManyArgs>(args?: SelectSubset<T, WeatherDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeatherData and returns the data saved in the database.
     * @param {WeatherDataCreateManyAndReturnArgs} args - Arguments to create many WeatherData.
     * @example
     * // Create many WeatherData
     * const weatherData = await prisma.weatherData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeatherData and only return the `id`
     * const weatherDataWithIdOnly = await prisma.weatherData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeatherDataCreateManyAndReturnArgs>(args?: SelectSubset<T, WeatherDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeatherDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WeatherData.
     * @param {WeatherDataDeleteArgs} args - Arguments to delete one WeatherData.
     * @example
     * // Delete one WeatherData
     * const WeatherData = await prisma.weatherData.delete({
     *   where: {
     *     // ... filter to delete one WeatherData
     *   }
     * })
     * 
     */
    delete<T extends WeatherDataDeleteArgs>(args: SelectSubset<T, WeatherDataDeleteArgs<ExtArgs>>): Prisma__WeatherDataClient<$Result.GetResult<Prisma.$WeatherDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WeatherData.
     * @param {WeatherDataUpdateArgs} args - Arguments to update one WeatherData.
     * @example
     * // Update one WeatherData
     * const weatherData = await prisma.weatherData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeatherDataUpdateArgs>(args: SelectSubset<T, WeatherDataUpdateArgs<ExtArgs>>): Prisma__WeatherDataClient<$Result.GetResult<Prisma.$WeatherDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WeatherData.
     * @param {WeatherDataDeleteManyArgs} args - Arguments to filter WeatherData to delete.
     * @example
     * // Delete a few WeatherData
     * const { count } = await prisma.weatherData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeatherDataDeleteManyArgs>(args?: SelectSubset<T, WeatherDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeatherData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeatherData
     * const weatherData = await prisma.weatherData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeatherDataUpdateManyArgs>(args: SelectSubset<T, WeatherDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeatherData and returns the data updated in the database.
     * @param {WeatherDataUpdateManyAndReturnArgs} args - Arguments to update many WeatherData.
     * @example
     * // Update many WeatherData
     * const weatherData = await prisma.weatherData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WeatherData and only return the `id`
     * const weatherDataWithIdOnly = await prisma.weatherData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WeatherDataUpdateManyAndReturnArgs>(args: SelectSubset<T, WeatherDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeatherDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WeatherData.
     * @param {WeatherDataUpsertArgs} args - Arguments to update or create a WeatherData.
     * @example
     * // Update or create a WeatherData
     * const weatherData = await prisma.weatherData.upsert({
     *   create: {
     *     // ... data to create a WeatherData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeatherData we want to update
     *   }
     * })
     */
    upsert<T extends WeatherDataUpsertArgs>(args: SelectSubset<T, WeatherDataUpsertArgs<ExtArgs>>): Prisma__WeatherDataClient<$Result.GetResult<Prisma.$WeatherDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WeatherData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherDataCountArgs} args - Arguments to filter WeatherData to count.
     * @example
     * // Count the number of WeatherData
     * const count = await prisma.weatherData.count({
     *   where: {
     *     // ... the filter for the WeatherData we want to count
     *   }
     * })
    **/
    count<T extends WeatherDataCountArgs>(
      args?: Subset<T, WeatherDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeatherDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeatherData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WeatherDataAggregateArgs>(args: Subset<T, WeatherDataAggregateArgs>): Prisma.PrismaPromise<GetWeatherDataAggregateType<T>>

    /**
     * Group by WeatherData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WeatherDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeatherDataGroupByArgs['orderBy'] }
        : { orderBy?: WeatherDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WeatherDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeatherDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeatherData model
   */
  readonly fields: WeatherDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeatherData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeatherDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WeatherData model
   */
  interface WeatherDataFieldRefs {
    readonly id: FieldRef<"WeatherData", 'String'>
    readonly date: FieldRef<"WeatherData", 'DateTime'>
    readonly temperature: FieldRef<"WeatherData", 'Float'>
    readonly conditions: FieldRef<"WeatherData", 'String'>
    readonly humidity: FieldRef<"WeatherData", 'Float'>
    readonly windSpeed: FieldRef<"WeatherData", 'Float'>
    readonly source: FieldRef<"WeatherData", 'String'>
    readonly createdAt: FieldRef<"WeatherData", 'DateTime'>
    readonly updatedAt: FieldRef<"WeatherData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WeatherData findUnique
   */
  export type WeatherDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherData
     */
    select?: WeatherDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherData
     */
    omit?: WeatherDataOmit<ExtArgs> | null
    /**
     * Filter, which WeatherData to fetch.
     */
    where: WeatherDataWhereUniqueInput
  }

  /**
   * WeatherData findUniqueOrThrow
   */
  export type WeatherDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherData
     */
    select?: WeatherDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherData
     */
    omit?: WeatherDataOmit<ExtArgs> | null
    /**
     * Filter, which WeatherData to fetch.
     */
    where: WeatherDataWhereUniqueInput
  }

  /**
   * WeatherData findFirst
   */
  export type WeatherDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherData
     */
    select?: WeatherDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherData
     */
    omit?: WeatherDataOmit<ExtArgs> | null
    /**
     * Filter, which WeatherData to fetch.
     */
    where?: WeatherDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeatherData to fetch.
     */
    orderBy?: WeatherDataOrderByWithRelationInput | WeatherDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeatherData.
     */
    cursor?: WeatherDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeatherData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeatherData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeatherData.
     */
    distinct?: WeatherDataScalarFieldEnum | WeatherDataScalarFieldEnum[]
  }

  /**
   * WeatherData findFirstOrThrow
   */
  export type WeatherDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherData
     */
    select?: WeatherDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherData
     */
    omit?: WeatherDataOmit<ExtArgs> | null
    /**
     * Filter, which WeatherData to fetch.
     */
    where?: WeatherDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeatherData to fetch.
     */
    orderBy?: WeatherDataOrderByWithRelationInput | WeatherDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeatherData.
     */
    cursor?: WeatherDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeatherData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeatherData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeatherData.
     */
    distinct?: WeatherDataScalarFieldEnum | WeatherDataScalarFieldEnum[]
  }

  /**
   * WeatherData findMany
   */
  export type WeatherDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherData
     */
    select?: WeatherDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherData
     */
    omit?: WeatherDataOmit<ExtArgs> | null
    /**
     * Filter, which WeatherData to fetch.
     */
    where?: WeatherDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeatherData to fetch.
     */
    orderBy?: WeatherDataOrderByWithRelationInput | WeatherDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeatherData.
     */
    cursor?: WeatherDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeatherData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeatherData.
     */
    skip?: number
    distinct?: WeatherDataScalarFieldEnum | WeatherDataScalarFieldEnum[]
  }

  /**
   * WeatherData create
   */
  export type WeatherDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherData
     */
    select?: WeatherDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherData
     */
    omit?: WeatherDataOmit<ExtArgs> | null
    /**
     * The data needed to create a WeatherData.
     */
    data: XOR<WeatherDataCreateInput, WeatherDataUncheckedCreateInput>
  }

  /**
   * WeatherData createMany
   */
  export type WeatherDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeatherData.
     */
    data: WeatherDataCreateManyInput | WeatherDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeatherData createManyAndReturn
   */
  export type WeatherDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherData
     */
    select?: WeatherDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherData
     */
    omit?: WeatherDataOmit<ExtArgs> | null
    /**
     * The data used to create many WeatherData.
     */
    data: WeatherDataCreateManyInput | WeatherDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeatherData update
   */
  export type WeatherDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherData
     */
    select?: WeatherDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherData
     */
    omit?: WeatherDataOmit<ExtArgs> | null
    /**
     * The data needed to update a WeatherData.
     */
    data: XOR<WeatherDataUpdateInput, WeatherDataUncheckedUpdateInput>
    /**
     * Choose, which WeatherData to update.
     */
    where: WeatherDataWhereUniqueInput
  }

  /**
   * WeatherData updateMany
   */
  export type WeatherDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeatherData.
     */
    data: XOR<WeatherDataUpdateManyMutationInput, WeatherDataUncheckedUpdateManyInput>
    /**
     * Filter which WeatherData to update
     */
    where?: WeatherDataWhereInput
    /**
     * Limit how many WeatherData to update.
     */
    limit?: number
  }

  /**
   * WeatherData updateManyAndReturn
   */
  export type WeatherDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherData
     */
    select?: WeatherDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherData
     */
    omit?: WeatherDataOmit<ExtArgs> | null
    /**
     * The data used to update WeatherData.
     */
    data: XOR<WeatherDataUpdateManyMutationInput, WeatherDataUncheckedUpdateManyInput>
    /**
     * Filter which WeatherData to update
     */
    where?: WeatherDataWhereInput
    /**
     * Limit how many WeatherData to update.
     */
    limit?: number
  }

  /**
   * WeatherData upsert
   */
  export type WeatherDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherData
     */
    select?: WeatherDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherData
     */
    omit?: WeatherDataOmit<ExtArgs> | null
    /**
     * The filter to search for the WeatherData to update in case it exists.
     */
    where: WeatherDataWhereUniqueInput
    /**
     * In case the WeatherData found by the `where` argument doesn't exist, create a new WeatherData with this data.
     */
    create: XOR<WeatherDataCreateInput, WeatherDataUncheckedCreateInput>
    /**
     * In case the WeatherData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeatherDataUpdateInput, WeatherDataUncheckedUpdateInput>
  }

  /**
   * WeatherData delete
   */
  export type WeatherDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherData
     */
    select?: WeatherDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherData
     */
    omit?: WeatherDataOmit<ExtArgs> | null
    /**
     * Filter which WeatherData to delete.
     */
    where: WeatherDataWhereUniqueInput
  }

  /**
   * WeatherData deleteMany
   */
  export type WeatherDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeatherData to delete
     */
    where?: WeatherDataWhereInput
    /**
     * Limit how many WeatherData to delete.
     */
    limit?: number
  }

  /**
   * WeatherData without action
   */
  export type WeatherDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeatherData
     */
    select?: WeatherDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeatherData
     */
    omit?: WeatherDataOmit<ExtArgs> | null
  }


  /**
   * Model TradeImpactData
   */

  export type AggregateTradeImpactData = {
    _count: TradeImpactDataCountAggregateOutputType | null
    _min: TradeImpactDataMinAggregateOutputType | null
    _max: TradeImpactDataMaxAggregateOutputType | null
  }

  export type TradeImpactDataMinAggregateOutputType = {
    id: string | null
    category: string | null
    title: string | null
    description: string | null
    value: string | null
    date: Date | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TradeImpactDataMaxAggregateOutputType = {
    id: string | null
    category: string | null
    title: string | null
    description: string | null
    value: string | null
    date: Date | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TradeImpactDataCountAggregateOutputType = {
    id: number
    category: number
    title: number
    description: number
    value: number
    date: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TradeImpactDataMinAggregateInputType = {
    id?: true
    category?: true
    title?: true
    description?: true
    value?: true
    date?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TradeImpactDataMaxAggregateInputType = {
    id?: true
    category?: true
    title?: true
    description?: true
    value?: true
    date?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TradeImpactDataCountAggregateInputType = {
    id?: true
    category?: true
    title?: true
    description?: true
    value?: true
    date?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TradeImpactDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeImpactData to aggregate.
     */
    where?: TradeImpactDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeImpactData to fetch.
     */
    orderBy?: TradeImpactDataOrderByWithRelationInput | TradeImpactDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeImpactDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeImpactData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeImpactData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TradeImpactData
    **/
    _count?: true | TradeImpactDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeImpactDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeImpactDataMaxAggregateInputType
  }

  export type GetTradeImpactDataAggregateType<T extends TradeImpactDataAggregateArgs> = {
        [P in keyof T & keyof AggregateTradeImpactData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTradeImpactData[P]>
      : GetScalarType<T[P], AggregateTradeImpactData[P]>
  }




  export type TradeImpactDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeImpactDataWhereInput
    orderBy?: TradeImpactDataOrderByWithAggregationInput | TradeImpactDataOrderByWithAggregationInput[]
    by: TradeImpactDataScalarFieldEnum[] | TradeImpactDataScalarFieldEnum
    having?: TradeImpactDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeImpactDataCountAggregateInputType | true
    _min?: TradeImpactDataMinAggregateInputType
    _max?: TradeImpactDataMaxAggregateInputType
  }

  export type TradeImpactDataGroupByOutputType = {
    id: string
    category: string
    title: string
    description: string
    value: string | null
    date: Date
    source: string | null
    createdAt: Date
    updatedAt: Date
    _count: TradeImpactDataCountAggregateOutputType | null
    _min: TradeImpactDataMinAggregateOutputType | null
    _max: TradeImpactDataMaxAggregateOutputType | null
  }

  type GetTradeImpactDataGroupByPayload<T extends TradeImpactDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeImpactDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeImpactDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeImpactDataGroupByOutputType[P]>
            : GetScalarType<T[P], TradeImpactDataGroupByOutputType[P]>
        }
      >
    >


  export type TradeImpactDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    title?: boolean
    description?: boolean
    value?: boolean
    date?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tradeImpactData"]>

  export type TradeImpactDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    title?: boolean
    description?: boolean
    value?: boolean
    date?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tradeImpactData"]>

  export type TradeImpactDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    title?: boolean
    description?: boolean
    value?: boolean
    date?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tradeImpactData"]>

  export type TradeImpactDataSelectScalar = {
    id?: boolean
    category?: boolean
    title?: boolean
    description?: boolean
    value?: boolean
    date?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TradeImpactDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "category" | "title" | "description" | "value" | "date" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["tradeImpactData"]>

  export type $TradeImpactDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TradeImpactData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      category: string
      title: string
      description: string
      value: string | null
      date: Date
      source: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tradeImpactData"]>
    composites: {}
  }

  type TradeImpactDataGetPayload<S extends boolean | null | undefined | TradeImpactDataDefaultArgs> = $Result.GetResult<Prisma.$TradeImpactDataPayload, S>

  type TradeImpactDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradeImpactDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradeImpactDataCountAggregateInputType | true
    }

  export interface TradeImpactDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TradeImpactData'], meta: { name: 'TradeImpactData' } }
    /**
     * Find zero or one TradeImpactData that matches the filter.
     * @param {TradeImpactDataFindUniqueArgs} args - Arguments to find a TradeImpactData
     * @example
     * // Get one TradeImpactData
     * const tradeImpactData = await prisma.tradeImpactData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeImpactDataFindUniqueArgs>(args: SelectSubset<T, TradeImpactDataFindUniqueArgs<ExtArgs>>): Prisma__TradeImpactDataClient<$Result.GetResult<Prisma.$TradeImpactDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TradeImpactData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradeImpactDataFindUniqueOrThrowArgs} args - Arguments to find a TradeImpactData
     * @example
     * // Get one TradeImpactData
     * const tradeImpactData = await prisma.tradeImpactData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeImpactDataFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeImpactDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeImpactDataClient<$Result.GetResult<Prisma.$TradeImpactDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradeImpactData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeImpactDataFindFirstArgs} args - Arguments to find a TradeImpactData
     * @example
     * // Get one TradeImpactData
     * const tradeImpactData = await prisma.tradeImpactData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeImpactDataFindFirstArgs>(args?: SelectSubset<T, TradeImpactDataFindFirstArgs<ExtArgs>>): Prisma__TradeImpactDataClient<$Result.GetResult<Prisma.$TradeImpactDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradeImpactData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeImpactDataFindFirstOrThrowArgs} args - Arguments to find a TradeImpactData
     * @example
     * // Get one TradeImpactData
     * const tradeImpactData = await prisma.tradeImpactData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeImpactDataFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeImpactDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeImpactDataClient<$Result.GetResult<Prisma.$TradeImpactDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TradeImpactData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeImpactDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TradeImpactData
     * const tradeImpactData = await prisma.tradeImpactData.findMany()
     * 
     * // Get first 10 TradeImpactData
     * const tradeImpactData = await prisma.tradeImpactData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeImpactDataWithIdOnly = await prisma.tradeImpactData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeImpactDataFindManyArgs>(args?: SelectSubset<T, TradeImpactDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeImpactDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TradeImpactData.
     * @param {TradeImpactDataCreateArgs} args - Arguments to create a TradeImpactData.
     * @example
     * // Create one TradeImpactData
     * const TradeImpactData = await prisma.tradeImpactData.create({
     *   data: {
     *     // ... data to create a TradeImpactData
     *   }
     * })
     * 
     */
    create<T extends TradeImpactDataCreateArgs>(args: SelectSubset<T, TradeImpactDataCreateArgs<ExtArgs>>): Prisma__TradeImpactDataClient<$Result.GetResult<Prisma.$TradeImpactDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TradeImpactData.
     * @param {TradeImpactDataCreateManyArgs} args - Arguments to create many TradeImpactData.
     * @example
     * // Create many TradeImpactData
     * const tradeImpactData = await prisma.tradeImpactData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeImpactDataCreateManyArgs>(args?: SelectSubset<T, TradeImpactDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TradeImpactData and returns the data saved in the database.
     * @param {TradeImpactDataCreateManyAndReturnArgs} args - Arguments to create many TradeImpactData.
     * @example
     * // Create many TradeImpactData
     * const tradeImpactData = await prisma.tradeImpactData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TradeImpactData and only return the `id`
     * const tradeImpactDataWithIdOnly = await prisma.tradeImpactData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeImpactDataCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeImpactDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeImpactDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TradeImpactData.
     * @param {TradeImpactDataDeleteArgs} args - Arguments to delete one TradeImpactData.
     * @example
     * // Delete one TradeImpactData
     * const TradeImpactData = await prisma.tradeImpactData.delete({
     *   where: {
     *     // ... filter to delete one TradeImpactData
     *   }
     * })
     * 
     */
    delete<T extends TradeImpactDataDeleteArgs>(args: SelectSubset<T, TradeImpactDataDeleteArgs<ExtArgs>>): Prisma__TradeImpactDataClient<$Result.GetResult<Prisma.$TradeImpactDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TradeImpactData.
     * @param {TradeImpactDataUpdateArgs} args - Arguments to update one TradeImpactData.
     * @example
     * // Update one TradeImpactData
     * const tradeImpactData = await prisma.tradeImpactData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeImpactDataUpdateArgs>(args: SelectSubset<T, TradeImpactDataUpdateArgs<ExtArgs>>): Prisma__TradeImpactDataClient<$Result.GetResult<Prisma.$TradeImpactDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TradeImpactData.
     * @param {TradeImpactDataDeleteManyArgs} args - Arguments to filter TradeImpactData to delete.
     * @example
     * // Delete a few TradeImpactData
     * const { count } = await prisma.tradeImpactData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeImpactDataDeleteManyArgs>(args?: SelectSubset<T, TradeImpactDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradeImpactData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeImpactDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TradeImpactData
     * const tradeImpactData = await prisma.tradeImpactData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeImpactDataUpdateManyArgs>(args: SelectSubset<T, TradeImpactDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradeImpactData and returns the data updated in the database.
     * @param {TradeImpactDataUpdateManyAndReturnArgs} args - Arguments to update many TradeImpactData.
     * @example
     * // Update many TradeImpactData
     * const tradeImpactData = await prisma.tradeImpactData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TradeImpactData and only return the `id`
     * const tradeImpactDataWithIdOnly = await prisma.tradeImpactData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TradeImpactDataUpdateManyAndReturnArgs>(args: SelectSubset<T, TradeImpactDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeImpactDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TradeImpactData.
     * @param {TradeImpactDataUpsertArgs} args - Arguments to update or create a TradeImpactData.
     * @example
     * // Update or create a TradeImpactData
     * const tradeImpactData = await prisma.tradeImpactData.upsert({
     *   create: {
     *     // ... data to create a TradeImpactData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TradeImpactData we want to update
     *   }
     * })
     */
    upsert<T extends TradeImpactDataUpsertArgs>(args: SelectSubset<T, TradeImpactDataUpsertArgs<ExtArgs>>): Prisma__TradeImpactDataClient<$Result.GetResult<Prisma.$TradeImpactDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TradeImpactData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeImpactDataCountArgs} args - Arguments to filter TradeImpactData to count.
     * @example
     * // Count the number of TradeImpactData
     * const count = await prisma.tradeImpactData.count({
     *   where: {
     *     // ... the filter for the TradeImpactData we want to count
     *   }
     * })
    **/
    count<T extends TradeImpactDataCountArgs>(
      args?: Subset<T, TradeImpactDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeImpactDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TradeImpactData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeImpactDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeImpactDataAggregateArgs>(args: Subset<T, TradeImpactDataAggregateArgs>): Prisma.PrismaPromise<GetTradeImpactDataAggregateType<T>>

    /**
     * Group by TradeImpactData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeImpactDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeImpactDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeImpactDataGroupByArgs['orderBy'] }
        : { orderBy?: TradeImpactDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeImpactDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeImpactDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TradeImpactData model
   */
  readonly fields: TradeImpactDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TradeImpactData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeImpactDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TradeImpactData model
   */
  interface TradeImpactDataFieldRefs {
    readonly id: FieldRef<"TradeImpactData", 'String'>
    readonly category: FieldRef<"TradeImpactData", 'String'>
    readonly title: FieldRef<"TradeImpactData", 'String'>
    readonly description: FieldRef<"TradeImpactData", 'String'>
    readonly value: FieldRef<"TradeImpactData", 'String'>
    readonly date: FieldRef<"TradeImpactData", 'DateTime'>
    readonly source: FieldRef<"TradeImpactData", 'String'>
    readonly createdAt: FieldRef<"TradeImpactData", 'DateTime'>
    readonly updatedAt: FieldRef<"TradeImpactData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TradeImpactData findUnique
   */
  export type TradeImpactDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeImpactData
     */
    select?: TradeImpactDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeImpactData
     */
    omit?: TradeImpactDataOmit<ExtArgs> | null
    /**
     * Filter, which TradeImpactData to fetch.
     */
    where: TradeImpactDataWhereUniqueInput
  }

  /**
   * TradeImpactData findUniqueOrThrow
   */
  export type TradeImpactDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeImpactData
     */
    select?: TradeImpactDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeImpactData
     */
    omit?: TradeImpactDataOmit<ExtArgs> | null
    /**
     * Filter, which TradeImpactData to fetch.
     */
    where: TradeImpactDataWhereUniqueInput
  }

  /**
   * TradeImpactData findFirst
   */
  export type TradeImpactDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeImpactData
     */
    select?: TradeImpactDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeImpactData
     */
    omit?: TradeImpactDataOmit<ExtArgs> | null
    /**
     * Filter, which TradeImpactData to fetch.
     */
    where?: TradeImpactDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeImpactData to fetch.
     */
    orderBy?: TradeImpactDataOrderByWithRelationInput | TradeImpactDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeImpactData.
     */
    cursor?: TradeImpactDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeImpactData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeImpactData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeImpactData.
     */
    distinct?: TradeImpactDataScalarFieldEnum | TradeImpactDataScalarFieldEnum[]
  }

  /**
   * TradeImpactData findFirstOrThrow
   */
  export type TradeImpactDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeImpactData
     */
    select?: TradeImpactDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeImpactData
     */
    omit?: TradeImpactDataOmit<ExtArgs> | null
    /**
     * Filter, which TradeImpactData to fetch.
     */
    where?: TradeImpactDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeImpactData to fetch.
     */
    orderBy?: TradeImpactDataOrderByWithRelationInput | TradeImpactDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeImpactData.
     */
    cursor?: TradeImpactDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeImpactData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeImpactData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeImpactData.
     */
    distinct?: TradeImpactDataScalarFieldEnum | TradeImpactDataScalarFieldEnum[]
  }

  /**
   * TradeImpactData findMany
   */
  export type TradeImpactDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeImpactData
     */
    select?: TradeImpactDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeImpactData
     */
    omit?: TradeImpactDataOmit<ExtArgs> | null
    /**
     * Filter, which TradeImpactData to fetch.
     */
    where?: TradeImpactDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeImpactData to fetch.
     */
    orderBy?: TradeImpactDataOrderByWithRelationInput | TradeImpactDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TradeImpactData.
     */
    cursor?: TradeImpactDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeImpactData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeImpactData.
     */
    skip?: number
    distinct?: TradeImpactDataScalarFieldEnum | TradeImpactDataScalarFieldEnum[]
  }

  /**
   * TradeImpactData create
   */
  export type TradeImpactDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeImpactData
     */
    select?: TradeImpactDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeImpactData
     */
    omit?: TradeImpactDataOmit<ExtArgs> | null
    /**
     * The data needed to create a TradeImpactData.
     */
    data: XOR<TradeImpactDataCreateInput, TradeImpactDataUncheckedCreateInput>
  }

  /**
   * TradeImpactData createMany
   */
  export type TradeImpactDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TradeImpactData.
     */
    data: TradeImpactDataCreateManyInput | TradeImpactDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradeImpactData createManyAndReturn
   */
  export type TradeImpactDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeImpactData
     */
    select?: TradeImpactDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradeImpactData
     */
    omit?: TradeImpactDataOmit<ExtArgs> | null
    /**
     * The data used to create many TradeImpactData.
     */
    data: TradeImpactDataCreateManyInput | TradeImpactDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradeImpactData update
   */
  export type TradeImpactDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeImpactData
     */
    select?: TradeImpactDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeImpactData
     */
    omit?: TradeImpactDataOmit<ExtArgs> | null
    /**
     * The data needed to update a TradeImpactData.
     */
    data: XOR<TradeImpactDataUpdateInput, TradeImpactDataUncheckedUpdateInput>
    /**
     * Choose, which TradeImpactData to update.
     */
    where: TradeImpactDataWhereUniqueInput
  }

  /**
   * TradeImpactData updateMany
   */
  export type TradeImpactDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TradeImpactData.
     */
    data: XOR<TradeImpactDataUpdateManyMutationInput, TradeImpactDataUncheckedUpdateManyInput>
    /**
     * Filter which TradeImpactData to update
     */
    where?: TradeImpactDataWhereInput
    /**
     * Limit how many TradeImpactData to update.
     */
    limit?: number
  }

  /**
   * TradeImpactData updateManyAndReturn
   */
  export type TradeImpactDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeImpactData
     */
    select?: TradeImpactDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradeImpactData
     */
    omit?: TradeImpactDataOmit<ExtArgs> | null
    /**
     * The data used to update TradeImpactData.
     */
    data: XOR<TradeImpactDataUpdateManyMutationInput, TradeImpactDataUncheckedUpdateManyInput>
    /**
     * Filter which TradeImpactData to update
     */
    where?: TradeImpactDataWhereInput
    /**
     * Limit how many TradeImpactData to update.
     */
    limit?: number
  }

  /**
   * TradeImpactData upsert
   */
  export type TradeImpactDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeImpactData
     */
    select?: TradeImpactDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeImpactData
     */
    omit?: TradeImpactDataOmit<ExtArgs> | null
    /**
     * The filter to search for the TradeImpactData to update in case it exists.
     */
    where: TradeImpactDataWhereUniqueInput
    /**
     * In case the TradeImpactData found by the `where` argument doesn't exist, create a new TradeImpactData with this data.
     */
    create: XOR<TradeImpactDataCreateInput, TradeImpactDataUncheckedCreateInput>
    /**
     * In case the TradeImpactData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeImpactDataUpdateInput, TradeImpactDataUncheckedUpdateInput>
  }

  /**
   * TradeImpactData delete
   */
  export type TradeImpactDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeImpactData
     */
    select?: TradeImpactDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeImpactData
     */
    omit?: TradeImpactDataOmit<ExtArgs> | null
    /**
     * Filter which TradeImpactData to delete.
     */
    where: TradeImpactDataWhereUniqueInput
  }

  /**
   * TradeImpactData deleteMany
   */
  export type TradeImpactDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeImpactData to delete
     */
    where?: TradeImpactDataWhereInput
    /**
     * Limit how many TradeImpactData to delete.
     */
    limit?: number
  }

  /**
   * TradeImpactData without action
   */
  export type TradeImpactDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeImpactData
     */
    select?: TradeImpactDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeImpactData
     */
    omit?: TradeImpactDataOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BusinessScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    address: 'address',
    phone: 'phone',
    email: 'email',
    website: 'website',
    category: 'category',
    subcategory: 'subcategory',
    hours: 'hours',
    founded: 'founded',
    employees: 'employees',
    featured: 'featured',
    image: 'image',
    services: 'services',
    products: 'products',
    tags: 'tags',
    socialMedia: 'socialMedia',
    latitude: 'latitude',
    longitude: 'longitude',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BusinessScalarFieldEnum = (typeof BusinessScalarFieldEnum)[keyof typeof BusinessScalarFieldEnum]


  export const BusinessSubmissionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    address: 'address',
    phone: 'phone',
    email: 'email',
    website: 'website',
    category: 'category',
    subcategory: 'subcategory',
    hours: 'hours',
    founded: 'founded',
    services: 'services',
    products: 'products',
    socialMedia: 'socialMedia',
    status: 'status',
    submittedAt: 'submittedAt',
    reviewedAt: 'reviewedAt',
    reviewedBy: 'reviewedBy',
    reviewNotes: 'reviewNotes',
    businessId: 'businessId'
  };

  export type BusinessSubmissionScalarFieldEnum = (typeof BusinessSubmissionScalarFieldEnum)[keyof typeof BusinessSubmissionScalarFieldEnum]


  export const EconomicDataScalarFieldEnum: {
    id: 'id',
    category: 'category',
    title: 'title',
    value: 'value',
    date: 'date',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EconomicDataScalarFieldEnum = (typeof EconomicDataScalarFieldEnum)[keyof typeof EconomicDataScalarFieldEnum]


  export const NewsArticleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    source: 'source',
    url: 'url',
    imageUrl: 'imageUrl',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NewsArticleScalarFieldEnum = (typeof NewsArticleScalarFieldEnum)[keyof typeof NewsArticleScalarFieldEnum]


  export const WeatherDataScalarFieldEnum: {
    id: 'id',
    date: 'date',
    temperature: 'temperature',
    conditions: 'conditions',
    humidity: 'humidity',
    windSpeed: 'windSpeed',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WeatherDataScalarFieldEnum = (typeof WeatherDataScalarFieldEnum)[keyof typeof WeatherDataScalarFieldEnum]


  export const TradeImpactDataScalarFieldEnum: {
    id: 'id',
    category: 'category',
    title: 'title',
    description: 'description',
    value: 'value',
    date: 'date',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TradeImpactDataScalarFieldEnum = (typeof TradeImpactDataScalarFieldEnum)[keyof typeof TradeImpactDataScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BusinessWhereInput = {
    AND?: BusinessWhereInput | BusinessWhereInput[]
    OR?: BusinessWhereInput[]
    NOT?: BusinessWhereInput | BusinessWhereInput[]
    id?: StringFilter<"Business"> | string
    name?: StringFilter<"Business"> | string
    description?: StringNullableFilter<"Business"> | string | null
    address?: StringNullableFilter<"Business"> | string | null
    phone?: StringNullableFilter<"Business"> | string | null
    email?: StringNullableFilter<"Business"> | string | null
    website?: StringNullableFilter<"Business"> | string | null
    category?: StringNullableFilter<"Business"> | string | null
    subcategory?: StringNullableFilter<"Business"> | string | null
    hours?: StringNullableFilter<"Business"> | string | null
    founded?: StringNullableFilter<"Business"> | string | null
    employees?: StringNullableFilter<"Business"> | string | null
    featured?: BoolFilter<"Business"> | boolean
    image?: StringNullableFilter<"Business"> | string | null
    services?: StringNullableListFilter<"Business">
    products?: StringNullableListFilter<"Business">
    tags?: StringNullableListFilter<"Business">
    socialMedia?: JsonNullableFilter<"Business">
    latitude?: FloatNullableFilter<"Business"> | number | null
    longitude?: FloatNullableFilter<"Business"> | number | null
    createdAt?: DateTimeFilter<"Business"> | Date | string
    updatedAt?: DateTimeFilter<"Business"> | Date | string
  }

  export type BusinessOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    subcategory?: SortOrderInput | SortOrder
    hours?: SortOrderInput | SortOrder
    founded?: SortOrderInput | SortOrder
    employees?: SortOrderInput | SortOrder
    featured?: SortOrder
    image?: SortOrderInput | SortOrder
    services?: SortOrder
    products?: SortOrder
    tags?: SortOrder
    socialMedia?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BusinessWhereInput | BusinessWhereInput[]
    OR?: BusinessWhereInput[]
    NOT?: BusinessWhereInput | BusinessWhereInput[]
    name?: StringFilter<"Business"> | string
    description?: StringNullableFilter<"Business"> | string | null
    address?: StringNullableFilter<"Business"> | string | null
    phone?: StringNullableFilter<"Business"> | string | null
    email?: StringNullableFilter<"Business"> | string | null
    website?: StringNullableFilter<"Business"> | string | null
    category?: StringNullableFilter<"Business"> | string | null
    subcategory?: StringNullableFilter<"Business"> | string | null
    hours?: StringNullableFilter<"Business"> | string | null
    founded?: StringNullableFilter<"Business"> | string | null
    employees?: StringNullableFilter<"Business"> | string | null
    featured?: BoolFilter<"Business"> | boolean
    image?: StringNullableFilter<"Business"> | string | null
    services?: StringNullableListFilter<"Business">
    products?: StringNullableListFilter<"Business">
    tags?: StringNullableListFilter<"Business">
    socialMedia?: JsonNullableFilter<"Business">
    latitude?: FloatNullableFilter<"Business"> | number | null
    longitude?: FloatNullableFilter<"Business"> | number | null
    createdAt?: DateTimeFilter<"Business"> | Date | string
    updatedAt?: DateTimeFilter<"Business"> | Date | string
  }, "id">

  export type BusinessOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    subcategory?: SortOrderInput | SortOrder
    hours?: SortOrderInput | SortOrder
    founded?: SortOrderInput | SortOrder
    employees?: SortOrderInput | SortOrder
    featured?: SortOrder
    image?: SortOrderInput | SortOrder
    services?: SortOrder
    products?: SortOrder
    tags?: SortOrder
    socialMedia?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BusinessCountOrderByAggregateInput
    _avg?: BusinessAvgOrderByAggregateInput
    _max?: BusinessMaxOrderByAggregateInput
    _min?: BusinessMinOrderByAggregateInput
    _sum?: BusinessSumOrderByAggregateInput
  }

  export type BusinessScalarWhereWithAggregatesInput = {
    AND?: BusinessScalarWhereWithAggregatesInput | BusinessScalarWhereWithAggregatesInput[]
    OR?: BusinessScalarWhereWithAggregatesInput[]
    NOT?: BusinessScalarWhereWithAggregatesInput | BusinessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Business"> | string
    name?: StringWithAggregatesFilter<"Business"> | string
    description?: StringNullableWithAggregatesFilter<"Business"> | string | null
    address?: StringNullableWithAggregatesFilter<"Business"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Business"> | string | null
    email?: StringNullableWithAggregatesFilter<"Business"> | string | null
    website?: StringNullableWithAggregatesFilter<"Business"> | string | null
    category?: StringNullableWithAggregatesFilter<"Business"> | string | null
    subcategory?: StringNullableWithAggregatesFilter<"Business"> | string | null
    hours?: StringNullableWithAggregatesFilter<"Business"> | string | null
    founded?: StringNullableWithAggregatesFilter<"Business"> | string | null
    employees?: StringNullableWithAggregatesFilter<"Business"> | string | null
    featured?: BoolWithAggregatesFilter<"Business"> | boolean
    image?: StringNullableWithAggregatesFilter<"Business"> | string | null
    services?: StringNullableListFilter<"Business">
    products?: StringNullableListFilter<"Business">
    tags?: StringNullableListFilter<"Business">
    socialMedia?: JsonNullableWithAggregatesFilter<"Business">
    latitude?: FloatNullableWithAggregatesFilter<"Business"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Business"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Business"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Business"> | Date | string
  }

  export type BusinessSubmissionWhereInput = {
    AND?: BusinessSubmissionWhereInput | BusinessSubmissionWhereInput[]
    OR?: BusinessSubmissionWhereInput[]
    NOT?: BusinessSubmissionWhereInput | BusinessSubmissionWhereInput[]
    id?: StringFilter<"BusinessSubmission"> | string
    name?: StringFilter<"BusinessSubmission"> | string
    description?: StringFilter<"BusinessSubmission"> | string
    address?: StringFilter<"BusinessSubmission"> | string
    phone?: StringFilter<"BusinessSubmission"> | string
    email?: StringNullableFilter<"BusinessSubmission"> | string | null
    website?: StringNullableFilter<"BusinessSubmission"> | string | null
    category?: StringFilter<"BusinessSubmission"> | string
    subcategory?: StringNullableFilter<"BusinessSubmission"> | string | null
    hours?: StringNullableFilter<"BusinessSubmission"> | string | null
    founded?: StringNullableFilter<"BusinessSubmission"> | string | null
    services?: StringNullableListFilter<"BusinessSubmission">
    products?: StringNullableListFilter<"BusinessSubmission">
    socialMedia?: JsonNullableFilter<"BusinessSubmission">
    status?: StringFilter<"BusinessSubmission"> | string
    submittedAt?: DateTimeFilter<"BusinessSubmission"> | Date | string
    reviewedAt?: DateTimeNullableFilter<"BusinessSubmission"> | Date | string | null
    reviewedBy?: StringNullableFilter<"BusinessSubmission"> | string | null
    reviewNotes?: StringNullableFilter<"BusinessSubmission"> | string | null
    businessId?: StringNullableFilter<"BusinessSubmission"> | string | null
  }

  export type BusinessSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    category?: SortOrder
    subcategory?: SortOrderInput | SortOrder
    hours?: SortOrderInput | SortOrder
    founded?: SortOrderInput | SortOrder
    services?: SortOrder
    products?: SortOrder
    socialMedia?: SortOrderInput | SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    reviewNotes?: SortOrderInput | SortOrder
    businessId?: SortOrderInput | SortOrder
  }

  export type BusinessSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BusinessSubmissionWhereInput | BusinessSubmissionWhereInput[]
    OR?: BusinessSubmissionWhereInput[]
    NOT?: BusinessSubmissionWhereInput | BusinessSubmissionWhereInput[]
    name?: StringFilter<"BusinessSubmission"> | string
    description?: StringFilter<"BusinessSubmission"> | string
    address?: StringFilter<"BusinessSubmission"> | string
    phone?: StringFilter<"BusinessSubmission"> | string
    email?: StringNullableFilter<"BusinessSubmission"> | string | null
    website?: StringNullableFilter<"BusinessSubmission"> | string | null
    category?: StringFilter<"BusinessSubmission"> | string
    subcategory?: StringNullableFilter<"BusinessSubmission"> | string | null
    hours?: StringNullableFilter<"BusinessSubmission"> | string | null
    founded?: StringNullableFilter<"BusinessSubmission"> | string | null
    services?: StringNullableListFilter<"BusinessSubmission">
    products?: StringNullableListFilter<"BusinessSubmission">
    socialMedia?: JsonNullableFilter<"BusinessSubmission">
    status?: StringFilter<"BusinessSubmission"> | string
    submittedAt?: DateTimeFilter<"BusinessSubmission"> | Date | string
    reviewedAt?: DateTimeNullableFilter<"BusinessSubmission"> | Date | string | null
    reviewedBy?: StringNullableFilter<"BusinessSubmission"> | string | null
    reviewNotes?: StringNullableFilter<"BusinessSubmission"> | string | null
    businessId?: StringNullableFilter<"BusinessSubmission"> | string | null
  }, "id">

  export type BusinessSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    category?: SortOrder
    subcategory?: SortOrderInput | SortOrder
    hours?: SortOrderInput | SortOrder
    founded?: SortOrderInput | SortOrder
    services?: SortOrder
    products?: SortOrder
    socialMedia?: SortOrderInput | SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    reviewNotes?: SortOrderInput | SortOrder
    businessId?: SortOrderInput | SortOrder
    _count?: BusinessSubmissionCountOrderByAggregateInput
    _max?: BusinessSubmissionMaxOrderByAggregateInput
    _min?: BusinessSubmissionMinOrderByAggregateInput
  }

  export type BusinessSubmissionScalarWhereWithAggregatesInput = {
    AND?: BusinessSubmissionScalarWhereWithAggregatesInput | BusinessSubmissionScalarWhereWithAggregatesInput[]
    OR?: BusinessSubmissionScalarWhereWithAggregatesInput[]
    NOT?: BusinessSubmissionScalarWhereWithAggregatesInput | BusinessSubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BusinessSubmission"> | string
    name?: StringWithAggregatesFilter<"BusinessSubmission"> | string
    description?: StringWithAggregatesFilter<"BusinessSubmission"> | string
    address?: StringWithAggregatesFilter<"BusinessSubmission"> | string
    phone?: StringWithAggregatesFilter<"BusinessSubmission"> | string
    email?: StringNullableWithAggregatesFilter<"BusinessSubmission"> | string | null
    website?: StringNullableWithAggregatesFilter<"BusinessSubmission"> | string | null
    category?: StringWithAggregatesFilter<"BusinessSubmission"> | string
    subcategory?: StringNullableWithAggregatesFilter<"BusinessSubmission"> | string | null
    hours?: StringNullableWithAggregatesFilter<"BusinessSubmission"> | string | null
    founded?: StringNullableWithAggregatesFilter<"BusinessSubmission"> | string | null
    services?: StringNullableListFilter<"BusinessSubmission">
    products?: StringNullableListFilter<"BusinessSubmission">
    socialMedia?: JsonNullableWithAggregatesFilter<"BusinessSubmission">
    status?: StringWithAggregatesFilter<"BusinessSubmission"> | string
    submittedAt?: DateTimeWithAggregatesFilter<"BusinessSubmission"> | Date | string
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"BusinessSubmission"> | Date | string | null
    reviewedBy?: StringNullableWithAggregatesFilter<"BusinessSubmission"> | string | null
    reviewNotes?: StringNullableWithAggregatesFilter<"BusinessSubmission"> | string | null
    businessId?: StringNullableWithAggregatesFilter<"BusinessSubmission"> | string | null
  }

  export type EconomicDataWhereInput = {
    AND?: EconomicDataWhereInput | EconomicDataWhereInput[]
    OR?: EconomicDataWhereInput[]
    NOT?: EconomicDataWhereInput | EconomicDataWhereInput[]
    id?: StringFilter<"EconomicData"> | string
    category?: StringFilter<"EconomicData"> | string
    title?: StringFilter<"EconomicData"> | string
    value?: StringFilter<"EconomicData"> | string
    date?: DateTimeFilter<"EconomicData"> | Date | string
    source?: StringNullableFilter<"EconomicData"> | string | null
    createdAt?: DateTimeFilter<"EconomicData"> | Date | string
    updatedAt?: DateTimeFilter<"EconomicData"> | Date | string
  }

  export type EconomicDataOrderByWithRelationInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    value?: SortOrder
    date?: SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EconomicDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EconomicDataWhereInput | EconomicDataWhereInput[]
    OR?: EconomicDataWhereInput[]
    NOT?: EconomicDataWhereInput | EconomicDataWhereInput[]
    category?: StringFilter<"EconomicData"> | string
    title?: StringFilter<"EconomicData"> | string
    value?: StringFilter<"EconomicData"> | string
    date?: DateTimeFilter<"EconomicData"> | Date | string
    source?: StringNullableFilter<"EconomicData"> | string | null
    createdAt?: DateTimeFilter<"EconomicData"> | Date | string
    updatedAt?: DateTimeFilter<"EconomicData"> | Date | string
  }, "id">

  export type EconomicDataOrderByWithAggregationInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    value?: SortOrder
    date?: SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EconomicDataCountOrderByAggregateInput
    _max?: EconomicDataMaxOrderByAggregateInput
    _min?: EconomicDataMinOrderByAggregateInput
  }

  export type EconomicDataScalarWhereWithAggregatesInput = {
    AND?: EconomicDataScalarWhereWithAggregatesInput | EconomicDataScalarWhereWithAggregatesInput[]
    OR?: EconomicDataScalarWhereWithAggregatesInput[]
    NOT?: EconomicDataScalarWhereWithAggregatesInput | EconomicDataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EconomicData"> | string
    category?: StringWithAggregatesFilter<"EconomicData"> | string
    title?: StringWithAggregatesFilter<"EconomicData"> | string
    value?: StringWithAggregatesFilter<"EconomicData"> | string
    date?: DateTimeWithAggregatesFilter<"EconomicData"> | Date | string
    source?: StringNullableWithAggregatesFilter<"EconomicData"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EconomicData"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EconomicData"> | Date | string
  }

  export type NewsArticleWhereInput = {
    AND?: NewsArticleWhereInput | NewsArticleWhereInput[]
    OR?: NewsArticleWhereInput[]
    NOT?: NewsArticleWhereInput | NewsArticleWhereInput[]
    id?: StringFilter<"NewsArticle"> | string
    title?: StringFilter<"NewsArticle"> | string
    content?: StringFilter<"NewsArticle"> | string
    source?: StringFilter<"NewsArticle"> | string
    url?: StringFilter<"NewsArticle"> | string
    imageUrl?: StringNullableFilter<"NewsArticle"> | string | null
    publishedAt?: DateTimeFilter<"NewsArticle"> | Date | string
    createdAt?: DateTimeFilter<"NewsArticle"> | Date | string
    updatedAt?: DateTimeFilter<"NewsArticle"> | Date | string
  }

  export type NewsArticleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    source?: SortOrder
    url?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NewsArticleWhereInput | NewsArticleWhereInput[]
    OR?: NewsArticleWhereInput[]
    NOT?: NewsArticleWhereInput | NewsArticleWhereInput[]
    title?: StringFilter<"NewsArticle"> | string
    content?: StringFilter<"NewsArticle"> | string
    source?: StringFilter<"NewsArticle"> | string
    url?: StringFilter<"NewsArticle"> | string
    imageUrl?: StringNullableFilter<"NewsArticle"> | string | null
    publishedAt?: DateTimeFilter<"NewsArticle"> | Date | string
    createdAt?: DateTimeFilter<"NewsArticle"> | Date | string
    updatedAt?: DateTimeFilter<"NewsArticle"> | Date | string
  }, "id">

  export type NewsArticleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    source?: SortOrder
    url?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NewsArticleCountOrderByAggregateInput
    _max?: NewsArticleMaxOrderByAggregateInput
    _min?: NewsArticleMinOrderByAggregateInput
  }

  export type NewsArticleScalarWhereWithAggregatesInput = {
    AND?: NewsArticleScalarWhereWithAggregatesInput | NewsArticleScalarWhereWithAggregatesInput[]
    OR?: NewsArticleScalarWhereWithAggregatesInput[]
    NOT?: NewsArticleScalarWhereWithAggregatesInput | NewsArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsArticle"> | string
    title?: StringWithAggregatesFilter<"NewsArticle"> | string
    content?: StringWithAggregatesFilter<"NewsArticle"> | string
    source?: StringWithAggregatesFilter<"NewsArticle"> | string
    url?: StringWithAggregatesFilter<"NewsArticle"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"NewsArticle"> | string | null
    publishedAt?: DateTimeWithAggregatesFilter<"NewsArticle"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"NewsArticle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NewsArticle"> | Date | string
  }

  export type WeatherDataWhereInput = {
    AND?: WeatherDataWhereInput | WeatherDataWhereInput[]
    OR?: WeatherDataWhereInput[]
    NOT?: WeatherDataWhereInput | WeatherDataWhereInput[]
    id?: StringFilter<"WeatherData"> | string
    date?: DateTimeFilter<"WeatherData"> | Date | string
    temperature?: FloatFilter<"WeatherData"> | number
    conditions?: StringFilter<"WeatherData"> | string
    humidity?: FloatNullableFilter<"WeatherData"> | number | null
    windSpeed?: FloatNullableFilter<"WeatherData"> | number | null
    source?: StringFilter<"WeatherData"> | string
    createdAt?: DateTimeFilter<"WeatherData"> | Date | string
    updatedAt?: DateTimeFilter<"WeatherData"> | Date | string
  }

  export type WeatherDataOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    temperature?: SortOrder
    conditions?: SortOrder
    humidity?: SortOrderInput | SortOrder
    windSpeed?: SortOrderInput | SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeatherDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WeatherDataWhereInput | WeatherDataWhereInput[]
    OR?: WeatherDataWhereInput[]
    NOT?: WeatherDataWhereInput | WeatherDataWhereInput[]
    date?: DateTimeFilter<"WeatherData"> | Date | string
    temperature?: FloatFilter<"WeatherData"> | number
    conditions?: StringFilter<"WeatherData"> | string
    humidity?: FloatNullableFilter<"WeatherData"> | number | null
    windSpeed?: FloatNullableFilter<"WeatherData"> | number | null
    source?: StringFilter<"WeatherData"> | string
    createdAt?: DateTimeFilter<"WeatherData"> | Date | string
    updatedAt?: DateTimeFilter<"WeatherData"> | Date | string
  }, "id">

  export type WeatherDataOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    temperature?: SortOrder
    conditions?: SortOrder
    humidity?: SortOrderInput | SortOrder
    windSpeed?: SortOrderInput | SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WeatherDataCountOrderByAggregateInput
    _avg?: WeatherDataAvgOrderByAggregateInput
    _max?: WeatherDataMaxOrderByAggregateInput
    _min?: WeatherDataMinOrderByAggregateInput
    _sum?: WeatherDataSumOrderByAggregateInput
  }

  export type WeatherDataScalarWhereWithAggregatesInput = {
    AND?: WeatherDataScalarWhereWithAggregatesInput | WeatherDataScalarWhereWithAggregatesInput[]
    OR?: WeatherDataScalarWhereWithAggregatesInput[]
    NOT?: WeatherDataScalarWhereWithAggregatesInput | WeatherDataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeatherData"> | string
    date?: DateTimeWithAggregatesFilter<"WeatherData"> | Date | string
    temperature?: FloatWithAggregatesFilter<"WeatherData"> | number
    conditions?: StringWithAggregatesFilter<"WeatherData"> | string
    humidity?: FloatNullableWithAggregatesFilter<"WeatherData"> | number | null
    windSpeed?: FloatNullableWithAggregatesFilter<"WeatherData"> | number | null
    source?: StringWithAggregatesFilter<"WeatherData"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WeatherData"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WeatherData"> | Date | string
  }

  export type TradeImpactDataWhereInput = {
    AND?: TradeImpactDataWhereInput | TradeImpactDataWhereInput[]
    OR?: TradeImpactDataWhereInput[]
    NOT?: TradeImpactDataWhereInput | TradeImpactDataWhereInput[]
    id?: StringFilter<"TradeImpactData"> | string
    category?: StringFilter<"TradeImpactData"> | string
    title?: StringFilter<"TradeImpactData"> | string
    description?: StringFilter<"TradeImpactData"> | string
    value?: StringNullableFilter<"TradeImpactData"> | string | null
    date?: DateTimeFilter<"TradeImpactData"> | Date | string
    source?: StringNullableFilter<"TradeImpactData"> | string | null
    createdAt?: DateTimeFilter<"TradeImpactData"> | Date | string
    updatedAt?: DateTimeFilter<"TradeImpactData"> | Date | string
  }

  export type TradeImpactDataOrderByWithRelationInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    value?: SortOrderInput | SortOrder
    date?: SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeImpactDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradeImpactDataWhereInput | TradeImpactDataWhereInput[]
    OR?: TradeImpactDataWhereInput[]
    NOT?: TradeImpactDataWhereInput | TradeImpactDataWhereInput[]
    category?: StringFilter<"TradeImpactData"> | string
    title?: StringFilter<"TradeImpactData"> | string
    description?: StringFilter<"TradeImpactData"> | string
    value?: StringNullableFilter<"TradeImpactData"> | string | null
    date?: DateTimeFilter<"TradeImpactData"> | Date | string
    source?: StringNullableFilter<"TradeImpactData"> | string | null
    createdAt?: DateTimeFilter<"TradeImpactData"> | Date | string
    updatedAt?: DateTimeFilter<"TradeImpactData"> | Date | string
  }, "id">

  export type TradeImpactDataOrderByWithAggregationInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    value?: SortOrderInput | SortOrder
    date?: SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TradeImpactDataCountOrderByAggregateInput
    _max?: TradeImpactDataMaxOrderByAggregateInput
    _min?: TradeImpactDataMinOrderByAggregateInput
  }

  export type TradeImpactDataScalarWhereWithAggregatesInput = {
    AND?: TradeImpactDataScalarWhereWithAggregatesInput | TradeImpactDataScalarWhereWithAggregatesInput[]
    OR?: TradeImpactDataScalarWhereWithAggregatesInput[]
    NOT?: TradeImpactDataScalarWhereWithAggregatesInput | TradeImpactDataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TradeImpactData"> | string
    category?: StringWithAggregatesFilter<"TradeImpactData"> | string
    title?: StringWithAggregatesFilter<"TradeImpactData"> | string
    description?: StringWithAggregatesFilter<"TradeImpactData"> | string
    value?: StringNullableWithAggregatesFilter<"TradeImpactData"> | string | null
    date?: DateTimeWithAggregatesFilter<"TradeImpactData"> | Date | string
    source?: StringNullableWithAggregatesFilter<"TradeImpactData"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TradeImpactData"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TradeImpactData"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessCreateInput = {
    id?: string
    name: string
    description?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    category?: string | null
    subcategory?: string | null
    hours?: string | null
    founded?: string | null
    employees?: string | null
    featured?: boolean
    image?: string | null
    services?: BusinessCreateservicesInput | string[]
    products?: BusinessCreateproductsInput | string[]
    tags?: BusinessCreatetagsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    category?: string | null
    subcategory?: string | null
    hours?: string | null
    founded?: string | null
    employees?: string | null
    featured?: boolean
    image?: string | null
    services?: BusinessCreateservicesInput | string[]
    products?: BusinessCreateproductsInput | string[]
    tags?: BusinessCreatetagsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    founded?: NullableStringFieldUpdateOperationsInput | string | null
    employees?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    services?: BusinessUpdateservicesInput | string[]
    products?: BusinessUpdateproductsInput | string[]
    tags?: BusinessUpdatetagsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    founded?: NullableStringFieldUpdateOperationsInput | string | null
    employees?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    services?: BusinessUpdateservicesInput | string[]
    products?: BusinessUpdateproductsInput | string[]
    tags?: BusinessUpdatetagsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    website?: string | null
    category?: string | null
    subcategory?: string | null
    hours?: string | null
    founded?: string | null
    employees?: string | null
    featured?: boolean
    image?: string | null
    services?: BusinessCreateservicesInput | string[]
    products?: BusinessCreateproductsInput | string[]
    tags?: BusinessCreatetagsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    founded?: NullableStringFieldUpdateOperationsInput | string | null
    employees?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    services?: BusinessUpdateservicesInput | string[]
    products?: BusinessUpdateproductsInput | string[]
    tags?: BusinessUpdatetagsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    founded?: NullableStringFieldUpdateOperationsInput | string | null
    employees?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    services?: BusinessUpdateservicesInput | string[]
    products?: BusinessUpdateproductsInput | string[]
    tags?: BusinessUpdatetagsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessSubmissionCreateInput = {
    id?: string
    name: string
    description: string
    address: string
    phone: string
    email?: string | null
    website?: string | null
    category: string
    subcategory?: string | null
    hours?: string | null
    founded?: string | null
    services?: BusinessSubmissionCreateservicesInput | string[]
    products?: BusinessSubmissionCreateproductsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    reviewNotes?: string | null
    businessId?: string | null
  }

  export type BusinessSubmissionUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    address: string
    phone: string
    email?: string | null
    website?: string | null
    category: string
    subcategory?: string | null
    hours?: string | null
    founded?: string | null
    services?: BusinessSubmissionCreateservicesInput | string[]
    products?: BusinessSubmissionCreateproductsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    reviewNotes?: string | null
    businessId?: string | null
  }

  export type BusinessSubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    founded?: NullableStringFieldUpdateOperationsInput | string | null
    services?: BusinessSubmissionUpdateservicesInput | string[]
    products?: BusinessSubmissionUpdateproductsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    businessId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BusinessSubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    founded?: NullableStringFieldUpdateOperationsInput | string | null
    services?: BusinessSubmissionUpdateservicesInput | string[]
    products?: BusinessSubmissionUpdateproductsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    businessId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BusinessSubmissionCreateManyInput = {
    id?: string
    name: string
    description: string
    address: string
    phone: string
    email?: string | null
    website?: string | null
    category: string
    subcategory?: string | null
    hours?: string | null
    founded?: string | null
    services?: BusinessSubmissionCreateservicesInput | string[]
    products?: BusinessSubmissionCreateproductsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    reviewNotes?: string | null
    businessId?: string | null
  }

  export type BusinessSubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    founded?: NullableStringFieldUpdateOperationsInput | string | null
    services?: BusinessSubmissionUpdateservicesInput | string[]
    products?: BusinessSubmissionUpdateproductsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    businessId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BusinessSubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    founded?: NullableStringFieldUpdateOperationsInput | string | null
    services?: BusinessSubmissionUpdateservicesInput | string[]
    products?: BusinessSubmissionUpdateproductsInput | string[]
    socialMedia?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    businessId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EconomicDataCreateInput = {
    id?: string
    category: string
    title: string
    value: string
    date: Date | string
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EconomicDataUncheckedCreateInput = {
    id?: string
    category: string
    title: string
    value: string
    date: Date | string
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EconomicDataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EconomicDataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EconomicDataCreateManyInput = {
    id?: string
    category: string
    title: string
    value: string
    date: Date | string
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EconomicDataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EconomicDataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsArticleCreateInput = {
    id?: string
    title: string
    content: string
    source: string
    url: string
    imageUrl?: string | null
    publishedAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsArticleUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    source: string
    url: string
    imageUrl?: string | null
    publishedAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsArticleCreateManyInput = {
    id?: string
    title: string
    content: string
    source: string
    url: string
    imageUrl?: string | null
    publishedAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeatherDataCreateInput = {
    id?: string
    date: Date | string
    temperature: number
    conditions: string
    humidity?: number | null
    windSpeed?: number | null
    source: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeatherDataUncheckedCreateInput = {
    id?: string
    date: Date | string
    temperature: number
    conditions: string
    humidity?: number | null
    windSpeed?: number | null
    source: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeatherDataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    temperature?: FloatFieldUpdateOperationsInput | number
    conditions?: StringFieldUpdateOperationsInput | string
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    windSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeatherDataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    temperature?: FloatFieldUpdateOperationsInput | number
    conditions?: StringFieldUpdateOperationsInput | string
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    windSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeatherDataCreateManyInput = {
    id?: string
    date: Date | string
    temperature: number
    conditions: string
    humidity?: number | null
    windSpeed?: number | null
    source: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeatherDataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    temperature?: FloatFieldUpdateOperationsInput | number
    conditions?: StringFieldUpdateOperationsInput | string
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    windSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeatherDataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    temperature?: FloatFieldUpdateOperationsInput | number
    conditions?: StringFieldUpdateOperationsInput | string
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    windSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeImpactDataCreateInput = {
    id?: string
    category: string
    title: string
    description: string
    value?: string | null
    date: Date | string
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeImpactDataUncheckedCreateInput = {
    id?: string
    category: string
    title: string
    description: string
    value?: string | null
    date: Date | string
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeImpactDataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeImpactDataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeImpactDataCreateManyInput = {
    id?: string
    category: string
    title: string
    description: string
    value?: string | null
    date: Date | string
    source?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeImpactDataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeImpactDataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BusinessCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    hours?: SortOrder
    founded?: SortOrder
    employees?: SortOrder
    featured?: SortOrder
    image?: SortOrder
    services?: SortOrder
    products?: SortOrder
    tags?: SortOrder
    socialMedia?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type BusinessMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    hours?: SortOrder
    founded?: SortOrder
    employees?: SortOrder
    featured?: SortOrder
    image?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    hours?: SortOrder
    founded?: SortOrder
    employees?: SortOrder
    featured?: SortOrder
    image?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BusinessSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    hours?: SortOrder
    founded?: SortOrder
    services?: SortOrder
    products?: SortOrder
    socialMedia?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
    reviewNotes?: SortOrder
    businessId?: SortOrder
  }

  export type BusinessSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    hours?: SortOrder
    founded?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
    reviewNotes?: SortOrder
    businessId?: SortOrder
  }

  export type BusinessSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    website?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    hours?: SortOrder
    founded?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
    reviewNotes?: SortOrder
    businessId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EconomicDataCountOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    value?: SortOrder
    date?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EconomicDataMaxOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    value?: SortOrder
    date?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EconomicDataMinOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    value?: SortOrder
    date?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsArticleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    source?: SortOrder
    url?: SortOrder
    imageUrl?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    source?: SortOrder
    url?: SortOrder
    imageUrl?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsArticleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    source?: SortOrder
    url?: SortOrder
    imageUrl?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type WeatherDataCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    temperature?: SortOrder
    conditions?: SortOrder
    humidity?: SortOrder
    windSpeed?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeatherDataAvgOrderByAggregateInput = {
    temperature?: SortOrder
    humidity?: SortOrder
    windSpeed?: SortOrder
  }

  export type WeatherDataMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    temperature?: SortOrder
    conditions?: SortOrder
    humidity?: SortOrder
    windSpeed?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeatherDataMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    temperature?: SortOrder
    conditions?: SortOrder
    humidity?: SortOrder
    windSpeed?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeatherDataSumOrderByAggregateInput = {
    temperature?: SortOrder
    humidity?: SortOrder
    windSpeed?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type TradeImpactDataCountOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    value?: SortOrder
    date?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeImpactDataMaxOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    value?: SortOrder
    date?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeImpactDataMinOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    title?: SortOrder
    description?: SortOrder
    value?: SortOrder
    date?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BusinessCreateservicesInput = {
    set: string[]
  }

  export type BusinessCreateproductsInput = {
    set: string[]
  }

  export type BusinessCreatetagsInput = {
    set: string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type BusinessUpdateservicesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BusinessUpdateproductsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BusinessUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BusinessSubmissionCreateservicesInput = {
    set: string[]
  }

  export type BusinessSubmissionCreateproductsInput = {
    set: string[]
  }

  export type BusinessSubmissionUpdateservicesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BusinessSubmissionUpdateproductsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}