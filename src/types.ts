/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Car {
  id: string | number;
  name: string;
  category: 'Economy' | 'Sedan' | 'SUV' | 'Luxury' | 'Van';
  price: number; // Daily price in AED
  status: 'Available' | 'Rented' | 'Reserved' | 'Under Maintenance' | string;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  ac: boolean | string;
  fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | string;
  imageUrl: string;
  
  // Extended fields for detail modal
  brand?: string;
  model?: string;
  year?: number;
  color?: string;
  plateNumber?: string;
  doors?: number;
  fuelType?: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | string;
  driveType?: '2WD' | '4WD' | 'AWD' | string;
  engineSize?: string;
  dailyPrice?: number;
  weeklyPrice?: number;
  monthlyPrice?: number;
  securityDeposit?: number;
  mileageLimit?: string;
  additionalImages?: string[];
  features?: {
    appleCarplay?: boolean;
    androidAuto?: boolean;
    usbCharging?: boolean;
    rearCamera?: boolean;
    backupCamera?: boolean;
    parkingSensors?: boolean;
    bluetooth?: boolean;
    ac?: boolean;
    sunroof?: boolean;
    leatherSeats?: boolean;
    childSeat?: boolean;
    gps?: boolean;
    spareTyre?: boolean;
    wifi?: boolean;
  };
  description?: string;
}

export interface Inquiry {
  id: string;
  date: string;
  name: string;
  phone: string;
  message: string;
  status: 'New' | 'Contacted' | 'Done';
  adminNotes?: string;
}

export interface Promotion {
  id: string | number;
  emoji?: string;
  title: string;
  description: string;
  promoCode?: string;
  code?: string;
  validUntil?: string;
  active?: boolean;
  isActive: boolean;
  bgColorClass?: string;
}

export interface BusinessInfo {
  name: string;
  phone: string;
  phoneFormatted: string;
  address: string;
  hours: string;
  whatsapp: string;
  rating: number;
  reviewCount: number;
}
