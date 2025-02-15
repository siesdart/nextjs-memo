import { db } from '@/db';
import * as schema from '@/schema';
import { and, desc, eq } from 'drizzle-orm';

export async function getMemosByUserId(userId: string): Promise<schema.Memo[]> {
  const memos = await db
    .select()
    .from(schema.memos)
    .where(eq(schema.memos.userId, userId))
    .orderBy(desc(schema.memos.createdAt));
  return memos;
}

export async function getMemoById(id: string): Promise<schema.Memo> {
  const [memo] = await db
    .select()
    .from(schema.memos)
    .where(eq(schema.memos.id, id));
  return memo;
}

export async function createMemo(
  newMemo: schema.NewMemo,
): Promise<schema.Memo> {
  const [memo] = await db.insert(schema.memos).values(newMemo).returning();
  return memo;
}

export async function countMemoByNameAndUserId(
  name: string,
  userId: string,
): Promise<number> {
  const count = await db.$count(
    schema.memos,
    and(eq(schema.memos.name, name), eq(schema.memos.userId, userId)),
  );
  return count;
}

export async function updateMemo(
  id: string,
  editMemo: Partial<schema.Memo>,
): Promise<schema.Memo> {
  const [memo] = await db
    .update(schema.memos)
    .set(editMemo)
    .where(eq(schema.memos.id, id))
    .returning();
  return memo;
}

export async function deleteMemo(id: string): Promise<schema.Memo> {
  const [memo] = await db
    .delete(schema.memos)
    .where(eq(schema.memos.id, id))
    .returning();
  return memo;
}
