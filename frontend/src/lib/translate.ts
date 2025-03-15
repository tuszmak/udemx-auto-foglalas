import { BookingData } from './types';

export function translateColumnName(columnName: keyof BookingData) {
  switch (columnName) {
    case 'carName':
      return 'Autómodel';
    case 'name':
      return 'Foglaló neve';
    case 'email':
      return 'Foglaló Emailje';
    case 'location':
      return 'Foglaló lakóhelye';
    case 'phoneNumber':
      return 'Foglaló telefonszáma';
    case 'daysToRent':
      return 'Foglalt napok';
    case 'price':
      return 'Foglalás ára';
    default:
      columnName satisfies never;
      return '';
  }
}
