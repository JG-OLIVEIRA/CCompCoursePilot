import Link from 'next/link';

interface RequirementLinkProps {
  description: string;
}

export function RequirementLink({ description }: RequirementLinkProps) {
  const codeRegex = /([A-Z]{3}\d{2}-\d{5})/g;
  const parts = description.split(codeRegex);

  return (
    <span>
      {parts.map((part, index) => {
        if (codeRegex.test(part)) {
          return (
            <Link key={index} href={`/disciplinas/${part}`} className="text-primary hover:underline font-medium">
              {part}
            </Link>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}
