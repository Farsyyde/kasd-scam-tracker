const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { data, error } = await supabase
    .from('scam_reports')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5); // Show last 5 reports

  if (error) {
    console.error('❌ Error fetching reports:', error);
    return res.status(500).json({ error: 'Failed to fetch reports' });
  }

  res.status(200).json(data);
};
