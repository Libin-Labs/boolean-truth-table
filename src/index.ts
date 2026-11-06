function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function big(value: bigint): bigint {
  if (typeof value !== 'bigint') throw new TypeError('Expected bigint');
  const limit = (1n << 4096n) - 1n;
  if (value > limit || value < -limit) throw new RangeError('4096-bit budget exceeded');
  return value;
}
export interface TruthRow {
  inputs: boolean[];
  output: boolean;
}
export function packOutcomes(values: readonly boolean[]): bigint {
  if (
    !Array.isArray(values) ||
    !values.length ||
    values.length > 4096 ||
    (values.length & (values.length - 1)) !== 0
  )
    throw new RangeError('Power-of-two table size required');
  let result = 0n;
  for (let i = 0; i < values.length; i++) {
    if (typeof values[i] !== 'boolean') throw new TypeError('Expected Boolean');
    if (values[i]) result |= 1n << BigInt(i);
  }
  return result;
}
export function truthTable(arity: number, mask: bigint): TruthRow[] {
  integer(arity, 0, 12);
  big(mask);
  const n = 2 ** arity;
  if (mask < 0n || mask >> BigInt(n)) throw new RangeError('Mask outside table');
  return Array.from({ length: n }, (_, i) => ({
    inputs: Array.from({ length: arity }, (_, j) => Boolean(i & (1 << (arity - j - 1)))),
    output: Boolean((mask >> BigInt(i)) & 1n),
  }));
}
