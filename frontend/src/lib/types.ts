import { z } from 'zod';

const Email = z.string({}).email();

export interface Car {
  type: string;
  image: string | ImageBitmap;
  dailyPrice: number;
  reservedFrom: Date | null;
  reservedUntil: Date | null;
}

export interface BookingData {
  name?: string;
  email: string;
  location: string;
  phoneNumber: string;
  daysToRent: number;
  price: number;
}

export const BookingSchema = z.object({
  name: z.string().default('No name'),
  email: z.string().email(),
  location: z.string(),
  phoneNumber: z.string(),
  daysToRent: z.number(),
  price: z.number(),
});
