import { z } from "zod";

/**
 * Strict Zod Schema for Project entities stored in Google Sheets or fallback.
 */
export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["Fullstack", "Frontend / UI", "Backend / API", "Open Source", "All"]).default("Fullstack"),
  tags: z.array(z.string()).min(1),
  githubUrl: z.string().url().nullable().optional(),
  liveUrl: z.string().url().nullable().optional(),
  featured: z.boolean().default(false),
  year: z.string().default("2026"),
  order: z.number().default(99),
});

export type Project = z.infer<typeof projectSchema>;

/**
 * Strict Zod Schema for Work Experience history.
 */
export const experienceSchema = z.object({
  id: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  companyUrl: z.string().url().nullable().optional(),
  period: z.string().min(1),
  location: z.string().default("Remote"),
  description: z.string().min(1),
  achievements: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  order: z.number().default(99),
});

export type Experience = z.infer<typeof experienceSchema>;

/**
 * Strict Zod Schema for Incoming Contact Inquiries.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must not exceed 100 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid email address." })
    .max(255),
  subject: z
    .string()
    .trim()
    .min(2, { message: "Subject must be at least 2 characters." })
    .max(150, { message: "Subject must not exceed 150 characters." })
    .default("General Inquiry"),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(3000, { message: "Message cannot exceed 3000 characters." }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Full Inquiry Schema for storing inside Google Sheets (with metadata).
 */
export const inquiryRecordSchema = contactFormSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  status: z.enum(["new", "reviewed", "archived"]).default("new"),
  source: z.string().default("portfolio_web"),
});

export type InquiryRecord = z.infer<typeof inquiryRecordSchema>;

/**
 * Profile & Bio Metadata Schema.
 */
export const profileSchema = z.object({
  name: z.string(),
  handle: z.string(),
  title: z.string(),
  tagline: z.string(),
  bio: z.string(),
  status: z.string(),
  availability: z.enum(["available", "limited", "busy"]),
  location: z.string(),
  timezone: z.string(),
  email: z.string().email(),
  github: z.string().url(),
  linkedin: z.string().url(),
  skills: z.array(z.string()),
});

export type Profile = z.infer<typeof profileSchema>;
