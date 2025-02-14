import { Memo } from '@/schema';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export interface MemoItemProps {
  memo: Memo;
}

export default function MemoItem({ memo }: MemoItemProps) {
  return (
    <Link
      className="btn btn-ghost flex size-32 flex-col items-center md:size-48"
      href="#"
    >
      <DocumentTextIcon className="size-16 md:size-24" />
      <h2>{memo.name}</h2>
      <span className="text-xs font-light">
        {memo.createdAt.toLocaleString()}
      </span>
    </Link>
  );
}
