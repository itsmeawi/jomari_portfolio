import {
  getSheetsClient,
  getSpreadsheetId,
  isSheetsConfigured,
  isAppsScriptConfigured,
  getAppsScriptUrl,
} from "./client";
import { sanitizeSpreadsheetCell } from "./sanitize";
import {
  fallbackProfile,
  fallbackProjects,
  fallbackExperiences,
} from "./fallbackData";
import {
  projectSchema,
  experienceSchema,
  contactFormSchema,
  type Project,
  type Experience,
  type Profile,
  type ContactFormInput,
  type ActionResponse,
} from "@/types";

/**
 * Transforms a 2D sheet row array [headerRow, ...dataRows] into an array of typed objects.
 */
function rowsToObjects(rows: string[][]): Record<string, string>[] {
  if (!rows || rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const dataRows = rows.slice(1);

  return dataRows.map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index].trim() : "";
    });
    return obj;
  });
}

/**
 * Fetches Developer Profile metadata.
 */
export async function getProfile(): Promise<Profile> {
  // 1. Try Google Apps Script if doGet is enabled
  if (isAppsScriptConfigured()) {
    try {
      const res = await fetch(`${getAppsScriptUrl()}?tab=Profile`, {
        next: { revalidate: 300 },
      });
      if (res.ok) {
        const text = await res.text();
        if (text.startsWith("{") || text.startsWith("[")) {
          const json = JSON.parse(text);
          if (json && typeof json === "object" && !json.error) {
            return {
              ...fallbackProfile,
              ...json,
            };
          }
        }
      }
    } catch {
      // Graceful fallback to next provider
    }
  }

  // 2. Try Google Sheets API v4 via Service Account
  if (isSheetsConfigured()) {
    try {
      const sheets = getSheetsClient();
      const spreadsheetId = getSpreadsheetId();

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Profile!A1:B20",
      });

      const rows = response.data.values;
      if (rows && rows.length > 0) {
        const map: Record<string, string> = {};
        for (const [key, val] of rows) {
          if (key) {
            map[key.trim().toLowerCase()] = val ? val.trim() : "";
          }
        }

        return {
          name: map.name || fallbackProfile.name,
          handle: map.handle || fallbackProfile.handle,
          title: map.title || fallbackProfile.title,
          tagline: map.tagline || fallbackProfile.tagline,
          bio: map.bio || fallbackProfile.bio,
          status: map.status || fallbackProfile.status,
          availability: (map.availability as "available" | "limited" | "busy") || fallbackProfile.availability,
          location: map.location || fallbackProfile.location,
          timezone: map.timezone || fallbackProfile.timezone,
          email: map.email || fallbackProfile.email,
          github: map.github || fallbackProfile.github,
          linkedin: map.linkedin || fallbackProfile.linkedin,
          skills: map.skills ? map.skills.split(",").map((s) => s.trim()).filter(Boolean) : fallbackProfile.skills,
        };
      }
    } catch (error) {
      console.warn("[Google Sheets API] Failed to fetch profile from sheet, using fallback:", error);
    }
  }

  return fallbackProfile;
}

/**
 * Fetches Projects with strict Zod validation.
 */
export async function getProjects(): Promise<Project[]> {
  // 1. Try Google Apps Script if doGet is enabled
  if (isAppsScriptConfigured()) {
    try {
      const res = await fetch(`${getAppsScriptUrl()}?tab=Projects`, {
        next: { revalidate: 300 },
      });
      if (res.ok) {
        const text = await res.text();
        if (text.startsWith("[")) {
          const list = JSON.parse(text);
          if (Array.isArray(list) && list.length > 0) {
            const validated = list
              .map((item) => projectSchema.safeParse(item))
              .filter((r) => r.success)
              .map((r) => r.data as Project);
            if (validated.length > 0) return validated.sort((a, b) => a.order - b.order);
          }
        }
      }
    } catch {
      // Graceful fallback to next provider
    }
  }

  // 2. Try Google Sheets API v4 via Service Account
  if (isSheetsConfigured()) {
    try {
      const sheets = getSheetsClient();
      const spreadsheetId = getSpreadsheetId();

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Projects!A1:J100",
      });

      const rows = response.data.values;
      if (rows && rows.length >= 2) {
        const rawObjects = rowsToObjects(rows as string[][]);
        const validatedProjects: Project[] = [];

        for (const raw of rawObjects) {
          const parsedTags = raw.tags ? raw.tags.split(",").map((t) => t.trim()).filter(Boolean) : ["TypeScript"];
          const rawProject = {
            id: raw.id || `proj-${Math.random().toString(36).substring(2, 8)}`,
            title: raw.title || "Untitled Project",
            description: raw.description || "",
            category: (raw.category as Project["category"]) || "Fullstack",
            tags: parsedTags,
            githubUrl: raw.githuburl || raw.github || null,
            liveUrl: raw.liveurl || raw.url || null,
            featured: raw.featured === "true" || raw.featured === "TRUE" || raw.featured === "1",
            year: raw.year || "2026",
            order: Number(raw.order) || 99,
          };

          const result = projectSchema.safeParse(rawProject);
          if (result.success) {
            validatedProjects.push(result.data);
          }
        }

        if (validatedProjects.length > 0) {
          return validatedProjects.sort((a, b) => a.order - b.order);
        }
      }
    } catch (error) {
      console.warn("[Google Sheets API] Failed to fetch projects from sheet, using fallback:", error);
    }
  }

  return fallbackProjects.sort((a, b) => a.order - b.order);
}

