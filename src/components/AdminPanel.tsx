/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Car, Inquiry, Promotion, BusinessInfo } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  inquiries: Inquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>;
  promotions: Promotion[];
  setPromotions: React.Dispatch<React.SetStateAction<Promotion[]>>;
  business: BusinessInfo;
  setBusiness: React.Dispatch<React.SetStateAction<BusinessInfo>>;
}

export default function AdminPanel({
  isOpen,
  onClose,
  cars,
  setCars,
  inquiries,
  setInquiries,
  promotions,
  setPromotions,
  business,
  setBusiness
}: AdminPanelProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [activeTab, setActiveTab] = useState<'cars' | 'inquiries' | 'offers' | 'business' | 'analytics'>('cars');

  // Car list states
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [editCarForm, setEditCarForm] = useState<Partial<Car>>({});
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [newCarForm, setNewCarForm] = useState<Omit<Car, 'id'>>({
    name: '',
    category: 'Sedan',
    price: 150,
    status: 'Available',
    seats: 5,
    transmission: 'Automatic',
    ac: true,
    fuel: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
  });

  // Analytics helper metrics
  const totalPageViews = parseInt(localStorage.getItem('speed_rental_page_views') || '128', 10);
  const countCarsByStatus = (status: Car['status']) => cars.filter((c) => c.status === status).length;

  useEffect(() => {
    // Clear credentials on close
    if (!isOpen) {
      setUsername('');
      setPassword('');
      setErrorMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Authorization Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === 'speed2024') {
      setIsLogged(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid login credentials. Hint: admin / speed2024');
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    setUsername('');
    setPassword('');
    onClose();
    window.location.hash = '';
  };

  // Car Fleet Actions
  const handleStatusToggle = (id: string) => {
    setCars((prev) => {
      const updated = prev.map((car) => {
        if (car.id === id) {
          const statuses: Car['status'][] = ['Available', 'Rented', 'Reserved'];
          const currentIndex = statuses.indexOf(car.status);
          const nextIndex = (currentIndex + 1) % statuses.length;
          return { ...car, status: statuses[nextIndex] };
        }
        return car;
      });
      localStorage.setItem('speed_rental_cars', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCarDelete = (id: string) => {
    if (window.confirm('Are you absolutely sure you want to remove this vehicle from the fleet?')) {
      setCars((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        localStorage.setItem('speed_rental_cars', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const startCarEditing = (car: Car) => {
    setEditingCarId(car.id);
    setEditCarForm(car);
  };

  const saveCarChanges = () => {
    if (!editingCarId) return;
    setCars((prev) => {
      const updated = prev.map((c) => (c.id === editingCarId ? { ...c, ...editCarForm } as Car : c));
      localStorage.setItem('speed_rental_cars', JSON.stringify(updated));
      return updated;
    });
    setEditingCarId(null);
  };

  const handleAddCarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCar: Car = {
      id: Date.now().toString(),
      ...newCarForm,
    };
    setCars((prev) => {
      const updated = [newCar, ...prev];
      localStorage.setItem('speed_rental_cars', JSON.stringify(updated));
      return updated;
    });
    setIsAddingCar(false);
    // Reset form
    setNewCarForm({
      name: '',
      category: 'Sedan',
      price: 150,
      status: 'Available',
      seats: 5,
      transmission: 'Automatic',
      ac: true,
      fuel: 'Petrol',
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
    });
  };

  // Inquiry Log Actions
  const handleInquiryStatusChange = (id: string, nextStatus: Inquiry['status']) => {
    setInquiries((prev) => {
      const updated = prev.map((inq) => (inq.id === id ? { ...inq, status: nextStatus } : inq));
      localStorage.setItem('speed_rental_inquiries', JSON.stringify(updated));
      return updated;
    });
  };

  const handleInqNotesSave = (id: string, notes: string) => {
    setInquiries((prev) => {
      const updated = prev.map((inq) => (inq.id === id ? { ...inq, adminNotes: notes } : inq));
      localStorage.setItem('speed_rental_inquiries', JSON.stringify(updated));
      return updated;
    });
  };

  const clearInquiries = () => {
    if (window.confirm('Delete all recorded inquiries from log?')) {
      setInquiries([]);
      localStorage.setItem('speed_rental_inquiries', JSON.stringify([]));
    }
  };

  // Promo Banner Actions
  const handlePromoToggle = (id: string) => {
    setPromotions((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p));
      localStorage.setItem('speed_rental_promotions', JSON.stringify(updated));
      return updated;
    });
  };

  const handlePromoTextEdit = (id: string, title: string, desc: string, code?: string) => {
    setPromotions((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, title, description: desc, code } : p));
      localStorage.setItem('speed_rental_promotions', JSON.stringify(updated));
      return updated;
    });
  };

  // Business Meta Actions
  const handleBusinessInfoSave = (field: keyof BusinessInfo, value: any) => {
    setBusiness((prev) => {
      const updated = { ...prev, [field]: value };
      localStorage.setItem('speed_rental_business', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A0A]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      
      {/* 1. LOCK SHEET IF NOT LOGGED */}
      {!isLogged ? (
        <div className="bg-[#111111] w-full max-w-md rounded p-8 border border-[#2E2E2E] text-center shadow-2xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer">
            <i className="fa-solid fa-xmark"></i>
          </button>
          
          <div className="w-16 h-16 rounded bg-white/5 border border-[#2E2E2E] flex items-center justify-center text-white text-2xl mx-auto mb-6">
            <i className="fa-solid fa-shield-halved"></i>
          </div>

          <h3 className="font-serif text-2xl font-bold text-white mb-1">Speed Rental Console</h3>
          <p className="text-xs text-[#AAAAAA] mb-6 uppercase tracking-widest font-mono">Password Restricted Access</p>

          {errorMsg && (
            <div className="p-3 rounded bg-white/5 border border-white/25 text-white text-xs text-left mb-4">
              <i className="fa-solid fa-triangle-exclamation mr-1.5"></i> {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-left font-sans">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#AAAAAA] block mb-1">Username</label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="default: admin"
                className="w-full bg-[#0A0A0A] border border-[#2E2E2E] rounded p-3 text-sm text-white focus:outline-none focus:border-white"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#AAAAAA] block mb-1">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="default: speed2024"
                className="w-full bg-[#0A0A0A] border border-[#2E2E2E] rounded p-3 text-sm text-white focus:outline-none focus:border-white"
                required
              />
            </div>

            <button
              id="admin-login-submit"
              type="submit"
              className="py-3 bg-white text-black hover:bg-[#E0E0E0] text-xs font-bold uppercase rounded transition-all duration-200 mt-2 cursor-pointer"
            >
              Authorize Secure Connection
            </button>
          </form>
        </div>
      ) : (
        
        // 2. LOGGED ADMIN DASHBOARD
        <div className="bg-[#0A0A0A] border border-[#2E2E2E] w-full max-w-6xl rounded overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] text-left font-sans">
          
          {/* SIDEBAR ON LEFT */}
          <div className="w-full md:w-64 bg-[#111111] border-b md:border-b-0 md:border-r border-[#2E2E2E] flex flex-col justify-between shrink-0">
            <div>
              <div className="p-6 border-b border-[#2E2E2E]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white font-semibold">COCKPIT PANEL</span>
                <h4 className="font-serif text-lg font-bold text-white mt-1 leading-none">Speed Rental</h4>
              </div>

              {/* Navigation list */}
              <nav className="p-4 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
                <button
                  id="tab-cars-btn"
                  onClick={() => setActiveTab('cars')}
                  className={`w-full text-left px-4 py-3 rounded flex items-center gap-3 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === 'cars' ? 'bg-white text-black shadow-md font-bold' : 'text-[#AAAAAA] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <i className="fa-solid fa-car-side"></i> <span>Fleet Manager</span>
                </button>

                <button
                  id="tab-inq-btn"
                  onClick={() => setActiveTab('inquiries')}
                  className={`w-full text-left px-4 py-3 rounded flex items-center gap-3 text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
                    activeTab === 'inquiries' ? 'bg-white text-black shadow-md font-bold' : 'text-[#AAAAAA] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <i className="fa-solid fa-envelope-open-text"></i> 
                  <span>Inquiries Log</span>
                  {inquiries.filter((q) => q.status === 'New').length > 0 && (
                    <span className="bg-white text-black font-extrabold text-[9px] w-5 h-5 rounded-full flex items-center justify-center leading-none border border-black">
                      {inquiries.filter((q) => q.status === 'New').length}
                    </span>
                  )}
                </button>

                <button
                  id="tab-offers-btn"
                  onClick={() => setActiveTab('offers')}
                  className={`w-full text-left px-4 py-3 rounded flex items-center gap-3 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === 'offers' ? 'bg-white text-black shadow-md font-bold' : 'text-[#AAAAAA] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <i className="fa-solid fa-tags"></i> <span>Offers Portal</span>
                </button>

                <button
                  id="tab-biz-btn"
                  onClick={() => setActiveTab('business')}
                  className={`w-full text-left px-4 py-3 rounded flex items-center gap-3 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === 'business' ? 'bg-white text-black shadow-md font-bold' : 'text-[#AAAAAA] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <i className="fa-solid fa-sliders"></i> <span>Business Metadata</span>
                </button>

                <button
                  id="tab-anal-btn"
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full text-left px-4 py-3 rounded flex items-center gap-3 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === 'analytics' ? 'bg-white text-black shadow-md font-bold' : 'text-[#AAAAAA] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <i className="fa-solid fa-chart-line"></i> <span>Analytics KPI</span>
                </button>
              </nav>
            </div>

            {/* Logout Row footer */}
            <div className="p-4 border-t border-[#2E2E2E] flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">Ver 2.6.0-RAK</span>
              <button
                id="admin-logout-btn"
                onClick={handleLogout}
                className="text-xs font-bold text-white hover:text-[#AAAAAA] flex items-center gap-1.5 p-1.5 rounded hover:bg-white/5 transition-colors duration-200 cursor-pointer"
              >
                <i className="fa-solid fa-power-off"></i> Logout
              </button>
            </div>

          </div>

          {/* MAIN CONTENT AREA ON RIGHT */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto flex flex-col gap-6 bg-[#0A0A0A]">
            
            {/* Tab 1: Fleet Manager */}
            {activeTab === 'cars' && (
              <div id="tab-fleet-content" className="flex flex-col gap-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white">Fleet Manager</h3>
                    <p className="text-xs text-[#AAAAAA]">Add, edit, toggle availability, or delete fleet vehicles instantly.</p>
                  </div>
                  <button
                    id="admin-add-car-trigger"
                    onClick={() => setIsAddingCar(!isAddingCar)}
                    className="px-4 py-2 bg-white hover:bg-[#E0E0E0] text-black font-sans font-bold text-xs uppercase rounded transition-colors duration-150 flex items-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-plus-circle"></i> Add New Vehicle
                  </button>
                </div>

                {/* Add New Car expansion drawer form */}
                {isAddingCar && (
                  <form onSubmit={handleAddCarSubmit} className="p-5 rounded bg-[#111111] border border-[#2E2E2E] flex flex-col gap-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Register New Vehicle Card</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-[#AAAAAA] uppercase font-semibold">Vehicle Name</label>
                        <input
                          id="add-car-name"
                          type="text"
                          value={newCarForm.name}
                          onChange={(e) => setNewCarForm({ ...newCarForm, name: e.target.value })}
                          placeholder="e.g. Audi R8 2024"
                          className="bg-[#0A0A0A] border border-[#2E2E2E] rounded p-2 text-xs text-white focus:outline-none focus:border-white"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-[#AAAAAA] uppercase font-semibold">Category Type</label>
                        <select
                          id="add-car-category"
                          value={newCarForm.category}
                          onChange={(e) => setNewCarForm({ ...newCarForm, category: e.target.value as any })}
                          className="bg-[#0A0A0A] border border-[#2E2E2E] rounded p-2 text-xs text-white focus:outline-none focus:border-white"
                        >
                          <option value="Economy">Economy</option>
                          <option value="Sedan">Sedan</option>
                          <option value="SUV">SUV</option>
                          <option value="Luxury">Luxury</option>
                          <option value="Van">Van</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-[#AAAAAA] uppercase font-semibold">Price per Day (AED)</label>
                        <input
                          id="add-car-price"
                          type="number"
                          value={newCarForm.price}
                          onChange={(e) => setNewCarForm({ ...newCarForm, price: parseInt(e.target.value, 10) })}
                          className="bg-[#0A0A0A] border border-[#2E2E2E] rounded p-2 text-xs text-white focus:outline-none focus:border-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-[#AAAAAA] uppercase font-semibold">Seat Count</label>
                        <input
                          id="add-car-seats"
                          type="number"
                          value={newCarForm.seats}
                          onChange={(e) => setNewCarForm({ ...newCarForm, seats: parseInt(e.target.value, 10) })}
                          className="bg-[#0A0A0A] border border-[#2E2E2E] rounded p-2 text-xs text-white focus:outline-none focus:border-white"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-[#AAAAAA] uppercase font-semibold">Transmission</label>
                        <select
                          id="add-car-transmission"
                          value={newCarForm.transmission}
                          onChange={(e) => setNewCarForm({ ...newCarForm, transmission: e.target.value as any })}
                          className="bg-[#0A0A0A] border border-[#2E2E2E] rounded p-2 text-xs text-white focus:outline-none focus:border-white"
                        >
                          <option value="Automatic">Automatic</option>
                          <option value="Manual">Manual</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-[#AAAAAA] uppercase font-semibold">Engine Fuel</label>
                        <select
                          id="add-car-fuel"
                          value={newCarForm.fuel}
                          onChange={(e) => setNewCarForm({ ...newCarForm, fuel: e.target.value as any })}
                          className="bg-[#0A0A0A] border border-[#2E2E2E] rounded p-2 text-xs text-white focus:outline-none focus:border-white"
                        >
                          <option value="Petrol">Petrol</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Electric">Electric</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-[#AAAAAA] uppercase font-semibold">Status Code</label>
                        <select
                          id="add-car-status"
                          value={newCarForm.status}
                          onChange={(e) => setNewCarForm({ ...newCarForm, status: e.target.value as any })}
                          className="bg-[#0A0A0A] border border-[#2E2E2E] rounded p-2 text-xs text-white focus:outline-none focus:border-white"
                        >
                          <option value="Available">Available</option>
                          <option value="Rented">Rented</option>
                          <option value="Reserved">Reserved</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-[#AAAAAA] uppercase font-semibold">Image URL Placeholder (Unsplash etc.)</label>
                      <input
                        id="add-car-image"
                        type="url"
                        value={newCarForm.imageUrl}
                        onChange={(e) => setNewCarForm({ ...newCarForm, imageUrl: e.target.value })}
                        className="bg-[#0A0A0A] border border-[#2E2E2E] rounded p-2 text-xs text-white focus:outline-none focus:border-white"
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        id="add-car-cancel"
                        type="button"
                        onClick={() => setIsAddingCar(false)}
                        className="px-4 py-2 border border-[#2E2E2E] rounded text-[#AAAAAA] hover:bg-white/5 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        id="add-car-submit"
                        type="submit"
                        className="px-4 py-2 bg-white text-black hover:bg-[#E0E0E0] rounded text-xs font-bold cursor-pointer"
                      >
                        Publish Car Card
                      </button>
                    </div>

                  </form>
                )}

                 {/* Cars Table list */}
                <div className="overflow-x-auto rounded border border-[#2E2E2E] bg-[#111111]/90">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#111111] text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-[#2E2E2E]">
                      <tr>
                        <th className="px-6 py-4 font-bold">Vehicle Name</th>
                        <th className="px-6 py-4 font-bold">Category</th>
                        <th className="px-6 py-4 font-bold">Price / Day</th>
                        <th className="px-6 py-4 text-center font-bold">Rental Status</th>
                        <th className="px-6 py-4 text-right font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2E2E2E]">
                      {cars.map((car) => {
                        const isEditing = editingCarId === car.id;
                        return (
                          <tr key={car.id} className="hover:bg-white/2 transition-colors duration-150">
                            <td className="px-6 py-4 font-bold text-white">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editCarForm.name || ''}
                                  onChange={(e) => setEditCarForm({ ...editCarForm, name: e.target.value })}
                                  className="bg-[#0A0A0A] border border-[#2E2E2E] rounded p-1 text-xs text-white focus:outline-none focus:border-white"
                                />
                              ) : (
                                car.name
                              )}
                            </td>
                            <td className="px-6 py-4 opacity-80">
                              {isEditing ? (
                                <select
                                  value={editCarForm.category || 'Sedan'}
                                  onChange={(e) => setEditCarForm({ ...editCarForm, category: e.target.value as any })}
                                  className="bg-[#0A0A0A] border border-[#2E2E2E] rounded p-1 text-xs text-white focus:outline-none"
                                >
                                  <option value="Economy">Economy</option>
                                  <option value="Sedan">Sedan</option>
                                  <option value="SUV">SUV</option>
                                  <option value="Luxury">Luxury</option>
                                  <option value="Van">Van</option>
                                </select>
                              ) : (
                                car.category
                              )}
                            </td>
                            <td className="px-6 py-4 font-mono font-semibold text-white">
                              {isEditing ? (
                                <input
                                  type="number"
                                  value={editCarForm.price || 0}
                                  onChange={(e) => setEditCarForm({ ...editCarForm, price: parseInt(e.target.value, 10) })}
                                  className="bg-[#0A0A0A] border border-[#2E2E2E] rounded p-1 text-xs text-white w-20 focus:outline-none"
                                />
                              ) : (
                                `AED ${car.price}/day`
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {isEditing ? (
                                <select
                                  value={editCarForm.status || 'Available'}
                                  onChange={(e) => setEditCarForm({ ...editCarForm, status: e.target.value as any })}
                                  className="bg-[#0A0A0A] border border-[#2E2E2E] rounded p-1 text-xs text-white focus:outline-none"
                                >
                                  <option value="Available">Available</option>
                                  <option value="Rented">Rented</option>
                                  <option value="Reserved">Reserved</option>
                                </select>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleStatusToggle(car.id)}
                                  className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors duration-150 cursor-pointer ${
                                    car.status === 'Available' 
                                      ? 'bg-white text-black font-extrabold border border-white' 
                                      : car.status === 'Rented' 
                                        ? 'bg-[#1A1A1A] text-[#AAAAAA] border border-[#2E2E2E]' 
                                        : 'bg-[#555555] text-white border border-[#2E2E2E]'
                                  }`}
                                  title="Click to cycle status"
                                >
                                  {car.status}
                                </button>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {isEditing ? (
                                  <button
                                    onClick={saveCarChanges}
                                    className="p-1 px-2.5 bg-white text-black rounded font-semibold text-[10px] uppercase cursor-pointer"
                                  >
                                    Save
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => startCarEditing(car)}
                                    className="p-1.5 bg-white/5 hover:bg-white/10 text-white rounded cursor-pointer"
                                    title="Edit car info"
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </button>
                                )}
                                <button
                                  onClick={() => handleCarDelete(car.id)}
                                  className="p-1.5 bg-[#1A1A1A] border border-[#2E2E2E] hover:bg-white hover:text-black text-[#AAAAAA] rounded cursor-pointer"
                                  title="Wipe from inventory"
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* Tab 2: Inquiries Log */}
            {activeTab === 'inquiries' && (
              <div id="tab-inq-content" className="flex flex-col gap-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white">Booking / Inquiries Log</h3>
                    <p className="text-xs text-[#AAAAAA]">Review form requests filed by customers on the fleet & contact widgets.</p>
                  </div>
                  {inquiries.length > 0 && (
                    <button
                      id="inq-clear-btn"
                      onClick={clearInquiries}
                      className="px-4 py-2 border border-[#2E2E2E] bg-[#1a1a1a] hover:bg-white hover:text-black text-[#AAAAAA] text-xs font-bold uppercase rounded transition-colors duration-150 cursor-pointer"
                    >
                      Clear Log file
                    </button>
                  )}
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center text-[#AAAAAA] py-16 border border-dashed border-[#2E2E2E] rounded text-xs">
                    <i className="fa-solid fa-envelope text-3xl opacity-35 mb-4 text-white"></i>
                    <p className="text-sm">Inquiries folder is currently empty.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {inquiries.map((inq) => (
                      <div 
                        key={inq.id} 
                        className={`p-5 rounded border flex flex-col sm:flex-row gap-4 justify-between items-start text-xs sm:text-sm ${
                          inq.status === 'New' ? 'bg-[#1A1A1A] border-white' : 'bg-[#111111] border-[#2E2E2E]'
                        }`}
                      >
                        <div className="flex-1 w-full">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-mono text-[10px] text-slate-500">{inq.date}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                              inq.status === 'New' ? 'bg-white text-black font-extrabold border border-white' : inq.status === 'Contacted' ? 'bg-[#555555] text-white' : 'bg-[#1A1A1A] text-[#AAAAAA] border border-[#2E2E2E]'
                            }`}>
                              {inq.status}
                            </span>
                            <span className="font-bold text-white text-sm">{inq.name}</span>
                          </div>

                          <p className="mt-2 text-white font-semibold">
                            Phone: <a href={`tel:${inq.phone}`} className="hover:underline">{inq.phone}</a>
                          </p>
                          <p className="mt-1.5 text-slate-300 font-light italic">
                            Message: "{inq.message}"
                          </p>

                          {/* Admin Notes Box */}
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-[10px] text-[#AAAAAA] font-bold uppercase">Admin Notes:</span>
                            <input
                              type="text"
                              defaultValue={inq.adminNotes || ''}
                              onBlur={(e) => handleInqNotesSave(inq.id, e.target.value)}
                              placeholder="Type administrative log notes (autosaves)..."
                              className="bg-[#0A0A0A] text-xs text-white border border-[#2E2E2E] rounded px-2.5 py-1 flex-1 focus:outline-none focus:border-white"
                            />
                          </div>
                        </div>

                        {/* Status Toggle control panel */}
                        <div className="flex sm:flex-col gap-2 shrink-0 self-end sm:self-auto">
                          <button
                            onClick={() => handleInquiryStatusChange(inq.id, 'Contacted')}
                            className="px-3 py-1.5 border border-[#2E2E2E] bg-[#1a1a1a] hover:bg-white hover:text-black text-[#AAAAAA] text-[10px] font-bold uppercase rounded cursor-pointer transition-all w-full"
                          >
                            Mark: Contacted
                          </button>
                          <button
                            onClick={() => handleInquiryStatusChange(inq.id, 'Done')}
                            className="px-3 py-1.5 border border-[#2E2E2E] bg-[#1a1a1a] hover:bg-white hover:text-black text-[#AAAAAA] text-[10px] font-bold uppercase rounded cursor-pointer transition-all w-full"
                          >
                            Mark: Done
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* Tab 3: Offers Portal */}
            {activeTab === 'offers' && (
              <div id="tab-offers-content" className="flex flex-col gap-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Offers & Banners Registry</h3>
                  <p className="text-xs text-[#AAAAAA] font-sans">Toggle prominence or edit text content inside the live website promotional ribbons.</p>
                </div>

                <div className="flex flex-col gap-6">
                  {promotions.map((p) => {
                    return (
                      <div key={p.id} className="p-6 rounded bg-[#111111] border border-[#2E2E2E] flex flex-col gap-4 text-xs sm:text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-extrabold uppercase font-mono tracking-wider">{p.id}</span>
                          <button
                            type="button"
                            onClick={() => handlePromoToggle(p.id)}
                            className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase cursor-pointer ${
                              p.isActive ? 'bg-white text-black' : 'bg-black text-[#AAAAAA] border border-[#2E2E2E]'
                            }`}
                          >
                            {p.isActive ? 'Active on Page' : 'Offline / Hidden'}
                          </button>
                        </div>

                        {/* Banner editors */}
                        <div className="flex flex-col gap-3 text-left">
                          <div>
                            <label className="text-[10px] text-[#AAAAAA] uppercase font-bold block mb-1">Banner Heading Title</label>
                            <input
                              type="text"
                              defaultValue={p.title}
                              onBlur={(e) => handlePromoTextEdit(p.id, e.target.value, p.description, p.code)}
                              className="w-full bg-[#0A0A0A] border border-[#2E2E2E] p-2.5 rounded text-xs text-white uppercase font-bold focus:outline-none focus:border-white"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-[#AAAAAA] uppercase font-bold block mb-1">Promo Description Copy</label>
                            <textarea
                              rows={2}
                              defaultValue={p.description}
                              onBlur={(e) => handlePromoTextEdit(p.id, p.title, e.target.value, p.code)}
                              className="w-full bg-[#0A0A0A] border border-[#2E2E2E] p-2.5 rounded text-xs text-white focus:outline-none focus:border-white"
                            ></textarea>
                          </div>

                          {p.code !== undefined && (
                            <div>
                              <label className="text-[10px] text-[#AAAAAA] uppercase font-bold block mb-1">Discount Coupon Code</label>
                              <input
                                type="text"
                                defaultValue={p.code}
                                onBlur={(e) => handlePromoTextEdit(p.id, p.title, p.description, e.target.value)}
                                className="bg-[#0A0A0A] border border-[#2E2E2E] p-2.5 rounded text-xs text-white font-mono font-bold focus:outline-none focus:border-white"
                              />
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* Tab 4: Business Metadata */}
            {activeTab === 'business' && (
              <div id="tab-biz-content" className="flex flex-col gap-6 text-xs sm:text-sm">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Business Location Metadata</h3>
                  <p className="text-xs text-[#AAAAAA]">Manage contact coordinates displayed inside footer, header and maps.</p>
                </div>

                <div className="p-6 rounded bg-[#111111] border border-[#2E2E2E] flex flex-col gap-4 text-left">
                  <div>
                    <label className="text-[10px] text-[#AAAAAA] uppercase font-bold block mb-1">Business Name</label>
                    <input
                      type="text"
                      value={business.name}
                      onChange={(e) => handleBusinessInfoSave('name', e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2E2E2E] p-2.5 rounded text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#AAAAAA] uppercase font-bold block mb-1">Showroom Landline / Mobile Number</label>
                    <input
                      type="text"
                      value={business.phone}
                      onChange={(e) => handleBusinessInfoSave('phone', e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2E2E2E] p-2.5 rounded text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#AAAAAA] uppercase font-bold block mb-1">Specific Physical Location Address</label>
                    <input
                      type="text"
                      value={business.address}
                      onChange={(e) => handleBusinessInfoSave('address', e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2E2E2E] p-2.5 rounded text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#AAAAAA] uppercase font-bold block mb-1">Operating Work Hours</label>
                    <input
                      type="text"
                      value={business.hours}
                      onChange={(e) => handleBusinessInfoSave('hours', e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2E2E2E] p-2.5 rounded text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#AAAAAA] uppercase font-bold block mb-1">WhatsApp International Number (wa.me target)</label>
                    <input
                      type="text"
                      value={business.whatsapp}
                      onChange={(e) => handleBusinessInfoSave('whatsapp', e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2E2E2E] p-2.5 rounded text-xs text-white font-mono focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* Tab 5: Analytics & Custom CSS bar chart */}
            {activeTab === 'analytics' && (
              <div id="tab-analytics-content" className="flex flex-col gap-6 text-slate-300">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Analytics Overview Cockpit</h3>
                  <p className="text-xs text-[#AAAAAA]">Simulated real-time engagement & fleet status ratios.</p>
                </div>

                {/* Engagement Cards row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded bg-[#111111] border border-[#2E2E2E] flex flex-col items-center justify-center">
                    <span className="text-[10px] text-[#AAAAAA] uppercase tracking-widest font-bold">Total Page Views</span>
                    <span className="text-3xl font-mono font-bold text-white mt-1">{totalPageViews}</span>
                  </div>

                  <div className="p-4 rounded bg-[#111111] border border-[#2E2E2E] flex flex-col items-center justify-center">
                    <span className="text-[10px] text-[#AAAAAA] uppercase tracking-widest font-bold">Available Vehicles</span>
                    <span className="text-3xl font-mono font-bold text-white mt-1">{countCarsByStatus('Available')}</span>
                  </div>

                  <div className="p-4 rounded bg-[#111111] border border-[#2E2E2E] flex flex-col items-center justify-center">
                    <span className="text-[10px] text-[#AAAAAA] uppercase tracking-widest font-bold">Rented Out</span>
                    <span className="text-3xl font-mono font-bold text-[#AAAAAA] mt-1">{countCarsByStatus('Rented')}</span>
                  </div>

                  <div className="p-4 rounded bg-[#111111] border border-[#2E2E2E] flex flex-col items-center justify-center">
                    <span className="text-[10px] text-[#AAAAAA] uppercase tracking-widest font-bold">Reserved Hold</span>
                    <span className="text-3xl font-mono font-bold text-[#555555] mt-1">{countCarsByStatus('Reserved')}</span>
                  </div>
                </div>

                {/* Custom CSS Fleet Distribution Chart */}
                <div className="p-6 rounded bg-[#111111] border border-[#2E2E2E] text-left">
                  <h4 className="font-serif text-sm uppercase font-bold text-white tracking-wider mb-6">Interactive Fleet Distribution Model</h4>
                  
                  <div className="flex flex-col gap-5 font-sans">
                    
                    {/* Available bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1.5">
                        <span>Available for Hire ({countCarsByStatus('Available')} Vehicles)</span>
                        <span className="font-mono">{((countCarsByStatus('Available') / cars.length) * 100 || 0).toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-3 bg-[#0A0A0A] border border-[#2E2E2E] rounded overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-none transition-all duration-800"
                          style={{ width: `${(countCarsByStatus('Available') / cars.length) * 100 || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Rented bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1.5">
                        <span>Vehicles actively Rented ({countCarsByStatus('Rented')} Vehicles)</span>
                        <span className="font-mono">{((countCarsByStatus('Rented') / cars.length) * 100 || 0).toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-3 bg-[#0A0A0A] border border-[#2E2E2E] rounded overflow-hidden">
                        <div 
                          className="h-full bg-[#AAAAAA] rounded-none transition-all duration-800"
                          style={{ width: `${(countCarsByStatus('Rented') / cars.length) * 100 || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Reserved bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1.5">
                        <span>On Hold / Reserved ({countCarsByStatus('Reserved')} Vehicles)</span>
                        <span className="font-mono">{((countCarsByStatus('Reserved') / cars.length) * 100 || 0).toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-3 bg-[#0A0A0A] border border-[#2E2E2E] rounded overflow-hidden">
                        <div 
                          className="h-full bg-[#555555] rounded-none transition-all duration-800"
                          style={{ width: `${(countCarsByStatus('Reserved') / cars.length) * 100 || 0}%` }}
                        />
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
