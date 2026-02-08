import React, { useState } from "react";
import ParticleScene from "./ParticleScene";

const ParticleSceCreate: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [triggerMorph, setTriggerMorph] = useState<string | null>(null);

  const handleCreate = () => {
    if (inputText.trim()) {
      setTriggerMorph(inputText);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputText.trim()) {
      setTriggerMorph(inputText);
    }
  };

  return (
    <div className=" bg-black text-white overflow-hidden font-sans selection:bg-pink-500 selection:text-white">
      {/* 3D Scene Component */}
      <ParticleScene triggerText={triggerMorph} />

      {/* Header */}
      <div className="fixed top-8 left-8 z-1 mix-blend-difference hidden md:block pointer-events-none">
        <h1 className="text-4xl font-black uppercase leading-none bg-gradient-to-r from-[#ff6e7f] to-[#bfe9ff] text-transparent bg-clip-text opacity-90 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Particles
        </h1>
      </div>

      {/* Input UI */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] z-10 px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex gap-2 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2)] transition-all hover:bg-white/15 hover:border-white/30 hover:shadow-[0_4px_30px_-1px_rgba(0,0,0,0.3)]">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type something..."
            maxLength={20}
            className="flex-1 bg-transparent border-none p-4 text-white text-base font-medium focus:outline-none placeholder:text-white/50"
          />
          <button
            onClick={handleCreate}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 border-none text-white rounded-xl font-semibold cursor-pointer transition-all hover:-translate-y-px hover:shadow-[0_4px_20px_-2px_rgba(79,70,229,0.5)] active:translate-y-px flex items-center gap-2 px-6 py-3">
            <span className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:translate-x-1">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden sm:inline">Create</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticleSceCreate;
