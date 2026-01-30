import { GraduationCap, Train, ShoppingBag, Palmtree } from 'lucide-react';

interface Amenities {
  schools?: string[];
  transport?: string[];
  shopping?: string[];
  leisure?: string[];
}

interface AmenitiesGridProps {
  amenities: Amenities;
  title?: string;
  className?: string;
}

const iconMap = {
  schools: GraduationCap,
  transport: Train,
  shopping: ShoppingBag,
  leisure: Palmtree,
};

const labelMap = {
  schools: 'Scholen & Onderwijs',
  transport: 'Bereikbaarheid',
  shopping: 'Winkels & Voorzieningen',
  leisure: 'Recreatie & Vrije tijd',
};

export default function AmenitiesGrid({ amenities, title, className = '' }: AmenitiesGridProps) {
  if (!amenities || Object.keys(amenities).length === 0) return null;

  const categories = Object.entries(amenities).filter(([_, items]) => items && items.length > 0);

  if (categories.length === 0) return null;

  return (
    <div className={className}>
      {title && (
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map(([category, items]) => {
          const Icon = iconMap[category as keyof typeof iconMap];
          const label = labelMap[category as keyof typeof labelMap];

          return (
            <div key={category} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                {Icon && <Icon className="w-6 h-6 text-blue-600" />}
                <h4 className="text-xl font-semibold">{label}</h4>
              </div>
              <ul className="space-y-2">
                {(items as string[]).map((item: string, index: number) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="mr-2 text-blue-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
