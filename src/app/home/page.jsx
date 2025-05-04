'use client';

import Header from '../../components/ui/Header';
import MobilePreview from '@/components/ui/MobilePreview';
import LinkEditor from '@/components/ui/LinkEditor';
import ProfileDetails from '@/components/ui/ProfileDetails';
import { useState, useEffect } from 'react';
import { getUserProfileFromCookies } from '@/lib/getUserProfile';



export default function DashboardPage() {
  const [links, setLinks] = useState([]);
  const [activeTab, setActiveTab] = useState('links');
   const userProfile=getUserProfileFromCookies()


  return (
    <div className="min-h-screen relative">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="mt-6 flex flex-col lg:flex-row h-full pb-16 md:pb-0 gap-6">
        {activeTab === 'links' && (
          <section className="hidden lg:flex lg:w-1/2 justify-center items-center">
            <MobilePreview links={links} />
          </section>
        )}

        <section className="w-full lg:w-1/2 max-w-3xl mx-auto overflow-y-auto">
          {activeTab === 'links' ? (
            <LinkEditor links={links} setLinks={setLinks} />
          ) : (
            <ProfileDetails userProfile={userProfile} />
          )}
        </section>
      </main>
    </div>
  );
}
