export default function MemoItemsSkeleton() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="skeleton size-32 md:size-48"></div>
      ))}
    </>
  );
}
