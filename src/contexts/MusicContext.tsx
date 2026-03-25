import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { startMusic, stopMusic } from "@/hooks/bgMusic";

interface MusicContextType {
  musicOn: boolean;
  toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [musicOn, setMusicOn] = useState<boolean>(() => {
    const saved = localStorage.getItem("numatik-music");
    return saved === null ? false : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("numatik-music", String(musicOn));
    if (musicOn) {
      startMusic();
    } else {
      stopMusic();
    }
    return () => {};
  }, [musicOn]);

  const toggleMusic = () => setMusicOn(prev => !prev);

  return (
    <MusicContext.Provider value={{ musicOn, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
};
