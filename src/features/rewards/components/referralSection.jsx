// src/features/rewards/components/referralSection.jsx
// src/features/rewards/components/referralSection.jsx
import React, { useState, useMemo } from 'react';
import { UserPlus, Copy, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import facebookIcon from '../../../assets/facebook.png';
import twitterIcon from '../../../assets/twitter.png';
import linkedinIcon from '../../../assets/linkedin.png';
import whatsappIcon from '../../../assets/whatsapp.png';

const ReferralSection = ({ 
  username = '', 
  totalReferrals = 0, 
  totalPoints = 0, 
  isLoading = false 
}) => {
  const [isCopied, setIsCopied] = useState(false);

  // 1. Generate the dynamic link based on the actual logged-in user
  const referralLink = useMemo(() => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/signup?ref=${username || 'user'}`;
  }, [username]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const shareHandlers = {
    facebook: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank'),
    twitter: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=Join me on FlowvaHub!`, '_blank'),
    linkedin: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`, '_blank'),
    whatsapp: () => window.open(`https://wa.me/?text=${encodeURIComponent(`Join me on FlowvaHub! ${referralLink}`)}`, '_blank')
  };

  return (
    <div className="mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="p-5 bg-purple-50 flex items-center gap-4">
        <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <UserPlus className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Refer & Earn</h3>
          <p className="text-sm text-gray-500">Invite friends and earn 25 points when they join!</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around py-8 border-b border-gray-50">
        <div className="text-center group">
          <div className="text-4xl font-black text-purple-600 transition-transform group-hover:scale-110">
            {isLoading ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : totalReferrals}
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Referrals</p>
        </div>
        <div className="w-px bg-gray-100" />
        <div className="text-center group">
          <div className="text-4xl font-black text-purple-600 transition-transform group-hover:scale-110">
            {isLoading ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : totalPoints}
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Points Earned</p>
        </div>
      </div>

      {/* Copy Link Section */}
      <div className="p-6">
        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Your Unique Link</label>
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 pl-4 focus-within:border-purple-300 transition-all">
          <span className="text-sm text-gray-600 truncate mr-2">{referralLink}</span>
          <button
            className={`ml-auto px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              isCopied ? 'bg-green-100 text-green-600' : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
            onClick={handleCopy}
          >
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* Social Share Grid */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          {[
            { icon: facebookIcon, name: 'Facebook', handler: shareHandlers.facebook },
            { icon: twitterIcon, name: 'Twitter', handler: shareHandlers.twitter },
            { icon: linkedinIcon, name: 'LinkedIn', handler: shareHandlers.linkedin },
            { icon: whatsappIcon, name: 'WhatsApp', handler: shareHandlers.whatsapp }
          ].map((social) => (
            <button
              key={social.name}
              onClick={social.handler}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <img src={social.icon} alt={social.name} className="h-8 w-8 transition-transform group-hover:scale-110" />
              <span className="text-[10px] font-bold text-gray-400 uppercase">{social.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReferralSection);