# @lp-labs/boolean-truth-table

Bounded Boolean truth-table masks and input enumeration.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/boolean-truth-table
```

## Working example

```js
import { truthTable } from '@lp-labs/boolean-truth-table';
if (truthTable(2, 8n)[3]?.output !== true) throw new Error('AND');
```

CommonJS: `const api = require('@lp-labs/boolean-truth-table')`.

## Behavior, customization and limits

truthTable(arity,mask) enumerates 2^arity rows; arity0..12, bigint mask nonnegative with exactly that many available bits. Row index interprets inputs most-significant-bit first; bit i in mask gives row i output. packOutcomes accepts exactly a power-of-two count of Boolean results,1..4096. No expression parser, symbolic simplification or SAT solver. O(arity*2^arity) time and storage; outputs are fresh.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface TruthRow {
  inputs: boolean[];
  output: boolean;
}
export declare function packOutcomes(values: readonly boolean[]): bigint;
export declare function truthTable(arity: number, mask: bigint): TruthRow[];
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
