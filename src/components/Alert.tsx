import clsx from 'clsx';
import { CircleX } from 'lucide-react';

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
      <CircleX className="size-6 text-error-content" />
      <span>{message}</span>
    </div>
  );
}
