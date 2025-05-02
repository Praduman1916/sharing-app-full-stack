// 'use client';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useState } from 'react';
// import iconLinksHeader from '../../../public/images/icon-links-header.svg';
// import iconLink from '../../../public/images/icon-link.svg';
// import profileIcon from  '../../../public/images/icon-profile-details-header.svg';

// export default function Header() {
//   const pathname = usePathname();
//   const [activeTab, setActiveTab] = useState('links');

//   const isActive = (tab) => activeTab === tab;

//   return (
//     <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
//       {/* Logo */}
//       <div className="text-lg font-bold text-violet-700">🔗 devlinks</div>

//       {/* Tabs */}
//       <div className="flex gap-4">
//         <button
//           onClick={() => setActiveTab('links')}
//           className={`px-4 py-2 rounded-md text-sm font-medium ${isActive('links')
//               ? 'bg-violet-100 text-violet-700'
//               : 'text-gray-500 hover:text-violet-700'
//             }`}
//         >
//           🔗 Links
//         </button>
//         <button
//           onClick={() => setActiveTab('profile')}
//           className={`px-4 py-2 rounded-md text-sm font-medium ${isActive('profile')
//               ? 'bg-violet-100 text-violet-700'
//               : 'text-gray-500 hover:text-violet-700'
//             }`}
//         >
//           👤 Profile Details
//         </button>
//       </div>

//       {/* Preview Button */}
//       <Link
//         href="/preview"
//         className="border border-violet-600 text-violet-700 px-4 py-2 rounded-md hover:bg-violet-50 transition"
//       >
//         Preview
//       </Link>
//     </header>
//   );
// }


'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import iconLinksHeader from '../../../public/images/icon-links-header.svg';
import iconLink from '../../../public/images/icon-link.svg';
import profileIcon from '../../../public/images/icon-profile-details-header.svg';
import viewIcon from '../../../public/images/icon-preview-header.svg';

export default function Header() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('links');
  const isActive = (tab) => activeTab === tab;

  const tabs = [
    {
      name: 'Links',
      key: 'links',
      icon: iconLink,
    },
    {
      name: 'Profile Details',
      key: 'profile',
      icon: profileIcon,
    },
  ];

  return (
    <header className="w-full bg-white shadow px-4 py-4 rounded-[12px] h-[78px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={iconLinksHeader}
            alt="DevLinks logo"
            width={28}
            height={28}
            className="shrink-0 bg-[#633CFf] rounded"
          />
          <span className="text-lg font-bold text-violet-700 hidden sm:inline">devlinks</span>
        </div>

        <div className="flex gap-2 sm:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center justify-center gap-2 px-2 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium whitespace-nowrap transition ${
                isActive(tab.key)
                  ? 'bg-violet-100 text-violet-700'
                  : 'text-gray-500 hover:text-violet-700'
              }`}
            >
              <Image
                src={tab.icon}
                alt={`${tab.name} icon`}
                width={18}
                height={18}
                className="shrink-0"
              />
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </div>
        <Link
          href="/preview"
          className="flex items-center justify-center border border-violet-600 text-violet-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-violet-50 transition text-sm font-medium whitespace-nowrap"
        >
          <Image src={viewIcon} alt="Preview" width={18} height={18} className="sm:hidden" />
          <span className="hidden sm:inline">Preview</span>
        </Link>
      </div>
    </header>
  );
}








// 'use client';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useState } from 'react';
// import Image from 'next/image';
// import iconLinksHeader from '../../../public/images/icon-links-header.svg';
// import iconLink from '../../../public/images/icon-link.svg';
// import profileIcon from '../../../public/images/icon-profile-details-header.svg';
// import viewIcon from '../../../public/images/icon-preview-header.svg';

// export default function Header() {
//   const pathname = usePathname();
//   const [activeTab, setActiveTab] = useState('links');
//   const isActive = (tab) => activeTab === tab;

//   const tabs = [
//     {
//       name: 'Links',
//       key: 'links',
//       icon: iconLink,
//     },
//     {
//       name: 'Profile Details',
//       key: 'profile',
//       icon: profileIcon,
//     },
//   ];

//   return (
//     <header className="bg-white border-b border-[#D9D9D9] px-6 py-4 rounded-lg w-full max-w-[1392px] mt-6 mb-6">
//       <div className="flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <div className="w-7 h-7 bg-[#633CFF] rounded flex items-center justify-center">
//             <Image
//               src={iconLinksHeader}
//               alt="DevLinks logo"
//               width={20}
//               height={20}
//               className="shrink-0"
//             />
//           </div>
//           <span className="text-[1.5rem] font-bold text-[#333333] leading-none hidden sm:block">
//             devlinks
//           </span>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="flex gap-1 sm:gap-2">
//           {tabs.map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => setActiveTab(tab.key)}
//               className={`
//                 flex items-center justify-center 
//                 h-[42px] sm:h-[46px] 
//                 px-3 sm:px-6 
//                 gap-2 rounded-lg 
//                 text-sm font-medium 
//                 transition-colors
//                 ${isActive(tab.key)
//                   ? 'bg-[#EFEBFF] text-[#633CFF]'
//                   : 'text-[#737373] hover:text-[#633CFF] hover:bg-[#EFEBFF]/50'
//                 }
//               `}
//             >
//               <Image
//                 src={tab.icon}
//                 alt={`${tab.name} icon`}
//                 width={16}
//                 height={16}
//                 className="shrink-0"
//               />
//               <span className="hidden sm:inline">{tab.name}</span>
//             </button>
//           ))}
//         </div>

//         {/* Preview Button */}
//         <Link
//           href="/preview"
//           className="
//             flex items-center justify-center 
//             h-[42px] sm:h-[46px] 
//             px-3 sm:px-6 
//             border border-[#633CFF] 
//             rounded-lg 
//             text-[#633CFF] 
//             text-sm font-medium 
//             hover:bg-[#EFEBFF] 
//             transition-colors
//           "
//         >
//           <Image 
//             src={viewIcon} 
//             alt="Preview" 
//             width={16} 
//             height={16} 
//             className="sm:hidden" 
//           />
//           <span className="hidden sm:inline">Preview</span>
//         </Link>
//       </div>
//     </header>
//   );
// }