export const SuggestionSkeleton = () => {
  return (
    <div className="flex flex-row items-center gap-2.5">
      <div className="w-4 h-4 border-white border-dotted rounded-full border-3 animate-spin border-b-transparent" />
      <div className="text-base font-medium text-white">Search in progress</div>
    </div>
  );
};
