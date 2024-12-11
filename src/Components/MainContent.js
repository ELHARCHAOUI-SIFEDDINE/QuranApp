import React from "react";
import { BookOpen } from "lucide-react";
import SurahDetail from "./SurahDetail";

const MainContent = ({
  selectedSurah,
  toggleMobileSidebar,
  isMobileSidebarOpen,
}) => {
  if (!selectedSurah) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <BookOpen className="mx-auto mb-4 text-blue-600" size={48} />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            تطبيق القرآن الكريم
          </h1>
          <p className="text-gray-600 max-w-md mx-auto rtl:text-right">
            اختر سورة للبدء في الإستماع
          </p>
          <button
            onClick={toggleMobileSidebar}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition md:hidden"
          >
            افتح السور
          </button>
        </div>
      </div>
    );
  }

  return (
    <SurahDetail
      surah={selectedSurah}
      toggleMobileSidebar={toggleMobileSidebar}
      isMobileSidebarOpen={isMobileSidebarOpen}
    />
  );
};

export default MainContent;
