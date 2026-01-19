import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  value,
  label,
  color = 'text-gray-500'
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
      <div className={`${color} mb-1`}>
        <Icon className="w-6 h-6 mx-auto" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
};
