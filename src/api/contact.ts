const API_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000/api/contact"
    : "https://portfolio-backend-yn3w.onrender.com/api/contact";

export interface ContactFormData {
  name?: string;
  email?: string;
  message?: string;
  honeypot?: string;
}

export interface ContactApiResult {
  success: boolean;
  errorMessage?: string;
}

export const submitContactForm = async (
  formData: ContactFormData
): Promise<ContactApiResult> => {
  // Honeypot spam defense: if bot filled hidden field, return success immediately
  if (formData.honeypot && formData.honeypot.trim().length > 0) {
    return { success: true };
  }

  const name = (formData.name || "").trim();
  const email = (formData.email || "").trim();
  const message = (formData.message || "").trim();

  if (!name || !email || !message) {
    return {
      success: false,
      errorMessage: "Name, email, and message are required fields.",
    };
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 429) {
        return {
          success: false,
          errorMessage: data?.message || "Rate limit reached (5 requests / 15 mins). Please try again shortly.",
        };
      }
      return {
        success: false,
        errorMessage: data?.error || data?.message || "Something went wrong. Please try again later.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Submit error:", err);
    return {
      success: false,
      errorMessage: "Couldn't reach the server. Please check your network connection or email directly at aayushsinghrajput2002@gmail.com.",
    };
  }
};