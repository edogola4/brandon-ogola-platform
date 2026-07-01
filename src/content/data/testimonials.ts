export type Testimonial = {
  quote: string
  name: string
  title: string
  company: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Brandon joined with a clear understanding of what production-grade backend engineering looks like. His API work on the platform was well-structured, consistently documented, and built with the kind of test discipline — 80% coverage, xUnit unit and integration tests — that most engineers talk about but don't deliver. He was proactive in architectural discussions and took ownership of CI/CD improvements without being asked. That combination of technical rigour and initiative is not common at his level of experience.",
    name: 'Abraham Ogol',
    title: 'Chief Technology Officer',
    company: 'Cognativ Technology Limited',
  },
  {
    quote:
      "Brandon built tools that our team of twelve actually used every day — which is a higher bar than it sounds. The APIs were fast, the web applications were straightforward to navigate, and when something wasn't working the way we needed it to, he fixed it quickly and explained what had changed. The documentation he left behind was thorough enough that new staff could get up to speed without needing to track down the person who built the system. That kind of handover quality is rare.",
    name: 'Richard Omondi',
    title: 'Data Analyst',
    company: 'Alliance of Bioversity International and CIAT',
  },
  {
    quote:
      "Brandon delivered across three client projects during his time with us and did it reliably. The frontend work was clean, the Node.js APIs were well-organised, and the user engagement improvements were measurable — clients noticed. What stood out was his consistency: he didn't need close supervision, he communicated clearly when something was taking longer than expected, and the code he shipped held up. For a junior developer, that level of professional reliability made a real difference to how we operated.",
    name: 'Mark Alex',
    title: 'Director',
    company: 'RealBiz Digital',
  },
]
