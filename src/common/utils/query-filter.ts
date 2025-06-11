import { and, eq, or } from 'drizzle-orm';
import {
  PgSelectBase,
  PgTableWithColumns,
  PgUpdateBase,
} from 'drizzle-orm/pg-core';
import { QueryResult } from 'pg';

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

async function queryUpdateFilter<T>(
  query: any,
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
    return (await query.where(loopData[0]).returning()) as T[];
  } else {
    if (options?.mode === 'or') {
      return (await query.where(or(...loopData)).returning()) as T[];
    }
    return (await query.where(and(...loopData)).returning()) as T[];
  }
}

async function queryDeleteFilter<T>(
  query: any,
  table: any,
  data: { [field: string]: any },
  options?: {
    mode?: 'and' | 'or';
  },
): Promise<QueryResult<never>> {
  const loopData = Object.entries(data).map(([field, value]) =>
    eq(table[`${field}`], value),
  );

  if (!options) {
    return (await query.where(loopData[0])) as QueryResult<never>;
  } else {
    if (options?.mode === 'or') {
      return (await query.where(or(...loopData))) as QueryResult<never>;
    }
    return (await query.where(and(...loopData))) as QueryResult<never>;
  }
}
export { queryFilter, queryUpdateFilter, queryDeleteFilter };
