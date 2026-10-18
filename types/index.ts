export * from "@/lib/schemas";

export interface ActionResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export type ProjectFilterCategory = "All" | "Fullstack" | "Frontend / UI" | "Backend / API" | "Open Source";
