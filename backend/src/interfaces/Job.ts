export interface Job {
  type: string; // e.g., 'Full-time', 'Internship', etc.
  role: string;
  companyName: string;
  domain: string; // e.g., 'Fintech', 'AI', etc.
  applicationLink: string;
  salary?: string;
  location: string;
  jobType: string; // e.g., 'Remote', 'Onsite', 'Hybrid'
  dateScraped: Date;
} 