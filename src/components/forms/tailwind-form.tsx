'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  age: z.coerce.number().min(18, { message: 'You must be at least 18.' }).max(99, { message: 'You must be under 99.' }),
  department: z.string({ required_error: 'Please select a department.' }),
  bio: z.string().max(200).optional(),
  dateOfBirth: z.date({
    required_error: 'A date of birth is required.',
  }),
  satisfaction: z.coerce.number().min(0).max(100),
  newsletter: z.boolean().default(false),
  contactMethod: z.enum(['email', 'phone'], {
    required_error: 'You need to select a contact method.',
  }),
  terms: z.boolean().default(false).refine((val) => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
  field1: z.string().optional(),
  field2: z.string().optional(),
  field3: z.string().optional(),
  field4: z.string().optional(),
  field5: z.string().optional(),
  field6: z.string().optional(),
  field7: z.string().optional(),
  field8: z.string().optional(),
  field9: z.string().optional(),
  field10: z.string().optional(),
  field11: z.string().optional(),
  field12: z.string().optional(),
  field13: z.string().optional(),
  field14: z.string().optional(),
  field15: z.string().optional(),
  field16: z.string().optional(),
  field17: z.string().optional(),
  field18: z.string().optional(),
  field19: z.string().optional(),
  field20: z.string().optional(),
  field21: z.string().optional(),
  field22: z.string().optional(),
  field23: z.string().optional(),
  field24: z.string().optional(),
  field25: z.string().optional(),
  field26: z.string().optional(),
  field27: z.string().optional(),
  field28: z.string().optional(),
  field29: z.string().optional(),
  field30: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function TailwindForm() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      age: 18,
      bio: '',
      satisfaction: 50,
      newsletter: false,
      terms: false,
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: '',
      field7: '',
      field8: '',
      field9: '',
      field10: '',
      field11: '',
      field12: '',
      field13: '',
      field14: '',
      field15: '',
      field16: '',
      field17: '',
      field18: '',
      field19: '',
      field20: '',
      field21: '',
      field22: '',
      field23: '',
      field24: '',
      field25: '',
      field26: '',
      field27: '',
      field28: '',
      field29: '',
      field30: '',
    },
  });

  const { watch } = form;

  useEffect(() => {
    performance.mark('tailwind-mount-start');
    const timer = setTimeout(() => {
      performance.mark('tailwind-mount-end');
      try {
        performance.measure('tailwind-mount', 'tailwind-mount-start', 'tailwind-mount-end');
      } catch (e) {
        // May fail if marks are cleared or not set, safe to ignore
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const watchedFields = watch();
  useEffect(() => {
    performance.mark('tailwind-update-start');
    setTimeout(() => {
      performance.mark('tailwind-update-end');
      try {
        performance.measure('tailwind-update', 'tailwind-update-start', 'tailwind-update-end');
      } catch (e) {
        // May fail if marks are cleared or not set, safe to ignore
      }
    }, 0);
  }, [watchedFields]);

  function onSubmit(data: FormValues) {
    toast({
      title: 'Tailwind Form Submitted',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const onFinalSubmit = form.handleSubmit(
    (data) => {
      onSubmit(data);
      performance.mark('tailwind-submit-end');
      performance.measure(
        'tailwind-submit',
        'tailwind-submit-start',
        'tailwind-submit-end'
      );
    },
    () => {
      performance.mark('tailwind-submit-end');
      performance.measure(
        'tailwind-submit',
        'tailwind-submit-start',
        'tailwind-submit-end'
      );
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    performance.mark('tailwind-submit-start');
    onFinalSubmit(e);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Max 200 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="satisfaction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Satisfaction: {field.value ?? 50}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  onValueChange={(value) => field.onChange(value[0])}
                  value={[field.value]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>
                  Subscribe to newsletter
                </FormLabel>
                <FormDescription>
                  Receive updates about new products and features.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Preferred Contact Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="email" />
                    </FormControl>
                    <FormLabel className="font-normal">Email</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="phone" />
                    </FormControl>
                    <FormLabel className="font-normal">Phone</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {Array.from({ length: 30 }, (_, i) => i + 1).map((i) => (
          <FormField
            key={`field${i}`}
            control={form.control}
            name={`field${i}` as keyof FormValues}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field {i}</FormLabel>
                <FormControl>
                  <Input placeholder={`Value for field ${i}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I accept the terms and conditions</FormLabel>
                <FormDescription>
                  You agree to our Terms of Service and Privacy Policy.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
