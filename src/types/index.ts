export interface Profile {
  id: string;
  userId: string;
  name: string;
  profilePic: string;
  about: string;
  blog: string;
  github: string;
  linkedIn: string;
  twitter: string;
  resume: string;
}

export interface Job {
  id: string;
  userId: string;
  name: string;
  role: string;
  dateStarted: string;
  dateEnded: string;
  description: string;
  details: { list: string[] } | null;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  githubLink: string;
  demoLink: string;
  imageLink: string;
  tags: { list: string[] } | null;
}

export interface PortfolioData {
  id: string;
  email: string;
  profile: Profile;
  jobs: Job[];
  projects: Project[];
}
