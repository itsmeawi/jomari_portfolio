import { google, sheets_v4 } from "googleapis";

let sheetsInstance: sheets_v4.Sheets | null = null;

/**
 * Checks whether Google Apps Script Web App webhook is configured.
 */
export function isAppsScriptConfigured(): boolean {
  return Boolean(process.env.GOOGLE_APPS_SCRIPT_URL);
}

export function getAppsScriptUrl(): string {
  return process.env.GOOGLE_APPS_SCRIPT_URL || "";
}

/**
 * Checks whether all required Google Sheets API v4 credentials are provided.
 */
export function isSheetsConfigured(): boolean {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  return Boolean(email && privateKey && sheetId);
}

/**
 * Normalizes private key formatting (handles escaped newlines from .env).
 */
function getNormalizedPrivateKey(): string {
  const rawKey = process.env.GOOGLE_PRIVATE_KEY || "";
  return rawKey.replace(/\\n/g, "\n");
}

/**
 * Retrieves the Google Sheets v4 API client authenticated with a Service Account.
 */
export function getSheetsClient(): sheets_v4.Sheets {
  if (sheetsInstance) {
    return sheetsInstance;
  }

  if (!isSheetsConfigured()) {
    throw new Error(
      "Google Sheets credentials are not configured. Please define GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID in your environment variables."
    );
  }

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = getNormalizedPrivateKey();

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  sheetsInstance = google.sheets({ version: "v4", auth });
  return sheetsInstance;
}

export function getSpreadsheetId(): string {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    return "1dytrgZe9P3dXtTbmhKs0GO3raZKsUoiK9zxZgpr7Kj0";
  }
  return sheetId;
}
