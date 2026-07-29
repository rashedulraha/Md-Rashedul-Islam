import { getProjectBanner, ProjectData } from "@/types/project";
import { getProjectById } from "@/services/apiService";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
import { Link } from "@/routing";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import ProjectMarkdownRenderer from "@/components/ProjectMarkdownRenderer";
import TableOfContents from "@/components/TableOfContents";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const res = await getProjectById(resolvedParams.id);
    if (res.data?.success && res.data?.data) {
      const item = res.data.data;
      const title = `${item.title} | Rashedul Raha Portfolio`;
      const description =
        item.subtitle ||
        item.description?.slice(0, 160) ||
        "Project overview and dynamic documentation.";
      const imageUrl = item.image || "/images/og-default.jpg";

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          url: `https://rashedulraha.com/work/${item.slug || item.id}`,
          siteName: "Rashedul Raha Portfolio",
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: item.title,
            },
          ],
          type: "article",
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [imageUrl],
        },
        alternates: {
          canonical: `https://rashedulraha.com/work/${item.slug || item.id}`,
        },
      };
    }
  } catch (e) {
    // fallback
  }

  return {
    title: "Project Details | Rashedul Raha",
    description: "View project details, tech stack, and documentation.",
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  let project: ProjectData | null = null;
  let rawItem: any = null;

  try {
    const res = await getProjectById(resolvedParams.id);
    if (res.data?.success && res.data?.data) {
      rawItem = res.data.data;
      project = {
        id: rawItem.id || rawItem.slug,
        name: rawItem.title,
        tagline: rawItem.subtitle || rawItem.type || "Web App",
        overview: rawItem.description,
        live_demo: rawItem.liveUrl || undefined,
        github_repo: rawItem.githubUrl || undefined,
        silicon_img_banner: rawItem.image || undefined,
        readmeContent: rawItem.readmeContent || undefined,
        screenshots: [],
        tech_stack: {
          frameworks_libraries: rawItem.tags || [],
          languages: rawItem.tags || [],
        },
        key_features: rawItem.features || [],
      } as ProjectData;

      Object.assign(project, rawItem);
    }
  } catch (err) {
    console.error("Failed to fetch project details", err);
  }

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.overview,
    applicationCategory: project.tagline || "DeveloperApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: "Rashedul Raha",
      url: "https://rashedulraha.com",
    },
    url: `https://rashedulraha.com/work/${project.id}`,
    image: getProjectBanner(project),
  };

  return (
    <PageWrapper>
      {/* JSON-LD Rich Snippet for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-14">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </div>

        {/* Documentation Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start relative">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0 w-full lg:max-w-[850px] xl:max-w-[950px]">
            {/* Header Section */}
            <header className="mb-10 pb-8 border-b border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center rounded-md bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {project.tagline || "Project Specs"}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                {project.name}
              </h1>
              {project.overview && (
                <p className="text-base md:text-lg text-muted-foreground font-normal leading-relaxed mb-6">
                  {project.overview}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.live_demo && (
                  <a
                    href={project.live_demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 shadow-sm"
                  >
                    Visit Live Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.github_repo && (
                  <a
                    href={project.github_repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-accent"
                  >
                    <Code className="w-4 h-4" />
                    Source Code
                  </a>
                )}
              </div>
            </header>

            {/* Banner Image */}
            {project.silicon_img_banner && (
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-muted/30 border border-border/50 shadow-md mb-12">
                <Image
                  src={getProjectBanner(project)}
                  alt={`${project.name} Banner`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Markdown Content */}
            <div className="pb-16 border-b border-border/50">
              {project.readmeContent ? (
                <ProjectMarkdownRenderer content={project.readmeContent} />
              ) : (
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <h2 id="overview">Overview</h2>
                  <p>{project.overview}</p>

                  {project.key_features && project.key_features.length > 0 && (
                    <>
                      <h2 id="features">Key Features</h2>
                      <ul>
                        {project.key_features.map((f: string, i: number) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="p-6 bg-muted/20 border border-border/50 rounded-xl mt-8">
                    <p className="text-sm text-muted-foreground mb-0">
                      <strong>Note:</strong> This project is currently using
                      legacy data fields. To upgrade it to the new documentation
                      format, add content to the <code>readmeContent</code>{" "}
                      field in your database.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar (Table of Contents) */}
          <aside className="hidden lg:block w-[250px] shrink-0 sticky top-24 pt-2">
            {project.readmeContent ? (
              <TableOfContents content={project.readmeContent} />
            ) : (
              <nav className="space-y-4">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80">
                  On this page
                </h3>
                <ul className="space-y-2 text-sm border-l border-border/40 pl-3">
                  <li>
                    <a
                      href="#overview"
                      className="block text-muted-foreground hover:text-foreground py-1"
                    >
                      Overview
                    </a>
                  </li>
                  {project.key_features && project.key_features.length > 0 && (
                    <li>
                      <a
                        href="#features"
                        className="block text-muted-foreground hover:text-foreground py-1"
                      >
                        Key Features
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </article>
      <Footer />
    </PageWrapper>
  );
}
