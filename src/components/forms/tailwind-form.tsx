'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import dayjs from 'dayjs';
import {
  ConfigProvider,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Slider,
  Switch,
  Radio,
  Checkbox,
  Button as AntdButton,
  Space,
} from 'antd';
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
import { useToast } from '@/hooks/use-toast';

const { Option } = Select;

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
  field1: z.string().min(1, { message: "This field is required." }),
  field2: z.string().min(1, { message: "This field is required." }),
  field3: z.string().min(1, { message: "This field is required." }),
  field4: z.string().min(1, { message: "This field is required." }),
  field5: z.string().min(1, { message: "This field is required." }),
  field6: z.string().min(1, { message: "This field is required." }),
  field7: z.string().min(1, { message: "This field is required." }),
  field8: z.string().min(1, { message: "This field is required." }),
  field9: z.string().min(1, { message: "This field is required." }),
  field10: z.string().min(1, { message: "This field is required." }),
  field11: z.string().min(1, { message: "This field is required." }),
  field12: z.string().min(1, { message: "This field is required." }),
  field13: z.string().min(1, { message: "This field is required." }),
  field14: z.string().min(1, { message: "This field is required." }),
  field15: z.string().min(1, { message: "This field is required." }),
  field16: z.string().min(1, { message: "This field is required." }),
  field17: z.string().min(1, { message: "This field is required." }),
  field18: z.string().min(1, { message: "This field is required." }),
  field19: z.string().min(1, { message: "This field is required." }),
  field20: z.string().min(1, { message: "This field is required." }),
  field21: z.string().min(1, { message: "This field is required." }),
  field22: z.string().min(1, { message: "This field is required." }),
  field23: z.string().min(1, { message: "This field is required." }),
  field24: z.string().min(1, { message: "This field is required." }),
  field25: z.string().min(1, { message: "This field is required." }),
  field26: z.string().min(1, { message: "This field is required." }),
  field27: z.string().min(1, { message: "This field is required." }),
  field28: z.string().min(1, { message: "This field is required." }),
  field29: z.string().min(1, { message: "This field is required." }),
  field30: z.string().min(1, { message: "This field is required." }),
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
      title: 'RHF + AntD Form Submitted',
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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5DADE2',
          colorSuccess: '#A3E4D7',
          colorBgContainer: '#FFFFFF',
          borderRadius: 6,
        },
      }}
    >
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
                  <InputNumber min={18} max={99} className="w-full" {...field} />
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
                <FormControl>
                  <Select placeholder="Select a department" {...field}>
                    <Option value="engineering">Engineering</Option>
                    <Option value="design">Design</Option>
                    <Option value="product">Product</Option>
                    <Option value="marketing">Marketing</Option>
                  </Select>
                </FormControl>
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
                  <Input.TextArea
                    placeholder="Tell us a little about yourself"
                    rows={4}
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
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <DatePicker
                    className="w-full"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      field.onChange(date ? date.toDate() : null);
                    }}
                  />
                </FormControl>
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
                    min={0}
                    max={100}
                    step={1}
                    onChange={field.onChange}
                    value={field.value}
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
                  <FormLabel>Subscribe to newsletter</FormLabel>
                  <FormDescription>
                    Receive updates about new products and features.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Contact Method</FormLabel>
                <FormControl>
                  <Radio.Group {...field}>
                    <Radio value="email">Email</Radio>
                    <Radio value="phone">Phone</Radio>
                  </Radio.Group>
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
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  >
                    I accept the terms and conditions
                  </Checkbox>
                </FormControl>
                <FormDescription>
                    You agree to our Terms of Service and Privacy Policy.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Space>
              <AntdButton type="primary" htmlType="submit">
                Submit
              </AntdButton>
              <AntdButton htmlType="button" onClick={() => form.reset()}>
                Reset
              </AntdButton>
            </Space>
          </div>
        </form>
      </Form>
    </ConfigProvider>
  );
}
