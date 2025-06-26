'use client';

import { useEffect, useState } from 'react';
import { ListChecks, Zap } from 'lucide-react';
import { TailwindForm } from '@/components/forms/tailwind-form';
import { AntdForm } from '@/components/forms/antd-form';
import { PerformanceDebugger } from '@/components/performance-debugger';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TailwindFormClone } from '@/components/forms/tailwind-form-clone';

export interface PerformanceData {
  tailwind: {
    mount: number;
    update: number;
    submit: number;
  };
  antd: {
    mount: number;
    update: number;
    submit: number;
  };
  tailwindClone: {
    mount: number;
    update: number;
    submit: number;
  };
}

export default function Home() {
  const [perfData, setPerfData] = useState<PerformanceData>({
    tailwind: { mount: 0, update: 0, submit: 0 },
    antd: { mount: 0, update: 0, submit: 0 },
    tailwindClone: { mount: 0, update: 0, submit: 0 },
  });
  const [lastInteraction, setLastInteraction] = useState('');

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        const entry = entries[entries.length - 1]; // Get the last entry to avoid batch updates noise
        const [form, type] = entry.name.split('-');

        if (form === 'tailwind' || form === 'antd' || form === 'tailwindClone') {
          setPerfData((prev) => ({
            ...prev,
            [form]: { ...prev[form], [type]: entry.duration },
          }));
          setLastInteraction(`${form} ${type}`);
        }
      }
    });

    observer.observe({ entryTypes: ['measure'], buffered: true });

    return () => {
      observer.disconnect();
      performance.clearMarks();
      performance.clearMeasures();
    };
  }, []);

  return (
    <main className="min-h-screen w-full p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="font-headline text-2xl">Form Maestro</CardTitle>
              <CardDescription>An Objective Performance Showdown: React Hook Form vs. Ant Design</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs defaultValue="tailwind" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tailwind">
                    <ListChecks className="mr-2 h-4 w-4" /> React Hook Form + Tailwind
                  </TabsTrigger>
                  <TabsTrigger value="antd">
                    <ListChecks className="mr-2 h-4 w-4" /> Ant Design Form
                  </TabsTrigger>
                  <TabsTrigger value="tailwindClone">
                    <ListChecks className="mr-2 h-4 w-4" /> RHF + Tailwind (Clone)
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="tailwind">
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Tailwind CSS Form</CardTitle>
                      <CardDescription>
                        Built with React Hook Form, Zod, and styled with ShadCN/UI components.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TailwindForm />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="antd">
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Ant Design Form</CardTitle>
                      <CardDescription>
                        Built with the standard Ant Design form components and validation system.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AntdForm />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="tailwindClone">
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Tailwind CSS Form (Clone)</CardTitle>
                      <CardDescription>
                        A clone for performance comparison.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TailwindFormClone />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div className="lg:col-span-1">
               <PerformanceDebugger data={perfData} lastInteraction={lastInteraction} />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
