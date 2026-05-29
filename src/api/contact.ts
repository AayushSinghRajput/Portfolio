const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/contact"
    : "https://portfolio-backend-jax3.onrender.com/api/contact";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactApiResult {
  success: boolean;
  errorMessage?: string;
}

export const submitContactForm = async (
  formData: ContactFormData
): Promise<ContactApiResult> => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        errorMessage: data?.error || "Something went wrong. Please try again later.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Submit error:", err);
    return {
      success: false,
      errorMessage: "Couldn't send the message. Please check your connection and try again.",
    };
  }
};