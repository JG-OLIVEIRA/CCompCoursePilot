
"use client";

import { useEffect, useState } from 'react';
import type { Discipline } from '@/types/discipline';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DisciplineDetailDialogProps {
  discipline: Discipline;
  isOpen: boolean;
  onClose: () => void;
}

export function DisciplineDetailDialog({ discipline, isOpen, onClose }: DisciplineDetailDialogProps) {
  const [details, setDetails] = useState<Discipline | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchDetails = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const res = await fetch(`https://uerj-scraping-app.onrender.com/disciplines/${discipline.discipline_id}`);
          if (!res.ok) {
            throw new Error('Falha ao buscar detalhes da disciplina');
          }
          const data = await res.json();
          setDetails(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetails();
    }
  }, [isOpen, discipline.discipline_id]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{discipline.name}</DialogTitle>
          <DialogDescription>
            {discipline.type} - {discipline.credits} créditos - {discipline.total_hours} horas
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-6">
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-destructive">{error}</div>
            ) : details ? (
              <>
                {details.requirements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Requisitos</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {details.requirements.map((req, index) => (
                        <li key={index}>
                          <Badge variant={req.type === 'Pré-Requisito' ? 'default' : 'destructive'} className="mr-2">
                            {req.type}
                          </Badge>
                          <span>{req.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {details.classes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Turmas Disponíveis</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Turma</TableHead>
                          <TableHead>Professor</TableHead>
                          <TableHead>Horário</TableHead>
                          <TableHead>Vagas</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {details.classes.map((cls) => (
                          <TableRow key={cls.number}>
                            <TableCell>{cls.number}</TableCell>
                            <TableCell>{cls.teacher}</TableCell>
                            <TableCell>{cls.times}</TableCell>
                            <TableCell>{cls.offered_uerj} / {cls.occupied_uerj}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
