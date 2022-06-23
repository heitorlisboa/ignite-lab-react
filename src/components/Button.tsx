import type { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  as?: 'a' | 'button';
  variant?: 'filled' | 'outlined';
  href?: string;
}>;

type ButtonStyles = {
  [key in NonNullable<ButtonProps['variant']>]: string;
};

export function Button({
  children,
  as: Element = 'button',
  variant = 'filled',
  href,
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
      className={[
        `text-sm font-bold uppercase
        flex gap-2 items-center justify-center
        p-4
        rounded
        transition-colors`,
        styles[variant],
      ].join(' ')}
    >
      {children}
    </Element>
  );
}
