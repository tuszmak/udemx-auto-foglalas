import { z } from 'zod';

const Email = z.string({}).email();

export interface Car {
  type: string;
  image: string | ImageBitmap;
  dailyPrice: number;
  reservedFrom: Date | null;
  reservedUntil: Date | null;
}

export const BookingSchema = z.object({
  name: z.string().default('No name'),
  email: z.string().email(),
  location: z.string(),
  phoneNumber: z.string(),
  dateToRent: z.number(),
  price: z.number(),
});
