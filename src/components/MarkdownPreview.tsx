"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownPreviewProps = {
  content: string;
  repoUrl?: string;
};

export default function MarkdownPreview({
  content,
  repoUrl,
}: MarkdownPreviewProps) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white dark:bg-zinc-950">
      {repoUrl ? (
        <div className="shrink-0 border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium uppercase tracking-wide text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            View on GitHub
          </a>
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-auto px-4 py-3 sm:px-5 sm:py-4">
        <div className="text-sm leading-relaxed text-zinc-800 [&_a]:text-slate-700 [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-zinc-300 [&_blockquote]:pl-4 [&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_h1]:mt-0 [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:mt-6 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mt-4 [&_h3]:text-sm [&_h3]:font-semibold [&_hr]:my-6 [&_hr]:border-zinc-200 [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-3 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-zinc-100 [&_pre]:p-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-semibold [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs [&_td]:border [&_td]:border-zinc-200 [&_td]:px-2 [&_td]:py-1.5 [&_th]:border [&_th]:border-zinc-200 [&_th]:bg-zinc-50 [&_th]:px-2 [&_th]:py-1.5 [&_th]:text-left [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 dark:text-zinc-200 dark:[&_code]:bg-zinc-900 dark:[&_hr]:border-zinc-700 dark:[&_pre]:bg-zinc-900 dark:[&_td]:border-zinc-700 dark:[&_th]:border-zinc-700 dark:[&_th]:bg-zinc-900">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
