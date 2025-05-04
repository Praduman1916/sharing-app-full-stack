'use client';

import Image from 'next/image';
import profileIcon from '../../../public/images/icon-profile-details-header.svg';

export default function ProfileDetails({ userProfile }) {
    console.log("jj",userProfile)
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md font-instrument transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <Image src={profileIcon} alt="Profile Icon" width={28} height={28} />
        <h2 className="text-xl sm:text-2xl font-bold text-[#333]">Your Profile</h2>
      </div>

      {userProfile ? (
        <div className="space-y-5">
          <ProfileField label="Full Name" value={userProfile.name} />
          <ProfileField label="Email Address" value={userProfile.email} />
          <ProfileField label="Mobile Number" value={userProfile.mobile} />
          <ProfileField label="Role" value={userProfile.role} />
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 text-sm">
          No profile information found.
        </div>
      )}
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 tracking-wide uppercase mb-1">
        {label}
      </label>
      <div className="text-base sm:text-lg font-medium text-gray-800 bg-gray-50 p-3 rounded-md border border-gray-200">
        {value || '-'}
      </div>
    </div>
  );
}
