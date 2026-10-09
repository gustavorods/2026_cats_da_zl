export const FAVORITES_KEY = "cats-da-zl:favorites:v1";
export function parseFavorites(raw: string | null): string[] {
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed)
      ? [...new Set(parsed.filter((v): v is string => typeof v === "string"))]
      : [];
  } catch {
    return [];
  }
}
