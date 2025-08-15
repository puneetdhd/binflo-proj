"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white/90">
      <div className="relative h-24 w-24">
        <div className="h-full w-full rounded-full border-[6px] border-gray-100"></div>
        <div
          className="absolute left-0 top-0 h-full w-full animate-spin rounded-full border-[6px] border-b-[#96B803] border-l-transparent border-r-transparent border-t-[#96B803]"
          style={{ animationDuration: "1.2s" }}
        ></div>
      </div>
      <div
        className="animate-pulse text-center"
        style={{ animationDuration: "1.5s" }}
      >
        <span className="text-2xl font-bold text-gray-800">Sait</span>
        <span className="text-2xl font-bold text-[#96B803]"> CBR</span>
        <span className="text-2xl font-bold text-gray-500">.nl</span>
      </div>
    </div>
  );
}