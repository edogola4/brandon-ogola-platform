import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { CaseStudyFrontmatterSchema, ArticleFrontmatterSchema, type CaseStudyFrontmatter, type ArticleFrontmatter } from '../types/content'

const CASE_STUDIES_DIR = path.join(process.cwd(), 'src/content/case-studies')
const WRITING_DIR = path.join(process.cwd(), 'src/content/writing')

async function readDirSafe(dir: string): Promise<string[]> {
  try {
    const exists = fs.existsSync(dir)
    if (!exists) return []
    return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  } catch (e) {
    return []
  }
}

const STATUS_ORDER: Record<string, number> = { live: 0, 'in-development': 1, archived: 2 }

export async function getAllCaseStudies(): Promise<CaseStudyFrontmatter[]> {
  const files = await readDirSafe(CASE_STUDIES_DIR)
  if (files.length === 0) return []

  const items: CaseStudyFrontmatter[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, file), 'utf-8')
    const parsed = matter(raw)
    const rt = Math.max(1, Math.round(readingTime(parsed.content).minutes))
    const fm = { ...parsed.data, readingTime: rt }
    return CaseStudyFrontmatterSchema.parse(fm)
  })

  return items.sort((a, b) => {
    const statusDiff = (STATUS_ORDER[a.status] ?? 1) - (STATUS_ORDER[b.status] ?? 1)
    if (statusDiff !== 0) return statusDiff
    return a.date < b.date ? 1 : -1
  })
}

export async function getCaseStudy(slug: string): Promise<{ frontmatter: CaseStudyFrontmatter; content: string } | null> {
  if (!slug || typeof slug !== 'string') return null
  const safeSlug = path.basename(slug)
  if (!safeSlug || safeSlug.includes('..')) return null
  const filePath = path.join(CASE_STUDIES_DIR, `${safeSlug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const parsed = matter(raw)
  const rt = Math.max(1, Math.round(readingTime(parsed.content).minutes))
  const fm = { ...parsed.data, readingTime: rt }
  const frontmatter = CaseStudyFrontmatterSchema.parse(fm)
  return { frontmatter, content: parsed.content }
}

export async function getAllArticles(): Promise<ArticleFrontmatter[]> {
  const files = await readDirSafe(WRITING_DIR)
  if (files.length === 0) return []

  const items: ArticleFrontmatter[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(WRITING_DIR, file), 'utf-8')
    const parsed = matter(raw)
    const rt = Math.max(1, Math.round(readingTime(parsed.content).minutes))
    const fm = { ...parsed.data, readingTime: rt }
    return ArticleFrontmatterSchema.parse(fm)
  })

  return items.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getArticle(slug: string): Promise<{ frontmatter: ArticleFrontmatter; content: string } | null> {
  if (!slug || typeof slug !== 'string') return null
  const safeSlug = path.basename(slug)
  if (!safeSlug || safeSlug.includes('..')) return null
  const filePath = path.join(WRITING_DIR, `${safeSlug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const parsed = matter(raw)
  const rt = Math.max(1, Math.round(readingTime(parsed.content).minutes))
  const fm = { ...parsed.data, readingTime: rt }
  const frontmatter = ArticleFrontmatterSchema.parse(fm)
  return { frontmatter, content: parsed.content }
}
