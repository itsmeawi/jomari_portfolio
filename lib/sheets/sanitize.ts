/**
 * Sanitizes string inputs to prevent Spreadsheet Formula Injection attacks.
 * In Google Sheets and Excel, cells starting with =, +, -, @, \t, or \r
 * can trigger formula execution or malicious macro dispatching.
 */
export function sanitizeSpreadsheetCell(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) {
    return "";
  }

  const str = String(value).trim();
  if (str.length === 0) {
    return "";
  }

  const DANGEROUS_PREFIXES = ["=", "+", "-", "@", "\t", "\r"];
  const firstChar = str.charAt(0);

  if (DANGEROUS_PREFIXES.includes(firstChar)) {
    // Prepending a single quote ensures Google Sheets and Excel treat the cell value strictly as text literal.
    return `'${str}`;
  }

  return str;
}

/**
 * Sanitizes an object of key-value pairs before writing to a spreadsheet row.
 */
export function sanitizeRowData<T extends Record<string, unknown>>(data: T): Record<string, string> {
  const sanitized: Record<string, string> = {};
  for (const [key, val] of Object.entries(data)) {
    if (Array.isArray(val)) {
      sanitized[key] = sanitizeSpreadsheetCell(val.join(", "));
    } else if (typeof val === "object" && val !== null) {
      sanitized[key] = sanitizeSpreadsheetCell(JSON.stringify(val));
    } else {
      sanitized[key] = sanitizeSpreadsheetCell(val as string | number | boolean | null | undefined);
    }
  }
  return sanitized;
}
