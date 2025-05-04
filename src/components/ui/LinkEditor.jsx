'use client';

import Image from 'next/image';
import emptyIllustration from '../../../public/images/illustration-empty.svg';
import SortableCard from './SortableCard';
import { v4 as uuidv4 } from 'uuid';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState, useRef } from 'react';
import { getExpectedPrefix } from '@/lib/getExpectedPrefix';
import {
  getUserLinks,
  addUserLink,
  updateUserLink,
  deleteUserLink,
} from '@/api/userLinkService';
import { getUserProfileFromCookies } from '@/lib/getUserProfile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LinkEditor() {
  const [links, setLinks] = useState([]);
  const [initialLinks, setInitialLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const userInfo = getUserProfileFromCookies();
  const linksRef = useRef([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
        distance: 8,
      },
    })
  );

  useEffect(() => {
    async function fetchLinks() {
      try {
        const data = await getUserLinks(userInfo.id);
        const formatted = data.map((link) => ({
          id: link.id,
          backendId: link.id,
          platform: link.platform,
          url: link.url,
          error: '',
        }));
        setLinks(formatted);
        setInitialLinks(JSON.stringify(formatted));
        linksRef.current = formatted;
      } catch (err) {
        toast.error('Failed to load links');
        console.error('Error loading links:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLinks();
  }, []);

  const addNewLink = () => {
    const newLink = {
      id: 'temp-' + uuidv4(),
      platform: 'GitHub',
      url: '',
      error: "Can't be empty",
    };
    const updated = [newLink, ...links];
    setLinks(updated);
  };

  const updateLink = (index, updated) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], ...updated };
    setLinks(newLinks);
  };

  const removeLink = async (index) => {
    const removed = links[index];
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);

    try {
      if (removed.backendId && !String(removed.id).startsWith('temp-')) {
        await deleteUserLink(removed.backendId);
        toast.success('Link deleted');
      }
    } catch (err) {
      toast.error('Error deleting link');
      console.error('Error deleting link:', err);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    const newList = arrayMove(links, oldIndex, newIndex);
    setLinks(newList);
  };

  const hasChanges = () => {
    return JSON.stringify(links) !== initialLinks;
  };

  const canSave =
    links.length > 0 &&
    links.every((l) => l.url.trim() !== '' && !l.error) &&
    hasChanges();

  useEffect(() => {
    const updated = links.map((link) => {
      const expectedPrefix = getExpectedPrefix(link.platform);
      let error = '';
      if (!link.url.trim()) {
        error = "Can't be empty";
      } else if (!link.url.startsWith(expectedPrefix)) {
        error = 'Please check the URL';
      }
      return { ...link, error };
    });
    setLinks(updated);
  }, [JSON.stringify(links.map(({ platform, url }) => ({ platform, url })))]);


  const handleSave = async () => {
    setIsSaving(true);
    let success = 0, fail = 0;
  
    const updated = await Promise.all(
      links.map(async (link) => {
        if (!link.url || link.error || link.backendId) return link;
        try {
          const res = await addUserLink({ userId: userInfo.id, platform: link.platform, url: link.url });
          success++;
          return { ...link, id: res.id, backendId: res.id };
        } catch {
          fail++;
          return link;
        }
      })
    );
  
    setLinks(updated);
    setInitialLinks(JSON.stringify(updated));
    if (success) toast.success(`${success} link${success > 1 ? 's' : ''} saved!`);
    if (fail) toast.error(`${fail} failed to save.`);
    setIsSaving(false);
  };
  

  return (
    <div className="flex flex-col h-full bg-white rounded-[12px] justify-between shadow-lg overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex-grow overflow-y-auto">
        <div className="p-[40px] pb-0">
          <h2 className="text-[24px] leading-[36px] font-bold text-[#333333] font-instrument md:text-[32px] md:leading-[48px]">
            Customize your links
          </h2>
          <p className="text-base font-normal leading-[24px] text-[#737373] font-instrument max-w-[728px]">
            Add/edit/remove links below and then share all your profiles with the world!
          </p>
        </div>

        <div className="w-full px-4 md:px-10 mt-6">
          <button
            onClick={addNewLink}
            className="w-full max-w-[728px] h-[46px] px-[27px] py-[11px] border border-violet-600 text-violet-700 text-base font-semibold leading-[24px] rounded-lg font-instrument hover:bg-violet-50 transition"
          >
            + Add new link
          </button>

          <div className="mt-6 max-h-[calc(100vh-320px)] overflow-y-auto pr-2">
            {isLoading ? (
              <div className="text-center py-10 font-instrument">Loading links...</div>
            ) : links.length === 0 ? (
              <div className="bg-gray-100 rounded-lg flex flex-col items-center justify-center text-center px-5 py-[62.5px] mb-10">
                <Image
                  src={emptyIllustration}
                  alt="Empty illustration"
                  width={150}
                  height={150}
                  className="mb-10"
                />
                <h3 className="text-[24px] leading-[36px] font-bold text-[#333333] text-center font-instrument md:text-[32px] md:leading-[48px]">
                  Let’s get you started
                </h3>
                <p className="text-[16px] font-normal text-[#737373] leading-[24px] text-center font-instrument mt-2 max-w-[488px]">
                  Use the “Add new link” button to get started. Once you have more than one link,
                  you can reorder and edit them. We’re here to help you share your profiles with everyone!
                </p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={links.map((link) => link.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col gap-4 pb-4 overflow-y-auto max-h-[calc(100vh-320px)]">
                    <style jsx>{`
                      .overflow-y-auto::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                      }
                      .overflow-y-auto::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 10px;
                      }
                      .overflow-y-auto::-webkit-scrollbar-thumb {
                        background: #888;
                        border-radius: 10px;
                      }
                      .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                        background: #555;
                      }
                    `}</style>
                    {links.map((link, index) => (
                      <SortableCard
                        key={link.id}
                        id={link.id}
                        index={index}
                        data={link}
                        onUpdate={updateLink}
                        onRemove={removeLink}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      </div>
      <div className="py-6 border-t border-[#D9D9D9] bg-white sticky bottom-0">
        <div className="flex justify-center md:justify-end">
          <button
            disabled={!canSave || isSaving}
            onClick={handleSave}
            className={`h-[46px] px-[27px] py-[11px] rounded-lg font-instrument text-base font-semibold leading-[24px] text-white transition
              ${canSave && !isSaving ? 'bg-violet-600 hover:bg-violet-700' : 'bg-violet-300 cursor-not-allowed'}
              w-[311px] md:w-[91px]
              mx-4 md:mx-0 md:mr-10`}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
