import axios from 'axios';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent';

async function callGemini(prompt: string): Promise<any> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) throw new Error('Gemini API key not set');
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 4096 }
  };
  const response = await axios.post(
    `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
    body,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
}

export async function findYCJobs(taxonomy: string): Promise<any> {
  const prompt = `You are an expert job search agent. Your first task is to search the Y Combinator Jobs website at https://www.ycombinator.com/jobs for open jobs matching or closely related to: ${taxonomy}. Only include jobs posted in the last 50 days. Prioritize remote jobs if available, but include onsite/hybrid as well. Do NOT include any jobs with 'senior' or experience-related keywords in the title or description. You must find at least 10 job postings from YC companies before moving to other sources. Return a JSON array of jobs with: role, companyName, salary, applicationLink, location, jobType. Return ONLY a valid JSON array, no extra text, no Markdown.`;
  return callGemini(prompt);
}

export async function findAcceleratorStartups(): Promise<any> {
  const prompt = `You are an expert startup researcher. Using the latest lists from https://startupsavant.com/best-startup-accelerators and https://www.growthmentor.com/blog/best-startup-accelerators/, return a JSON array of at least 30 startups that have participated in top accelerators (e.g., Y Combinator, Techstars, 500 Startups, etc.) and have raised at least one round of funding. For each, include: name, website, accelerator, and a short description. Return ONLY a valid JSON array, no extra text, no Markdown.`;
  return callGemini(prompt);
}

export async function findStartupJobs(startups: { name: string, website: string }[], taxonomy: string): Promise<any> {
  const startupList = startups.map(s => `${s.name} (${s.website})`).join(', ');
  const prompt = `You are an expert job search agent. For the following funded startups: [${startupList}], search their careers pages or public job boards for all open jobs matching or closely related to: ${taxonomy}. Only include jobs posted in the last 50 days. Prioritize remote jobs if available, but include onsite/hybrid as well. Do NOT include any jobs with 'senior' or experience-related keywords in the title or description. You must find at least 10 job postings before returning a response. If you cannot find 10, iterate over more accelerators and job portals until you find at least 10 relevant postings. Return a JSON array of jobs with: role, companyName, salary, applicationLink, location, jobType. Return ONLY a valid JSON array, no extra text, no Markdown.`;
  return callGemini(prompt);
}

export async function findJobBoardJobs(taxonomy: string): Promise<any> {
  const prompt = `You are an expert job search agent. Search major job boards (AngelList/Wellfound, LinkedIn, Indeed) for open jobs matching or closely related to: ${taxonomy}. Only include jobs posted in the last 50 days. Prioritize remote jobs if available, but include onsite/hybrid as well. Do NOT include any jobs with 'senior' or experience-related keywords in the title or description. You must find at least 10 job postings before returning a response. If you cannot find 10, iterate over more job boards and portals until you find at least 10 relevant postings. Return a JSON array of jobs with: role, companyName, salary, applicationLink, location, jobType. Return ONLY a valid JSON array, no extra text, no Markdown.`;
  return callGemini(prompt);
} 