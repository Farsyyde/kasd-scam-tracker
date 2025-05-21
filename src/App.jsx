import React, { useState } from 'react';

export default function ScamTracker() {
  const [scamReports, setScamReports] = useState([]);
  const [form, setForm] = useState({
    projectName: '',
    tokenAddress: '',
    scammerWallet: '',
    description: '',
    evidence: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setScamReports([...scamReports, form]);
    setForm({ projectName: '', tokenAddress: '', scammerWallet: '', description: '', evidence: '' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <img
        src="/kasd-mascot.png"
        alt="KASD Mascot"
        className="w-48 mx-auto mb-6 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
      />
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">KASD Scam Tracker</h1>
      <p className="mb-6">No more rugs. The people have a weapon at last.</p>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg mb-6 max-w-xl">
        <h2 className="text-2xl mb-2">Submit a Scam</h2>
        <input name="projectName" value={form.projectName} onChange={handleChange} placeholder="Project Name" className="w-full p-2 mb-2 rounded bg-gray-700" required />
        <input name="tokenAddress" value={form.tokenAddress} onChange={handleChange} placeholder="Token Address" className="w-full p-2 mb-2 rounded bg-gray-700" required />
        <input name="scammerWallet" value={form.scammerWallet} onChange={handleChange} placeholder="Scammer Wallet (optional)" className="w-full p-2 mb-2 rounded bg-gray-700" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 mb-2 rounded bg-gray-700" required />
        <input name="evidence" value={form.evidence} onChange={handleChange} placeholder="Evidence URL or image link" className="w-full p-2 mb-4 rounded bg-gray-700" />
        <button type="submit" className="bg-yellow-500 px-4 py-2 rounded font-bold">Submit</button>
      </form>

      <div className="max-w-4xl">
        <h2 className="text-2xl mb-2">Scam Dashboard</h2>
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="text-yellow-300 border-b border-yellow-500">
              <th className="p-2">Project</th>
              <th className="p-2">Token Address</th>
              <th className="p-2">Wallet</th>
              <th className="p-2">Description</th>
              <th className="p-2">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {scamReports.map((report, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-2">{report.projectName}</td>
                <td className="p-2">{report.tokenAddress}</td>
                <td className="p-2">{report.scammerWallet || 'N/A'}</td>
                <td className="p-2">{report.description}</td>
                <td className="p-2">
                  <a href={report.evidence} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
