
import React from 'react';
import { BRISTOL_STOOL_SCALE } from '../constants';
import { BristolType } from '../types';

interface Props {
  value: BristolType;
  onChange: (val: BristolType) => void;
}

const BristolSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {(Object.entries(BRISTOL_STOOL_SCALE) as unknown as [BristolType, any][]).map(([type, info]) => {
        const isSelected = value === Number(type);
        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange(Number(type) as BristolType)}
            className={`p-4 text-left border rounded-xl transition-all ${
              isSelected 
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="font-bold text-blue-800 mb-1">{info.title}</div>
            <p className="text-xs text-gray-600 leading-relaxed">{info.description}</p>
          </button>
        );
      })}
    </div>
  );
};

export default BristolSelector;
