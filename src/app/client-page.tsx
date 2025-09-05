"use client";

import type { Discipline } from '@/types/discipline';
import Flowchart from '@/components/Flowchart';

export default function ClientPage({ disciplines }: { disciplines: Discipline[] }) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Flowchart disciplines={disciplines} />
    </div>
  );
}
