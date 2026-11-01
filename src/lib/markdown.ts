import type {CollectionEntry} from 'astro:content';

/** A page as plain Markdown, for copying into an LLM or reading raw: its title, then its source without MDX imports. */
export const pageMarkdown = (entry: CollectionEntry<'docs'>): string => (entry.body
    ? `# ${entry.data.title}\n\n${entry.body.replace(/^import .*\n/gm, '').trim()}\n`
    : '');

/** Where a page's Markdown is served: `/contacts/tags/` → `/contacts/tags.md`. */
export const markdownPath = (pathname: string): string => `${pathname.replace(/\/$/, '') || '/index'}.md`;
