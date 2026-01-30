import { MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Neighborhood {
  name: string;
  description: string;
}

interface NeighborhoodCardsProps {
  neighborhoods: Neighborhood[];
  title?: string;
  className?: string;
}

export default function NeighborhoodCards({ neighborhoods, title, className = '' }: NeighborhoodCardsProps) {
  if (!neighborhoods || neighborhoods.length === 0) return null;

  return (
    <div className={className}>
      {title && (
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {neighborhoods.map((neighborhood, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-xl">{neighborhood.name}</CardTitle>
              </div>
              <CardDescription className="text-base leading-relaxed">
                {neighborhood.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
