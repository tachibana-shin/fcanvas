/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import mitt from "mitt";

import { error } from "../helpers/log";
import { noop } from "../types";

import { CanvasElement } from "./CanvasElement";

type ComponentRenderProxy<
  P = {}, // props type extracted from props option
  B = {}, // raw bindings returned from setup()
  D = {}, // return from data()
  E extends EmitsOptions = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {}
> = Readonly<P> &
  B &
  D &
  M &
  ExtractComputedReturns<C> &
  CanvasElement &
  ExtractEmitsFn<E> &
  ExtractOnFn<E> &
  ExtractOffFn<E>;
type ComputedGetter<T> = (ctx?: any) => T;
type ComputedSetter<T> = (v: T) => void;
type ObjectEmitsOptions = Record<
  string,
  any //((...args: readonly any[]) => any) | null
>;
type EmitsOptions = ObjectEmitsOptions;
type WritableComputedOptions<T> = {
  readonly get: ComputedGetter<T>;
  readonly set: ComputedSetter<T>;
};
type ComputedOptions = Record<
  string,
  ComputedGetter<any> | WritableComputedOptions<any>
>;
type MethodOptions = {
  readonly [key: string]: Function;
};
type SetupFunction<
  Props,
  RawBindings,
  D,
  E extends EmitsOptions,
  C extends ComputedOptions,
  M extends MethodOptions
> = (
  props: Props
) =>
  | (RawBindings &
      ThisType<ComponentRenderProxy<Props, RawBindings, D, E, C, M>>)
  | void;

type ComponentOptionsBase<
  Props,
  D = Data,
  C extends ComputedOptions = {},
  M extends MethodOptions = {}
> = {
  readonly data?: ((this: Props, vm: Props) => D) | D;
  readonly computed?: C;
  readonly methods?: M;
  readonly draw?: noop;
  readonly update?: noop;
};

// eslint-disable-next-line functional/prefer-readonly-type
type ExtractComputedReturns<T extends any> = {
  [key in keyof T]: T[key] extends {
    readonly get: (...args: readonly any[]) => infer TReturn;
  }
    ? TReturn
    : T[key] extends (...args: readonly any[]) => infer TReturn
    ? TReturn
    : never;
};

type ExtractEmitsFn<E extends any> = {
  readonly emit: E extends readonly (infer Names)[]
    ? (ev: Names) => void
    : (ev: keyof E, p: E[keyof E]) => void;
};
type ExtractOnFn<E extends any> = {
  readonly on: E extends readonly (infer Names)[]
    ? (ev: Names, cb: () => void) => void
    : (ev: keyof E, cb: (val: E[keyof E]) => void) => void;
};
type ExtractOffFn<E extends any> = {
  readonly off: E extends readonly (infer Names)[]
    ? (ev: Names, cb: () => void) => void
    : (ev: keyof E, cb: (val: E[keyof E]) => void) => void;
};
type ComponentOptionsWithProps<
  PropsOptions = ComponentPropsOptions,
  RawBindings = Data,
  D = Data,
  E extends EmitsOptions = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Props = ExtractPropTypes<PropsOptions>
> = ComponentOptionsBase<Props, D, C, M> & {
  readonly props?: PropsOptions;
  readonly emits?: E;
  readonly setup?: SetupFunction<Props, RawBindings, D, E, C, M>;
} & ThisType<ComponentRenderProxy<Props, RawBindings, D, E, C, M>>;
type ComponentOptionsWithArrayProps<
  PropNames extends string = string,
  RawBindings = Data,
  D = Data,
  E extends EmitsOptions = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Props = Readonly<{
    readonly [key in PropNames]?: any;
  }>
