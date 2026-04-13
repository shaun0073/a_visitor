import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`SELECT * FROM visitors ORDER BY created_at DESC`;
  res.status(200).json(rows);
}
