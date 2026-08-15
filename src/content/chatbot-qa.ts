// Comprehensive Q&A Database for FinniKK Chatbot Assistant
export interface ChatbotQA {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
}

export const CHATBOT_QA_DATABASE: ChatbotQA[] = [
  // ============= CONTACT & GENERAL =============
  {
    id: "contact_001",
    category: "Contact",
    question: "How can I contact FinniKK?",
    answer: "You can reach us via WhatsApp at +91 74360 06208, email us at zalashrenik1811@gmail.com, or visit us in Ahmedabad, Gujarat 382481, India. We're here to help!",
    keywords: ["contact", "phone", "email", "address", "reach"]
  },
  {
    id: "contact_002",
    category: "Contact",
    question: "What are your business hours?",
    answer: "We're available during standard business hours. For urgent matters, you can reach us via WhatsApp at +91 74360 06208 for quick assistance.",
    keywords: ["hours", "timing", "availability", "open", "close"]
  },
  {
    id: "contact_003",
    category: "Contact",
    question: "Do you offer consultation?",
    answer: "Yes! We offer free initial consultations. Simply fill out the contact form on our website or message us on WhatsApp to schedule your consultation.",
    keywords: ["consultation", "meeting", "appointment", "advice"]
  },
  {
    id: "contact_004",
    category: "Contact",
    question: "How quickly will you respond to my inquiry?",
    answer: "We typically respond to inquiries within 24 hours. For urgent matters, WhatsApp is the fastest way to reach us.",
    keywords: ["response", "time", "reply", "urgent"]
  },

  // ============= SERVICES OVERVIEW =============
  {
    id: "services_001",
    category: "Services",
    question: "What services does FinniKK offer?",
    answer: "FinniKK provides comprehensive financial and tax services including: Accounting & Financial Management, Direct Taxation, Indirect Taxation (GST & Customs), Litigation & Regulatory Defense, Business Setups & Incorporation, Secretarial & Corporate Governance, Licenses & Regulatory Filings, and Financial Advisory & Corporate Finance.",
    keywords: ["services", "offerings", "what", "provide", "help"]
  },
  {
    id: "services_002",
    category: "Services",
    question: "Do you serve startups?",
    answer: "Yes! We specialize in supporting startups with business setup, incorporation, regulatory filings, and financial advisory. We understand the unique challenges startups face and provide tailored solutions.",
    keywords: ["startup", "new business", "beginning", "launch"]
  },
  {
    id: "services_003",
    category: "Services",
    question: "Can you help with international business setup?",
    answer: "Absolutely! We provide comprehensive support for international entrepreneurs, FDI (Foreign Direct Investment), India entry strategies, and cross-border taxation matters.",
    keywords: ["international", "foreign", "FDI", "overseas", "global"]
  },
  {
    id: "services_004",
    category: "Services",
    question: "Do you offer financial advisory services?",
    answer: "Yes, we provide decision-focused corporate finance support including project finance, financial modeling, valuations, due diligence, working capital optimization, and cash-flow management.",
    keywords: ["advisory", "finance", "planning", "strategy", "modeling"]
  },

  // ============= ACCOUNTING & FINANCIAL MANAGEMENT =============
  {
    id: "accounting_001",
    category: "Accounting & Financial Management",
    question: "What accounting services do you provide?",
    answer: "We offer integrated accounting support including bookkeeping, virtual CFO services, MIS reporting, accounting outsourcing, and comprehensive financial statement preparation. We handle everything from daily books to strategic financial reporting.",
    keywords: ["accounting", "bookkeeping", "financial", "statements", "CFO"]
  },
  {
    id: "accounting_002",
    category: "Accounting & Financial Management",
    question: "Can you handle accounting outsourcing?",
    answer: "Yes! We provide complete accounting outsourcing services, allowing you to focus on your core business while we manage your financial operations, reporting, and compliance.",
    keywords: ["outsourcing", "accounting", "books", "management", "operations"]
  },
  {
    id: "accounting_003",
    category: "Accounting & Financial Management",
    question: "What is MIS reporting?",
    answer: "MIS (Management Information System) reporting provides regular management reports that help you understand your business performance, cash flow, profitability, and key metrics. We prepare customized MIS reports tailored to your business needs.",
    keywords: ["MIS", "reporting", "management", "information", "metrics"]
  },
  {
    id: "accounting_004",
    category: "Accounting & Financial Management",
    question: "Do you provide virtual CFO services?",
    answer: "Yes! Our virtual CFO services include financial planning, cash flow management, budgeting, financial analysis, and strategic financial guidance without the overhead of a full-time CFO.",
    keywords: ["CFO", "virtual", "financial", "planning", "strategy"]
  },

  // ============= DIRECT TAXATION =============
  {
    id: "tax_001",
    category: "Direct Taxation",
    question: "What is direct taxation?",
    answer: "Direct taxation includes income tax, wealth tax, and similar taxes paid directly by individuals and businesses to the government. We handle income tax compliance, planning, and advisory for both individuals and corporations.",
    keywords: ["direct tax", "income tax", "taxation", "compliance"]
  },
  {
    id: "tax_002",
    category: "Direct Taxation",
    question: "What is the financial year for income tax in India?",
    answer: "The financial year (FY) in India runs from April 1st to March 31st. For example, FY 2025-26 runs from April 1, 2025 to March 31, 2026. The assessment year (AY) is the year following the financial year.",
    keywords: ["financial year", "FY", "April", "March", "assessment year"]
  },
  {
    id: "tax_003",
    category: "Direct Taxation",
    question: "When is the income tax return filing deadline?",
    answer: "The standard deadline for filing income tax returns is July 31st of the assessment year. However, for businesses with turnover exceeding Rs. 5 crore, the deadline may be earlier. Extensions are sometimes available.",
    keywords: ["ITR", "deadline", "filing", "July", "return"]
  },
  {
    id: "tax_004",
    category: "Direct Taxation",
    question: "What is TDS (Tax Deducted at Source)?",
    answer: "TDS is a mechanism where tax is deducted at the source of income itself. For example, if you receive interest, salary, or professional fees, the payer must deduct tax at prescribed rates and remit it to the government. We help manage TDS compliance and reconciliation.",
    keywords: ["TDS", "deducted", "source", "withholding", "tax"]
  },
  {
    id: "tax_005",
    category: "Direct Taxation",
    question: "What is TCS (Tax Collected at Source)?",
    answer: "TCS is similar to TDS but is collected by sellers of certain goods (like scrap, minerals, timber) and e-commerce operators. We assist with TCS compliance, returns, and reconciliation.",
    keywords: ["TCS", "collected", "source", "e-commerce", "goods"]
  },
  {
    id: "tax_006",
    category: "Direct Taxation",
    question: "What is transfer pricing?",
    answer: "Transfer pricing refers to the pricing of transactions between related entities (like parent and subsidiary companies). We ensure your transfer pricing is compliant with regulations and optimized for tax efficiency.",
    keywords: ["transfer pricing", "related parties", "transactions", "pricing"]
  },
  {
    id: "tax_007",
    category: "Direct Taxation",
    question: "Do you help with international taxation?",
    answer: "Yes! We provide comprehensive international tax services including cross-border taxation, foreign income reporting, FEMA compliance, and assistance with Double Taxation Avoidance Agreements (DTAA).",
    keywords: ["international", "foreign", "cross-border", "DTAA", "NRI"]
  },
  {
    id: "tax_008",
    category: "Direct Taxation",
    question: "What is advance tax?",
    answer: "Advance tax is a quarterly payment of estimated tax liability. If your estimated tax for the year exceeds Rs. 10,000, you must pay advance tax in four installments (June 15, September 15, December 15, and March 15).",
    keywords: ["advance tax", "quarterly", "installment", "payment"]
  },
  {
    id: "tax_009",
    category: "Direct Taxation",
    question: "When are advance tax payments due?",
    answer: "Advance tax installments are due on: June 15 (25%), September 15 (50%), December 15 (75%), and March 15 (100%) of the financial year.",
    keywords: ["advance tax", "due date", "June", "September", "December", "March"]
  },
  {
    id: "tax_010",
    category: "Direct Taxation",
    question: "What happens if I miss the income tax deadline?",
    answer: "Missing the deadline can result in penalties under Section 234F (for individuals) or 234A (interest). We can help you file late returns and manage any penalties or interest liabilities.",
    keywords: ["late", "penalty", "deadline", "interest", "missed"]
  },

  // ============= GST & INDIRECT TAXATION =============
  {
    id: "gst_001",
    category: "GST & Indirect Taxation",
    question: "What is GST?",
    answer: "GST (Goods and Services Tax) is an indirect tax on the supply of goods and services. It replaced multiple taxes like VAT, Service Tax, and Excise. GST has three components: CGST (Central), SGST (State), and IGST (Integrated for inter-state).",
    keywords: ["GST", "indirect tax", "goods", "services", "CGST", "SGST"]
  },
  {
    id: "gst_002",
    category: "GST & Indirect Taxation",
    question: "Who needs to register for GST?",
    answer: "Any business with annual turnover exceeding Rs. 20 lakhs (Rs. 10 lakhs for North-Eastern states) in services or Rs. 40 lakhs in goods must register for GST. Some businesses may voluntarily register below these thresholds.",
    keywords: ["GST registration", "threshold", "turnover", "eligible"]
  },
  {
    id: "gst_003",
    category: "GST & Indirect Taxation",
    question: "What is GSTIN?",
    answer: "GSTIN (GST Identification Number) is a unique 15-digit identification number assigned to every registered GST taxpayer. It's essential for filing returns, issuing invoices, and conducting GST-related transactions.",
    keywords: ["GSTIN", "identification", "number", "registration"]
  },
  {
    id: "gst_004",
    category: "GST & Indirect Taxation",
    question: "When is GSTR-1 due?",
    answer: "GSTR-1 (outward supplies return) is due by the 11th of the succeeding month. For example, for supplies in June, GSTR-1 is due by July 11th. This applies to all registered taxpayers except composition scheme taxpayers.",
    keywords: ["GSTR-1", "due date", "11th", "outward supplies", "return"]
  },
  {
    id: "gst_005",
    category: "GST & Indirect Taxation",
    question: "When is GSTR-2 due?",
    answer: "GSTR-2 (inward supplies return) is due by the 15th of the succeeding month. Many details are auto-populated from suppliers' GSTR-1 filings.",
    keywords: ["GSTR-2", "due date", "15th", "inward supplies"]
  },
  {
    id: "gst_006",
    category: "GST & Indirect Taxation",
    question: "When is GSTR-3 due?",
    answer: "GSTR-3 (monthly return) is due by the 20th of the succeeding month. GSTR-3 can only be filed after GSTR-1 and GSTR-2 are completed, and tax liability must be paid before filing.",
    keywords: ["GSTR-3", "due date", "20th", "monthly return"]
  },
  {
    id: "gst_007",
    category: "GST & Indirect Taxation",
    question: "What is ITC in GST?",
    answer: "ITC (Input Tax Credit) allows you to claim credit for GST paid on purchases of goods and services used in your business. This prevents cascading taxation. We help optimize and reconcile your ITC claims.",
    keywords: ["ITC", "input tax credit", "credit", "purchases"]
  },
  {
    id: "gst_008",
    category: "GST & Indirect Taxation",
    question: "What is the GST composition scheme?",
    answer: "The composition scheme is a simplified GST regime for small businesses with turnover up to Rs. 1.5 crore. Under this scheme, you pay a fixed percentage of turnover as tax instead of regular GST, and you cannot claim ITC.",
    keywords: ["composition scheme", "simplified", "small business", "turnover"]
  },
  {
    id: "gst_009",
    category: "GST & Indirect Taxation",
    question: "What are GST rates?",
    answer: "GST rates in India are 0%, 5%, 12%, and 18%, depending on the category of goods/services. Essential items like food are 0% or 5%, while most services are 18%. We help classify your supplies under the correct rate.",
    keywords: ["GST rates", "0%", "5%", "12%", "18%", "slab"]
  },
  {
    id: "gst_010",
    category: "GST & Indirect Taxation",
    question: "What is e-way bill?",
    answer: "An e-way bill is required for movement of goods valued above Rs. 50,000 within India. It's a digital document that tracks the movement of goods and prevents tax evasion. We help generate and manage e-way bills.",
    keywords: ["e-way bill", "movement", "goods", "50000", "digital"]
  },
  {
    id: "gst_011",
    category: "GST & Indirect Taxation",
    question: "What is reverse charge mechanism in GST?",
    answer: "Under reverse charge, the recipient of goods/services (instead of the supplier) is liable to pay GST. This applies to specific categories like imports, services from unregistered suppliers, and certain B2B transactions.",
    keywords: ["reverse charge", "recipient", "liable", "mechanism"]
  },
  {
    id: "gst_012",
    category: "GST & Indirect Taxation",
    question: "How do I reconcile GST returns?",
    answer: "GST reconciliation involves matching your GSTR-1, GSTR-2, and GSTR-3 filings with your books of accounts and actual transactions. We perform detailed reconciliation to identify discrepancies and ensure compliance.",
    keywords: ["reconciliation", "GSTR", "matching", "discrepancies"]
  },

  // ============= BUSINESS SETUP & INCORPORATION =============
  {
    id: "business_001",
    category: "Business Setup & Incorporation",
    question: "What types of business structures are available in India?",
    answer: "You can choose from: Sole Proprietorship, Partnership, Limited Liability Partnership (LLP), Private Limited Company, Public Limited Company, or One Person Company (OPC). Each has different compliance, taxation, and liability implications.",
    keywords: ["business structure", "entity", "incorporation", "type"]
  },
  {
    id: "business_002",
    category: "Business Setup & Incorporation",
    question: "What is the difference between Private Limited and Public Limited Company?",
    answer: "A Private Limited Company has restricted share transfer, minimum 2 and maximum 200 members, and cannot invite public investment. A Public Limited Company can have unlimited members and invite public investment through stock exchanges.",
    keywords: ["private limited", "public limited", "company", "shares"]
  },
  {
    id: "business_003",
    category: "Business Setup & Incorporation",
    question: "What is a One Person Company (OPC)?",
    answer: "An OPC is a company with only one member who is both the owner and director. It provides limited liability protection while allowing a single individual to manage the business.",
    keywords: ["OPC", "one person company", "single owner"]
  },
  {
    id: "business_004",
    category: "Business Setup & Incorporation",
    question: "What is an LLP?",
    answer: "An LLP (Limited Liability Partnership) is a hybrid of a partnership and a company. It provides limited liability protection to partners and has fewer compliance requirements compared to a company.",
    keywords: ["LLP", "limited liability partnership", "hybrid"]
  },
  {
    id: "business_005",
    category: "Business Setup & Incorporation",
    question: "What is the process for company incorporation?",
    answer: "Incorporation involves: obtaining DSC (Digital Signature Certificate), applying for name approval (RUN), drafting MoA and AoA, filing incorporation forms (SPICe+), and obtaining Certificate of Incorporation.",
    keywords: ["incorporation", "process", "DSC", "MoA", "AoA", "SPICe+"]
  },
  {
    id: "business_006",
    category: "Business Setup & Incorporation",
    question: "What is DSC?",
    answer: "DSC (Digital Signature Certificate) is a digital equivalent of a physical signature. It's mandatory for filing electronic forms with MCA, ROC, and other authorities.",
    keywords: ["DSC", "digital signature", "filing", "MCA"]
  },
  {
    id: "business_007",
    category: "Business Setup & Incorporation",
    question: "What is a DIN?",
    answer: "DIN (Director Identification Number) is a unique 8-digit identification number assigned to every director of a company. It's mandatory for all company directors and is obtained from the Ministry of Corporate Affairs.",
    keywords: ["DIN", "director", "identification", "number"]
  },
  {
    id: "business_008",
    category: "Business Setup & Incorporation",
    question: "What is PAN and why is it important?",
    answer: "PAN (Permanent Account Number) is a 10-digit unique identifier issued by the Income Tax Department. It's essential for all business entities, required for GST registration, and needed for financial transactions.",
    keywords: ["PAN", "permanent account number", "tax", "identifier"]
  },
  {
    id: "business_009",
    category: "Business Setup & Incorporation",
    question: "Do I need a Certificate of Commencement of Business?",
    answer: "Yes, companies incorporated after 2019 must file Form INC-20A (Certificate of Commencement of Business) within 180 days of incorporation to officially start operations.",
    keywords: ["commencement", "certificate", "INC-20A", "operations"]
  },
  {
    id: "business_010",
    category: "Business Setup & Incorporation",
    question: "Can I change my business structure later?",
    answer: "Yes, you can restructure your business (e.g., convert a partnership to a company). However, this involves specific legal procedures, tax implications, and compliance requirements. We guide you through the process.",
    keywords: ["restructure", "change", "conversion", "transformation"]
  },

  // ============= SECRETARIAL & CORPORATE GOVERNANCE =============
  {
    id: "secretarial_001",
    category: "Secretarial & Corporate Governance",
    question: "What is ROC compliance?",
    answer: "ROC (Registrar of Companies) compliance involves filing mandatory documents and returns with the Registrar to maintain your company's active status. This includes annual returns, financial statements, board meeting minutes, and event-based filings.",
    keywords: ["ROC", "compliance", "filing", "registrar", "companies"]
  },
  {
    id: "secretarial_002",
    category: "Secretarial & Corporate Governance",
    question: "What is Form MGT-7?",
    answer: "Form MGT-7 is the Annual Return filed with ROC within 60 days of the Annual General Meeting (AGM). It contains information about directors, shareholders, financial performance, and company activities.",
    keywords: ["MGT-7", "annual return", "ROC", "AGM"]
  },
  {
    id: "secretarial_003",
    category: "Secretarial & Corporate Governance",
    question: "What is Form AOC-4?",
    answer: "Form AOC-4 is used to file financial statements (Balance Sheet and Profit & Loss) with ROC within 30 days of the Annual General Meeting (AGM).",
    keywords: ["AOC-4", "financial statements", "balance sheet", "profit loss"]
  },
  {
    id: "secretarial_004",
    category: "Secretarial & Corporate Governance",
    question: "When is the AGM (Annual General Meeting) due?",
    answer: "The AGM must be held within 6 months of the financial year-end (by September 30). However, small companies and One Person Companies have certain exemptions.",
    keywords: ["AGM", "annual general meeting", "6 months", "September"]
  },
  {
    id: "secretarial_005",
    category: "Secretarial & Corporate Governance",
    question: "How many board meetings must a company hold?",
    answer: "Every company must hold at least 4 board meetings per year. The gap between two consecutive board meetings cannot exceed 120 days. The first board meeting must occur within 30 days of incorporation.",
    keywords: ["board meetings", "4 per year", "120 days", "frequency"]
  },
  {
    id: "secretarial_006",
    category: "Secretarial & Corporate Governance",
    question: "What is Form DIR-3 KYC?",
    answer: "Form DIR-3 KYC is the annual KYC (Know Your Customer) filing for company directors. It must be filed by September 30 every year with updated personal information of all directors.",
    keywords: ["DIR-3", "KYC", "director", "September", "annual"]
  },
  {
    id: "secretarial_007",
    category: "Secretarial & Corporate Governance",
    question: "What happens if I don't file DIR-3 KYC on time?",
    answer: "If DIR-3 KYC is not filed by September 30, the director's DIN can be deactivated, and a penalty of Rs. 5,000 may be imposed. We ensure timely filing to avoid these consequences.",
    keywords: ["DIR-3", "penalty", "deactivation", "DIN"]
  },
  {
    id: "secretarial_008",
    category: "Secretarial & Corporate Governance",
    question: "What is Form DIR-12?",
    answer: "Form DIR-12 is filed to report changes in directorship (appointment, resignation, or change in details) to the ROC within 30 days of the change.",
    keywords: ["DIR-12", "director", "appointment", "resignation", "change"]
  },
  {
    id: "secretarial_009",
    category: "Secretarial & Corporate Governance",
    question: "What statutory registers must a company maintain?",
    answer: "Companies must maintain registers of members, directors, charges, contracts, and other statutory records. These must be kept updated and available for inspection by shareholders and authorities.",
    keywords: ["registers", "statutory", "members", "directors", "charges"]
  },
  {
    id: "secretarial_010",
    category: "Secretarial & Corporate Governance",
    question: "What is Form SH-7?",
    answer: "Form SH-7 is filed to report changes in authorized share capital to the ROC within 30 days of the change. This is required whenever a company increases or decreases its authorized capital.",
    keywords: ["SH-7", "share capital", "authorized", "change"]
  },

  // ============= LICENSES & REGULATORY FILINGS =============
  {
    id: "licenses_001",
    category: "Licenses & Regulatory Filings",
    question: "What is IEC?",
    answer: "IEC (Importer-Exporter Code) is a 10-digit code required for any business involved in import or export of goods. It's issued by the Directorate General of Foreign Trade (DGFT).",
    keywords: ["IEC", "import", "export", "code", "DGFT"]
  },
  {
    id: "licenses_002",
    category: "Licenses & Regulatory Filings",
    question: "What is FSSAI?",
    answer: "FSSAI (Food Safety and Standards Authority of India) registration is mandatory for food businesses. It ensures compliance with food safety standards and protects consumer health.",
    keywords: ["FSSAI", "food", "safety", "registration", "license"]
  },
  {
    id: "licenses_003",
    category: "Licenses & Regulatory Filings",
    question: "What are PF and ESIC?",
    answer: "PF (Provident Fund) and ESIC (Employee State Insurance Corporation) are mandatory social security schemes for employees. Employers must register and contribute on behalf of employees.",
    keywords: ["PF", "ESIC", "provident fund", "insurance", "employee"]
  },
  {
    id: "licenses_004",
    category: "Licenses & Regulatory Filings",
    question: "What is PT (Professional Tax)?",
    answer: "PT (Professional Tax) is a state-level tax on income from profession or employment. Registration and payment requirements vary by state. We help manage PT compliance.",
    keywords: ["PT", "professional tax", "state", "employment"]
  },
  {
    id: "licenses_005",
    category: "Licenses & Regulatory Filings",
    question: "What is IPR (Intellectual Property Rights)?",
    answer: "IPR includes patents, trademarks, copyrights, and designs. We assist with IPR registration, protection, and compliance to safeguard your intellectual property.",
    keywords: ["IPR", "intellectual property", "patent", "trademark", "copyright"]
  },
  {
    id: "licenses_006",
    category: "Licenses & Regulatory Filings",
    question: "What is FEMA compliance?",
    answer: "FEMA (Foreign Exchange Management Act) compliance is required for foreign exchange transactions. We help manage FEMA filings, foreign remittances, and RBI compliance.",
    keywords: ["FEMA", "foreign exchange", "RBI", "compliance"]
  },
  {
    id: "licenses_007",
    category: "Licenses & Regulatory Filings",
    question: "What is RBI compliance?",
    answer: "RBI (Reserve Bank of India) compliance involves adhering to regulations for banking, foreign exchange, and monetary matters. We ensure your business complies with all RBI requirements.",
    keywords: ["RBI", "reserve bank", "compliance", "banking"]
  },
  {
    id: "licenses_008",
    category: "Licenses & Regulatory Filings",
    question: "What licenses do I need for my business?",
    answer: "License requirements depend on your business type. Common licenses include GST registration, IEC (for import-export), FSSAI (for food), FEMA (for foreign exchange), and industry-specific licenses. We assess your needs and help obtain all required licenses.",
    keywords: ["licenses", "registration", "requirements", "permits"]
  },

  // ============= LITIGATION & REGULATORY DEFENSE =============
  {
    id: "litigation_001",
    category: "Litigation & Regulatory Defense",
    question: "What is a tax notice?",
    answer: "A tax notice is an official communication from tax authorities requesting information, clarification, or payment. Common notices include show-cause notices, assessment notices, and demand notices. We help you respond appropriately.",
    keywords: ["notice", "tax", "show cause", "assessment", "demand"]
  },
  {
    id: "litigation_002",
    category: "Litigation & Regulatory Defense",
    question: "What should I do if I receive a tax notice?",
    answer: "Don't panic! First, understand the notice carefully. Then, gather relevant documents and contact us immediately. We'll analyze the notice, prepare a response, and represent you before tax authorities.",
    keywords: ["notice", "response", "action", "help", "defense"]
  },
  {
    id: "litigation_003",
    category: "Litigation & Regulatory Defense",
    question: "What is an assessment?",
    answer: "An assessment is the process where tax authorities determine your tax liability based on your return and available information. We help you prepare for assessments and negotiate favorable outcomes.",
    keywords: ["assessment", "tax", "liability", "process"]
  },
  {
    id: "litigation_004",
    category: "Litigation & Regulatory Defense",
    question: "Can I appeal a tax assessment?",
    answer: "Yes! You have the right to appeal an unfavorable assessment to the Commissioner of Income Tax (CIT) or Appellate Authority. We prepare strong appeals and represent you throughout the process.",
    keywords: ["appeal", "assessment", "CIT", "appellate", "defense"]
  },
  {
    id: "litigation_005",
    category: "Litigation & Regulatory Defense",
    question: "What is a GST dispute?",
    answer: "A GST dispute arises when tax authorities question your GST filings, ITC claims, or compliance. We help resolve disputes through proper documentation, reconciliation, and representation.",
    keywords: ["GST", "dispute", "defense", "compliance", "challenge"]
  },
  {
    id: "litigation_006",
    category: "Litigation & Regulatory Defense",
    question: "What is risk strategy in tax matters?",
    answer: "Risk strategy involves assessing tax risks, evaluating compliance positions, and developing strategies to minimize exposure. We conduct risk assessments and help you make informed decisions.",
    keywords: ["risk", "strategy", "assessment", "exposure", "mitigation"]
  },

  // ============= FINANCIAL ADVISORY & CORPORATE FINANCE =============
  {
    id: "finance_001",
    category: "Financial Advisory & Corporate Finance",
    question: "What is project finance?",
    answer: "Project finance involves structuring and financing large projects (infrastructure, energy, etc.). We provide DPR (Detailed Project Report) preparation, financial modeling, and funding assistance.",
    keywords: ["project finance", "DPR", "funding", "infrastructure"]
  },
  {
    id: "finance_002",
    category: "Financial Advisory & Corporate Finance",
    question: "What is a DPR (Detailed Project Report)?",
    answer: "A DPR is a comprehensive document that outlines project details, feasibility, financial projections, and risk analysis. It's essential for securing project financing from banks and investors.",
    keywords: ["DPR", "detailed project report", "feasibility", "projections"]
  },
  {
    id: "finance_003",
    category: "Financial Advisory & Corporate Finance",
    question: "What is valuation?",
    answer: "Valuation determines the fair value of a business, asset, or investment. We use various methods (DCF, comparable companies, asset-based) to provide accurate valuations for M&A, investment, or lending purposes.",
    keywords: ["valuation", "business value", "DCF", "fair value"]
  },
  {
    id: "finance_004",
    category: "Financial Advisory & Corporate Finance",
    question: "What is due diligence?",
    answer: "Due diligence is a comprehensive investigation of a business before acquisition or investment. We conduct financial, legal, and operational due diligence to identify risks and opportunities.",
    keywords: ["due diligence", "investigation", "M&A", "acquisition"]
  },
  {
    id: "finance_005",
    category: "Financial Advisory & Corporate Finance",
    question: "What is working capital management?",
    answer: "Working capital management involves optimizing cash flow, inventory, receivables, and payables. We help improve liquidity, reduce costs, and enhance operational efficiency.",
    keywords: ["working capital", "cash flow", "liquidity", "management"]
  },
  {
    id: "finance_006",
    category: "Financial Advisory & Corporate Finance",
    question: "What is financial modeling?",
    answer: "Financial modeling involves creating detailed projections of future financial performance. We build models for budgeting, forecasting, valuation, and decision-making.",
    keywords: ["financial modeling", "projections", "forecasting", "budget"]
  },
  {
    id: "finance_007",
    category: "Financial Advisory & Corporate Finance",
    question: "Can you help with M&A transactions?",
    answer: "Yes! We provide comprehensive M&A support including valuation, due diligence, deal structuring, financial modeling, and transaction advisory.",
    keywords: ["M&A", "merger", "acquisition", "transaction", "deal"]
  },

  // ============= INCOME TAX ACT SPECIFICS =============
  {
    id: "income_tax_001",
    category: "Income Tax Act",
    question: "What is Section 80C?",
    answer: "Section 80C allows deductions up to Rs. 1.5 lakhs for investments in life insurance, PPF, ELSS, NSC, and other specified instruments. This reduces your taxable income.",
    keywords: ["80C", "deduction", "investment", "insurance", "PPF"]
  },
  {
    id: "income_tax_002",
    category: "Income Tax Act",
    question: "What is Section 80D?",
    answer: "Section 80D allows deductions for health insurance premiums paid for yourself, spouse, and dependent children. Maximum deduction is Rs. 25,000 (Rs. 50,000 for senior citizens).",
    keywords: ["80D", "health insurance", "deduction", "premium"]
  },
  {
    id: "income_tax_003",
    category: "Income Tax Act",
    question: "What is Section 80E?",
    answer: "Section 80E allows deductions for interest paid on education loans taken for higher education. The deduction is available for 8 financial years from the year interest is first paid.",
    keywords: ["80E", "education loan", "interest", "deduction"]
  },
  {
    id: "income_tax_004",
    category: "Income Tax Act",
    question: "What is Section 80G?",
    answer: "Section 80G allows deductions for donations to charitable organizations and religious institutions. The deduction is 50% or 100% depending on the organization.",
    keywords: ["80G", "donation", "charity", "deduction"]
  },
  {
    id: "income_tax_005",
    category: "Income Tax Act",
    question: "What is Section 44AD?",
    answer: "Section 44AD provides a presumptive income scheme for small businesses and professionals. If your turnover doesn't exceed Rs. 2 crore, you can claim 8% of turnover as income (6% for certain businesses).",
    keywords: ["44AD", "presumptive income", "turnover", "business"]
  },
  {
    id: "income_tax_006",
    category: "Income Tax Act",
    question: "What is Section 139(1)?",
    answer: "Section 139(1) mandates filing of income tax returns for individuals with income exceeding the basic exemption limit. Filing is required even if income is below the limit in certain cases.",
    keywords: ["139", "ITR", "filing", "mandatory", "income"]
  },
  {
    id: "income_tax_007",
    category: "Income Tax Act",
    question: "What is Section 143(1)?",
    answer: "Section 143(1) allows the tax officer to make adjustments to your return based on information received. We help you respond to such adjustments and protect your interests.",
    keywords: ["143", "adjustment", "return", "tax officer"]
  },
  {
    id: "income_tax_008",
    category: "Income Tax Act",
    question: "What is Section 271(1)(c)?",
    answer: "Section 271(1)(c) imposes penalties for inaccurate returns or failure to disclose income. Penalty can be up to Rs. 10,000 or 50% of tax, whichever is higher.",
    keywords: ["271", "penalty", "inaccurate", "return"]
  },

  // ============= GST ACT SPECIFICS =============
  {
    id: "gst_act_001",
    category: "GST Act",
    question: "What is Section 7 of GST Act?",
    answer: "Section 7 defines 'supply' under GST. Understanding what constitutes a supply is crucial for determining GST applicability and filing obligations.",
    keywords: ["section 7", "supply", "GST", "definition"]
  },
  {
    id: "gst_act_002",
    category: "GST Act",
    question: "What is Section 12 of GST Act?",
    answer: "Section 12 deals with GST registration requirements. It specifies who must register, thresholds, and timelines for registration.",
    keywords: ["section 12", "registration", "GST", "threshold"]
  },
  {
    id: "gst_act_003",
    category: "GST Act",
    question: "What is Section 16 of GST Act?",
    answer: "Section 16 deals with input tax credit (ITC). It specifies conditions under which you can claim ITC on purchases.",
    keywords: ["section 16", "ITC", "input tax credit", "GST"]
  },
  {
    id: "gst_act_004",
    category: "GST Act",
    question: "What is Section 20 of GST Act?",
    answer: "Section 20 deals with refunds of GST. It specifies conditions and procedures for claiming refunds of excess GST paid.",
    keywords: ["section 20", "refund", "GST", "excess"]
  },
  {
    id: "gst_act_005",
    category: "GST Act",
    question: "What is Section 54 of GST Act?",
    answer: "Section 54 deals with penalties for various GST violations. Penalties range from Rs. 100 to Rs. 25,000 depending on the violation.",
    keywords: ["section 54", "penalty", "violation", "GST"]
  },

  // ============= COMPANIES ACT SPECIFICS =============
  {
    id: "companies_act_001",
    category: "Companies Act",
    question: "What is Section 2(71) of Companies Act?",
    answer: "Section 2(71) defines 'subsidiary' - a company where another company controls composition of board or holds more than 50% of share capital.",
    keywords: ["section 2", "subsidiary", "company", "control"]
  },
  {
    id: "companies_act_002",
    category: "Companies Act",
    question: "What is Section 149 of Companies Act?",
    answer: "Section 149 deals with board meetings. It specifies that companies must hold at least 4 board meetings per year with maximum 120-day gap between meetings.",
    keywords: ["section 149", "board meetings", "frequency", "companies"]
  },
  {
    id: "companies_act_003",
    category: "Companies Act",
    question: "What is Section 173 of Companies Act?",
    answer: "Section 173 deals with Annual General Meetings (AGM). It specifies that AGM must be held within 6 months of financial year-end.",
    keywords: ["section 173", "AGM", "annual meeting", "companies"]
  },
  {
    id: "companies_act_004",
    category: "Companies Act",
    question: "What is Section 225 of Companies Act?",
    answer: "Section 225 deals with appointment of auditors. It specifies procedures for auditor appointment and rotation requirements.",
    keywords: ["section 225", "auditor", "appointment", "companies"]
  },
  {
    id: "companies_act_005",
    category: "Companies Act",
    question: "What is Section 402 of Companies Act?",
    answer: "Section 402 deals with penalties for non-compliance. It specifies various penalties for violations of Companies Act provisions.",
    keywords: ["section 402", "penalty", "non-compliance", "companies"]
  },

  // ============= ADVANCED TOPICS =============
  {
    id: "advanced_001",
    category: "Advanced Topics",
    question: "What is Base Erosion and Profit Shifting (BEPS)?",
    answer: "BEPS refers to tax planning strategies that exploit gaps in tax rules. India has implemented BEPS action items including transfer pricing rules, country-by-country reporting, and substance requirements.",
    keywords: ["BEPS", "base erosion", "profit shifting", "tax planning"]
  },
  {
    id: "advanced_002",
    category: "Advanced Topics",
    question: "What is Beneficial Ownership?",
    answer: "Beneficial ownership refers to the ultimate natural person(s) who own or control an entity. Disclosure of beneficial ownership is now mandatory under Companies Act and GST Act.",
    keywords: ["beneficial ownership", "ultimate owner", "disclosure"]
  },
  {
    id: "advanced_003",
    category: "Advanced Topics",
    question: "What is Permanent Establishment (PE)?",
    answer: "A Permanent Establishment is a fixed place of business through which a non-resident conducts business in India. PE status triggers tax obligations in India.",
    keywords: ["PE", "permanent establishment", "non-resident", "business"]
  },
  {
    id: "advanced_004",
    category: "Advanced Topics",
    question: "What is Equalisation Levy?",
    answer: "Equalisation Levy is a 2% tax on online advertising services and 6% on e-commerce supplies. It applies to non-residents providing digital services to Indian customers.",
    keywords: ["equalisation levy", "digital", "advertising", "e-commerce"]
  },
  {
    id: "advanced_005",
    category: "Advanced Topics",
    question: "What is Faceless Assessment?",
    answer: "Faceless Assessment is an automated assessment process where the taxpayer doesn't meet the tax officer. It reduces corruption and increases transparency. We help you prepare for faceless assessments.",
    keywords: ["faceless", "assessment", "automated", "transparency"]
  },
  {
    id: "advanced_006",
    category: "Advanced Topics",
    question: "What is Vivad se Vishwas scheme?",
    answer: "Vivad se Vishwas is a dispute resolution scheme allowing taxpayers to settle pending tax disputes by paying the disputed tax amount. It provides relief from penalties and interest.",
    keywords: ["vivad se vishwas", "dispute", "settlement", "relief"]
  },
  {
    id: "advanced_007",
    category: "Advanced Topics",
    question: "What is Benami Property?",
    answer: "Benami property is property held in someone else's name. Benami transactions are prohibited under the Prohibition of Benami Property Transactions Act, 1988.",
    keywords: ["benami", "property", "transaction", "prohibited"]
  },
  {
    id: "advanced_008",
    category: "Advanced Topics",
    question: "What is Black Money Act?",
    answer: "The Black Money (Undisclosed Foreign Income and Assets) and Imposition of Tax Act, 2015 targets undisclosed foreign income and assets. It imposes higher penalties and prosecution provisions.",
    keywords: ["black money", "undisclosed", "foreign", "penalty"]
  },

  // ============= COMPLIANCE CALENDAR =============
  {
    id: "calendar_001",
    category: "Compliance Calendar",
    question: "What are the key tax compliance dates?",
    answer: "Key dates include: June 15 (Advance Tax 1st installment), July 31 (ITR filing), September 15 (Advance Tax 2nd installment), September 30 (DIR-3 KYC), December 15 (Advance Tax 3rd installment), March 15 (Advance Tax 4th installment), and March 31 (Financial Year End).",
    keywords: ["compliance", "dates", "deadlines", "calendar"]
  },
  {
    id: "calendar_002",
    category: "Compliance Calendar",
    question: "When should I file my GST returns?",
    answer: "GSTR-1 is due by 11th of next month, GSTR-2 by 15th, and GSTR-3 by 20th. Monthly GST payments are due before filing GSTR-3.",
    keywords: ["GST", "returns", "GSTR", "due dates"]
  },
  {
    id: "calendar_003",
    category: "Compliance Calendar",
    question: "When should I file ROC compliances?",
    answer: "Key ROC dates: AGM within 6 months of FY-end, MGT-7 within 60 days of AGM, AOC-4 within 30 days of AGM, DIR-3 KYC by September 30, and Board meetings at least 4 times per year.",
    keywords: ["ROC", "compliance", "AGM", "MGT-7", "AOC-4"]
  },

  // ============= FREQUENTLY ASKED GENERAL QUESTIONS =============
  {
    id: "faq_001",
    category: "General FAQ",
    question: "How much will your services cost?",
    answer: "Our pricing varies based on service complexity, company size, and turnover. We offer customized packages for startups, SMEs, and large enterprises. Contact us for a free quote tailored to your needs.",
    keywords: ["cost", "pricing", "fees", "quote"]
  },
  {
    id: "faq_002",
    category: "General FAQ",
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment options including monthly, quarterly, and annual plans. We can discuss payment arrangements that suit your business cash flow.",
    keywords: ["payment", "plans", "flexible", "installments"]
  },
  {
    id: "faq_003",
    category: "General FAQ",
    question: "Can you help with compliance for multiple entities?",
    answer: "Absolutely! We handle compliance for multiple entities including group companies, subsidiaries, and related businesses. We provide consolidated reporting and streamlined compliance management.",
    keywords: ["multiple", "entities", "group", "consolidated"]
  },
  {
    id: "faq_004",
    category: "General FAQ",
    question: "Do you provide compliance training?",
    answer: "Yes, we offer training sessions on GST, Income Tax, ROC compliance, and other regulatory matters for your team. This helps build internal compliance capabilities.",
    keywords: ["training", "education", "workshop", "capability"]
  },
  {
    id: "faq_005",
    category: "General FAQ",
    question: "Can you help with compliance for NRI businesses?",
    answer: "Yes, we have expertise in NRI taxation, foreign income reporting, FEMA compliance, and cross-border transactions. We help NRIs manage their Indian business compliance.",
    keywords: ["NRI", "non-resident", "foreign", "income"]
  },
  {
    id: "faq_006",
    category: "General FAQ",
    question: "Do you handle compliance for e-commerce businesses?",
    answer: "Yes, we specialize in e-commerce compliance including GST on e-commerce supplies, TCS collection, compliance with e-commerce regulations, and marketplace compliance.",
    keywords: ["e-commerce", "online", "marketplace", "TCS"]
  },
  {
    id: "faq_007",
    category: "General FAQ",
    question: "What if I've missed compliance deadlines?",
    answer: "Don't worry! We can help you file late returns, manage penalties, and get your compliance back on track. We'll assess your situation and develop a recovery plan.",
    keywords: ["late", "missed", "deadline", "recovery"]
  },
  {
    id: "faq_008",
    category: "General FAQ",
    question: "Can you help with tax planning?",
    answer: "Yes! We provide strategic tax planning to minimize your tax liability while ensuring full compliance. We analyze your situation and suggest legal tax optimization strategies.",
    keywords: ["tax planning", "optimization", "strategy", "minimize"]
  },
  {
    id: "faq_009",
    category: "General FAQ",
    question: "Do you provide audit services?",
    answer: "Yes, we provide statutory audits, tax audits, internal audits, and special audits. Our audits ensure compliance and provide valuable insights into your business.",
    keywords: ["audit", "statutory", "tax", "internal"]
  },
  {
    id: "faq_010",
    category: "General FAQ",
    question: "How do I get started with FinniKK?",
    answer: "Simply reach out to us via WhatsApp (+91 74360 06208), email (zalashrenik1811@gmail.com), or fill out the contact form on our website. We'll schedule a free consultation to understand your needs.",
    keywords: ["started", "begin", "consultation", "contact"]
  },
];
