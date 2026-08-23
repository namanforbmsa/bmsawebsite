import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads", "team");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create services uploads directory
const servicesUploadsDir = path.join(__dirname, "uploads", "services");
if (!fs.existsSync(servicesUploadsDir)) {
  fs.mkdirSync(servicesUploadsDir, { recursive: true });
}

// Create data directory for JSON storage
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Services JSON file path
const servicesFilePath = path.join(dataDir, "services.json");

// Default services data
const DEFAULT_SERVICES = [
  {
    id: "1",
    name: "Voyage Operations",
    slug: "voyage-operations",
    description: "End-to-end voyage management including routing optimization, crew coordination, real-time vessel tracking.",
    shortDescription: "End-to-end voyage management including routing optimization, crew coordination, real-time vessel tracking.",
    icon: "Ship",
    link: "/services/voyage-operations",
    subServices: [
      {
        id: "vo-1",
        name: "Time Chartered In / Time Chartered Out",
        price: 50,
        unit: "Per Day",
        features: [
          "Execution of fixture from the day of fixing till final settlement",
          "Route planning & performance monitoring",
          "Bunker planning (if needed)",
          "Cargo optimization",
          "Account management"
        ]
      },
      {
        id: "vo-2",
        name: "Time Chartered In Voyage Out",
        price: 75,
        unit: "Per Day",
        features: [
          "Complete voyage planning and execution",
          "Bunker optimization",
          "Port coordination",
          "Freight and demurrage handling"
        ]
      }
    ],
    termsAndConditions: [],
    whyChoose: [
      { id: "wc-1", title: "Expert Management", description: "Our team of experienced maritime professionals handles every aspect of your voyage, ensuring optimal performance." },
      { id: "wc-2", title: "Cost Efficiency", description: "We have past records showing saving over Million Dollars by optimizing voyages/efficiently handling the issues before it become loss." },
      { id: "wc-3", title: "Real-Time Monitoring", description: "Our team ensures 24x7 availability, so you can utilise our services for any time zone." },
      { id: "wc-4", title: "Regulatory Compliance", description: "Ensure all operations meet international maritime regulations and standards." }
    ],
    howItWorks: [
      { id: "hw-1", title: "Initial Consultation", description: "We discuss your specific needs and goals to tailor our services to your requirements." },
      { id: "hw-2", title: "Voyage Planning", description: "Our experts develop a comprehensive plan covering every aspect of the voyage." },
      { id: "hw-3", title: "Execution and Monitoring", description: "We oversee the entire voyage, providing real-time updates and addressing any issues promptly." },
      { id: "hw-4", title: "Reporting and Analysis", description: "After completion, receive detailed reports and analysis to continuously improve operations." }
    ],
    servicesInclude: [
      { id: "si-1", title: "Route Planning", description: "Optimized routes for fuel efficiency and timely arrivals." },
      { id: "si-2", title: "Port Coordination", description: "Seamless coordination with ports for smooth docking and cargo handling." },
      { id: "si-3", title: "Weather Routing", description: "Advanced weather forecasting to avoid delays and ensure safety." },
      { id: "si-4", title: "Fuel Management", description: "Strategies to minimize fuel consumption and costs." },
      { id: "si-5", title: "Cargo Handling", description: "Efficient loading and unloading processes to reduce turnaround time." },
      { id: "si-6", title: "Compliance Management", description: "Ensuring adherence to all maritime regulations and environmental standards." }
    ]
  },
  {
    id: "2",
    name: "Laytime & Demurrage",
    slug: "laytime-demurrage",
    description: "Precise calculation and documentation of laytime, demurrage, and despatch to protect your commercial interests.",
    shortDescription: "Precise calculation and documentation of laytime, demurrage, and despatch to protect your commercial interests.",
    icon: "Clock",
    link: "/services/laytime-demurrage",
    subServices: [
      { id: "ld-1", name: "Advance Laytime Preparation", price: 100, unit: "Per Port", features: ["Including Basic Laytime Preparation", "Negotiation of Laytime with counter party", "Settling any legal related matter with counter party"] },
      { id: "ld-2", name: "Basic Laytime", price: 20, unit: "Per Port", features: ["Standard laytime calculation", "Demurrage/Despatch calculation", "Documentation preparation"] }
    ],
    termsAndConditions: ["The service charge as mentioned is basis per port basis per laytime.", "BMSA will prepare laytime basis the documents uploaded.", "This service is only limited to calculation & presentation."],
    whyChoose: [],
    howItWorks: [],
    servicesInclude: []
  },
  {
    id: "3",
    name: "Charter Party Review",
    slug: "charter-party-review",
    description: "Expert analysis of charter party agreements ensuring favorable terms and risk mitigation strategies.",
    shortDescription: "Expert analysis of charter party agreements ensuring favorable terms and risk mitigation strategies.",
    icon: "FileCheck",
    link: "/services/charter-party-review",
    subServices: [],
    termsAndConditions: [],
    whyChoose: [],
    howItWorks: [],
    servicesInclude: []
  },
  {
    id: "4",
    name: "Hold Cleaning & Guidance",
    slug: "hold-cleaning-guidance",
    description: "Professional guidance on cargo hold preparation meeting the highest industry cleanliness standards.",
    shortDescription: "Professional guidance on cargo hold preparation meeting the highest industry cleanliness standards.",
    icon: "Warehouse",
    link: "/services/hold-cleaning-guidance",
    subServices: [],
    termsAndConditions: [],
    whyChoose: [],
    howItWorks: [],
    servicesInclude: []
  },
  {
    id: "5",
    name: "Ship Brokerage",
    slug: "ship-brokerage",
    description: "Connecting ship owners with charterers through our extensive global network of maritime contacts.",
    shortDescription: "Connecting ship owners with charterers through our extensive global network of maritime contacts.",
    icon: "Handshake",
    link: "/services/ship-brokerage",
    subServices: [],
    termsAndConditions: [],
    whyChoose: [],
    howItWorks: [],
    servicesInclude: []
  },
  {
    id: "6",
    name: "Rice Detention & Calculation",
    slug: "rice-detention-calculation",
    description: "Specialist rice detention assessment and precise cargo calculation services for accurate grain handling.",
    shortDescription: "Specialist rice detention assessment and precise cargo calculation services for accurate grain handling.",
    icon: "Calculator",
    link: "/services/rice-detention-calculation",
    subServices: [],
    termsAndConditions: [],
    whyChoose: [],
    howItWorks: [],
    servicesInclude: []
  },
  {
    id: "7",
    name: "Portcaptain",
    slug: "portcaptain",
    description: "Professional vessel attendance, crew changes, supplies coordination, and ship-shore liaison services.",
    shortDescription: "Professional vessel attendance, crew changes, supplies coordination, and ship-shore liaison services.",
    icon: "Truck",
    link: "/services/portcaptain",
    subServices: [],
    termsAndConditions: [],
    whyChoose: [],
    howItWorks: [],
    servicesInclude: []
  }
];

