import { truthTable } from '@lp-labs/boolean-truth-table';
if (truthTable(2, 8n)[3]?.output !== true) throw new Error('AND');
// @ts-expect-error invalid argument must be rejected by declarations
truthTable(2, 8);