/**
 * Fetches Work Experience history with strict Zod validation.
 */
export async function getExperiences(): Promise<Experience[]> {
  // 1. Try Google Apps Script if doGet is enabled
  if (isAppsScriptConfigured()) {
    try {
      const res = await fetch(`${getAppsScriptUrl()}?tab=Experiences`, {
        next: { revalidate: 300 },
      });
      if (res.ok) {
        const text = await res.text();
        if (text.startsWith("[")) {
          const list = JSON.parse(text);
          if (Array.isArray(list) && list.length > 0) {
            const validated = list
              .map((item) => experienceSchema.safeParse(item))
              .filter((r) => r.success)
              .map((r) => r.data as Experience);
            if (validated.length > 0) return validated.sort((a, b) => a.order - b.order);
          }
        }
      }
    } catch {
      // Graceful fallback to next provider
    }
  }

  // 2. Try Google Sheets API v4 via Service Account
  if (isSheetsConfigured()) {
    try {
      const sheets = getSheetsClient();
      const spreadsheetId = getSpreadsheetId();

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Experiences!A1:I50",
      });

      const rows = response.data.values;
      if (rows && rows.length >= 2) {
        const rawObjects = rowsToObjects(rows as string[][]);
        const validatedExperiences: Experience[] = [];

        for (const raw of rawObjects) {
          const achievements = raw.achievements
            ? raw.achievements.split(";").map((a) => a.trim()).filter(Boolean)
            : [];
          const technologies = raw.technologies
            ? raw.technologies.split(",").map((t) => t.trim()).filter(Boolean)
            : [];

          const rawExp = {
            id: raw.id || `exp-${Math.random().toString(36).substring(2, 8)}`,
            role: raw.role || "Software Engineer",
            company: raw.company || "Company",
            companyUrl: raw.companyurl || null,
            period: raw.period || "Present",
            location: raw.location || "Remote",
            description: raw.description || "",
            achievements,
            technologies,
            order: Number(raw.order) || 99,
          };

          const result = experienceSchema.safeParse(rawExp);
          if (result.success) {
            validatedExperiences.push(result.data);
          }
        }

        if (validatedExperiences.length > 0) {
          return validatedExperiences.sort((a, b) => a.order - b.order);
        }
      }
    } catch (error) {
      console.warn("[Google Sheets API] Failed to fetch experiences from sheet, using fallback:", error);
    }
  }

  return fallbackExperiences.sort((a, b) => a.order - b.order);
}

/**
 * Appends a new contact inquiry to Google Sheets.
 * Supports:
 * 1. Live Google Apps Script Web App (POST webhook).
 * 2. Official Google Sheets API v4 (Service Account JWT).
 * 3. Sanitizes against spreadsheet formula injection.
 */
export async function appendContactInquiry(
  input: ContactFormInput
): Promise<ActionResponse<{ id: string }>> {
  // 1. Zod Validation
  const validation = contactFormSchema.safeParse(input);
  if (!validation.success) {
    const flattened = validation.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Please correct the highlighted errors in the form.",
      errors: flattened,
    };
  }

  const { name, email, subject, message } = validation.data;
  const inquiryId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const createdAt = new Date().toISOString();

  // 2. Formula Injection Sanitization
  const cleanId = sanitizeSpreadsheetCell(inquiryId);
  const cleanDate = sanitizeSpreadsheetCell(createdAt);
  const cleanName = sanitizeSpreadsheetCell(name);
  const cleanEmail = sanitizeSpreadsheetCell(email);
  const cleanSubject = sanitizeSpreadsheetCell(subject);
  const cleanMessage = sanitizeSpreadsheetCell(message);
  const cleanStatus = sanitizeSpreadsheetCell("new");

  // 3. Option A: Stream to Google Apps Script Web App Webhook
  if (isAppsScriptConfigured()) {
    try {
      const payload = {
        id: cleanId,
        createdAt: cleanDate,
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage,
        status: cleanStatus,
      };

      const res = await fetch(getAppsScriptUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        return {
          success: true,
          message: "Transmission delivered successfully to my live Google Sheets queue!",
          data: { id: cleanId },
        };
      }
    } catch (err) {
      console.error("[Google Apps Script Webhook] Transmission failed:", err);
    }
  }

  // 4. Option B: Official Google Sheets API v4 via Service Account
  if (isSheetsConfigured()) {
    try {
      const sheets = getSheetsClient();
      const spreadsheetId = getSpreadsheetId();

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Inquiries!A:G",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [[cleanId, cleanDate, cleanName, cleanEmail, cleanSubject, cleanMessage, cleanStatus]],
        },
      });

      return {
        success: true,
        message: "Thank you for reaching out! Your message was delivered directly to my Google Sheet.",
        data: { id: cleanId },
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("[Google Sheets API] Error appending inquiry row:", errorMessage);

      return {
        success: false,
        message: "Could not record message to the Google Sheet. Please try again or email directly.",
      };
    }
  }

  // 5. Option C: Dev Mode / Local Fallback
  console.info(
    `[Google Sheets CMS - Local/Dev Mode] Simulated inquiry received from ${cleanName} <${cleanEmail}>:`,
    { id: cleanId, subject: cleanSubject, message: cleanMessage }
  );

  return {
    success: true,
    message: "Message received successfully! (Simulated storage: configured for live Google Sheets when environment variables are supplied).",
    data: { id: cleanId },
  };
}
