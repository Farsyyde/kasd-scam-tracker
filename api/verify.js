const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { tokenAddress } = req.body;

  if (!tokenAddress) {
    return res.status(400).json({ error: 'Token address is required' });
  }

  const { data, error } = await supabase
    .from('scam_reports')
    .select('*')
    .ilike('tokenAddress', tokenAddress); // case-insensitive match

  if (error) {
    return res.status(500).json({ error: 'Failed to verify token' });
  }

  res.status(200).json({ reported: data.length > 0, reports: data });
};
