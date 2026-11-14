export interface Project {
  slug: string;
  title: string;
  summary: string;
  tools: string[];
}

export const projects: Project[] = [{
  slug: 'care-outreach-automation',
  title: 'Care Outreach Automation',
  summary: 'A researched Excel file becomes a coordinated outreach process: company checks, personalised emails, monitored replies and requested PDF proposals.',
  tools: ['n8n', 'Gmail', 'Google Sheets', 'AI + PDF'],
}];

export const featuredProject = projects[0];
