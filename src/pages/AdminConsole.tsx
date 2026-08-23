/**
 * Admin Console Page
 * 
 * Site owner dashboard to manage website content:
 * - Add/edit/delete services and sub-services
 * - Manage team members
 * - Edit page content
 * - Configure settings
 */

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, LogOut, Menu, X, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiEndpoints } from "@/config/api";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  linkedin: string;
  bio: string;
  photo?: string; // Base64 encoded image
}

interface SubService {
  id: string;
  name: string;
  price: number;
  unit: string; // e.g., "Per Port", "Per Voyage", "Per Day"
  features: string[]; // List of features/bullets
}

// Content item for rich text sections (Why Choose, How It Works, etc.)
interface ContentItem {
  id: string;
  title: string;
  description: string;
}

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string; // For service cards on homepage
  icon: string; // Icon name from lucide-react
  image?: string; // Service banner image URL
  link: string; // Link to service page
  subServices: SubService[];
  termsAndConditions?: string[]; // Service-specific terms
  // Rich content sections
  whyChoose?: ContentItem[]; // "Why Choose Our Service" section
  howItWorks?: ContentItem[]; // "How It Works" section  
  servicesInclude?: ContentItem[]; // "Our Services Include" section
}

const normalizeUploadedAssetUrl = (value?: string): string | undefined => {
  if (!value) return value;
  if (value.startsWith('data:')) return value;
  if (value.startsWith('/uploads/')) return value;

  if (value.startsWith('http://') || value.startsWith('https://')) {
    try {
      const url = new URL(value);
      if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
        return url.pathname;
      }
      return value;
    } catch {
      return value;
    }
  }

  return value;
};

const getAssetKeyFromUrl = (value?: string): string | null => {
  if (!value) return null;

  if (value.startsWith('/uploads/')) {
    return value.slice(1);
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    try {
      const parsed = new URL(value);
      if (parsed.pathname.startsWith('/uploads/')) {
        return parsed.pathname.slice(1);
      }
    } catch {
      return null;
    }
  }

  return null;
};

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Captain Ram Kumar",
    role: "Founder & Director",
    email: "ram@bmsagroup.net",
    linkedin: "https://www.linkedin.com/in/ram-kumar-5904665b/",
    bio: "A Master Mariner and visionary leader with 23+ years of maritime expertise, having managed over 1,000 voyages across dry bulk, tanker, and gas segments.",
  },
  {
    id: "2",
    name: "Durgesh Bathwal",
    role: "Senior Operation Manager",
    email: "durgesh@bmsagroup.com",
    linkedin: "https://www.linkedin.com/in/durgesh-bathwal-70a649249/",
    bio: "An expert Operations Manager with 13 years of combined sailing and shore based experience, specializing in vessel performance and strategic bunker planning.",
  },
  {
    id: "3",
    name: "Aditya Agrawal",
    role: "Chartering Manager",
    email: "aditya@bmsagroup.com",
    linkedin: "https://www.linkedin.com/in/aditya-agrawal-375996145/?",
    bio: "A dual-specialist in finance and computer science who leverages a commercial trader background to negotiate high volume cargo deals across global markets.",
  },
  {
    id: "4",
    name: "Kevin D'Costa",
    role: "Operation Manager",
    email: "kevin@bmsagroup.com",
    linkedin: "https://www.linkedin.com/in/kevin-dcosta",
    bio: "A seasoned Marine Officer focused on operational excellence, safety management systems, and the technical optimization of fleet performance.",
  },
  {
    id: "5",
    name: "Pankaj Prakash Patil",
    role: "Senior Claim Analyst",
    email: "pankaj@bmsagroup.com",
    linkedin: "https://www.linkedin.com/in/pankaj-patil-408ab228/",
    bio: "An MBA-qualified specialist with 16 years of experience in post fixture operations and advanced demurrage negotiations across major global charter parties.",
  },
  {
    id: "6",
    name: "Biswajit Malakar",
    role: "Claim Analyst",
    email: "biswajit@bmsagroup.com",
    linkedin: "https://www.linkedin.com/in/biswajit-malakar-8b1248275/",
    bio: "A BIMCO certified professional who blends a strong finance background with deep technical knowledge to resolve complex laytime and legal disputes.",
  },
];

const DEFAULT_SERVICES: Service[] = [
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
      {
        id: "ld-1",
        name: "Advance Laytime Preparation",
        price: 100,
        unit: "Per Port",
        features: [
          "Including Basic Laytime Preparation",
          "Negotiation of Laytime with counter party",
          "Settling any legal related matter with counter party"
        ]
      },
      {
        id: "ld-2",
        name: "Basic Laytime",
        price: 20,
        unit: "Per Port",
        features: [
          "Standard laytime calculation",
          "Demurrage/Despatch calculation",
          "Documentation preparation"
        ]
      }
    ],
    termsAndConditions: [
      "The service charge as mentioned is basis per port basis per laytime.",
      "BMSA will prepare laytime basis the documents uploaded.",
      "This service is only limited to calculation & presentation."
    ]
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
    termsAndConditions: []
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
    termsAndConditions: []
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
    termsAndConditions: []
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
    termsAndConditions: []
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
    termsAndConditions: []
  }
];

// Available icons for services
const AVAILABLE_ICONS = [
  "Ship", "Clock", "FileCheck", "Warehouse", "Calculator", "Handshake", "Truck", "MapPin",
  "Anchor", "Navigation", "Compass", "Package", "Box", "Container", "Briefcase", "FileText",
  "ClipboardList", "BarChart", "TrendingUp", "DollarSign", "CreditCard", "Receipt",
  "Users", "UserCheck", "Shield", "Award", "Star", "Globe", "Map", "Route"
];

