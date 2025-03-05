import { Car } from './types';

export const cars: Car[] = [
  {
    type: 'Sedan',
    image: 'https://example.com/sedan-image.jpg', // Placeholder URL for the image
    dailyPrice: 50,
    reservedFrom: new Date('2025-03-10'),
    reservedUntil: new Date('2025-03-15'),
  },
  {
    type: 'SUV',
    image: 'https://example.com/suv-image.jpg', // Placeholder URL for the image
    dailyPrice: 80,
    reservedFrom: null,
    reservedUntil: null,
  },
  {
    type: 'Convertible',
    image: 'https://example.com/convertible-image.jpg', // Placeholder URL for the image
    dailyPrice: 100,
    reservedFrom: new Date('2025-03-20'),
    reservedUntil: new Date('2025-03-25'),
  },
  {
    type: 'Coupe',
    image: 'https://example.com/coupe-image.jpg', // Placeholder URL for the image
    dailyPrice: 70,
    reservedFrom: new Date('2025-03-05'),
    reservedUntil: new Date('2025-03-10'),
  },
  {
    type: 'Hatchback',
    image: 'https://example.com/hatchback-image.jpg', // Placeholder URL for the image
    dailyPrice: 40,
    reservedFrom: null,
    reservedUntil: null,
  },
];
