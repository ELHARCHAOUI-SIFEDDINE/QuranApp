import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import MainContent from "./MainContent";

const QuranApp = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://quran-endpoint.vercel.app/quran");
        const result = await response.json();
        setSurahs(result.data);
      } catch (error) {
        console.error("Failed to fetch surahs", error);
      }
    };

    fetchSurahs();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden font-['Inter']">
      <SideBar
        surahs={surahs}
        onSelectSurah={(surah) => {
          setSelectedSurah(surah);
          setIsMobileSidebarOpen(false);
        }}
        isMobileSidebarOpen={isMobileSidebarOpen}
        toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      />
      <MainContent
        selectedSurah={selectedSurah}
        toggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />
    </div>
  );
};

export default QuranApp;
