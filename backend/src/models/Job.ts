import mongoose, { Document, Schema } from 'mongoose';

export interface JobDocument extends Document {
  type: string;
  role: string;
  companyName: string;
  domain: string;
  applicationLink: string;
  salary?: string;
  location: string;
  jobType: string;
  dateScraped: Date;
}

const JobSchema = new Schema<JobDocument>({
  type: { type: String, required: true },
  role: { type: String, required: true },
  companyName: { type: String, required: true },
  domain: { type: String, required: true },
  applicationLink: { type: String, required: true },
  salary: { type: String },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  dateScraped: { type: Date, default: Date.now },
});

export default mongoose.model<JobDocument>('Job', JobSchema); 