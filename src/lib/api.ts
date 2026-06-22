export const API_BASE_URL = "https://real-estate-backend-delta.vercel.app/api";
export const API_BASE_IMAGE_URL = "https://real-estate-backend-delta.vercel.app";

//https://real-estate-backend-delta.vercel.app/
// export const API_BASE_URL = "http://localhost:3001/api";
// export const API_BASE_IMAGE_URL = "http://localhost:3001";
// export const API_BASE_URL = "https://enproperties-crm.onrender.com/api";
// export const API_BASE_IMAGE_URL = "https://enproperties-crm.onrender.com";

// export const API_BASE_URL = "https://api.enproperties.ae/api";
// export const API_BASE_IMAGE_URL = "https://api.enproperties.ae";

// Returns an Authorization header (or an empty object) built from the
// token saved at login. Spread this into fetch/axios headers for any
// request that hits a protected admin/agent endpoint.
export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Builds a full URL for an uploaded file (property image, agent photo,
// QR code, etc.). New uploads are stored in Cloudflare R2 and come back
// from the backend as already-absolute URLs (e.g.
// "https://pub-xxxx.r2.dev/uploads/169....png") — those are returned as-is.
// Any older/legacy value that's still a bare relative path like
// "uploads/169...png" (saved before the R2 migration) falls back to being
// joined onto API_BASE_IMAGE_URL with exactly one slash, same as before.
export const getImageUrl = (filePath?: string | null): string => {
  if (!filePath) return "";
  if (/^https?:\/\//i.test(filePath)) return filePath;
  const cleanPath = filePath.replace(/^\/+/, "");
  return `${API_BASE_IMAGE_URL}/${cleanPath}`;
};