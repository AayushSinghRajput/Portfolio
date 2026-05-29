import { useState } from "react";
import { Send, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { contactInfo, ContactSocialLinks } from "../assets/assets";
import { submitContactForm, ContactFormData } from "../api/contact";

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitContactForm(formData);

    if (!result.success) {
      toast({
        title: "Failed to send message",
        description: result.errorMessage,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Open to full-time roles, freelance projects, and collaborations.
              Let's build something great together.
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <div className="fade-in-up stagger-1">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6">Send me a message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-primary hover:scale-105 transition-transform"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Right Column - Contact Info */}
            <div className="space-y-8 fade-in-up stagger-2">
              {/* Contact Information */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon
                        size={20}
                        className="text-primary-foreground"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {info.title}
                      </h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="glass-card p-6">
                <h4 className="font-semibold mb-4">Follow me on</h4>
                <div className="flex space-x-4">
                  {ContactSocialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg glass-card hover:scale-110 transition-transform ${social.color}`}
                      aria-label={social.name}
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Resume Download */}
              <div className="glass-card p-6">
                <h4 className="font-semibold mb-4">Resume</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Download my resume to learn more about my experience and
                  skills.
                </p>
                <Button
                  variant="outline"
                  className="w-full hover:scale-105 transition-transform"
                  asChild
                >
                  <a href="/resume.pdf" download>
                    <Download size={18} className="mr-2" />
                    Download Resume
                  </a>
                </Button>
              </div>

              {/* Availability Status */}
              <div className="glass-card p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <h4 className="font-semibold text-success">
                    Available for work
                  </h4>
                </div>
                <p className="text-muted-foreground text-sm">
                  Currently open to full-time roles, freelance projects, and
                  collaborations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
