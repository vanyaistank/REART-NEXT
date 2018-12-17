// See https://github.com/Microsoft/TypeScript/issues/20503
declare const BetterObject: {
keys<T extends {}>(object: T): (keyof T)[];
};
