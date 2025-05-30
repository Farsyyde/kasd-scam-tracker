const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { project_name, token_address, description, scammer_wallet, evidence } = req.body;

  if (!project_name || !token_address || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { error } = await supabase.from('scam_reports').insert([
    {
      projectName: project_name,
      tokenAddress: token_address,
      description,
      scammerWallet: scammer_wallet || '',
      evidence: evidence || ''
    }
  ]);

  if (error) {
    console.error('❌ Supabase insert error:', error);
    return res.status(500).json({ error: 'Failed to submit report' });
  }

  res.status(200).json({ message: 'Report submitted successfully' });
};
