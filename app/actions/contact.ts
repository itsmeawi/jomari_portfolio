"use server";

import { appendContactInquiry } from "@/lib/sheets/api";
import { type ActionResponse, type ContactFormInput } from "@/types";
import { revalidatePath } from "next/cache";

export async function submitContactInquiry(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse<{ id: string }>> {
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const subject = formData.get("subject")?.toString() || "";
  const message = formData.get("message")?.toString() || "";

  const input: ContactFormInput = {
    name,
    email,
    subject: subject || "Project Inquiry",
    message,
  };

  const response = await appendContactInquiry(input);

  if (response.success) {
    revalidatePath("/");
  }

  return response;
}
