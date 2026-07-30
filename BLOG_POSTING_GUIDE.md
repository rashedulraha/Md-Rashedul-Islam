# Step-by-Step Guide: How to Post Blogs using README.md & Auto SEO

Welcome to the Blog Publishing & Auto SEO Guide for Rashedul Raha's Portfolio.

---

## 🚀 How to Publish a Blog Post using a `.md` / `README.md` File

### Step 1: Write your Blog Post in Markdown (`.md`)
Create a new file named `my-blog-post.md` or `README.md`. Use standard GitHub-flavored Markdown:

```markdown
# Building High Performance Web Apps with Next.js 16

In this article, we explore advanced optimization techniques for Next.js 16 including Server Components, streaming SSR, and automated SEO configuration.

## Introduction
Modern web applications require speed and flexibility...

### Key Strategies
- Use React Server Components for heavy data fetching
- Implement streaming with Suspense boundaries
- Leverage dynamic OpenGraph images for social sharing

```javascript
export default async function Page() {
  return <h1>Hello World</h1>;
}
```
```

### Step 2: Open Admin Dashboard
1. Go to your site dashboard (`/dashboard`).
2. Log in using your security credentials.
3. Click on the **Blogs** tab from the left sidebar.
4. Click on **Create New Article** / **+ Add Article**.

### Step 3: Import your `.md` / `README.md` File
1. Click the **"Upload .md / README.md"** button located at the top right of the Markdown Content editor.
2. Select your `.md` file from your device.
3. **Automatic Extraction**:
   - The system automatically extracts the main title (`# Title`) into the **Article Title** field.
   - It automatically generates an SEO-friendly URL **Slug** (e.g. `building-high-performance-web-apps-with-nextjs-16`).
   - It populates the **Description / Subtitle** from the first paragraph of text.
   - It loads the full markdown body into the editor.

### Step 4: Preview & Publish
1. Choose a **Category** (e.g., `Nextjs`, `Performance`, `Tutorial`).
2. Set an optional **Cover Image URL** or **Reading Time** (e.g., `5 min read`).
3. Switch to the **Preview** tab in the editor to double check how your article looks.
4. Click **Publish Article**.

---

## 🔍 How Auto SEO Works

Every published blog post automatically generates comprehensive SEO metadata without any extra setup:

1. **Dynamic HTML Meta Tags**:
   - Page `<title>`: `[Article Title] | Blog | Rashedul Raha`
   - Meta `<description>`: Clean summary extracted from your post.
   - Canonical URL: `https://rashedulraha.com/blog/[slug]`

2. **OpenGraph & Social Cards**:
   - Facebook/LinkedIn OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:type="article"`, `og:url`).
   - Twitter Card meta tags (`twitter:card="summary_large_image"`).

3. **JSON-LD Rich Snippet (Schema.org `BlogPosting`)**:
   - Automatically injected into the page head so Google Search, Bing, and AI Search crawlers index your article with author credits (`Rashedul Raha`), publication timestamp, headline, and image.

---

## 🎨 Typography & Design Features

- **Font Weight**: Headings and article text use `font-normal` weight for an elegant, non-bold reading aesthetic.
- **Rich Elements**: Supports syntax-highlighted code blocks with a one-click Copy button, callout notice boxes, lists, links, and responsive images.
- **Footer Included**: Every blog page includes the global website `<Footer />`.
