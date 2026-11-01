import React, { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, ArrowUpRight, FileDown } from "lucide-react";
import { submitContactForm } from "@/api/contact";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000, "Message cannot exceed 3000 characters"),
  honeypot: z.string().optional(),
});

type FormValues = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormValues, string>>;

export const Contact: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error for field on change
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setStatusMessage("");

    // Validate client-side with Zod
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const fieldName = err.path[0] as keyof FormValues;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = err.message;
        }
      });
      setErrors(fieldErrors);
      setSubmitStatus("error");
      setStatusMessage("Please correct the errors in the form before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const apiResult = await submitContactForm({
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
        honeypot: result.data.honeypot,
      });

      if (apiResult.success) {
        setSubmitStatus("success");
        setStatusMessage("Thank you! Your message has been transmitted successfully. I will get back to you shortly.");
        setValues({ name: "", email: "", message: "", honeypot: "" });
      } else {
        setSubmitStatus("error");
        setStatusMessage(apiResult.errorMessage || "Submission failed. Please email directly at aayushsinghrajput2002@gmail.com.");
      }
    } catch {
      setSubmitStatus("error");
      setStatusMessage("An unexpected error occurred. Please reach out via email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DAD4C9]"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-16 pb-6 border-b border-[#DAD4C9]">
        <div>
          <span className="font-mono text-xs text-[#77746C] tracking-widest uppercase block mb-2">
            06 // DIRECT TRANSMISSION
          </span>
          <h2 className="text-h1 font-serif text-[#20201D]">
            Have an interesting idea? Let's build it.
          </h2>
        </div>
        <p className="max-w-md text-sm sm:text-base text-[#5E5B54] font-sans">
          Open to software engineering opportunities, AI integration projects, and technical collaborations.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Direct Coordinates & Contact Spec (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFFFFF] border border-[#DAD4C9] p-6 sm:p-8 rounded space-y-6">
            <span className="font-mono text-[10px] text-[#77746C] uppercase tracking-widest block">
              COORDINATES &amp; CHANNELS
            </span>

            <div className="space-y-4 font-mono text-xs text-[#5E5B54]">
              <div className="p-3 bg-[#F5F1E8] border border-[#DAD4C9] rounded flex items-center justify-between">
                <span className="text-[#77746C]">EMAIL:</span>
                <a
                  href="mailto:aayushsinghrajput2002@gmail.com"
                  className="text-[#20201D] hover:text-[#E65336] transition-colors font-medium truncate max-w-[200px]"
                >
                  aayushsinghrajput2002@gmail.com
                </a>
              </div>

              <div className="p-3 bg-[#F5F1E8] border border-[#DAD4C9] rounded flex items-center justify-between">
                <span className="text-[#77746C]">PHONE:</span>
                <a
                  href="tel:+9779805981168"
                  className="text-[#20201D] hover:text-[#E65336] transition-colors"
                >
                  +977 980-5981168
                </a>
              </div>

              <div className="p-3 bg-[#F5F1E8] border border-[#DAD4C9] rounded flex items-center justify-between">
                <span className="text-[#77746C]">LOCATION:</span>
                <span className="text-[#20201D]">Kathmandu, Nepal</span>
              </div>
            </div>

            {/* Social & Resume Links */}
            <div className="pt-4 border-t border-[#DAD4C9] space-y-3">
              <span className="font-mono text-[10px] text-[#77746C] uppercase tracking-widest block">
                PROFILES &amp; CREDENTIALS
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://github.com/AayushSinghRajput"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 font-mono text-xs bg-[#E9E3D8] hover:bg-[#20201D] hover:text-[#F5F1E8] border border-[#DAD4C9] rounded transition-colors inline-flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/aayush-kumar-singh-ce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 font-mono text-xs bg-[#E9E3D8] hover:bg-[#20201D] hover:text-[#F5F1E8] border border-[#DAD4C9] rounded transition-colors inline-flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 font-mono text-xs bg-[#20201D] text-[#F5F1E8] hover:bg-[#E65336] border border-[#20201D] rounded transition-colors inline-flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Resume PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Accessible Form Card (7 cols) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#DAD4C9] p-6 sm:p-8 rounded space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#DAD4C9]">
            <h3 className="font-serif text-2xl text-[#20201D]">
              Direct Transmission Form
            </h3>
            <span className="font-mono text-[10px] text-[#8A9367] uppercase">
              SECURE DISPATCH
            </span>
          </div>

          {/* Form Status Banners */}
          {submitStatus === "success" && (
            <div
              role="status"
              aria-live="polite"
              className="p-4 bg-[#8A9367]/15 border border-[#8A9367] rounded text-xs font-mono text-[#20201D] flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-[#8A9367] flex-shrink-0 mt-0.5" />
              <span>{statusMessage}</span>
            </div>
          )}

          {submitStatus === "error" && (
            <div
              role="alert"
              aria-live="assertive"
              className="p-4 bg-[#E65336]/10 border border-[#E65336] rounded text-xs font-mono text-[#20201D] flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-[#E65336] flex-shrink-0 mt-0.5" />
              <span>{statusMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Honeypot Spam Field (Hidden from real users, filled by bots) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website-field">Website</label>
              <input
                id="website-field"
                type="text"
                name="honeypot"
                value={values.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Name Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-name"
                className="block font-mono text-xs uppercase tracking-wider text-[#20201D]"
              >
                Full Name <span className="text-[#E65336]">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={values.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder="Aayush Singh"
                className={`w-full px-4 py-2.5 bg-[#F5F1E8] border text-sm text-[#20201D] rounded transition-colors focus:bg-[#FFFFFF] focus:outline-none focus:ring-1 ${
                  errors.name
                    ? "border-[#E65336] focus:ring-[#E65336]"
                    : "border-[#DAD4C9] focus:border-[#20201D] focus:ring-[#20201D]"
                }`}
              />
              {errors.name && (
                <p id="name-error" role="alert" className="text-xs font-mono text-[#E65336]">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className="block font-mono text-xs uppercase tracking-wider text-[#20201D]"
              >
                Email Address <span className="text-[#E65336]">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={values.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="aayush@example.com"
                className={`w-full px-4 py-2.5 bg-[#F5F1E8] border text-sm text-[#20201D] rounded transition-colors focus:bg-[#FFFFFF] focus:outline-none focus:ring-1 ${
                  errors.email
                    ? "border-[#E65336] focus:ring-[#E65336]"
                    : "border-[#DAD4C9] focus:border-[#20201D] focus:ring-[#20201D]"
                }`}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="text-xs font-mono text-[#E65336]">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-message"
                className="block font-mono text-xs uppercase tracking-wider text-[#20201D]"
              >
                Project Scope / Message <span className="text-[#E65336]">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={values.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="Tell me about your architectural objectives, technology stack, or collaboration..."
                className={`w-full px-4 py-2.5 bg-[#F5F1E8] border text-sm text-[#20201D] rounded transition-colors focus:bg-[#FFFFFF] focus:outline-none focus:ring-1 resize-y ${
                  errors.message
                    ? "border-[#E65336] focus:ring-[#E65336]"
                    : "border-[#DAD4C9] focus:border-[#20201D] focus:ring-[#20201D]"
                }`}
              />
              {errors.message && (
                <p id="message-error" role="alert" className="text-xs font-mono text-[#E65336]">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto arch-button-primary disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#FFFFFF] border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
