import { XCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export interface AlertProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'role'
  > {
  message?: string;
}

export default function Alert({ message, className, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={clsx('alert alert-error', className)}
      {...props}
    >
      <XCircleIcon className="size-6 text-error-content" />
      <span>{message}</span>
    </div>
  );
}
