const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    projectName,
    tokenAddress,
    description,
    scammerWallet,
    evidence
  } = req.body;

  if (!projectName || !tokenAddress || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase.from('scam_reports').insert([
    {
      projectName,
      tokenAddress,
      description,
      scammerWallet: scammerWallet || '',
      evidence: evidence || ''
    }
  ]);

  if (error) {
  console.error('❌ Supabase insert error:', error); // already here
  return res.status(500).json({ error: error.message, details: error.details || error });
}
  console.log('✅ Inserted data:', data);
  res.status(200).json({ message: 'Report submitted successfully' });
};

