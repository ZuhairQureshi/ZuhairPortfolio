import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-c03c20df/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form submission endpoint
app.post("/make-server-c03c20df/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return c.json({ error: "All fields are required" }, 400);
    }

    // Store in key-value store
    const timestamp = Date.now();
    const contactId = `contact_${timestamp}_${Math.random().toString(36).substring(7)}`;
    
    await kv.set(contactId, {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Send email notification via SendGrid if API key is configured
    try {
      const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
      const SENDGRID_FROM = Deno.env.get("SENDGRID_FROM") || "no-reply@yourdomain.com";
      const SENDGRID_TO = Deno.env.get("SENDGRID_TO") || "zuhair.q01@gmail.com";

      if (SENDGRID_API_KEY) {
        const emailPayload = {
          personalizations: [
            {
              to: [{ email: SENDGRID_TO }],
              subject: `[Portfolio Contact] ${subject}`,
            },
          ],
          from: { email: SENDGRID_FROM, name: "Portfolio Contact" },
          content: [
            {
              type: "text/plain",
              value: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}\n\nID: ${contactId}\nTimestamp: ${new Date().toISOString()}`,
            },
          ],
        };

        const resp = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SENDGRID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailPayload),
        });

        if (!resp.ok) {
          console.error("SendGrid response error:", await resp.text());
        } else {
          console.log("SendGrid email sent for contact:", contactId);
        }
      } else {
        console.log("SENDGRID_API_KEY not configured; skipping email send.");
      }
    } catch (emailError) {
      console.error("Error sending contact email:", emailError);
    }
    console.log(`Contact form submission stored: ${contactId} from ${email}`);

    return c.json({ 
      success: true, 
      message: "Your message has been received. We'll get back to you soon!" 
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return c.json({ error: "Failed to submit contact form" }, 500);
  }
});

// Get all contact submissions (for admin use)
app.get("/make-server-c03c20df/contacts", async (c) => {
  try {
    const contacts = await kv.getByPrefix("contact_");
    return c.json({ contacts });
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    return c.json({ error: "Failed to retrieve contacts" }, 500);
  }
});

Deno.serve(app.fetch);