/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Car, Promotion, BusinessInfo } from './types';

export const INITIAL_CARS: Car[] = [
  {
    id: '1',
    name: 'Toyota Corolla 2023',
    category: 'Sedan',
    price: 120,
    status: 'Available',
    seats: 5,
    transmission: 'Automatic',
    ac: true,
    fuel: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    name: 'Nissan Sunny 2022',
    category: 'Economy',
    price: 80,
    status: 'Available',
    seats: 5,
    transmission: 'Automatic',
    ac: true,
    fuel: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '3',
    name: 'Hyundai Accent 2023',
    category: 'Economy',
    price: 90,
    status: 'Available',
    seats: 5,
    transmission: 'Automatic',
    ac: true,
    fuel: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '4',
    name: 'Toyota Camry 2023',
    category: 'Sedan',
    price: 150,
    status: 'Rented',
    seats: 5,
    transmission: 'Automatic',
    ac: true,
    fuel: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '5',
    name: 'Mitsubishi Pajero 2022',
    category: 'SUV',
    price: 200,
    status: 'Available',
    seats: 7,
    transmission: 'Automatic',
    ac: true,
    fuel: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '6',
    name: 'Toyota Land Cruiser 2022',
    category: 'SUV',
    price: 350,
    status: 'Available',
    seats: 7,
    transmission: 'Automatic',
    ac: true,
    fuel: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '7',
    name: 'Nissan Patrol 2023',
    category: 'SUV',
    price: 380,
    status: 'Reserved',
    seats: 7,
    transmission: 'Automatic',
    ac: true,
    fuel: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '8',
    name: 'Kia Sportage 2023',
    category: 'SUV',
    price: 180,
    status: 'Available',
    seats: 5,
    transmission: 'Automatic',
    ac: true,
    fuel: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1627454820516-dc767bc63aa9?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '9',
    name: 'BMW 3 Series 2022',
    category: 'Luxury',
    price: 280,
    status: 'Available',
    seats: 5,
    transmission: 'Automatic',
    ac: true,
    fuel: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '10',
    name: 'Mercedes C-Class 2023',
    category: 'Luxury',
    price: 320,
    status: 'Available',
    seats: 5,
    transmission: 'Automatic',
    ac: true,
    fuel: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '11',
    name: 'Toyota Hiace Van 2022',
    category: 'Van',
    price: 250,
    status: 'Rented',
    seats: 12,
    transmission: 'Automatic',
    ac: true,
    fuel: 'Diesel',
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '12',
    name: 'GMC Yukon 2023',
    category: 'SUV',
    price: 420,
    status: 'Available',
    seats: 7,
    transmission: 'Automatic',
    ac: true,
    fuel: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600'
  }
];

export const INITIAL_BUSINESS_INFO: BusinessInfo = {
  name: 'Speed Rental RAK',
  phone: '050 602 4221',
  phoneFormatted: '+971506024221',
  address: '2 Al Nuwawir St, Al Juwais, Ras Al Khaimah, UAE',
  hours: 'Open Daily — Closes 12:00 AM Midnight',
  whatsapp: '971506024221',
  rating: 4.3,
  reviewCount: 20,
};

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: 'banner-1',
    title: 'Book 7+ Days — Get 1 Day FREE',
    description: 'Rent any vehicle for a week or more and only pay for 6 days. Applied automatically at pickup.',
    bgColorClass: 'bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 font-semibold',
    isActive: true
  },
  {
    id: 'banner-2',
    title: 'First Time? Get 10% OFF with code: SPEED10',
    description: 'Mention this promo code during booking on phone or WhatsApp to get 10% flat discount on select models.',
    bgColorClass: 'border border-amber-500/30 bg-slate-900/80 text-amber-400',
    code: 'SPEED10',
    isActive: true
  }
];

export const TESTIMONIALS = [
  {
    name: 'Anup Rajput',
    text: 'Amazing Service, special thanks to Suhail, he makes everything so comfortable. All cars are well maintained. Highly recommend!',
    rating: 5,
    source: 'Google Reviews'
  },
  {
    name: 'Shihab',
    text: 'Affordable price. Very helpful employees — Ajmal and Ubaida.',
    rating: 5,
    source: 'Google Reviews'
  },
  {
    name: 'Ramees Al Zabi',
    text: 'Best price and experience, truly unique.',
    rating: 5,
    source: 'Google Reviews'
  },
  {
    name: 'Juma Juma',
    text: 'Excellent service and management; they are considerate and kind. Recommended 👍',
    rating: 5,
    source: 'Google Reviews'
  },
  {
    name: 'Amany Mosa',
    text: 'The best rental office, characterized by high professionalism.',
    rating: 5,
    source: 'Google Reviews'
  }
];

export const FAQS = [
  {
    question: 'What documents do I need to rent a car?',
    answer: 'UAE Residents: UAE/Emirates ID + valid UAE driving license. Tourists/Visitors: Valid original passport + entry stamp + National driving license from country of origin (or valid International Driving Permit/license if required).'
  },
  {
    question: 'Is there a minimum age to rent?',
    answer: 'Yes, the minimum legal age to rent any passenger car in Ras Al Khaimah with us is 21 years old.'
  },
  {
    question: 'Do you offer free delivery?',
    answer: 'Yes, we offer complimentary, free vehicle delivery and collection services within Ras Al Khaimah (RAK) city limits.'
  },
  {
    question: 'What are your operating hours?',
    answer: 'Our reservation office is open daily from 8:00 AM until 12:00 AM midnight, 7 days a week, including weekends and public holidays.'
  },
  {
    question: 'Is insurance included?',
    answer: 'Yes, all our vehicles are fully insured and come with standard third-party liability and basic comprehensive coverage in accordance with UAE regulations.'
  },
  {
    question: 'Can I pay by credit card?',
    answer: 'Yes, we accept cash payments, other major credit/debit cards (Visa, MasterCard), and secure electronic bank transfers.'
  },
  {
    question: 'What happens if I\'m involved in an accident?',
    answer: 'State-issued police report is mandatory under UAE law. Immediately report the issue to the police (call 999) and then call us at 050 602 4221 so we can assist you with recovery.'
  },
  {
    question: 'Can I extend my rental?',
    answer: 'Yes, please notify us at least 24 hours prior to your scheduled return time. Extensions are subject to vehicle availability and rate agreements.'
  },
  {
    question: 'Is there a deposit required?',
    answer: 'Yes, a refundable security deposit is standard when renting. This acts as security against traffic fines, Salik/tolls, and physical damage, and is refunded back within 15-21 business days.'
  },
  {
    question: 'Do you offer airport pickup/dropoff?',
    answer: 'Yes, we can arrange delivery and return collections at DXB, SHJ, or RAK airports for an additional delivery fee. Please book in advance!'
  },
  {
    question: 'Can tourists rent a car?',
    answer: 'Yes, tourists with valid tourist visas and valid international driving permits (or approved home licenses for matching GCC/European countries) are welcome to rent.'
  },
  {
    question: 'What fuel policy applies?',
    answer: 'All cars are provided with a full/partial tank of petrol, and we appreciate it if they are returned with the same amount of fuel loaded.'
  }
];
