"use client";

import type { Discipline } from '@/types/discipline';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const FlowchartNode = ({
  discipline,
  attended,
  className,
}: {
  discipline?: Discipline | { name: string; code: string; attended?: boolean };
  attended?: boolean;
  className?: string;
}) => {
  if (!discipline) {
    return <div className="h-20 w-48" />;
  }

  const isAttended = attended ?? discipline.attended;

  return (
    <div
      className={cn(
        'relative h-20 w-48 rounded-lg border-2 border-primary bg-card p-2 text-center shadow-md',
        isAttended && 'border-green-500 bg-green-50/50',
        className
      )}
    >
      <p className="font-semibold text-sm">{discipline.name}</p>
      <p className="font-mono text-xs text-muted-foreground">{discipline.code}</p>
      {isAttended && (
        <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-500" />
      )}
    </div>
  );
};

const HorizontalArrow = () => (
  <div className="flex items-center">
    <ArrowRight className="h-8 w-8 text-primary" />
  </div>
);

const EmptyCell = () => <div className="h-20 w-48" />;

export default function Flowchart({ disciplines }: { disciplines: Discipline[] }) {
  const getDisciplineByCode = (code: string) => {
    return disciplines.find((d) => d.code.includes(code));
  };

  const disciplineMap = {
    'IME03-10814': getDisciplineByCode('IME03-10814'), // Geometria Analítica
    'IME02-10818': getDisciplineByCode('IME02-10818'), // Álgebra Linear
    'ILE02-10822': getDisciplineByCode('ILE02-10822'), // Português Instrumental
    'IME04-10827': getDisciplineByCode('IME04-10827'), // Cálculo Numérico
    'IME04-10834': getDisciplineByCode('IME04-10834'), // Estruturas de Linguagens
    'IME06-10837': getDisciplineByCode('IME06-10837'), // Otimização Combinatória
    'IME04-10842': getDisciplineByCode('IME04-10842'), // Computação Gráfica
    'IME-Eletiva-II': { name: 'Eletiva II', code: 'IME' },

    'IME01-04827': getDisciplineByCode('IME01-04827'), // Cálculo I
    'IME01-6766': getDisciplineByCode('IME01-6766'), // Cálculo II
    'IME01-06767': getDisciplineByCode('IME01-06767'), // Cálculo III
    'IME01-10828': getDisciplineByCode('IME01-10828'), // Cálculo IV
    'IME04-10832': getDisciplineByCode('IME04-10832'), // Banco de Dados I
    'IME04-10838': getDisciplineByCode('IME04-10838'), // Banco de Dados II
    'IME04-10843': getDisciplineByCode('IME04-10843'), // Inteligência Artificial
    'IME-Eletiva-III': { name: 'Eletiva III', code: 'IME' },

    'IME02-10815': getDisciplineByCode('IME02-10815'), // Álgebra
    'IME05-10819': getDisciplineByCode('IME05-10819'), // Cálculo das Probabilidades
    'IME04-10823': getDisciplineByCode('IME04-10823'), // Algoritmos e Est. de Dados II
    'IME04-11311': getDisciplineByCode('IME04-11311'), // Algoritmos em Grafos
    'IME04-11312': getDisciplineByCode('IME04-11312'), // Otimização em Grafos
    'IME04-10839': getDisciplineByCode('IME04-10839'), // Interfaces Humano-Comp.
    'IME04-10844': getDisciplineByCode('IME04-10844'), // Ética Comp. e Sociedade
    'IME04-10848': getDisciplineByCode('IME04-10848'), // Projeto Final

    'IME06-10816': getDisciplineByCode('IME06-10816'), // Matemática Discreta
    'IME04-10820': getDisciplineByCode('IME04-10820'), // Algoritmos e Est. de Dados I
    'IME02-10824': getDisciplineByCode('IME02-10824'), // Elementos de Lógica
    'IME04-10830': getDisciplineByCode('IME04-10830'), // Engenharia de Software
    'IME04-10833': getDisciplineByCode('IME04-10833'), // Análise e Proj. de Sistemas
    'IME-Eletiva-I': { name: 'Eletiva I', code: 'IME' },
    'IME04-10845': getDisciplineByCode('IME04-10845'), // Metod. Cient. no Projeto Final
    'IME04-10849': getDisciplineByCode('IME04-10849'), // Sistemas Distribuidos

    'IME04-10817': getDisciplineByCode('IME04-10817'), // Fundamentos da Computação
    'IME04-10821': getDisciplineByCode('IME04-10821'), // Linguagem de Programação I
    'IME04-10825': getDisciplineByCode('IME04-10825'), // Linguagem de Programação II
    'IME04-10831': getDisciplineByCode('IME04-10831'), // Arquitetura de Computadores I
    'IME04-10835': getDisciplineByCode('IME04-10835'), // Sistemas Operacionais I
    'IME04-10840': getDisciplineByCode('IME04-10840'), // Sistemas Operacionais II
    'IME04-10846': getDisciplineByCode('IME04-10846'), // Redes de Computadores I
    'IME-Eletiva-IV': { name: 'Eletiva IV', code: 'IME' },
    
    'FIS01-10982': getDisciplineByCode('FIS01-10982'), // Física I
    'IME04-10826': getDisciplineByCode('IME04-10826'), // Teoria da Computação
    'FIS03-10983': getDisciplineByCode('FIS03-10983'), // Física II
    'IME04-10836': getDisciplineByCode('IME04-10836'), // Arquitetura de Computadores II
    'IME04-10841': getDisciplineByCode('IME04-10841'), // Compiladores
    'IME04-10847': getDisciplineByCode('IME04-10847'), // Arq. Avançadas de Computadores

    'IME-Eletiva-Basica': { name: 'Eletiva Básica', code: 'IME' },
  };

  return (
    <div className="overflow-x-auto p-4 bg-card rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-center mb-2">Fluxograma do Curso de Ciência da Computação</h2>
        <h3 className="text-lg text-muted-foreground text-center mb-6">Unidade Responsável: Instituto de Matemática e Estatística</h3>
      <div className="flex space-x-4">
        {/* Periods */}
        {[...Array(8)].map((_, periodIndex) => (
          <div key={periodIndex} className="flex flex-col items-center space-y-4">
            <h3 className="text-xl font-bold">{periodIndex + 1}º Período</h3>
            <div className="flex flex-col space-y-4">
                {periodIndex === 0 && (
                    <>
                        <FlowchartNode discipline={disciplineMap['IME03-10814']} attended={disciplineMap['IME03-10814']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME01-04827']} attended={disciplineMap['IME01-04827']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME02-10815']} attended={disciplineMap['IME02-10815']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME06-10816']} attended={disciplineMap['IME06-10816']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10817']} attended={disciplineMap['IME04-10817']?.attended === 'Sim'} />
                        <EmptyCell />
                        <EmptyCell />
                    </>
                )}
                {periodIndex === 1 && (
                    <>
                        <FlowchartNode discipline={disciplineMap['IME02-10818']} attended={disciplineMap['IME02-10818']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME01-6766']} attended={disciplineMap['IME01-6766']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME05-10819']} attended={disciplineMap['IME05-10819']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10820']} attended={disciplineMap['IME04-10820']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10821']} attended={disciplineMap['IME04-10821']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['FIS01-10982']} attended={disciplineMap['FIS01-10982']?.attended === 'Sim'} />
                        <EmptyCell />
                    </>
                )}
                {periodIndex === 2 && (
                    <>
                        <FlowchartNode discipline={disciplineMap['ILE02-10822']} attended={disciplineMap['ILE02-10822']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME01-06767']} attended={disciplineMap['IME01-06767']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10823']} attended={disciplineMap['IME04-10823']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME02-10824']} attended={disciplineMap['IME02-10824']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10825']} attended={disciplineMap['IME04-10825']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10826']} attended={disciplineMap['IME04-10826']?.attended === 'Sim'} />
                        <EmptyCell />
                    </>
                )}
                {periodIndex === 3 && (
                    <>
                        <FlowchartNode discipline={disciplineMap['IME04-10827']} attended={disciplineMap['IME04-10827']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME01-10828']} attended={disciplineMap['IME01-10828']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-11311']} attended={disciplineMap['IME04-11311']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10830']} attended={disciplineMap['IME04-10830']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10831']} attended={disciplineMap['IME04-10831']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['FIS03-10983']} attended={disciplineMap['FIS03-10983']?.attended === 'Sim'} />
                        <EmptyCell />
                   </>
                )}
                {periodIndex === 4 && (
                    <>
                        <FlowchartNode discipline={disciplineMap['IME04-10834']} attended={disciplineMap['IME04-10834']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10832']} attended={disciplineMap['IME04-10832']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-11312']} attended={disciplineMap['IME04-11312']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10833']} attended={disciplineMap['IME04-10833']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10835']} attended={disciplineMap['IME04-10835']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10836']} attended={disciplineMap['IME04-10836']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME-Eletiva-Basica']} attended={false} />
                    </>
                )}
                 {periodIndex === 5 && (
                    <>
                        <FlowchartNode discipline={disciplineMap['IME06-10837']} attended={disciplineMap['IME06-10837']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10838']} attended={disciplineMap['IME04-10838']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10839']} attended={disciplineMap['IME04-10839']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME-Eletiva-I']} attended={false} />
                        <FlowchartNode discipline={disciplineMap['IME04-10840']} attended={disciplineMap['IME04-10840']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10841']} attended={disciplineMap['IME04-10841']?.attended === 'Sim'} />
                        <EmptyCell />
                    </>
                )}
                {periodIndex === 6 && (
                    <>
                        <FlowchartNode discipline={disciplineMap['IME04-10842']} attended={disciplineMap['IME04-10842']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10843']} attended={disciplineMap['IME04-10843']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10844']} attended={disciplineMap['IME04-10844']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10845']} attended={disciplineMap['IME04-10845']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10846']} attended={disciplineMap['IME04-10846']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10847']} attended={disciplineMap['IME04-10847']?.attended === 'Sim'} />
                        <EmptyCell />
                    </>
                )}
                {periodIndex === 7 && (
                    <>
                        <FlowchartNode discipline={disciplineMap['IME-Eletiva-II']} attended={false} />
                        <FlowchartNode discipline={disciplineMap['IME-Eletiva-III']} attended={false} />
                        <FlowchartNode discipline={disciplineMap['IME04-10848']} attended={disciplineMap['IME04-10848']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME04-10849']} attended={disciplineMap['IME04-10849']?.attended === 'Sim'} />
                        <FlowchartNode discipline={disciplineMap['IME-Eletiva-IV']} attended={false} />
                        <EmptyCell />
                        <EmptyCell />
                    </>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
