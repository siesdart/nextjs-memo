import { XCircleIcon } from '@heroicons/react/24/outline';

export interface AlertProps {
  message?: string;
}

export default function Alert({ message }: AlertProps) {
  return (
    <div role="alert" className="alert alert-error">
      <XCircleIcon className="size-6 text-error-content" />
      <span>{message}</span>
    </div>
  );
}
