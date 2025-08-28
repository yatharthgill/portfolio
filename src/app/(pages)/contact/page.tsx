"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { motion, Variants } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../../components/ui/input";

// --- Zod Schema ---
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phonenumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid phone number." }),
});

// --- Animation Variants ---
const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" as const },
  }),
};

const formVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } },
};

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);
  const titleText = "Let's Connect".split("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phonenumber: "" },
  });

  const { handleSubmit, reset, formState: { isSubmitSuccessful, errors } } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/contact", data);
      toast({
        title: "Message Sent!",
        description: response.data.message || "Your message has been sent successfully.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was an error submitting the form. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -15;
    const rotateY = ((x / rect.width) - 0.5) * 15;

    formRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!formRef.current) return;
    formRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="min-h-screen py-20 sm:py-28 font-sans flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.05 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-700 dark:text-cyan-400 mb-4">
            {titleText.map((char, index) => (
              <motion.span key={index} custom={index} variants={titleVariants}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <motion.div
          ref={formRef}
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transition: 'transform 0.2s ease-out' }}
          className="relative p-8 md:p-10 bg-gradient-to-br from-white to-purple-50 dark:from-black dark:to-cyan-900/30 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-900"
        >
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )} />
              <FormField control={form.control} name="phonenumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 123 456 7890" {...field} />
                  </FormControl>
                  <FormMessage>{errors.phonenumber?.message}</FormMessage>
                </FormItem>
              )} />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactPage;