// Initialize services file if it doesn't exist
if (!fs.existsSync(servicesFilePath)) {
  fs.writeFileSync(servicesFilePath, JSON.stringify(DEFAULT_SERVICES, null, 2));
  console.log("✓ Created default services.json");
} else {
  // Verify the file has valid data, if not, reinitialize with defaults
  try {
    const currentServices = fs.readFileSync(servicesFilePath, "utf-8");
    const parsed = JSON.parse(currentServices);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      fs.writeFileSync(servicesFilePath, JSON.stringify(DEFAULT_SERVICES, null, 2));
      console.log("✓ Reinitialized services.json with defaults (was empty or invalid)");
    }
  } catch (error) {
    console.log("✓ Reinitialized services.json with defaults (file was corrupted)");
    fs.writeFileSync(servicesFilePath, JSON.stringify(DEFAULT_SERVICES, null, 2));
  }
}

// Helper functions for services
const getServices = () => {
  try {
    const data = fs.readFileSync(servicesFilePath, "utf-8");
    const services = JSON.parse(data);
    console.log(`Loaded ${services.length} services from file`);
    return services;
  } catch (error) {
    console.error("Error reading services:", error);
    console.log(`Returning ${DEFAULT_SERVICES.length} default services`);
    return DEFAULT_SERVICES;
  }
};

