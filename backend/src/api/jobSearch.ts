import { Router } from 'express';
import { findYCJobs, findAcceleratorStartups, findStartupJobs, findJobBoardJobs } from '../agents/geminiAgent';
import Job from '../models/Job';
import axios from 'axios';
import { jsonrepair } from 'jsonrepair';

const router = Router();

function extractJsonArray(text: string): string {
  const match = text.match(/\[\s*{[\s\S]*?}\s*\]/);
  return match ? match[0] : text;
}

function stripMarkdownCodeBlock(text: string): string {
  // Remove ```json, ```js, ``` and matching closing ```
  return text.replace(/```(json|js)?\s*/gi, '').replace(/```/g, '').trim();
}

router.post('/', async (req, res) => {
  const { role } = req.body;
  if (!role) return res.status(400).json({ error: 'Missing job role' });

  const webDevTaxonomy = `Front-end Development: Front-end Developer, Front-end Engineer, Client-side Developer, Web UI Developer, Mobile/Tablet Front-end Developer, Front-end SEO Expert, Front-end Accessibility Expert, Front-end DevOps, Front-end Testing/QA, UI Engineer, UI/UX Designer, Design Engineer, React Developer; Back-end Development: Back-end Developer, Back-end Engineer, Server-side Developer, API Developer, API Engineer; Full-stack Development: Full-stack Developer, Full-stack Engineer, Full-stack Web Developer, Lead Full-stack Developer, Principal Full-stack Engineer, Full-stack AI Developer, Full-stack Data Scientist, Full-stack Blockchain Developer; DevOps: DevOps Engineer, Site Reliability Engineer (SRE), Cloud Engineer, Infrastructure Engineer, Automation Engineer; AI/ML: Machine Learning Engineer, AI Engineer, AI Developer, Data Scientist, AI Software Engineer, Full-stack ML Engineer; Web3: Web3 Developer, Blockchain Developer, Smart Contract Developer, DApp Developer, Crypto Developer, Full-stack Web3 Developer; Combined/Generalist: Software Engineer, Application Developer, Technical Lead, Solutions Architect, Product Engineer, DevOps for AI/ML, AI/ML Engineer with DevOps skills, Web3 Full-stack Developer.`;

  try {
    // 0. First, search Y Combinator Jobs
    const ycResp = await findYCJobs(webDevTaxonomy);
    let ycJobs: any[] = [];
    try {
      const text = ycResp.candidates?.[0]?.content?.parts?.[0]?.text || ycResp;
      if (text && typeof text === 'string' && text.trim() !== '') {
        const cleanText = stripMarkdownCodeBlock(text);
        const jsonText = extractJsonArray(cleanText);
        if (jsonText && jsonText.trim() !== '') {
          ycJobs = JSON.parse(jsonrepair(jsonText));
        }
      }
      if (!Array.isArray(ycJobs)) ycJobs = [];
      ycJobs = ycJobs.filter((j: any) => j.companyName && j.role && j.applicationLink);
      ycJobs = ycJobs.map((j: any) => ({
        type: j.type ? String(j.type) : 'Unknown',
        role: String(j.role),
        companyName: String(j.companyName),
        domain: j.domain ? String(j.domain) : 'Unknown',
        applicationLink: String(j.applicationLink),
        salary: j.salary ? String(j.salary) : '',
        location: j.location ? String(j.location) : 'Unknown',
        jobType: j.jobType ? String(j.jobType) : 'Unknown',
        dateScraped: new Date()
      }));
    } catch (e) {
      ycJobs = [];
    }
    // 1. Find accelerator-backed, funded startups
    const accelResp = await findAcceleratorStartups();
    let startups: { name: string, website: string }[] = [];
    try {
      const text = accelResp.candidates?.[0]?.content?.parts?.[0]?.text || accelResp;
      const cleanText = stripMarkdownCodeBlock(typeof text === 'string' ? text : '');
      const jsonText = extractJsonArray(cleanText);
      startups = JSON.parse(jsonrepair(jsonText));
      if (!Array.isArray(startups) || startups.length === 0) throw new Error('Empty or invalid startups array');
    } catch (e) {
      startups = [
        { name: 'Airbnb', website: 'https://airbnb.com' },
        { name: 'Stripe', website: 'https://stripe.com' },
        { name: 'DoorDash', website: 'https://doordash.com' },
        { name: 'Coinbase', website: 'https://coinbase.com' },
        { name: 'Instacart', website: 'https://instacart.com' },
        { name: 'Dropbox', website: 'https://dropbox.com' },
        { name: 'Ginkgo Bioworks', website: 'https://ginkgobioworks.com' },
        { name: 'Brex', website: 'https://brex.com' },
        { name: 'Rappi', website: 'https://rappi.com' },
        { name: 'Segment', website: 'https://segment.com' },
        { name: 'Zapier', website: 'https://zapier.com' },
        { name: 'Gusto', website: 'https://gusto.com' },
        { name: 'Flexport', website: 'https://flexport.com' },
        { name: 'Reddit', website: 'https://reddit.com' },
        { name: 'Docker', website: 'https://docker.com' },
        { name: 'Scribd', website: 'https://scribd.com' },
        { name: 'Weebly', website: 'https://weebly.com' },
        { name: 'Mixpanel', website: 'https://mixpanel.com' },
        { name: 'Benchling', website: 'https://benchling.com' },
        { name: 'Checkr', website: 'https://checkr.com' }
      ];
    }
    // 2. Find jobs at those startups
    const jobsResp = await findStartupJobs(startups, webDevTaxonomy);
    let startupJobs: any[] = [];
    try {
      const text = jobsResp.candidates?.[0]?.content?.parts?.[0]?.text || jobsResp;
      const cleanText = stripMarkdownCodeBlock(typeof text === 'string' ? text : '');
      const jsonText = extractJsonArray(cleanText);
      startupJobs = JSON.parse(jsonrepair(jsonText));
      if (!Array.isArray(startupJobs)) startupJobs = [];
      startupJobs = startupJobs.filter((j: any) => j.companyName && j.role && j.applicationLink);
      startupJobs = startupJobs.map((j: any) => ({
        type: j.type ? String(j.type) : 'Unknown',
        role: String(j.role),
        companyName: String(j.companyName),
        domain: j.domain ? String(j.domain) : 'Unknown',
        applicationLink: String(j.applicationLink),
        salary: j.salary ? String(j.salary) : '',
        location: j.location ? String(j.location) : 'Unknown',
        jobType: j.jobType ? String(j.jobType) : 'Unknown',
        dateScraped: new Date()
      }));
    } catch (e) {
      startupJobs = [];
    }
    // 3. If fewer than 10 total jobs, run job board agent
    const totalJobs = ycJobs.length + startupJobs.length;
    let boardJobs: any[] = [];
    if (totalJobs < 10) {
      const jobBoardResp = await findJobBoardJobs(webDevTaxonomy);
      try {
        const text = jobBoardResp.candidates?.[0]?.content?.parts?.[0]?.text || jobBoardResp;
        const cleanText = stripMarkdownCodeBlock(typeof text === 'string' ? text : '');
        const jsonText = extractJsonArray(cleanText);
        boardJobs = JSON.parse(jsonrepair(jsonText));
        if (!Array.isArray(boardJobs)) boardJobs = [];
        boardJobs = boardJobs.filter((j: any) => j.companyName && j.role && j.applicationLink);
        boardJobs = boardJobs.map((j: any) => ({
          type: j.type ? String(j.type) : 'Unknown',
          role: String(j.role),
          companyName: String(j.companyName),
          domain: j.domain ? String(j.domain) : 'Unknown',
          applicationLink: String(j.applicationLink),
          salary: j.salary ? String(j.salary) : '',
          location: j.location ? String(j.location) : 'Unknown',
          jobType: j.jobType ? String(j.jobType) : 'Unknown',
          dateScraped: new Date()
        }));
      } catch (e) {
        boardJobs = [];
      }
    }
    // Merge and deduplicate all jobs by applicationLink, prioritizing YC jobs
    const allJobs = [...ycJobs, ...startupJobs, ...boardJobs].filter((job, idx, arr) =>
      arr.findIndex(j => j.applicationLink === job.applicationLink) === idx
    );
    let jobs = allJobs;
    // Validate application links (keep only jobs with valid links)
    const validateLink = async (url: string) => {
      try {
        const res = await axios.head(url, { timeout: 5000 });
        return res.status >= 200 && res.status < 400;
      } catch {
        return false;
      }
    };
    const validatedJobs: typeof jobs = [];
    for (const job of jobs) {
      if (await validateLink(job.applicationLink)) {
        validatedJobs.push(job);
      }
    }
    jobs = validatedJobs;
    // Store in MongoDB
    try {
      await Job.insertMany(jobs);
    } catch (e) {
      return res.status(500).json({ error: 'MongoDB insert error', details: String(e) });
    }
    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ error: 'Gemini agent error', details: String(err) });
  }
});

router.get('/all', async (req, res) => {
  try {
    let jobs = await Job.find().sort({ dateScraped: -1 });
    // Remove jobs with 'senior' in the role (case-insensitive)
    jobs = jobs.filter((j: any) => !/senior/i.test(j.role));
    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs', details: String(err) });
  }
});

export default router; 