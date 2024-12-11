import React, { useState, useEffect } from "react";
import { BookOpen, List, X, Search } from "lucide-react";

const SideBar = ({
  surahs,
  onSelectSurah,
  isMobileSidebarOpen,
  toggleMobileSidebar,
  setIsMobileSidebarOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSurahs, setFilteredSurahs] = useState(surahs);

  useEffect(() => {
    const filtered = surahs.filter(
      (surah) =>
        surah.asma.en.short.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.number.toString().includes(searchTerm)
    );
    setFilteredSurahs(filtered);
  }, [searchTerm, surahs]);

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-lg p-2 rounded-full"
      >
        {isMobileSidebarOpen ? (
          <X className="text-gray-700" />
        ) : (
          <List className="text-gray-700" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative top-0 left-0 h-full w-80 
          bg-white shadow-2xl z-40 transform transition-transform duration-300
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 overflow-hidden
        `}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center mb-6">
            <BookOpen className="mr-3 text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-800">Holy Quran</h1>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search Surahs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full pl-10 focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {filteredSurahs.map((surah) => (
              <div
                key={surah.number}
                onClick={() => {
                  onSelectSurah(surah);
                  setIsMobileSidebarOpen(false);
                }}
                className="flex items-center p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition group"
              >
                <span className="mr-4 text-gray-500 font-semibold group-hover:text-blue-600">
                  {surah.number}
                </span>
                <div>
                  <h3 className="font-medium text-gray-800 group-hover:text-blue-800">
                    {surah.asma.en.short}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-blue-600 text-right">
                    {surah.asma.ar.short}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default SideBar;