> = ComponentOptionsBase<Props, D, C, M> & {
  readonly props?: readonly PropNames[];
  readonly emits?: E;
  readonly setup?: SetupFunction<Props, RawBindings, D, E, C, M>;
} & ThisType<ComponentRenderProxy<Props, RawBindings, D, E, C, M>>;
type ComponentOptionsWithoutProps<
  Props = unknown,
  RawBindings = Data,
  D = Data,
  E extends EmitsOptions = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {}
> = ComponentOptionsBase<Props, D, C, M> & {
  readonly props?: undefined;
  readonly emits?: E;
  readonly setup?: SetupFunction<Props, RawBindings, D, E, C, M>;
} & ThisType<ComponentRenderProxy<Props, RawBindings, D, E, C, M>>;
type ComponentPropsOptions<P = Data> =
  | ComponentObjectPropsOptions<P>
  | readonly string[];
type ComponentObjectPropsOptions<P = Data> = {
  readonly [K in keyof P]: Prop<P[K]> | null;
};
type Prop<T, D = T> = PropOptions<T, D> | PropType<T> | T;
type DefaultFactory<T> = () => T | null | undefined;
type PropOptions<T = any, D = T> = {
  readonly type?: PropType<T> | true | null;
  readonly required?: boolean;
  readonly default?: D | DefaultFactory<D> | null | undefined | object;
  // validator?(value: unknown): boolean;
};
export type PropType<T> = PropConstructor<T> | readonly PropConstructor<T>[];
type PropConstructor<T> =
  | {
      new (...args: readonly any[]): T & object;
    }
  | {
      (): T;
    }
  | {
      new (...args: readonly string[]): Function;
    };
type RequiredKeys<T> = {
  readonly [K in keyof T]: T[K] extends
    | {
        readonly required: true;
      }
    | {
        readonly default: any;
      }
    | BooleanConstructor
    | {
        readonly type: BooleanConstructor;
      }
    ? K
    : never;
}[keyof T];
type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;
type ExtractFunctionPropType<
  T extends Function,
  TArgs extends ReadonlyArray<any> = readonly any[],
  TResult = any
> = T extends (...args: TArgs) => TResult ? T : never;
type ExtractCorrectPropType<T> = T extends Function
  ? ExtractFunctionPropType<T>
  : Exclude<T, Function>;
type InferPropType<T> = T extends null
  ? any
  : T extends {
      readonly type: null | true;
    }
  ? any
  : T extends
      | ObjectConstructor
      | {
          readonly type: ObjectConstructor;
        }
  ? Record<string, any>
  : T extends
      | BooleanConstructor
      | {
          readonly type: BooleanConstructor;
        }
  ? boolean
  : T extends
      | DateConstructor
      | {
          readonly type: DateConstructor;
        }
  ? Date
  : T extends FunctionConstructor
  ? Function
  : T extends Prop<infer V, infer D>
  ? unknown extends V
    ? D
    : ExtractCorrectPropType<V>
  : T;
type ExtractPropTypes<O> = O extends object
  ? {
      readonly [K in RequiredKeys<O>]: InferPropType<O[K]>;
    } & {
      readonly [K in OptionalKeys<O>]?: InferPropType<O[K]>;
    }
  : {
      readonly [K in string]: any;
    };

type Data = {
  readonly [key: string]: unknown;
};
type Equal<Left, Right> = (<U>() => U extends Left ? 1 : 0) extends <
  U
>() => U extends Right ? 1 : 0
  ? true
  : false;
type HasDefined<T> = Equal<T, unknown> extends true ? false : true;

type XConstructorProxy<
  PropsOptions,
  RawBindings,
  Data,
  Emits extends EmitsOptions,
  Computed extends ComputedOptions,
  Methods extends MethodOptions
> = {
  new (
    props: PropsOptions extends unknown | {}
      ? void
      : ExtractPropTypes<PropsOptions>
  ): ComponentRenderProxy<
    ExtractPropTypes<PropsOptions>,
    RawBindings,
    Data,
    Emits,
    Computed,
    Methods
  >;
};
type DefaultData<V> = object | ((this: V) => object);
type DefaultMethods<V> = {
  readonly [key: string]: (this: V, ...args: readonly any[]) => any;
};
type DefaultComputed = {
  readonly [key: string]: any;
};

