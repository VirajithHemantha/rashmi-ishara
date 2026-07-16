import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

const PREFIXES = ['Mr.', 'Mrs.', 'Miss', 'Ms.', 'Mr. & Mrs.', 'Family', 'Dear'];

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const generatedLink = `${baseUrl}/?prefix=${encodeURIComponent(prefix)}&name=${encodeURIComponent(guestName)}`;

  const generatedMessage = `Dear ${prefix} ${guestName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With Love,
♥️ Enaksha & Rashmi ♥️`;

  const copyToClipboard = async (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-[#fdfaf5] p-6 md:p-12 font-montserrat overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full bg-white p-8 md:p-12 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] border border-[#d5e5d1]/40 rounded-2xl mt-4 mb-12">
        <h1 className="font-playball text-4xl text-[#2e5739] mb-8 text-center">Link Generator</h1>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <label className="block text-xs font-bold text-[#477654] uppercase tracking-widest mb-2">Prefix</label>
              <select 
                value={prefix} 
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full bg-[#f8f6f2] border border-[#d5e5d1] rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-[#72a981] font-cinzel"
              >
                {PREFIXES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-2/3">
              <label className="block text-xs font-bold text-[#477654] uppercase tracking-widest mb-2">Guest Name</label>
              <input 
                type="text" 
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-[#f8f6f2] border border-[#d5e5d1] rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-[#72a981] font-cinzel"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-[#d5e5d1]/40">
            <label className="block text-xs font-bold text-[#477654] uppercase tracking-widest mb-2">Generated Message</label>
            <div className="bg-[#f8f6f2] p-4 rounded-lg border border-[#d5e5d1] text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed min-h-[200px]">
              {guestName ? generatedMessage : <span className="text-slate-400 italic">Enter a guest name to see the message...</span>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => copyToClipboard(generatedLink, setCopiedLink)}
              disabled={!guestName}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#477654] text-[#477654] py-3 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-[#f8f6f2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? 'Copied!' : 'Copy Link Only'}
            </button>
            <button 
              onClick={() => copyToClipboard(generatedMessage, setCopiedMessage)}
              disabled={!guestName}
              className="flex-1 flex items-center justify-center gap-2 bg-[#477654] text-white py-3 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-[#2e5739] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copiedMessage ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedMessage ? 'Copied!' : 'Copy Full Message'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
