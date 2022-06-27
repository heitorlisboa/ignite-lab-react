import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  as?: 'a' | 'button';
  variant?: 'filled' | 'outlined';
  href?: string;
  openNewTab?: boolean;
  buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  buttonDisabled?: boolean;
}>;

type ButtonStyles = {
  [key in NonNullable<ButtonProps['variant']>]: string;
};

export function Button({
  children,
  as: Element = 'button',
  variant = 'filled',
  href,
  openNewTab,
  buttonType = 'button',
  buttonDisabled,
}: ButtonProps) {
  const styles: ButtonStyles = {
    filled: 'bg-green-500 text-white hover:bg-green-700',
    outlined: `bg-transparent hover:bg-blue-500
      text-blue-500 hover:text-gray-900
      border border-blue-500`,
  };

  if (Element === 'a' && !href) {
    throw new Error('href prop is missing');
  }

  return (
    <Element
      href={Element === 'a' ? href : undefined}
      type={Element === 'button' ? buttonType : undefined}
      disabled={Element === 'button' ? buttonDisabled : undefined}
      target={openNewTab ? '_blank' : undefined}
      rel={openNewTab ? 'noreferrer' : undefined}
      className={[
        `text-sm font-bold uppercase
        flex gap-2 items-center justify-center
        p-4
        rounded
        transition-colors disabled:opacity-50`,
        styles[variant],
      ].join(' ')}
    >
      {children}
    </Element>
  );
}
