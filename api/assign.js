import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const { card_number } = req.body;
  const sql = neon(process.env.DATABASE_URL);

  // 抓最早的待確認訪客
  const rows = await sql`
    SELECT id FROM visitors
    WHERE status = '待確認'
    ORDER BY created_at ASC
    LIMIT 1
  `;

  if (rows.length === 0) {
    return res.status(404).json({ error: '目前沒有待確認的訪客' });
  }

  await sql`
    UPDATE visitors
    SET status = '已核准', card_number = ${card_number}
    WHERE id = ${rows[0].id}
  `;

  res.status(200).json({ ok: true, id: rows[0].id });
}
