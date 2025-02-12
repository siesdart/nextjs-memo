import { db } from '@/db';
import * as schema from '@/schema';
import { eq } from 'drizzle-orm';

export async function getUserByUsername(
  username: string,
): Promise<schema.User> {
  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, username));
  return user;
}

export async function createUser(
  newUser: schema.NewUser,
): Promise<schema.User> {
  const [user] = await db.insert(schema.users).values(newUser).returning();
  return user;
}

export async function countUserByUsername(username: string): Promise<number> {
  const count = await db.$count(
    schema.users,
    eq(schema.users.username, username),
  );
  return count;
}
