import Link from 'next/link';
import type { DisciplineCodeMap } from '@/lib/discipline-utils';

interface RequirementLinkProps {
  description: string;
  disciplineMap: DisciplineCodeMap;
}

export function RequirementLink({ description, disciplineMap }: RequirementLinkProps) {
  const codeRegex = /([A-Z]{3}\d{2}-\d{5})/g;
  const parts = description.split(codeRegex);

  return (
    <span>
      {parts.map((part, index) => {
        if (codeRegex.test(part)) {
          const disciplineId = disciplineMap[part];
          if (disciplineId) {
            return (
              <Link key={index} href={`/disciplinas/${disciplineId}`} className="text-primary hover:underline font-medium">
                {part}
              </Link>
            );
          }
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}
