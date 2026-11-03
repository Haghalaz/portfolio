import { Building2, GraduationCap } from 'lucide-react';

import { CompanyType } from '@data/career.ts';

/** Company logo, or a graduation-cap / building tile in the calendar colour when no logo file exists. */
export const CompanyLogo = ({ company, className }: { company: CompanyType; className: string }) =>
  company.logo ? (
    <img src={company.logo} alt="" className={`${className} object-cover`} />
  ) : (
    <span aria-hidden className={`${className} grid place-items-center text-white`} style={{ backgroundColor: company.color }}>
      {company.kind === 'education' ? <GraduationCap className="size-1/2" /> : <Building2 className="size-1/2" />}
    </span>
  );
