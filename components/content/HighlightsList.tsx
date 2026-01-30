import { CheckCircle2 } from 'lucide-react';

interface HighlightsListProps {
  highlights: string[];
  title?: string;
  className?: string;
}

export default function HighlightsList({ highlights, title, className = '' }: HighlightsListProps) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className={className}>
      {title && (
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
      )}
      <ul className="space-y-4">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-lg text-gray-700">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
