import { SimpleIcon, siGithub, siLinkedin, siWhatsapp } from 'simple-icons';

type BrandIconProps = {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

/** Wraps a simple-icons entry as a component with the same props as a lucide icon (inherits color via currentColor). */
const brand = (icon: SimpleIcon) => {
  const BrandIcon = ({ className, ...props }: BrandIconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} role="img" aria-label={props['aria-hidden'] ? undefined : icon.title} {...props}>
      <path d={icon.path} />
    </svg>
  );

  BrandIcon.displayName = `${icon.title}Icon`;
  return BrandIcon;
};

// Brand logos come from simple-icons, which lucide recommends (lucide no longer ships brand icons).
// Pinned to v13 on purpose: LinkedIn was removed from simple-icons in v14.
export const GithubIcon = brand(siGithub);
export const LinkedinIcon = brand(siLinkedin);
export const WhatsappIcon = brand(siWhatsapp);
