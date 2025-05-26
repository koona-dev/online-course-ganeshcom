import { and, eq, or } from 'drizzle-orm';
import { PgSelectBase } from 'drizzle-orm/pg-core';

async function queryFilter<T>(
  query: PgSelectBase<any, any, any>,
  table: any,
  data: { [field: string]: any },
  options?: {
    mode?: 'and' | 'or';
  },
): Promise<T[]> {
  const loopData = Object.entries(data).map(([field, value]) =>
    eq(table[`${field}`], value),
  );

  if (!options) {
    return (await query.where(loopData[0])) as T[];
  } else {
    if (options?.mode === 'or') {
      return (await query.where(or(...loopData))) as T[];
    }
    return (await query.where(and(...loopData))) as T[];
  }
}

export default queryFilter;
