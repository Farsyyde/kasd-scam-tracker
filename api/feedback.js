const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY // use SERVICE_KEY for writes
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { chat_id, feedback_text } = req.body;

  if (!chat_id || !feedback_text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { error } = await supabase.from('feedback_messages').insert([
    { chat_id, feedback_text }
  ]);

  if (error) {
    console.error('❌ Supabase insert error:', error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: 'Feedback submitted successfully' });
};
