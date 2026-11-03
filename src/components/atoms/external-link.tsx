import { AnchorHTMLAttributes } from 'react';

/** Anchor for off-site URLs: opens in a new tab without leaking window.opener. mailto: links keep the default so the mail app opens. */
export const ExternalLink = ({ children, href, ...props }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>) =>
  href?.startsWith('mailto:') ? (
    <a {...props} href={href}>
      {children}
    </a>
  ) : (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
