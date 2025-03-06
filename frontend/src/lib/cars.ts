import { BookingData, Car } from './types';

export const changeCarState = (
  car: Car,
  booking: BookingData,
  startOfBooking: Date
) => {
  car.reservedFrom = startOfBooking;

  const endOfBooking = new Date(startOfBooking);
  endOfBooking.setDate(endOfBooking.getDate() + booking.daysToRent);
  car.reservedUntil = endOfBooking;
};