const saveServices = (services) => {
  try {
    fs.writeFileSync(servicesFilePath, JSON.stringify(services, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving services:", error);
    return false;
  }
};

// Configure multer for file uploads (buffer in memory for storage adapters)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    // Only allow images
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
});

const serviceUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
});

const app = express();
app.set("trust proxy", 1);
const PORT = Number(process.env.PORT || 5001);
const isProduction = process.env.NODE_ENV === "production";
const storageProvider = (process.env.STORAGE_PROVIDER || (isProduction ? "r2" : "local")).toLowerCase();

const R2_ACCOUNT_ID = (process.env.R2_ACCOUNT_ID || "").trim();
const R2_ACCESS_KEY_ID = (process.env.R2_ACCESS_KEY_ID || "").trim();
const R2_SECRET_ACCESS_KEY = (process.env.R2_SECRET_ACCESS_KEY || "").trim();
const R2_BUCKET_NAME = (process.env.R2_BUCKET_NAME || "").trim();
const R2_PUBLIC_BASE_URL = (process.env.R2_PUBLIC_BASE_URL || "").trim().replace(/\/$/, "");

const isR2Configured =
  Boolean(R2_ACCOUNT_ID) &&
  Boolean(R2_ACCESS_KEY_ID) &&
  Boolean(R2_SECRET_ACCESS_KEY) &&
  Boolean(R2_BUCKET_NAME) &&
  Boolean(R2_PUBLIC_BASE_URL);

if (storageProvider === "r2" && !isR2Configured) {
  const message = "R2 storage selected but one or more R2 env vars are missing.";
  if (isProduction) {
    console.error(message);
    process.exit(1);
  }
  console.warn(`${message} Falling back to local file storage in development.`);
}

const useR2Storage = storageProvider === "r2" && isR2Configured;

const r2Client = useR2Storage
  ? new S3Client({
      region: "auto",
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    })
  : null;

const sanitizeExtension = (originalname) => {
  const ext = path.extname(originalname || "").toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)) {
    return ext;
  }
  return ".bin";
};

const buildAssetKey = (folder, originalname) => {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  return `${folder}/${uniqueSuffix}${sanitizeExtension(originalname)}`;
};

const getAssetUrl = (assetKey) => {
  if (useR2Storage) {
    return `${R2_PUBLIC_BASE_URL}/${assetKey}`;
  }
  return `/${assetKey}`;
};

const saveUploadedAsset = async (file, folder) => {
  const assetKey = buildAssetKey(folder, file.originalname);

  if (useR2Storage) {
    await r2Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: assetKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );
    return { assetKey, assetUrl: getAssetUrl(assetKey) };
  }

  const destinationPath = path.join(__dirname, assetKey);
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.writeFileSync(destinationPath, file.buffer);
  return { assetKey, assetUrl: getAssetUrl(assetKey) };
};

const resolveAssetKeyFromInput = (asset) => {
  if (!asset || typeof asset !== "string") {
    return null;
  }

  const trimmed = asset.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("uploads/")) {
    return trimmed;
  }

  if (trimmed.startsWith("/uploads/")) {
    return trimmed.slice(1);
  }

  if (R2_PUBLIC_BASE_URL && trimmed.startsWith(`${R2_PUBLIC_BASE_URL}/`)) {
    return trimmed.slice(`${R2_PUBLIC_BASE_URL}/`.length);
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const parsed = new URL(trimmed);
      if (parsed.pathname.startsWith("/uploads/")) {
        return parsed.pathname.slice(1);
      }
    } catch {
      return null;
    }
  }

  return null;
};

const deleteAssetByKey = async (assetKey) => {
  if (!assetKey) {
    return false;
  }

  if (useR2Storage) {
    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: assetKey,
      })
    );
    return true;
  }

  const filePath = path.join(__dirname, assetKey);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }

  return false;
};

const normalizeAllowedOrigins = () => {
  const configured = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (!configured.length) {
    return isProduction ? [] : ["http://localhost:8080", "http://127.0.0.1:8080"];
  }

  return configured;
};

const allowedOrigins = normalizeAllowedOrigins();

