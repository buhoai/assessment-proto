import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface Props {
  items: NavigationItem[];
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Navigation({ items, currentView, onNavigate }: Props) {
  return (
    <nav className="bg-white shadow rounded-lg">
      <div className="flex">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors
                ${isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}