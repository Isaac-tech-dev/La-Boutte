import { ErrorResponse } from "../redux/types/auth";

/**
 * Turns anything thrown or returned by supabase-js (AuthError, PostgrestError,
 * network errors) into the ErrorResponse shape the screens already handle.
 */
export function toErrorResponse(
  error: unknown,
  fallback = "Something went wrong, please try again"
): ErrorResponse {
  let message = fallback;
  let status = 500;

  if (error && typeof error === "object") {
    const e = error as { message?: unknown; status?: unknown; code?: unknown };
    if (typeof e.message === "string" && e.message.trim()) message = e.message;
    if (typeof e.status === "number") status = e.status;
    if (e.message === "Network request failed" || e.message === "Failed to fetch") {
      message = "Network error. Check your internet connection.";
      status = 0;
    }
  } else if (typeof error === "string" && error.trim()) {
    message = error;
  }

  return {
    success: false,
    status_code: status,
    message,
    data: [],
    errorCode: undefined,
  };
}
