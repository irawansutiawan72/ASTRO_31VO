import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { setSoundEnabled } from "@/hooks/useAudio";

interface SoundContextType {
  soundOn: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [soundOn, setSoundOn] = useState<boolean>(() => {
    const saved = localStorage.getItem("numatik-sound");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("numatik-sound", String(soundOn));
    setSoundEnabled(soundOn);
  }, [soundOn]);

  const toggleSound = () => setSoundOn(prev => !prev);

  return (
    <SoundContext.Provider value={{ soundOn, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
};
