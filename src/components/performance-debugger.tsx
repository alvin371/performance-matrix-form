'use client';

import { Gauge } from 'lucide-react';
import type { PerformanceData } from '@/app/page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Props {
  data: PerformanceData;
  lastInteraction: string;
}

export function PerformanceDebugger({ data, lastInteraction }: Props) {
  const { tailwind, antd, tailwindClone } = data;

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
            <Gauge className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <CardTitle className="font-headline text-xl">Performance Debugger</CardTitle>
            <CardDescription>Results update on interaction. Lower is better.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Tailwind</TableHead>
                <TableHead className="text-right">Ant Design</TableHead>
                <TableHead className="text-right">RHF+TW (Clone)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Initial Render</TableCell>
                <TableCell className={`text-right ${lastInteraction === 'tailwind mount' ? 'text-primary font-bold' : ''}`}>
                  {tailwind.mount > 0 ? `${tailwind.mount.toFixed(2)} ms` : '...'}
                </TableCell>
                <TableCell className={`text-right ${lastInteraction === 'antd mount' ? 'text-primary font-bold' : ''}`}>
                  {antd.mount > 0 ? `${antd.mount.toFixed(2)} ms` : '...'}
                </TableCell>
                <TableCell className={`text-right ${lastInteraction === 'tailwindClone mount' ? 'text-primary font-bold' : ''}`}>
                  {tailwindClone.mount > 0 ? `${tailwindClone.mount.toFixed(2)} ms` : '...'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Last Update</TableCell>
                <TableCell className={`text-right ${lastInteraction === 'tailwind update' ? 'text-primary font-bold' : ''}`}>
                  {tailwind.update > 0 ? `${tailwind.update.toFixed(2)} ms` : '...'}
                </TableCell>
                <TableCell className={`text-right ${lastInteraction === 'antd update' ? 'text-primary font-bold' : ''}`}>
                  {antd.update > 0 ? `${antd.update.toFixed(2)} ms` : '...'}
                </TableCell>
                 <TableCell className={`text-right ${lastInteraction === 'tailwindClone update' ? 'text-primary font-bold' : ''}`}>
                  {tailwindClone.update > 0 ? `${tailwindClone.update.toFixed(2)} ms` : '...'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Submit Validation</TableCell>
                <TableCell className={`text-right ${lastInteraction === 'tailwind submit' ? 'text-primary font-bold' : ''}`}>
                  {tailwind.submit > 0 ? `${tailwind.submit.toFixed(2)} ms` : '...'}
                </TableCell>
                <TableCell className={`text-right ${lastInteraction === 'antd submit' ? 'text-primary font-bold' : ''}`}>
                  {antd.submit > 0 ? `${antd.submit.toFixed(2)} ms` : '...'}
                </TableCell>
                <TableCell className={`text-right ${lastInteraction === 'tailwindClone submit' ? 'text-primary font-bold' : ''}`}>
                  {tailwindClone.submit > 0 ? `${tailwindClone.submit.toFixed(2)} ms` : '...'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          <strong>Last Interaction:</strong> {lastInteraction || 'None yet. Interact with a form to see update times.'}
        </p>
      </CardContent>
    </Card>
  );
}
