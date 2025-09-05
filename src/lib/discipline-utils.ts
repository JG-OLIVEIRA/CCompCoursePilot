import type { Discipline } from '@/types/discipline';
import { cache } from 'react';

export type DisciplineCodeMap = Record<string, string>;

export const getDisciplines = cache(async (): Promise<Discipline[]> => {
  try {
    const res = await fetch('https://uerj-scraping-app.onrender.com/disciplines', {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) {
      throw new Error('Falha ao buscar disciplinas');
    }
    const data: Omit<Discipline, 'code' | 'department'>[] = await res.json();
    
    return data.map((discipline) => {
      const nameParts = discipline.name.split(' ');
      const code = nameParts[0] || '';
      return { 
        ...discipline, 
        name: discipline.name, // keep original name
        code, 
        department: code.split('-')[0] || 'Unknown' 
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const getDisciplineMap = cache(async (): Promise<DisciplineCodeMap> => {
    const disciplines = await getDisciplines();
    return disciplines.reduce((acc, discipline) => {
        acc[discipline.code] = discipline.discipline_id;
        return acc;
    }, {} as DisciplineCodeMap);
});
