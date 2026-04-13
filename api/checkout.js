import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const { id, card_number } = req.body;
  const sql = neon(process.env.DATABASE_URL);
  
  if (card_number) {
    await sql`UPDATE visitors SET checkout_at = NOW(), status = '已離場' WHERE card_number = ${card_number} AND checkout_at IS NULL`;
  } else {
    await sql`UPDATE visitors SET checkout_at = NOW(), status = '已離場' WHERE id = ${id}`;
  }
  
  res.status(200).json({ ok: true });
}
