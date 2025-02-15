import clsx from 'clsx';

export interface SubmitProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'disabled'
  > {
  isPending: boolean;
}

export default function Submit({
  isPending,
  children,
  className,
  ...props
}: SubmitProps) {
  return (
    <button
      className={clsx('btn btn-primary', className)}
      disabled={isPending}
      {...props}
    >
      {isPending ? <span className="loading loading-spinner"></span> : children}
    </button>
  );
}
