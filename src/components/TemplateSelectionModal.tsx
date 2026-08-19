"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Search, Check, ArrowRight } from "lucide-react";
import { COVER_TEMPLATES, CoverTemplate } from "@/data/templates";
import { useStory } from "@/context/StoryContext";

export const TemplateSelectionModal: React.FC = () => {
  const router = useRouter();
  const { 
    isTemplateModalOpen, 
    setIsTemplateModalOpen, 
    selectedTemplate, 
    setSelectedTemplate 
  } = useStory();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tempSelected, setTempSelected] = useState<CoverTemplate>(selectedTemplate || COVER_TEMPLATES[0]);

  if (!isTemplateModalOpen) return null;

  const categories = [
    { label: "Travel", value: "Travel", icon: "✈️", bg: "bg-[#FFF8E7] text-[#5C4813] border-[#F2E5C2]" },
    { label: "Couple", value: "Couple", icon: "❤️", bg: "bg-[#F7F7F8] text-[#2A2A2A] border-[#E8E8EC]" },
    { label: "Friends", value: "Friends", icon: "👯", bg: "bg-[#FCECEE] text-[#6B2A32] border-[#F3D5D9]" },
    { label: "2025", value: "2025", icon: "✨", bg: "bg-[#FDEBF3] text-[#6E2A4E] border-[#F5D5E5]" },
  ];

  const filteredTemplates = COVER_TEMPLATES.filter((tpl) => {
    const matchesCategory = activeCategory === "All" || tpl.theme === activeCategory;
    const matchesSearch = tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.theme.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleConfirm = () => {
    setSelectedTemplate(tempSelected);
    setIsTemplateModalOpen(false);
    router.push("/builder");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FFFFFF] border border-[#E5DDD5] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#EAEAEA] flex items-center justify-between bg-[#FFFFFF] shrink-0">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#3D1117] tracking-tight">
            Choose your templates
          </h2>

          <button
            onClick={() => setIsTemplateModalOpen(false)}
            className="p-1.5 rounded-full text-[#2A2A2A] hover:bg-[#F2F2F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Tabs */}
        <div className="px-6 pt-4 pb-4 border-b border-[#EAEAEA] bg-[#FFFFFF] shrink-0 space-y-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a template..."
              className="w-full text-xs sm:text-sm pl-11 pr-4 py-2.5 rounded-full border border-[#D9D9D9] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#3D1117]/20"
            />
          </div>

          {/* 4 Category Pill Buttons (Matching Screenshot) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(activeCategory === cat.value ? "All" : cat.value)}
                  className={`py-2 px-3 rounded-full font-medium transition-all flex items-center justify-center gap-1.5 border ${
                    isActive
                      ? "ring-2 ring-[#3D1117] font-bold shadow-sm " + cat.bg
                      : cat.bg + " hover:opacity-90 opacity-80"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* 4-Column Template Grid (Matching Screenshot) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-[#FFFFFF]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {filteredTemplates.map((tpl) => {
              const isSelected = tempSelected.id === tpl.id;

              return (
                <div
                  key={tpl.id}
                  onClick={() => setTempSelected(tpl)}
                  className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-200 flex flex-col justify-between bg-[#FFFFFF] ${
                    isSelected
                      ? "border-[#3D1117] ring-2 ring-[#3D1117] shadow-md transform -translate-y-0.5"
                      : "border-[#E5DDD5] hover:border-[#3D1117] hover:shadow-sm"
                  }`}
                >
                  {/* Book Cover Thumbnail */}
                  <div className="relative aspect-[3/4] w-full bg-[#FAF6F0] overflow-hidden">
                    <Image
                      src={tpl.thumbnail}
                      alt={tpl.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Template Name Tag (Gray Pill matching Screenshot) */}
                  <div className="p-3 text-center bg-[#FFFFFF]">
                    <span className="inline-block bg-[#F2F2F2] group-hover:bg-[#EAEAEA] text-[#2A2A2A] text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded leading-tight">
                      {tpl.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer with Brown Button */}
        <div className="px-6 py-4 border-t border-[#EAEAEA] bg-[#FAF6F0] shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#2A2A2A] text-center sm:text-left">
            <span>Selected Cover: </span>
            <strong className="font-bold text-[#3D1117]">
              {tempSelected.name}
            </strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsTemplateModalOpen(false)}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-[#D9D9D9] hover:bg-[#FFFFFF] text-xs font-semibold text-[#2A2A2A]"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirm}
              className="flex-1 sm:flex-none px-7 py-2.5 rounded-full bg-[#3D1117] hover:bg-[#5C1A22] text-[#FAF6F0] font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Continue with this cover</span>
              <ArrowRight className="w-4 h-4 text-[#C9A769]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
