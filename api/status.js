import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const { id } = req.query;
  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`SELECT status FROM visitors WHERE id = ${id}`;
  res.status(200).json(rows[0] || { status: '待確認' });
}
