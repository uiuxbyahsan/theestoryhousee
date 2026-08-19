"use client";

import React, { useState } from "react";
import { X, Sparkles, Send } from "lucide-react";
import { useStory } from "@/context/StoryContext";
import { generateGeneralWhatsAppInquiryUrl } from "@/utils/whatsapp";

export const FloatingWhatsApp: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { photos, selectedTheme, selectedBundle, whatsAppOrderUrl } = useStory();

  const hasDraft = photos.length > 0;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Concierge Card */}
      {isExpanded && (
        <div className="mb-3 w-80 bg-[#FAF6F0] border border-[#E5DDD5] rounded-3xl shadow-2xl p-4 text-[#2A2A2A] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD5]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm">
                {/* Official WhatsApp Icon */}
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.056-1.527-.245-.892-.301-1.468-.847-1.895-1.282l-.004-.004c-.389-.395-.898-.985-.898-1.884 0-.898.468-1.34.636-1.524.168-.184.367-.23.49-.23.123 0 .245.001.353.007.114.006.267-.043.418.32.155.372.53 1.292.576 1.386.046.093.077.202.015.324-.061.123-.092.199-.184.307-.092.107-.193.24-.276.323-.092.093-.189.194-.081.38.108.185.479.791 1.028 1.279.707.629 1.303.823 1.488.916.185.092.293.077.401-.047.108-.123.461-.538.584-.722.123-.185.246-.154.415-.092.17.061 1.077.508 1.262.6.185.093.308.139.354.216.046.077.046.446-.098.851z" />
                  <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.77.464 3.493 1.345 5.019l-1.349 4.981 5.111-1.341c1.474.829 3.143 1.341 4.893 1.341 5.522 0 10-4.477 10-10s-4.478-10-10-10zm0 18.257c-1.536 0-3.037-.417-4.343-1.206l-.311-.188-3.04.798.812-2.996-.205-.327c-.868-1.383-1.327-2.992-1.327-4.638 0-4.693 3.818-8.512 8.513-8.512 4.695 0 8.514 3.819 8.514 8.512 0 4.694-3.819 8.556-8.608 8.556z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[#3D1117]">The Story House Assistant</p>
                <p className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                  Online • WhatsApp Concierge
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-[#2A2A2A]/70 hover:text-[#2A2A2A] p-1 rounded-full hover:bg-black/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs space-y-2 text-[#2A2A2A]">
            <p className="leading-relaxed">
              Hello! We are here to help turn your memories into an unforgettable sensory heirloom.
            </p>
            {hasDraft ? (
              <div className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#E5DDD5] text-[11px] space-y-1">
                <p className="font-semibold text-[#3D1117] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#C9A769]" />
                  Your Active Story Draft
                </p>
                <p className="text-[#2A2A2A]/80">
                  Theme: <strong>{selectedTheme.name}</strong> • {selectedBundle.name}
                </p>
                <p className="text-[#2A2A2A]/80">
                  Photos uploaded: <strong>{photos.length}/40</strong>
                </p>
              </div>
            ) : (
              <p className="text-[11px] text-[#2A2A2A]/70 italic">
                “Some stories you read. This one, you&apos;ll smell.”
              </p>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-[#E5DDD5]">
            {hasDraft ? (
              <a
                href={whatsAppOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Story Draft to WhatsApp</span>
              </a>
            ) : (
              <a
                href={generateGeneralWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.056-1.527-.245-.892-.301-1.468-.847-1.895-1.282l-.004-.004c-.389-.395-.898-.985-.898-1.884 0-.898.468-1.34.636-1.524.168-.184.367-.23.49-.23.123 0 .245.001.353.007.114.006.267-.043.418.32.155.372.53 1.292.576 1.386.046.093.077.202.015.324-.061.123-.092.199-.184.307-.092.107-.193.24-.276.323-.092.093-.189.194-.081.38.108.185.479.791 1.028 1.279.707.629 1.303.823 1.488.916.185.092.293.077.401-.047.108-.123.461-.538.584-.722.123-.185.246-.154.415-.092.17.061 1.077.508 1.262.6.185.093.308.139.354.216.046.077.046.446-.098.851z" />
                  <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.77.464 3.493 1.345 5.019l-1.349 4.981 5.111-1.341c1.474.829 3.143 1.341 4.893 1.341 5.522 0 10-4.477 10-10s-4.478-10-10-10zm0 18.257c-1.536 0-3.037-.417-4.343-1.206l-.311-.188-3.04.798.812-2.996-.205-.327c-.868-1.383-1.327-2.992-1.327-4.638 0-4.693 3.818-8.512 8.513-8.512 4.695 0 8.514 3.819 8.514 8.512 0 4.694-3.819 8.556-8.608 8.556z" />
                </svg>
                <span>Chat with Scent & Book Curators</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button (Authentic WhatsApp Green with White Logo) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.6)] flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white"
        aria-label="Open WhatsApp Assistant"
      >
        {/* Official WhatsApp Logo */}
        <svg className="w-8 h-8 sm:w-9 sm:h-9 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        {hasDraft && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-[#C9A769] border-2 border-white rounded-full"></span>
        )}
      </button>
    </div>
  );
};
