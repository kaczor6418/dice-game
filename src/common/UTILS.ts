export namespace UTILS {
  export function isNullOrUndefined(value: unknown): value is null | undefined {
    return value == null;
  }

  export function round(value: number, precision: number = 0): number {
    const multiplier = Math.pow(10, precision);
    return Math.round(value * multiplier) / multiplier;
  }

  export function getLastArrayItem<T>(array: T[]): T | null {
    if (isEmpty(array)) {
      return null;
    }
    return array[array.length - 1];
  }

  export function isEmpty(value: unknown[] | string): boolean {
    return value.length === 0;
  }
}
