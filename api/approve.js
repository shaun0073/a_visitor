import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const { id } = req.body;
  const sql = neon(process.env.DATABASE_URL);
  await sql`UPDATE visitors SET status = '已核准' WHERE id = ${id}`;
  res.status(200).json({ ok: true });
}