type XProxy<
  PropsOptions,
  RawBindings,
  Data = DefaultData<CanvasElement>,
  Emits extends EmitsOptions = {},
  Computed extends ComputedOptions = DefaultComputed,
  Methods extends MethodOptions = DefaultMethods<CanvasElement>
> = XConstructorProxy<
  PropsOptions,
  RawBindings,
  Data,
  Emits,
  Computed,
  Methods
>;

function defineBlock<
  RawBindings,
  D = Data,
  E extends EmitsOptions = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {}
>(
  options: ComponentOptionsWithoutProps<unknown, RawBindings, D, E, C, M>
): XProxy<unknown, RawBindings, D, E, C, M>;
function defineBlock<
  PropNames extends string,
  RawBindings = Data,
  D = Data,
  E extends EmitsOptions = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {}
>(
  options: ComponentOptionsWithArrayProps<PropNames, RawBindings, D, E, C, M>
): XProxy<
  Readonly<{
    readonly [key in PropNames]?: any;
  }>,
  RawBindings,
  D,
  E,
  C,
  M
>;
function defineBlock<
  Props,
  RawBindings = Data,
  D = Data,
  E extends EmitsOptions = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  PropsOptions extends ComponentPropsOptions = ComponentPropsOptions
>(
  options: HasDefined<Props> extends true
    ? ComponentOptionsWithProps<PropsOptions, RawBindings, D, E, C, M, Props>
    : ComponentOptionsWithProps<PropsOptions, RawBindings, D, E, C, M>
): XProxy<PropsOptions, RawBindings, D, E, C, M>;
function defineBlock<
  Props,
  RawBindings = Data,
  D = Data,
  E extends EmitsOptions = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  PropsOptions extends ComponentPropsOptions = ComponentPropsOptions
>(
  options: HasDefined<Props> extends true
    ? ComponentOptionsWithProps<PropsOptions, RawBindings, D, E, C, M, Props>
    : ComponentOptionsWithProps<PropsOptions, RawBindings, D, E, C, M>
): any {
  const propsDefault: Partial<typeof options.props> = Object.create(null);
  // eslint-disable-next-line functional/no-loop-statement
  for (const prop in options.props) {
    if (
      (options.props as any)[prop] !== null &&
      typeof (options.props as any) === "object"
    ) {
      // pass value
      // eslint-disable-next-line functional/immutable-data
      (propsDefault as any)[prop] = (options.props as any).default;
    }
  }
  return class extends CanvasElement {
    private readonly emitter = mitt();

    readonly on = this.emitter.on;
    readonly off = this.emitter.off;
    readonly emit = this.emitter.emit;
    readonly draw = options.draw;
    readonly update?: noop;

    constructor(props: any) {
      super();

      Object.assign(
        this,
        propsDefault,
        props,
        (options.setup as any)?.call(this, props, this) || Object.create(null),
        options.data || Object.create(null),
        Object.keys(options.methods || Object.create(null)).map(
          (item: string) => options.methods?.[item].bind(this)
        ) || Object.create(null)
      );

      // eslint-disable-next-line functional/no-loop-statement
      for (const prop in options.computed) {
        if (typeof options.computed[prop] === "function") {
          // exists get
          Object.defineProperty(this, prop, {
            get: (options.computed[prop] as Function).bind(this),
            set() {
              error(`Can't set for computed "${prop}".`);
            },
          });
        } else {
          Object.defineProperty(this, prop, {
            get: (options.computed[prop] as any).get.bind(this),
            set: (options.computed[prop] as any).set.bind(this),
          });
        }
      }

      this.draw = options.draw?.bind(this);
      this.update = options.update?.bind(this);
    }
  };
}

export { defineBlock };
