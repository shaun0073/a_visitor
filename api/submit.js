import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, phone, company, host, purpose } = req.body;
  if (!name || !phone || !company || !host || !purpose) {
    return res.status(400).json({ error: '請填寫所有欄位' });
  }

  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`
    INSERT INTO visitors (name, phone, company, host, purpose)
    VALUES (${name}, ${phone}, ${company}, ${host}, ${purpose})
    RETURNING id
  `;

  res.status(200).json({ id: rows[0].id });
}
