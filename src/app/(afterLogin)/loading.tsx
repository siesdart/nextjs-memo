import MemoItemSkeleton from '@/components/memo/MemoItemSkeleton';

export default function Loading() {
  return (
    <div className="flex flex-wrap gap-6">
      {[...Array(4)].map((_, i) => (
        <MemoItemSkeleton key={i} />
      ))}
    </div>
  );
}
