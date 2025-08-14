export default function Loading() {
  return (
    <div className="p-8  animate-pulse  w-full h-full flex flex-col">
      {/* Skeleton title */}
      <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full w-full mx-auto mb-8 shadow-md" />

      {/* Skeleton content cards */}
      <div className="flex  flex-wrap gap-8 h-full justify-center items-cente w-full p-4">
        <div className="border border-gray-300 rounded-xl p-2 space-y-5 bg-white shadow-sm w-full flex flex-col h-2/5">
          {/* image placeholder */}
          <div className="h-44 bg-gradient-to-r from-gray-300 to-gray-200 rounded-xl shadow-inner" />
          {/* title */}
          <div className="h-7 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full w-4/5 mx-auto shadow-sm" />
          {/* description */}
          <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-full shadow-sm" />
          <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 rounded w-3/4 shadow-sm" />
        </div>
      </div>
    </div>
  );
}
