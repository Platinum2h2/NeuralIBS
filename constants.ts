
import { BristolType } from './types';

export const BRISTOL_STOOL_SCALE: Record<BristolType, { title: string; description: string }> = {
  1: { title: 'Type 1', description: 'Separate hard lumps, like nuts (hard to pass)' },
  2: { title: 'Type 2', description: 'Sausage-shaped but lumpy' },
  3: { title: 'Type 3', description: 'Like a sausage but with cracks on its surface' },
  4: { title: 'Type 4', description: 'Like a sausage or snake, smooth and soft' },
  5: { title: 'Type 5', description: 'Soft blobs with clear-cut edges (passed easily)' },
  6: { title: 'Type 6', description: 'Fluffy pieces with ragged edges, a mushy stool' },
  7: { title: 'Type 7', description: 'Watery, no solid pieces. Entirely Liquid' }
};

export const SYMPTOM_TIMING_OPTIONS = [
  'After large meals',
  'During high stress',
  'First thing in the morning',
  'Wakes me up at night',
  'Related to menstrual cycle',
  'Random / Unpredictable'
];

export const DIET_OPTIONS = [
  'High fiber',
  'High processed foods',
  'Low FODMAP',
  'Vegetarian/Vegan',
  'Ketogenic',
  'General/Mixed'
];