const AdminConsole = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // Team management state - loaded from server only
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [newTeamMember, setNewTeamMember] = useState<Partial<TeamMember>>({});
  const [previousTeamMembers, setPreviousTeamMembers] = useState<TeamMember[] | null>(null);

  // Service management state - loaded from server
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesSaving, setServicesSaving] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({
    subServices: [],
    termsAndConditions: [],
    whyChoose: [],
    howItWorks: [],
    servicesInclude: []
  });
  const [previousServices, setPreviousServices] = useState<Service[] | null>(null);
  
  // Subservice management state
  const [editingSubService, setEditingSubService] = useState<SubService | null>(null);
  const [newSubService, setNewSubService] = useState<Partial<SubService>>({
    features: []
  });
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [serviceImageUploading, setServiceImageUploading] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [newTerm, setNewTerm] = useState("");
  
  // Content section management state
  const [newContentItem, setNewContentItem] = useState<{ title: string; description: string }>({ title: "", description: "" });
  const [activeContentSection, setActiveContentSection] = useState<'whyChoose' | 'howItWorks' | 'servicesInclude' | null>(null);

  // Fleet statistics state - loaded from server only
  const [fleetStats, setFleetStats] = useState({
    currentFleet: 0,
    totalVessels: 0,
    totalVoyages: 0,
  });

  // Policies state
  // Default policies content
  // Use *(text)* for bold formatting in policies
  const DEFAULT_POLICIES = {
    terms: `Welcome to BMSA. These Terms and Conditions outline the rules and regulations for using our online shipping services. By accessing or using our website and shipping services, you agree to comply with and be bound by these terms. If you do not agree, please discontinue using our services immediately.

*(ACCEPTANCE OF TERMS)*
By using our online shipping services, you agree to be legally bound by these Terms and Conditions, our Privacy Policy, and any other guidelines or rules applicable to specific services or features provided by BMSA. These terms may be updated from time to time, and it is your responsibility to review them regularly.

*(SERVICES WE PROVIDE)*
We offer a variety of shipping-related services, including but not limited to:
- Laytime Calculation Services
- Charter Party Reviews
- Hold Cleaning and Guidance
- Voyage Operation
- Port Captain
- Underwater Hull Inspection and Cleaning

*(USER ACCOUNT REGISTRATION)*
To use certain features of our online shipping services, you may be required to create an account. You agree to provide accurate and complete information during registration, keep your login credentials secure and confidential, and be responsible for all activities conducted under your account. BMSA reserves the right to suspend or terminate accounts for violations of these Terms or misuse of the service.

*(TERMINATION OF SERVICES)*
We reserve the right to terminate or suspend your access to our online shipping services if you violate these Terms, provide false information, or misuse our services. In the event of termination, any pending shipments may be canceled, and any fees paid for unused services will be refunded as applicable.

*(CHANGES TO TERMS AND SERVICES)*
BMSA reserves the right to modify or update these Terms and Conditions at any time. Any changes will be effective upon posting on our website. Your continued use of the service after such changes constitutes your acceptance of the revised Terms.

*(GOVERNING LAW)*
These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts in Mumbai High Court, Maharashtra, India.

For questions, please contact us.`,
            privacy: `At BMSA, we are committed to protecting the privacy and security of our users' personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our online shipping services. By using our services, you agree to the collection and use of information in accordance with this policy.

*(PERSONAL & BUSINESS INFORMATION)*
When you create an account, we may collect the following personal and business details:
- Name of the Company
- Name of the Concerned Person Using the Services
- Company Email address
- Registered Phone number for immediate contacting
- Documents related to the services. All documents so collected will be destroyed after the service has been completed. BMSA is not a custodian of documents; requests to retrieve documents after completion will not be accommodated. Sensitive documents (e.g., CP, Fixture Note, Recap, SOF) will be secured by BMSA.
- Billing address
- Payment information (e.g., credit card details)

*(TECHNICAL INFORMATION)*
When you interact with our website, we may automatically collect certain technical information, such as:
- IP address
- Browser type and version
- Operating system
- Device type
- Pages visited on our site and duration of visit
- Cookies and other tracking technologies

*(HOW WE SHARE YOUR INFORMATION)*
We may share your personal information with third parties in the following circumstances:

*(SERVICE PROVIDERS)*: We may share data with third-party providers to fulfil services such as Hold Cleaning and Guidance, Underwater Hull Inspection and Cleaning, and Port Captain services. For laytime calculation, CP review, and voyage management purposes, we will not share your confidential information.

*(BUSINESS TRANSFERS)*: If BMSA undergoes a merger, acquisition, or asset sale, your information may be transferred as part of the transaction.

*(LEGAL COMPLIANCE)*: We may disclose your information if required by law (e.g., subpoena, court order) or to protect the rights, property, or safety of BMSA and our customers.

BMSA reserves the right to suspend or terminate accounts for violations of the Terms or misuse of the service.

*(DATA RETENTION)*
We retain your personal information only as long as necessary to fulfil the purposes outlined in this Privacy Policy or to comply with legal obligations. Once data is no longer needed, we will securely delete or anonymize it.

*(SECURITY OF YOUR INFORMATION)*
We use commercially reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. Measures include encryption of sensitive data, regular security audits, and restricted access to authorized personnel. However, no method of transmission or electronic storage is 100% secure, so absolute security cannot be guaranteed.

*(YOUR RIGHTS AND CHOICES)*
Depending on your location and applicable laws, you may have rights regarding your personal information, including the right to correct, delete, or opt-out of marketing communications. To exercise these rights, please contact us at operations@bmsagroup.net.

*(COOKIES AND TRACKING TECHNOLOGIES)*
We use cookies and similar technologies to enhance your experience, personalize content and ads, and understand how users interact with our site. You can control cookies via your browser settings; note that disabling cookies may affect site functionality.

*(INTERNATIONAL DATA TRANSFERS)*
If you are located outside the country where our servers are hosted, your information may be transferred and processed in a different country. We ensure such transfers comply with applicable laws and that safeguards are in place to protect your data.

For questions about this Privacy Policy, please contact us.`,
            turnAround: `At BMSA we strive to deliver service quickly, accurately, and efficiently. The turnaround time refers to the total time from when an order is placed to when it is processed and delivered. Turnaround time depends on the type of service selected and on receipt of all required documents.

*(ORDER PROCESSING TIME — LAYTIME CALCULATION SERVICE)*
Once you place an order, our team will process it as quickly as possible. Standard processing times are:

*(SAME-DAY PROCESSING)*: Orders placed before the cutoff time (e.g., 12:00 PM IST) on a business day will be processed and emailed the same day, provided all documents are received.

*(NEXT-DAY PROCESSING)*: Orders placed after the cutoff time will be processed and emailed on the following business day, provided all documents are received.

*(WEEKENDS AND HOLIDAYS)*: Orders placed on weekends or public holidays will be processed on the next business day, provided all documents are received.

*(ORDER PROCESSING TIME — CP REVIEW SERVICE)*
For Charter Party (CP) Review orders, standard processing times are:

*(THREE-DAY PROCESSING)*: CP Review orders placed during a business day will be processed and emailed within three business days, provided all required documents are received.

*(WEEKENDS AND HOLIDAYS)*: CP Review orders placed on weekends or public holidays will be processed and emailed within three business days from the next business day, provided all documents are received.

*(ORDER PROCESSING — OTHER SERVICES)*
For other services, including Hold Cleaning and Guidance, Port Captain, Underwater Hull Inspection and Cleaning, and voyage-related support, our team will contact you after receiving your order to clarify the scope, confirm documentation, and provide an estimated timeline specific to your request.

*(NOTES AND CONDITIONS)*
- All processing timelines assume receipt of complete and accurate documentation.
- Delays in providing documents, additional clarifications, or external dependencies (e.g., port operations, third-party vendors) may extend processing times.
- If you require expedited handling, please contact us and we will advise on feasibility and any applicable charges.

For specific questions or to check the status of an order, please contact us.`,
            returnRefund: `At BMSA, we strive to offer top-quality services and ensure customer satisfaction. However, if a situation arises where a refund or return is appropriate, this policy outlines the terms and conditions governing such requests.

*(ELIGIBILITY FOR REFUNDS)*
Refunds may be issued under the following circumstances:

*(SERVICE NOT RENDERED)*: If the service was not provided as described or promised.

*(TECHNICAL ISSUES)*: If significant technical problems prevent proper use of the service and we are unable to resolve the issue within a reasonable time.

*(ERROR IN BILLING)*: If you were charged incorrectly due to a system or billing error.

*(NON-REFUNDABLE ITEMS)*
The following circumstances are typically non-refundable:

*(PARTIALLY USED SERVICES)*: If you have already used part of a service, no refund will be issued for the unused portion unless there are extenuating circumstances.

*(CHANGE OF MIND)*: Refunds will not be issued simply because you changed your mind about using the service.

*(VIOLATION OF TERMS)*: If you have violated our Terms of Service, refunds will not be provided.

*(REFUND REQUEST PROCESS)*
To request a refund, please follow these steps:

1. *(SUBMIT A REQUEST)*: Contact our customer support team at operations@bmsagroup.net. Provide your transaction details, the reason for the refund, and any supporting documentation.

2. *(EVALUATION)*: Our team will evaluate your request within 3–5 business days.

3. *(RESOLUTION)*: If approved, the refund will be processed and credited back to your original payment method within 7–10 business days.

*(SERVICE-SPECIFIC REFUNDS)*
Certain services may have unique refund policies which will be outlined at the point of purchase. Please review individual service terms for details.

*(CHANGES TO THIS POLICY)*
We reserve the right to modify or update this Return and Refund Policy at any time. Changes will be effective immediately upon posting. Please review this policy periodically for updates.

For assistance or questions about refunds, please contact us.`,
            contact: `At BMSA we prioritize providing exceptional customer service to ensure that your online payment experience is smooth, secure, and hassle-free. If you have any questions, concerns, or require assistance regarding online payments, we are here to help.

*(HOW TO CONTACT US)*
You can reach our customer support team through the following channels:

*(EMAIL SUPPORT)*: For general inquiries or technical support, email us at operations@bmsagroup.net. We aim to respond within 24–48 hours.

*(PHONE SUPPORT)*: Call our toll-free number +91-9004138991 (Monday–Friday, 9 AM–5 PM IST).

*(CONTACT PAGE)*: Use the Contact page for service requests and forms.

*(COMMON ISSUES WE ADDRESS)*
- Payment confirmation issues
- Transaction failures or declines
- Refund requests or inquiries
- Security and privacy concerns related to payments
- General questions about payment options and policies

*(REFUND AND DISPUTE INQUIRIES)*
For inquiries related to refunds, disputes, or chargebacks, please include the following information to expedite the process:
- Transaction ID or Order Number
- Date of the transaction
- The payment method used
- A brief description of the issue

*(ESCALATIONS)*
If your issue is not resolved to your satisfaction, request an escalation. Our senior support team will review escalated cases and respond within 48 hours.

*(SECURITY AND PRIVACY)*
We are committed to protecting your privacy and the security of your financial information. For more details on how we handle your data, please review our Privacy Policy and Terms of Service.`,
  };

  const [policies, setPolicies] = useState(DEFAULT_POLICIES);

  // Previous policies state for undo
  const [previousPolicies, setPreviousPolicies] = useState<typeof DEFAULT_POLICIES | null>(null);

  // Copyright year state - loaded from server only
  const [copyrightYear, setCopyrightYear] = useState(new Date().getFullYear());

  // Undo policies handler
  const handleUndoPoliciesChange = () => {
    if (previousPolicies) {
      setPolicies(previousPolicies);
      setPreviousPolicies(null);
      alert("Last policy change undone!");
    }
  };

  // Save team members to server whenever they change
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token || !isAuthenticated) return; // Only save if authenticated
    
    const saveTeamMembers = async () => {
      try {
        const response = await fetch(apiEndpoints.settingsTeamMembers(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ teamMembers }),
        });
        
        if (!response.ok) {
          console.error("Failed to save team members to server");
        }
      } catch (error) {
        console.error("Error saving team members:", error);
      }
    };
    
    // Debounce save to prevent too many requests
    const timeoutId = setTimeout(saveTeamMembers, 1000);
    return () => clearTimeout(timeoutId);
  }, [teamMembers, isAuthenticated]);

  // Auto-logout when user leaves admin page
  useEffect(() => {
    // Clear token when component unmounts
    const handleBeforeUnload = () => {
      localStorage.removeItem("admin_token");
    };

    // Add beforeunload listener for tab/browser close
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup when component unmounts (user navigates away)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.removeItem("admin_token");
    };
  }, []);

  // Load services from server on mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        setServicesLoading(true);
        const response = await fetch(apiEndpoints.services());
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setServices(data);
          }
        }
      } catch (error) {
        console.error("Error loading services from server:", error);
        // Keep default services if server fails
      } finally {
        setServicesLoading(false);
      }
    };
    loadServices();
  }, []);

  // Load settings from server on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch(apiEndpoints.settings());
        if (response.ok) {
          const data = await response.json();
          if (data.fleetStats) setFleetStats(data.fleetStats);
          if (data.policies) setPolicies(data.policies);
          if (data.copyrightYear) setCopyrightYear(data.copyrightYear);
          // Load team members from server
          if (data.teamMembers && Array.isArray(data.teamMembers)) {
            setTeamMembers(data.teamMembers);
          }
        }
      } catch (error) {
        console.error("Error loading settings from server:", error);
        // Will use existing state values as fallback
      }
    };
    loadSettings();
  }, []);

  // Save services to server whenever they change (debounced)
  useEffect(() => {
    // Skip initial load
    if (servicesLoading) return;
    
    const saveToServer = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) return; // Only save if authenticated
      
      setServicesSaving(true);
      try {
        const response = await fetch(apiEndpoints.services(), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(services),
        });
        
        if (!response.ok) {
          console.error("Failed to save services to server");
        }
      } catch (error) {
        console.error("Error saving services:", error);
      } finally {
        setServicesSaving(false);
      }
    };
    
    // Debounce save to prevent too many requests
    const timeoutId = setTimeout(saveToServer, 500);
    return () => clearTimeout(timeoutId);
  }, [services, servicesLoading]);

  // Check if user has valid token on mount
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      // Verify token is still valid
      fetch(apiEndpoints.verify(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("admin_token");
          }
        })
        .catch(() => {
          localStorage.removeItem("admin_token");
        });
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoading(true);

    try {
      const response = await fetch(apiEndpoints.login(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store JWT token
        localStorage.setItem("admin_token", data.token);
        setIsAuthenticated(true);
        setUsername("");
        setPassword("");
      } else {
        setAuthError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setAuthError("Unable to connect to server. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  };

  // Team management handlers
  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamMember.name && newTeamMember.role) {
      setPreviousTeamMembers([...teamMembers]);
      const member: TeamMember = {
        id: Date.now().toString(),
        name: newTeamMember.name || "",
        role: newTeamMember.role || "",
        email: newTeamMember.email || "",
        linkedin: newTeamMember.linkedin || "",
        bio: newTeamMember.bio || "",
        photo: newTeamMember.photo,
      };
      setTeamMembers([...teamMembers, member]);
      setNewTeamMember({});
      alert("Team member added successfully!");
    }
  };

  const handleUpdateTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeamMember) {
      setPreviousTeamMembers([...teamMembers]);
      setTeamMembers(
        teamMembers.map((m) => (m.id === editingTeamMember.id ? editingTeamMember : m))
      );
      setEditingTeamMember(null);
      alert("Team member updated successfully!");
    }
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      // Find the member to delete
      const memberToDelete = teamMembers.find((m) => m.id === id);
      
      // Delete the photo from server if it exists
      const photoAssetKey = getAssetKeyFromUrl(memberToDelete?.photo);
      if (photoAssetKey && photoAssetKey.startsWith('uploads/team/')) {
        try {
          const token = localStorage.getItem("admin_token");
          await fetch(apiEndpoints.deleteTeamPhoto(photoAssetKey), {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          console.error('Failed to delete photo from server:', err);
        }
      }
      
      setPreviousTeamMembers([...teamMembers]);
      setTeamMembers(teamMembers.filter((m) => m.id !== id));
    }
  };

  const handleUndoTeamChange = () => {
    if (previousTeamMembers) {
      setTeamMembers(previousTeamMembers);
      setPreviousTeamMembers(null);
      alert("Last change undone!");
    }
  };

  const handleMoveTeamMemberUp = (id: string) => {
    const index = teamMembers.findIndex((m) => m.id === id);
    if (index > 0) {
      setPreviousTeamMembers([...teamMembers]);
      const newMembers = [...teamMembers];
      [newMembers[index], newMembers[index - 1]] = [newMembers[index - 1], newMembers[index]];
      setTeamMembers(newMembers);
    }
  };

  const handleMoveTeamMemberDown = (id: string) => {
    const index = teamMembers.findIndex((m) => m.id === id);
    if (index < teamMembers.length - 1) {
      setPreviousTeamMembers([...teamMembers]);
      const newMembers = [...teamMembers];
      [newMembers[index], newMembers[index + 1]] = [newMembers[index + 1], newMembers[index]];
      setTeamMembers(newMembers);
    }
  };

  // Service management handlers
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (newService.name && newService.slug) {
      setPreviousServices([...services]);
      const service: Service = {
        id: Date.now().toString(),
        name: newService.name || "",
        slug: newService.slug || "",
        description: newService.description || "",
        shortDescription: newService.shortDescription || "",
        icon: newService.icon || "Ship",
        image: newService.image,
        link: `/services/${newService.slug || ""}`,
        subServices: newService.subServices || [],
        termsAndConditions: newService.termsAndConditions || [],
        whyChoose: newService.whyChoose || [],
        howItWorks: newService.howItWorks || [],
        servicesInclude: newService.servicesInclude || [],
      };
      setServices([...services, service]);
      setNewService({ subServices: [], termsAndConditions: [], whyChoose: [], howItWorks: [], servicesInclude: [] });
      alert("Service added successfully!");
    }
  };

  const handleUpdateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      setPreviousServices([...services]);
      // Update the link based on slug
      const updatedService = {
        ...editingService,
        link: `/services/${editingService.slug}`,
      };
      setServices(
        services.map((s) => (s.id === editingService.id ? updatedService : s))
      );
      setEditingService(null);
      alert("Service updated successfully!");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service? This will also delete all subservices.")) {
      const serviceToDelete = services.find((s) => s.id === id);
      
      // Delete service image from server if it exists
      const imageAssetKey = getAssetKeyFromUrl(serviceToDelete?.image);
      if (imageAssetKey && imageAssetKey.startsWith('uploads/services/')) {
        try {
          const token = localStorage.getItem("admin_token");
          await fetch(apiEndpoints.deleteServiceImage(imageAssetKey), {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          console.error('Failed to delete service image from server:', err);
        }
      }
      
      setPreviousServices([...services]);
      setServices(services.filter((s) => s.id !== id));
    }
  };

  const handleUndoServiceChange = () => {
    if (previousServices) {
      setServices(previousServices);
      setPreviousServices(null);
      alert("Last service change undone!");
    }
  };

  // SubService management handlers
  const handleAddSubService = (serviceId: string) => {
    if (newSubService.name && newSubService.price !== undefined) {
      setPreviousServices([...services]);
      const subService: SubService = {
        id: Date.now().toString(),
        name: newSubService.name || "",
        price: newSubService.price || 0,
        unit: newSubService.unit || "Per Service",
        features: newSubService.features || [],
      };
      
      setServices(services.map(s => {
        if (s.id === serviceId) {
          return { ...s, subServices: [...s.subServices, subService] };
        }
        return s;
      }));
      
      // If editing a service, update it too
      if (editingService && editingService.id === serviceId) {
        setEditingService({
          ...editingService,
          subServices: [...editingService.subServices, subService]
        });
      }
      
      setNewSubService({ features: [] });
      alert("Sub-service added successfully!");
    }
  };

  const handleUpdateSubService = (serviceId: string) => {
    if (editingSubService) {
      setPreviousServices([...services]);
      
      setServices(services.map(s => {
        if (s.id === serviceId) {
          return {
            ...s,
            subServices: s.subServices.map(sub =>
              sub.id === editingSubService.id ? editingSubService : sub
            )
          };
        }
        return s;
      }));
      
      // Update editing service if applicable
      if (editingService && editingService.id === serviceId) {
        setEditingService({
          ...editingService,
          subServices: editingService.subServices.map(sub =>
            sub.id === editingSubService.id ? editingSubService : sub
          )
        });
      }
      
      setEditingSubService(null);
      alert("Sub-service updated successfully!");
    }
  };

  const handleDeleteSubService = (serviceId: string, subServiceId: string) => {
    if (window.confirm("Are you sure you want to delete this sub-service?")) {
      setPreviousServices([...services]);
      
      setServices(services.map(s => {
        if (s.id === serviceId) {
          return {
            ...s,
            subServices: s.subServices.filter(sub => sub.id !== subServiceId)
          };
        }
        return s;
      }));
      
      // Update editing service if applicable
      if (editingService && editingService.id === serviceId) {
        setEditingService({
          ...editingService,
          subServices: editingService.subServices.filter(sub => sub.id !== subServiceId)
        });
      }
    }
  };

  // Feature management for subservices
  const handleAddFeature = (target: 'new' | 'editing') => {
    if (!newFeature.trim()) return;
    
    if (target === 'new' && newSubService) {
      setNewSubService({
        ...newSubService,
        features: [...(newSubService.features || []), newFeature.trim()]
      });
    } else if (target === 'editing' && editingSubService) {
      setEditingSubService({
        ...editingSubService,
        features: [...editingSubService.features, newFeature.trim()]
      });
    }
    setNewFeature("");
  };

  const handleRemoveFeature = (target: 'new' | 'editing', index: number) => {
    if (target === 'new' && newSubService) {
      setNewSubService({
        ...newSubService,
        features: (newSubService.features || []).filter((_, i) => i !== index)
      });
    } else if (target === 'editing' && editingSubService) {
      setEditingSubService({
        ...editingSubService,
        features: editingSubService.features.filter((_, i) => i !== index)
      });
    }
  };

  // Terms management for services
  const handleAddTerm = (target: 'new' | 'editing') => {
    if (!newTerm.trim()) return;
    
    if (target === 'new' && newService) {
      setNewService({
        ...newService,
        termsAndConditions: [...(newService.termsAndConditions || []), newTerm.trim()]
      });
    } else if (target === 'editing' && editingService) {
      setEditingService({
        ...editingService,
        termsAndConditions: [...(editingService.termsAndConditions || []), newTerm.trim()]
      });
    }
    setNewTerm("");
  };

  const handleRemoveTerm = (target: 'new' | 'editing', index: number) => {
    if (target === 'new' && newService) {
      setNewService({
        ...newService,
        termsAndConditions: (newService.termsAndConditions || []).filter((_, i) => i !== index)
      });
    } else if (target === 'editing' && editingService) {
      setEditingService({
        ...editingService,
        termsAndConditions: (editingService.termsAndConditions || []).filter((_, i) => i !== index)
      });
    }
  };

  // Content section handlers (Why Choose, How It Works, Services Include)
  const handleAddContentItem = (serviceId: string, section: 'whyChoose' | 'howItWorks' | 'servicesInclude') => {
    if (!newContentItem.title.trim() || !newContentItem.description.trim()) return;
    
    setPreviousServices([...services]);
    const item: ContentItem = {
      id: Date.now().toString(),
      title: newContentItem.title.trim(),
      description: newContentItem.description.trim()
    };
    
    setServices(services.map(s => {
      if (s.id === serviceId) {
        return { ...s, [section]: [...(s[section] || []), item] };
      }
      return s;
    }));
    
    setNewContentItem({ title: "", description: "" });
  };

  const handleRemoveContentItem = (serviceId: string, section: 'whyChoose' | 'howItWorks' | 'servicesInclude', itemId: string) => {
    setPreviousServices([...services]);
    setServices(services.map(s => {
      if (s.id === serviceId) {
        return { ...s, [section]: (s[section] || []).filter(item => item.id !== itemId) };
      }
      return s;
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-ocean-light/10">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <h1 className="font-display text-3xl font-bold text-foreground mb-6 text-center">
            Admin Console
          </h1>
          <p className="text-center text-muted-foreground mb-6">
            Enter your credentials to access the admin dashboard
          </p>
          {authError && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-800 text-sm">
              {authError}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter username"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter password"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="container flex items-center justify-between py-4">
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Console</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg border border-border"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 rounded-lg bg-coral px-4 py-2 font-medium text-white transition-colors hover:bg-coral/90"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-card p-4 md:hidden">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-coral px-4 py-2 font-medium text-white"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-card sticky top-16 z-40">
        <div className="container flex gap-4 overflow-x-auto">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "team", label: "Manage Team" },
            { id: "services", label: "Manage Services" },
            { id: "settings", label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="container py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Welcome to Admin Console
              </h2>
              <p className="text-muted-foreground mb-6">
                Manage your website content from this dashboard. You can:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Add, edit, and remove team members</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Manage services and sub-services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Update team member information and social links</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Configure website settings</span>
                </li>
              </ul>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <p className="text-3xl font-bold text-primary">{teamMembers.length}</p>
                <p className="text-sm text-muted-foreground mt-2">Team Members</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <p className="text-3xl font-bold text-primary">{services.length}</p>
                <p className="text-sm text-muted-foreground mt-2">Services</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <p className="text-3xl font-bold text-primary">3</p>
                <p className="text-sm text-muted-foreground mt-2">Pages</p>
              </div>
            </div>


          </div>
        )}

        {/* Team Management Tab */}
        {activeTab === "team" && (
          <div className="space-y-8">
            {/* Undo Button */}
            {previousTeamMembers && (
              <div className="rounded-2xl border border-border bg-card p-8">
                <button
                  onClick={handleUndoTeamChange}
                  className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  ↶ Undo Last Change
                </button>
                <p className="text-sm text-muted-foreground mt-2">
                  Undo the last team member change (add/edit/delete)
                </p>
              </div>
            )}

            {/* Add/Edit Team Member Form */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                {editingTeamMember ? "Edit Team Member" : "Add Team Member"}
              </h2>
              <form
                onSubmit={editingTeamMember ? handleUpdateTeamMember : handleAddTeamMember}
                className="space-y-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={editingTeamMember?.name || newTeamMember.name || ""}
                      onChange={(e) =>
                        editingTeamMember
                          ? setEditingTeamMember({ ...editingTeamMember, name: e.target.value })
                          : setNewTeamMember({ ...newTeamMember, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Role *
                    </label>
                    <input
                      type="text"
                      value={editingTeamMember?.role || newTeamMember.role || ""}
                      onChange={(e) =>
                        editingTeamMember
                          ? setEditingTeamMember({ ...editingTeamMember, role: e.target.value })
                          : setNewTeamMember({ ...newTeamMember, role: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editingTeamMember?.email || newTeamMember.email || ""}
                      onChange={(e) =>
                        editingTeamMember
                          ? setEditingTeamMember({ ...editingTeamMember, email: e.target.value })
                          : setNewTeamMember({ ...newTeamMember, email: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={editingTeamMember?.linkedin || newTeamMember.linkedin || ""}
                      onChange={(e) =>
                        editingTeamMember
                          ? setEditingTeamMember({ ...editingTeamMember, linkedin: e.target.value })
                          : setNewTeamMember({ ...newTeamMember, linkedin: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Photo (uploaded to server)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      disabled={imageUploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Validate file size (max 10MB)
                          if (file.size > 10 * 1024 * 1024) {
                            alert("Image size must be less than 10MB. Please choose a smaller image.");
                            e.target.value = "";
                            return;
                          }

                          setImageUploading(true);
                          try {
                            const token = localStorage.getItem("admin_token");
                            const formData = new FormData();
                            formData.append("photo", file);

                            const response = await fetch(apiEndpoints.uploadTeamPhoto(), {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                              body: formData,
                            });

                            const data = await response.json();

                            if (response.ok && data.photoUrl) {
                              const fullPhotoUrl = normalizeUploadedAssetUrl(data.photoUrl);
                              if (editingTeamMember) {
                                setEditingTeamMember({ ...editingTeamMember, photo: fullPhotoUrl });
                              } else {
                                setNewTeamMember({ ...newTeamMember, photo: fullPhotoUrl });
                              }
                            } else {
                              alert(data.error || "Failed to upload photo");
                            }
                          } catch (error) {
                            console.error("Upload error:", error);
                            alert("Error uploading image. Make sure the server is running.");
                          } finally {
                            setImageUploading(false);
                            e.target.value = "";
                          }
                        }
                      }}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {imageUploading && (
                      <p className="text-sm text-blue-600">Uploading image...</p>
                    )}
                    {(editingTeamMember?.photo || newTeamMember.photo) && !imageUploading && (
                      <div className="mt-2 flex items-start gap-4">
                        <img
                          src={editingTeamMember?.photo || (newTeamMember.photo as string)}
                          alt="Preview"
                          className="h-24 w-24 rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            const photoUrl = editingTeamMember?.photo || (newTeamMember.photo as string);
                            // If it's a server URL, delete the file
                            const photoAssetKey = getAssetKeyFromUrl(photoUrl);
                            if (photoAssetKey && photoAssetKey.startsWith('uploads/team/')) {
                              try {
                                const token = localStorage.getItem("admin_token");
                                await fetch(apiEndpoints.deleteTeamPhoto(photoAssetKey), {
                                  method: 'DELETE',
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                });
                              } catch (err) {
                                console.error('Failed to delete photo from server:', err);
                              }
                            }
                            if (editingTeamMember) {
                              setEditingTeamMember({ ...editingTeamMember, photo: undefined });
                            } else {
                              setNewTeamMember({ ...newTeamMember, photo: undefined });
                            }
                          }}
                          className="rounded-lg bg-red-500 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-red-600"
                        >
                          Remove Photo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Bio
                  </label>
                  <textarea
                    value={editingTeamMember?.bio || newTeamMember.bio || ""}
                    onChange={(e) =>
                      editingTeamMember
                        ? setEditingTeamMember({ ...editingTeamMember, bio: e.target.value })
                        : setNewTeamMember({ ...newTeamMember, bio: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {editingTeamMember ? "Update" : "Add"} Team Member
                  </button>
                  {editingTeamMember && (
                    <button
                      type="button"
                      onClick={() => setEditingTeamMember(null)}
                      className="rounded-lg border border-border px-6 py-2 font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Team Members List */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Team Members ({teamMembers.length})
              </h2>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="rounded-lg border border-border p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      {member.email && (
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMoveTeamMemberUp(member.id)}
                        disabled={teamMembers[0]?.id === member.id}
                        className="rounded-lg bg-green-500 p-2 text-white transition-colors hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleMoveTeamMemberDown(member.id)}
                        disabled={teamMembers[teamMembers.length - 1]?.id === member.id}
                        className="rounded-lg bg-green-500 p-2 text-white transition-colors hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingTeamMember(member)}
                        className="rounded-lg bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeamMember(member.id)}
                        className="rounded-lg bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Services Management Tab */}
        {activeTab === "services" && (
          <div className="space-y-8">
            {/* Undo Button */}
            {previousServices && (
              <div className="rounded-2xl border border-border bg-card p-8">
                <button
                  onClick={handleUndoServiceChange}
                  className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  ↶ Undo Last Change
                </button>
                <p className="text-sm text-muted-foreground mt-2">
                  Undo the last service change (add/edit/delete)
                </p>
              </div>
            )}

            {/* Add/Edit Service Form */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <form
                onSubmit={editingService ? handleUpdateService : handleAddService}
                className="space-y-6"
              >
                {/* Basic Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Service Name *
                    </label>
                    <input
                      type="text"
                      value={editingService?.name || newService.name || ""}
                      onChange={(e) =>
                        editingService
                          ? setEditingService({ ...editingService, name: e.target.value })
                          : setNewService({ ...newService, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., Voyage Operations"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Slug * (URL-friendly name)
                    </label>
                    <input
                      type="text"
                      value={editingService?.slug || newService.slug || ""}
                      onChange={(e) => {
                        const slug = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                        if (editingService) {
                          setEditingService({ ...editingService, slug });
                        } else {
                          setNewService({ ...newService, slug });
                        }
                      }}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="voyage-operations"
                      required
                    />
                  </div>
                </div>

                {/* Icon Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Icon
                  </label>
                  <select
                    value={editingService?.icon || newService.icon || "Ship"}
                    onChange={(e) =>
                      editingService
                        ? setEditingService({ ...editingService, icon: e.target.value })
                        : setNewService({ ...newService, icon: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {AVAILABLE_ICONS.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                {/* Service Image */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Service Banner Image (optional)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      disabled={serviceImageUploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 10 * 1024 * 1024) {
                            alert("Image size must be less than 10MB.");
                            e.target.value = "";
                            return;
                          }

                          setServiceImageUploading(true);
                          try {
                            const token = localStorage.getItem("admin_token");
                            const formData = new FormData();
                            formData.append("image", file);

                            const response = await fetch(apiEndpoints.uploadServiceImage(), {
                              method: "POST",
                              headers: { Authorization: `Bearer ${token}` },
                              body: formData,
                            });

                            const data = await response.json();
                            if (response.ok && data.imageUrl) {
                              const fullImageUrl = normalizeUploadedAssetUrl(data.imageUrl);
                              if (editingService) {
                                setEditingService({ ...editingService, image: fullImageUrl });
                              } else {
                                setNewService({ ...newService, image: fullImageUrl });
                              }
                            } else {
                              alert(data.error || "Failed to upload image");
                            }
                          } catch (error) {
                            console.error("Upload error:", error);
                            alert("Error uploading image. Make sure the server is running.");
                          } finally {
                            setServiceImageUploading(false);
                            e.target.value = "";
                          }
                        }
                      }}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    />
                    {serviceImageUploading && (
                      <p className="text-sm text-blue-600">Uploading image...</p>
                    )}
                    {(editingService?.image || newService.image) && !serviceImageUploading && (
                      <div className="mt-2 flex items-start gap-4">
                        <img
                          src={editingService?.image || newService.image}
                          alt="Service Preview"
                          className="h-32 w-48 rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            const imageUrl = editingService?.image || newService.image;
                            const imageAssetKey = getAssetKeyFromUrl(imageUrl);
                            if (imageAssetKey && imageAssetKey.startsWith('uploads/services/')) {
                              try {
                                const token = localStorage.getItem("admin_token");
                                await fetch(apiEndpoints.deleteServiceImage(imageAssetKey), {
                                  method: 'DELETE',
                                  headers: { Authorization: `Bearer ${token}` },
                                });
                              } catch (err) {
                                console.error('Failed to delete image:', err);
                              }
                            }
                            if (editingService) {
                              setEditingService({ ...editingService, image: undefined });
                            } else {
                              setNewService({ ...newService, image: undefined });
                            }
                          }}
                          className="rounded-lg bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
                        >
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Short Description (for service cards)
                  </label>
                  <input
                    type="text"
                    value={editingService?.shortDescription || newService.shortDescription || ""}
                    onChange={(e) =>
                      editingService
                        ? setEditingService({ ...editingService, shortDescription: e.target.value })
                        : setNewService({ ...newService, shortDescription: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Brief description for homepage cards"
                  />
                </div>

                {/* Full Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Description
                  </label>
                  <textarea
                    value={editingService?.description || newService.description || ""}
                    onChange={(e) =>
                      editingService
                        ? setEditingService({ ...editingService, description: e.target.value })
                        : setNewService({ ...newService, description: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                    placeholder="Detailed description for the service page"
                  />
                </div>

                {/* Terms & Conditions */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Terms & Conditions (optional)
                  </label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTerm}
                        onChange={(e) => setNewTerm(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTerm(editingService ? 'editing' : 'new');
                          }
                        }}
                        className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Add a term or condition"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddTerm(editingService ? 'editing' : 'new')}
                        className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      {(editingService?.termsAndConditions || newService.termsAndConditions || []).map((term, idx) => (
                        <div key={idx} className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
                          <span className="flex-1 text-sm">{term}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTerm(editingService ? 'editing' : 'new', idx)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {editingService ? "Update" : "Add"} Service
                  </button>
                  {editingService && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingService(null);
                        setNewTerm("");
                      }}
                      className="rounded-lg border border-border px-6 py-2 font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Services List with Subservices */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Services ({services.length})
              </h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {services.map((service) => (
                  <div key={service.id} className="rounded-lg border border-border overflow-hidden">
                    {/* Service Header */}
                    <div className="p-4 bg-secondary/30 flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <button
                          onClick={() => setExpandedServiceId(expandedServiceId === service.id ? null : service.id)}
                          className="text-foreground hover:text-primary"
                        >
                          {expandedServiceId === service.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{service.name}</h3>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                              {service.icon}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{service.link}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {service.subServices?.length || 0} sub-service(s)
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingService(service);
                            setExpandedServiceId(service.id);
                          }}
                          className="rounded-lg bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="rounded-lg bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Subservices Section */}
                    {expandedServiceId === service.id && (
                      <div className="p-4 border-t border-border bg-background">
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Sub-Services / Pricing Packages
                        </h4>

                        {/* Add New Subservice Form */}
                        <div className="mb-6 p-4 rounded-lg bg-secondary/20 border border-dashed border-border">
                          <h5 className="text-sm font-medium text-foreground mb-3">
                            {editingSubService ? "Edit Sub-Service" : "Add New Sub-Service"}
                          </h5>
                          <div className="grid gap-3 md:grid-cols-3 mb-3">
                            <input
                              type="text"
                              value={editingSubService?.name || newSubService.name || ""}
                              onChange={(e) =>
                                editingSubService
                                  ? setEditingSubService({ ...editingSubService, name: e.target.value })
                                  : setNewSubService({ ...newSubService, name: e.target.value })
                              }
                              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              placeholder="Sub-service name *"
                            />
                            <input
                              type="number"
                              value={editingSubService?.price ?? newSubService.price ?? ""}
                              onChange={(e) =>
                                editingSubService
                                  ? setEditingSubService({ ...editingSubService, price: Number(e.target.value) })
                                  : setNewSubService({ ...newSubService, price: Number(e.target.value) })
                              }
                              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                              placeholder="Price (USD) *"
                            />
                            <select
                              value={editingSubService?.unit || newSubService.unit || "Per Service"}
                              onChange={(e) =>
                                editingSubService
                                  ? setEditingSubService({ ...editingSubService, unit: e.target.value })
                                  : setNewSubService({ ...newSubService, unit: e.target.value })
                              }
                              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                            >
                              <option value="Per Service">Per Service</option>
                              <option value="Per Port">Per Port</option>
                              <option value="Per Voyage">Per Voyage</option>
                              <option value="Per Day">Per Day</option>
                              <option value="Per Hour">Per Hour</option>
                              <option value="Per Vessel">Per Vessel</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Yearly">Yearly</option>
                            </select>
                          </div>

                          {/* Features */}
                          <div className="mb-3">
                            <label className="text-xs text-muted-foreground mb-1 block">Features / What's included:</label>
                            <div className="flex gap-2 mb-2">
                              <input
                                type="text"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddFeature(editingSubService ? 'editing' : 'new');
                                  }
                                }}
                                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                                placeholder="Add a feature"
                              />
                              <button
                                type="button"
                                onClick={() => handleAddFeature(editingSubService ? 'editing' : 'new')}
                                className="rounded-lg bg-green-500 px-3 py-2 text-white text-sm hover:bg-green-600"
                              >
                                Add
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {(editingSubService?.features || newSubService.features || []).map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs"
                                >
                                  {feature}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFeature(editingSubService ? 'editing' : 'new', idx)}
                                    className="text-red-500 hover:text-red-600"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {editingSubService ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateSubService(service.id)}
                                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                >
                                  Update Sub-Service
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingSubService(null);
                                    setNewFeature("");
                                  }}
                                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleAddSubService(service.id)}
                                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                              >
                                Add Sub-Service
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Existing Subservices List */}
                        {service.subServices && service.subServices.length > 0 ? (
                          <div className="space-y-2">
                            {service.subServices.map((sub) => (
                              <div
                                key={sub.id}
                                className="flex items-start justify-between p-3 rounded-lg bg-card border border-border"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-medium text-foreground">{sub.name}</h5>
                                    <span className="text-primary font-semibold">
                                      ${sub.price}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {sub.unit}
                                    </span>
                                  </div>
                                  {sub.features && sub.features.length > 0 && (
                                    <ul className="mt-1 text-xs text-muted-foreground">
                                      {sub.features.slice(0, 3).map((f, i) => (
                                        <li key={i}>• {f}</li>
                                      ))}
                                      {sub.features.length > 3 && (
                                        <li>• ...and {sub.features.length - 3} more</li>
                                      )}
                                    </ul>
                                  )}
                                </div>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => {
                                      setEditingSubService(sub);
                                      setNewFeature("");
                                    }}
                                    className="rounded p-1 text-blue-500 hover:bg-blue-50"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubService(service.id, sub.id)}
                                    className="rounded p-1 text-red-500 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            No sub-services added yet. Add pricing packages above.
                          </p>
                        )}

                        {/* Content Sections Divider */}
                        <div className="border-t border-border mt-6 pt-6">
                          <h4 className="font-semibold text-foreground mb-2">
                            📝 Service Page Content Sections
                          </h4>
                          <p className="text-sm text-muted-foreground mb-1">
                            Add content for Why Choose, How It Works, and Services Include sections.
                          </p>
                          <p className="text-xs text-green-600 mb-4">
                            ✓ Changes are saved automatically
                          </p>

                          {/* Content Section Tabs */}
                          <div className="flex gap-2 mb-4 flex-wrap">
                            {[
                              { key: 'whyChoose' as const, label: 'Why Choose', count: service.whyChoose?.length || 0 },
                              { key: 'howItWorks' as const, label: 'How It Works', count: service.howItWorks?.length || 0 },
                              { key: 'servicesInclude' as const, label: 'Services Include', count: service.servicesInclude?.length || 0 }
                            ].map(tab => (
                              <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveContentSection(activeContentSection === tab.key ? null : tab.key)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                  activeContentSection === tab.key
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                                }`}
                              >
                                {tab.label} ({tab.count})
                              </button>
                            ))}
                          </div>

                          {/* Active Content Section Editor */}
                          {activeContentSection && (
                            <div className="p-4 rounded-lg bg-secondary/20 border border-dashed border-border">
                              <h5 className="text-sm font-medium text-foreground mb-3">
                                {activeContentSection === 'whyChoose' && 'Why Choose Our Service'}
                                {activeContentSection === 'howItWorks' && 'How It Works'}
                                {activeContentSection === 'servicesInclude' && 'Our Services Include'}
                              </h5>
                              
                              {/* Add New Item Form */}
                              <div className="grid gap-2 mb-3">
                                <input
                                  type="text"
                                  value={newContentItem.title}
                                  onChange={(e) => setNewContentItem({ ...newContentItem, title: e.target.value })}
                                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                                  placeholder="Title (e.g., Expert Management)"
                                />
                                <textarea
                                  value={newContentItem.description}
                                  onChange={(e) => setNewContentItem({ ...newContentItem, description: e.target.value })}
                                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                                  placeholder="Description"
                                  rows={2}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleAddContentItem(service.id, activeContentSection)}
                                  className="rounded-lg bg-primary px-4 py-2 text-primary-foreground text-sm font-medium hover:bg-primary/90 self-start"
                                >
                                  + Add & Save Item
                                </button>
                              </div>

                              {/* Existing Items */}
                              <div className="space-y-2">
                                {(service[activeContentSection] || []).map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-start justify-between p-3 rounded-lg bg-card border border-border"
                                  >
                                    <div className="flex-1">
                                      <h6 className="font-medium text-foreground text-sm">{item.title}</h6>
                                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveContentItem(service.id, activeContentSection, item.id)}
                                      className="rounded p-1 text-red-500 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                                {(service[activeContentSection] || []).length === 0 && (
                                  <p className="text-sm text-muted-foreground italic">
                                    No items yet. Add content using the form above.
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Terms & Conditions Section */}
                        <div className="border-t border-border mt-6 pt-6">
                          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            📋 Terms & Conditions
                          </h4>
                          <div className="p-4 rounded-lg bg-secondary/20 border border-dashed border-border">
                            <div className="flex gap-2 mb-3">
                              <input
                                type="text"
                                value={newTerm}
                                onChange={(e) => setNewTerm(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    // Add term to this service
                                    if (newTerm.trim()) {
                                      const updatedServices = services.map(s => 
                                        s.id === service.id 
                                          ? { ...s, termsAndConditions: [...(s.termsAndConditions || []), newTerm.trim()] }
                                          : s
                                      );
                                      setServices(updatedServices);
                                      setNewTerm("");
                                    }
                                  }
                                }}
                                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                                placeholder="Add a term or condition"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newTerm.trim()) {
                                    const updatedServices = services.map(s => 
                                      s.id === service.id 
                                        ? { ...s, termsAndConditions: [...(s.termsAndConditions || []), newTerm.trim()] }
                                        : s
                                    );
                                    setServices(updatedServices);
                                    setNewTerm("");
                                  }
                                }}
                                className="rounded-lg bg-green-500 px-4 py-2 text-white text-sm hover:bg-green-600"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="space-y-2">
                              {(service.termsAndConditions || []).map((term, idx) => (
                                <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-card border border-border">
                                  <span className="text-primary font-bold text-sm">{idx + 1}.</span>
                                  <span className="flex-1 text-sm text-foreground">{term}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedServices = services.map(s => 
                                        s.id === service.id 
                                          ? { ...s, termsAndConditions: (s.termsAndConditions || []).filter((_, i) => i !== idx) }
                                          : s
                                      );
                                      setServices(updatedServices);
                                    }}
                                    className="text-red-500 hover:text-red-600"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                              {(service.termsAndConditions || []).length === 0 && (
                                <p className="text-sm text-muted-foreground italic">
                                  No terms & conditions added yet.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {services.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No services added yet. Use the form above to add your first service.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Website Settings
            </h2>
            <div className="space-y-6">
              {/* Fleet Statistics Section */}
              <div className="border-t border-border pt-8">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Fleet Statistics (Homepage)
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Current Fleet
                    </label>
                    <input
                      type="number"
                      value={fleetStats.currentFleet}
                      onChange={(e) =>
                        setFleetStats({
                          ...fleetStats,
                          currentFleet: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Current Fleet Under Our Management
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Total Vessels
                    </label>
                    <input
                      type="number"
                      value={fleetStats.totalVessels}
                      onChange={(e) =>
                        setFleetStats({
                          ...fleetStats,
                          totalVessels: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Total Vessels Handled Since 2021
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Total Voyages
                    </label>
                    <input
                      type="number"
                      value={fleetStats.totalVoyages}
                      onChange={(e) =>
                        setFleetStats({
                          ...fleetStats,
                          totalVoyages: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Voyages Executed Under Our Management
                    </p>
                  </div>
                </div>
                <p className="text-sm text-orange-600 mt-4 font-medium">
                  ⚠ Click "Save Settings" to save changes  
                </p>
              </div>

              {/* Policies Section */}
              <div className="border-t border-border pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Policies & Pages
                  </h3>
                  {previousPolicies && (
                    <button
                      onClick={handleUndoPoliciesChange}
                      className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white text-sm transition-colors hover:bg-blue-700"
                    >
                      ↶ Undo Last Change
                    </button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Use *(text)* format for bold headings in policies
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Terms & Conditions
                    </label>
                    <textarea
                      value={policies.terms}
                      onFocus={() => setPreviousPolicies({ ...policies })}
                      onChange={(e) =>
                        setPolicies({ ...policies, terms: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Privacy Policy
                    </label>
                    <textarea
                      value={policies.privacy}
                      onFocus={() => setPreviousPolicies({ ...policies })}
                      onChange={(e) =>
                        setPolicies({ ...policies, privacy: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Turn Around Time Policy
                    </label>
                    <textarea
                      value={policies.turnAround}
                      onFocus={() => setPreviousPolicies({ ...policies })}
                      onChange={(e) =>
                        setPolicies({ ...policies, turnAround: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Return & Refund Policy
                    </label>
                    <textarea
                      value={policies.returnRefund}
                      onFocus={() => setPreviousPolicies({ ...policies })}
                      onChange={(e) =>
                        setPolicies({ ...policies, returnRefund: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Contact Us Policy
                    </label>
                    <textarea
                      value={policies.contact}
                      onFocus={() => setPreviousPolicies({ ...policies })}
                      onChange={(e) =>
                        setPolicies({ ...policies, contact: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>
                </div>
                <p className="text-sm text-orange-600 mt-4 font-medium">
                  ⚠ Click "Save Settings" to save changes
                </p>
              </div>

              {/* Copyright Settings Section */}
              <div className="border-t border-border pt-8">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Copyright Settings
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Copyright Year
                    </label>
                    <input
                      type="number"
                      min="2000"
                      max={new Date().getFullYear() + 5}
                      value={copyrightYear}
                      onChange={(e) => setCopyrightYear(Number(e.target.value))}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Year displayed in the footer copyright notice
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-accent/20 p-4 flex items-center">
                    <p className="text-sm text-foreground">
                      <strong>Preview:</strong> © Copyright {copyrightYear} BMSA SHIPPING INDIA PRIVATE LIMITED
                    </p>
                  </div>
                </div>
                <p className="text-sm text-orange-600 mt-4 font-medium">
                  ⚠ Click "Save Settings" to save changes
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    const token = localStorage.getItem("admin_token");
                    if (!token) {
                      alert("Authentication required!");
                      return;
                    }

                    try {
                      const response = await fetch(apiEndpoints.settings(), {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                          fleetStats,
                          policies,
                          copyrightYear,
                          teamMembers,
                        }),
                      });

                      if (response.ok) {
                        alert("All settings saved successfully!");
                      } else {
                        const error = await response.json();
                        alert(`Error saving settings: ${error.error || "Unknown error"}`);
                      }
                    } catch (error) {
                      console.error("Error saving settings:", error);
                      alert("Failed to save settings. Please try again.");
                    }
                  }}
                  className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Save Settings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPolicies(DEFAULT_POLICIES);
                    alert("Policies reset to defaults! Click 'Save Settings' to confirm.");
                  }}
                  className="rounded-lg bg-gray-600 px-6 py-2 font-medium text-white transition-colors hover:bg-gray-700"
                >
                  Reset to Defaults
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPolicies(DEFAULT_POLICIES);
                    alert("Reset to default policies!");
                  }}
                  className="rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-colors hover:bg-red-700"
                >
                  Clear & Reload
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminConsole;
