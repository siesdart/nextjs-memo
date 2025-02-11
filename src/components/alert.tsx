import { XCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

export interface AlertProps {
  message?: string;
  invisible: boolean;
}

export default function Alert({ message, invisible }: AlertProps) {
  return (
    <div
      role="alert"
      className={clsx('alert alert-error', {
        invisible,
      })}
    >
      <XCircleIcon className="size-6 text-error-content" />
      <span>{message}</span>
    </div>
  );
}
