import { formatContentForDisplay } from '@/lib/ai/formatter';

interface SalesContentSectionProps {
  content: string;
  className?: string;
}

export default function SalesContentSection({ content, className = '' }: SalesContentSectionProps) {
  if (!content) return null;

  const formattedContent = formatContentForDisplay(content);

  return (
    <div
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: formattedContent }}
      style={{
        // Custom prose styling
        lineHeight: '1.7',
      }}
    />
  );
}
