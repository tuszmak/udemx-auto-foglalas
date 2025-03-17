import { BookingData, Car } from './types';

export const cars: Car[] = [
  {
    type: 'Sedan',
    image:
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder URL for the image
    dailyPrice: 50,
    reservedFrom: new Date('2025-03-10'),
    reservedUntil: new Date('2025-03-15'),
  },
  {
    type: 'SUV',
    image:
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Placeholder URL for the image
    dailyPrice: 80,
    reservedFrom: null,
    reservedUntil: null,
  },
  {
    type: 'Convertible',
    image: 'https://img.hasznaltautocdn.com/640x480/21636274/9040738.jpg', // Placeholder URL for the image
    dailyPrice: 100,
    reservedFrom: new Date('2025-03-20'),
    reservedUntil: new Date('2025-03-25'),
  },
  {
    type: 'Coupe',
    image: 'https://img.hasznaltautocdn.com/640x480/21625876/8939184.jpg', // Placeholder URL for the image
    dailyPrice: 70,
    reservedFrom: new Date('2025-03-05'),
    reservedUntil: new Date('2025-03-10'),
  },
  {
    type: 'Hatchback',
    image: 'https://img.hasznaltautocdn.com/640x480/20677247/651179.jpg', // Placeholder URL for the image
    dailyPrice: 40,
    reservedFrom: null,
    reservedUntil: null,
  },
];

export const dummyBookingData: BookingData[] = [
  {
    carName: 'Toyota Corolla',
    name: 'John Doe',
    email: 'johndoe@example.com',
    location: 'New York',
    phoneNumber: '123-456-7890',
    daysToRent: 5,
    price: 250,
  },
  {
    carName: 'Honda Civic',
    email: 'janesmith@example.com',
    location: 'Los Angeles',
    phoneNumber: '987-654-3210',
    daysToRent: 3,
  },
  {
    carName: 'Ford Mustang',
    name: 'Alice Johnson',
    email: 'alicej@example.com',
    location: 'Chicago',
    phoneNumber: '555-123-4567',
    daysToRent: 7,
    price: 700,
  },
];

export function createNewCarBackend(newCar: Car) {
  cars.push(newCar);
}

export function modifyCar(car: Car, result: Car | undefined) {
  car.dailyPrice = result?.dailyPrice ?? car.dailyPrice;
  car.type = result?.type ?? car.type;
}
