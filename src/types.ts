/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Car {
  id: string;
  name: string;
  category: 'Economy' | 'Sedan' | 'SUV' | 'Luxury' | 'Van';
  price: number; // Daily price in AED
  status: 'Available' | 'Rented' | 'Reserved';
  seats: number;
  transmission: 'Automatic' | 'Manual';
  ac: boolean;
  fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  imageUrl: string;
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
  id: string;
  title: string;
  description: string;
  code?: string;
  bgColorClass: string;
  isActive: boolean;
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
