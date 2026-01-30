import { TrendingUp } from 'lucide-react';

interface MarketInsightBoxProps {
  content: string;
  title?: string;
  className?: string;
}

export default function MarketInsightBox({ content, title, className = '' }: MarketInsightBoxProps) {
  if (!content) return null;

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-lg p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          {title && (
            <h4 className="text-xl font-semibold mb-3 text-gray-900">{title}</h4>
          )}
          <p className="text-gray-700 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}