const JWT_SECRET = process.env.JWT_SECRET || (isProduction ? undefined : "dev-secret-change-me");
if (!process.env.JWT_SECRET && isProduction) {
  console.error("JWT_SECRET is required in production mode.");
  process.exit(1);
} else if (!process.env.JWT_SECRET) {
  console.warn("⚠️  Using a development-only JWT secret. Set JWT_SECRET in production.");
}

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || (isProduction ? undefined : bcrypt.hashSync("admin123", 10));

if (!process.env.ADMIN_PASSWORD_HASH && isProduction) {
  console.error("ADMIN_PASSWORD_HASH is required in production mode.");
  process.exit(1);
} else if (!process.env.ADMIN_PASSWORD_HASH) {
  console.warn("⚠️  Using a development-only admin password. Set ADMIN_PASSWORD_HASH in production.");
}

const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_TO"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length) {
  console.warn(
    `Contact backend missing env vars: ${missingEnv.join(", ")}. Email sending will fail until configured.`
  );
}

app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (!allowedOrigins.length || allowedOrigins.includes("*")) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Please try again later." },
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many contact submissions. Please try again later." },
});

app.use("/api/admin/login", loginLimiter);
app.use("/api/contact", contactLimiter);

// Serve uploaded files statically with CORS support for frontend origins
app.use("/uploads", (req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

// Upload team photo endpoint (protected)
app.post("/api/upload/team-photo", verifyToken, upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { assetKey, assetUrl } = await saveUploadedAsset(req.file, "uploads/team");
    const filename = assetKey.split("/").pop();
    res.json({ 
      success: true, 
      photoUrl: assetUrl,
      filename,
      assetKey
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// Delete team photo endpoint (protected)
app.delete("/api/upload/team-photo", verifyToken, async (req, res) => {
  try {
    const rawKey = String(req.query.key || "");
    const assetKey = resolveAssetKeyFromInput(rawKey);

    if (!assetKey || !assetKey.startsWith("uploads/team/")) {
      return res.status(400).json({ error: "A valid team photo key is required." });
    }

    const deleted = await deleteAssetByKey(assetKey);
    if (deleted || useR2Storage) {
      res.json({ success: true, message: "Photo deleted" });
    } else {
      res.status(404).json({ error: "File not found" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete file" });
  }
});

// Upload service image endpoint (protected)
app.post("/api/upload/service-image", verifyToken, serviceUpload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { assetKey, assetUrl } = await saveUploadedAsset(req.file, "uploads/services");
    const filename = assetKey.split("/").pop();
    res.json({ 
      success: true, 
      imageUrl: assetUrl,
      filename,
      assetKey
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// Delete service image endpoint (protected)
app.delete("/api/upload/service-image", verifyToken, async (req, res) => {
  try {
    const rawKey = String(req.query.key || "");
    const assetKey = resolveAssetKeyFromInput(rawKey);

    if (!assetKey || !assetKey.startsWith("uploads/services/")) {
      return res.status(400).json({ error: "A valid service image key is required." });
    }

    const deleted = await deleteAssetByKey(assetKey);
    if (deleted || useR2Storage) {
      res.json({ success: true, message: "Image deleted" });
    } else {
      res.status(404).json({ error: "File not found" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete file" });
  }
});

// Admin login endpoint
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    // Check username
    if (username !== ADMIN_USERNAME) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate JWT token (expires in 8 hours)
    const token = jwt.sign(
      { username, role: "admin" },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ 
      success: true, 
      token,
      expiresIn: "8h"
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

// Verify token endpoint (for frontend to check if token is still valid)
app.get("/api/admin/verify", verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// ============ SERVICES API ENDPOINTS ============

// Get all services (public)
app.get("/api/services", (req, res) => {
  try {
    const services = getServices();
    console.log(`API /api/services - Returning ${services.length} services to client`);
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// Get single service by slug (public)
app.get("/api/services/:slug", (req, res) => {
  try {
    const services = getServices();
    const requestedSlug = req.params.slug;
    console.log(`API /api/services/${requestedSlug} - Looking for service`);
    const service = services.find(s => s.slug === requestedSlug);
    if (service) {
      console.log(`API /api/services/${requestedSlug} - Found, returning service`);
      res.json(service);
    } else {
      console.log(`API /api/services/${requestedSlug} - Not found`);
      res.status(404).json({ error: "Service not found" });
    }
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ error: "Failed to fetch service" });
  }
});

// Save all services (protected - replaces entire array)
app.put("/api/services", verifyToken, (req, res) => {
  try {
    const services = req.body;
    if (!Array.isArray(services)) {
      return res.status(400).json({ error: "Services must be an array" });
    }
    
    if (saveServices(services)) {
      res.json({ success: true, message: "Services saved successfully", count: services.length });
    } else {
      res.status(500).json({ error: "Failed to save services" });
    }
  } catch (error) {
    console.error("Error saving services:", error);
    res.status(500).json({ error: "Failed to save services" });
  }
});

// Add a new service (protected)
app.post("/api/services", verifyToken, (req, res) => {
  try {
    const newService = req.body;
    if (!newService.name || !newService.slug) {
      return res.status(400).json({ error: "Name and slug are required" });
    }
    
    const services = getServices();
    
    // Check if slug already exists
    if (services.find(s => s.slug === newService.slug)) {
      return res.status(400).json({ error: "Service with this slug already exists" });
    }
    
    // Add default fields if not present
    const serviceToAdd = {
      id: newService.id || Date.now().toString(),
      name: newService.name,
      slug: newService.slug,
      description: newService.description || "",
      shortDescription: newService.shortDescription || "",
      icon: newService.icon || "Ship",
      image: newService.image,
      link: newService.link || `/services/${newService.slug}`,
      subServices: newService.subServices || [],
      termsAndConditions: newService.termsAndConditions || [],
      whyChoose: newService.whyChoose || [],
      howItWorks: newService.howItWorks || [],
      servicesInclude: newService.servicesInclude || [],
    };
    
    services.push(serviceToAdd);
    
    if (saveServices(services)) {
      res.json({ success: true, service: serviceToAdd });
    } else {
      res.status(500).json({ error: "Failed to add service" });
    }
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ error: "Failed to add service" });
  }
});

// Update a service (protected)
app.put("/api/services/:id", verifyToken, (req, res) => {
  try {
    const serviceId = req.params.id;
    const updatedService = req.body;
    
    const services = getServices();
    const index = services.findIndex(s => s.id === serviceId);
    
    if (index === -1) {
      return res.status(404).json({ error: "Service not found" });
    }
    
    services[index] = { ...services[index], ...updatedService };
    
    if (saveServices(services)) {
      res.json({ success: true, service: services[index] });
    } else {
      res.status(500).json({ error: "Failed to update service" });
    }
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
});

// Delete a service (protected)
app.delete("/api/services/:id", verifyToken, (req, res) => {
  try {
    const serviceId = req.params.id;
    const services = getServices();
    const filteredServices = services.filter(s => s.id !== serviceId);
    
    if (filteredServices.length === services.length) {
      return res.status(404).json({ error: "Service not found" });
    }
    
    if (saveServices(filteredServices)) {
      res.json({ success: true, message: "Service deleted" });
    } else {
      res.status(500).json({ error: "Failed to delete service" });
    }
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Failed to delete service" });
  }
});

// ============ END SERVICES API ============

// ============ SETTINGS API ============
// Settings JSON file path
const settingsFilePath = path.join(dataDir, "settings.json");

// Default settings
const DEFAULT_SETTINGS = {
  fleetStats: {
    currentFleet: 23,
    totalVessels: 610,
    totalVoyages: 1012,
  },
  policies: {
    terms: "Welcome to BMSA...",
    privacy: "At BMSA, we are committed...",
    turnAround: "Turn Around Time Policy...",
    returnRefund: "Return & Refund Policy...",
    contact: "Contact Us Policy...",
  },
  copyrightYear: new Date().getFullYear(),
  teamMembers: [],
};

// Initialize settings file if it doesn't exist
if (!fs.existsSync(settingsFilePath)) {
  fs.writeFileSync(settingsFilePath, JSON.stringify(DEFAULT_SETTINGS, null, 2));
  console.log("✓ Created default settings.json");
} else {
  // Verify the file has valid data
  try {
    const currentSettings = fs.readFileSync(settingsFilePath, "utf-8");
    JSON.parse(currentSettings);
  } catch (error) {
    console.log("✓ Reinitialized settings.json with defaults (file was corrupted)");
    fs.writeFileSync(settingsFilePath, JSON.stringify(DEFAULT_SETTINGS, null, 2));
  }
}

const normalizeTeamMemberPhoto = (photo) => {
  if (!photo || typeof photo !== 'string') return photo;
  if (photo.startsWith('/uploads/')) return photo;

  try {
    const url = new URL(photo);
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '0.0.0.0') {
      return url.pathname || photo;
    }
  } catch {
    // not a valid URL; leave as-is
  }

  if (photo.includes('localhost:5001') || photo.includes('127.0.0.1:5001')) {
    return photo.replace(/https?:\/\/localhost(:5001)?|https?:\/\/127\.0\.0\.1(:5001)?/i, '');
  }

  return photo;
};

// Helper function to read settings
const readSettings = () => {
  try {
    if (fs.existsSync(settingsFilePath)) {
      const data = fs.readFileSync(settingsFilePath, "utf8");
      const parsed = JSON.parse(data);
      if (parsed.teamMembers && Array.isArray(parsed.teamMembers)) {
        parsed.teamMembers = parsed.teamMembers.map((member) => ({
          ...member,
          photo: normalizeTeamMemberPhoto(member.photo),
        }));
      }
      return parsed;
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Error reading settings:", error);
    return DEFAULT_SETTINGS;
  }
};

// Helper function to write settings
const writeSettings = (data) => {
  try {
    fs.writeFileSync(settingsFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing settings:", error);
    return false;
  }
};

// Helper function to convert relative photo URLs to absolute
const convertPhotoUrlsToAbsolute = (teamMembers, protocol, host) => {
  return teamMembers.map(member => {
    if (member.photo && typeof member.photo === 'string') {
      if (member.photo.startsWith('data:')) {
        return member;
      }

      const normalizedValue = member.photo
        .replace(/https?:\/\/localhost(:\d+)?/gi, '')
        .replace(/https?:\/\/127\.0\.0\.1(:\d+)?/gi, '')
        .replace(/^\/+uploads\//, '/uploads/');

      if (normalizedValue.startsWith('/uploads/')) {
        return {
          ...member,
          photo: normalizedValue,
        };
      }

      if (member.photo.startsWith('/uploads/')) {
        return {
          ...member,
          photo: member.photo,
        };
      }
    }
    return member;
  });
};

// GET all settings
app.get("/api/settings", (req, res) => {
  try {
    const settings = readSettings();
    const protocol = req.protocol || 'http';
    const host = req.get('host');
    
    // Convert team member photo URLs to absolute
    if (settings.teamMembers && Array.isArray(settings.teamMembers)) {
      settings.teamMembers = convertPhotoUrlsToAbsolute(settings.teamMembers, protocol, host);
    }
    
    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

// GET specific setting section
app.get("/api/settings/:section", (req, res) => {
  try {
    const { section } = req.params;
    const settings = readSettings();
    
    if (section in settings) {
      let sectionData = { [section]: settings[section] };
      
      // Convert team member photo URLs to absolute if requesting teamMembers
      if (section === 'teamMembers' && Array.isArray(settings.teamMembers)) {
        const protocol = req.protocol || 'http';
        const host = req.get('host');
        sectionData.teamMembers = convertPhotoUrlsToAbsolute(settings.teamMembers, protocol, host);
      }
      
      res.json(sectionData);
    } else {
      res.status(404).json({ error: `Settings section '${section}' not found` });
    }
  } catch (error) {
    console.error("Error fetching settings section:", error);
    res.status(500).json({ error: "Failed to fetch settings section" });
  }
});

// POST/UPDATE settings (admin only)
app.post("/api/settings", verifyToken, (req, res) => {
  try {
    const { fleetStats, policies, copyrightYear, teamMembers } = req.body;
    const settings = readSettings();

    // Update only provided fields
    if (fleetStats) settings.fleetStats = fleetStats;
    if (policies) settings.policies = policies;
    if (copyrightYear !== undefined) settings.copyrightYear = copyrightYear;
    if (teamMembers) {
      settings.teamMembers = teamMembers.map((member) => ({
        ...member,
        photo: normalizeTeamMemberPhoto(member.photo),
      }));
    }

    const success = writeSettings(settings);
    if (success) {
      res.json({ success: true, message: "Settings updated successfully", settings });
    } else {
      res.status(500).json({ error: "Failed to save settings" });
    }
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ error: "Failed to update settings" });
  }
});

// POST/UPDATE fleet stats
app.post("/api/settings/fleet-stats", verifyToken, (req, res) => {
  try {
    const { currentFleet, totalVessels, totalVoyages } = req.body;
    const settings = readSettings();
    
    settings.fleetStats = {
      currentFleet,
      totalVessels,
      totalVoyages,
    };

    const success = writeSettings(settings);
    if (success) {
      res.json({ success: true, message: "Fleet stats updated", fleetStats: settings.fleetStats });
    } else {
      res.status(500).json({ error: "Failed to save fleet stats" });
    }
  } catch (error) {
    console.error("Error updating fleet stats:", error);
    res.status(500).json({ error: "Failed to update fleet stats" });
  }
});

// POST/UPDATE policies
app.post("/api/settings/policies", verifyToken, (req, res) => {
  try {
    const { terms, privacy, turnAround, returnRefund, contact } = req.body;
    const settings = readSettings();
    
    settings.policies = {
      terms,
      privacy,
      turnAround,
      returnRefund,
      contact,
    };

    const success = writeSettings(settings);
    if (success) {
      res.json({ success: true, message: "Policies updated", policies: settings.policies });
    } else {
      res.status(500).json({ error: "Failed to save policies" });
    }
  } catch (error) {
    console.error("Error updating policies:", error);
    res.status(500).json({ error: "Failed to update policies" });
  }
});

// POST/UPDATE copyright year
app.post("/api/settings/copyright-year", verifyToken, (req, res) => {
  try {
    const { copyrightYear } = req.body;
    const settings = readSettings();
    
    settings.copyrightYear = copyrightYear;

    const success = writeSettings(settings);
    if (success) {
      res.json({ success: true, message: "Copyright year updated", copyrightYear: settings.copyrightYear });
    } else {
      res.status(500).json({ error: "Failed to save copyright year" });
    }
  } catch (error) {
    console.error("Error updating copyright year:", error);
    res.status(500).json({ error: "Failed to update copyright year" });
  }
});

// POST/UPDATE team members
app.post("/api/settings/team-members", verifyToken, (req, res) => {
  try {
    const { teamMembers } = req.body;
    const settings = readSettings();
    
    settings.teamMembers = teamMembers;

    const success = writeSettings(settings);
    if (success) {
      res.json({ success: true, message: "Team members updated", teamMembers: settings.teamMembers });
    } else {
      res.status(500).json({ error: "Failed to save team members" });
    }
  } catch (error) {
    console.error("Error updating team members:", error);
    res.status(500).json({ error: "Failed to update team members" });
  }
});

// ============ END SETTINGS API ============

app.post("/api/contact", async (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const phone = String(req.body?.phone || "").trim();
  const service = String(req.body?.service || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Name, email, and message are required fields." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const to = process.env.MAIL_TO;
    const from = process.env.MAIL_FROM || process.env.SMTP_USER;

    if (!to) {
      return res.status(500).json({ error: "MAIL_TO is not configured on the server." });
    }

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      service ? `Service: ${service}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      ${service ? `<p><strong>Service:</strong> ${service}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `;

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `New contact request from ${name}`,
      text,
      html,
    });

    res.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const isSmtpAuthError = /535|Username and Password not accepted|Invalid login|authentication/i.test(errorMessage);

    console.error("Error sending contact email", errorMessage);

    if (isSmtpAuthError) {
      return res.status(500).json({
        error: "SMTP authentication failed. Please verify the mail credentials and use a valid Gmail App Password if required.",
      });
    }

    res.status(500).json({ error: "Failed to send your message. Please try again later." });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Contact backend listening on port ${PORT} (accessible on all network interfaces)`);
});
