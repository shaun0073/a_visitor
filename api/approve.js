import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const { id, card_number } = req.body;
  const sql = neon(process.env.DATABASE_URL);
  await sql`UPDATE visitors SET status = '已核准', card_number = ${card_number} WHERE id = ${id}`;
  res.status(200).json({ ok: true });
}
