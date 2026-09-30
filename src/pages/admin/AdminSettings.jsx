import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Save, Check, ShieldCheck, Phone, MapPin, Truck } from 'lucide-react';

export const AdminSettings = () => {
  const { settings, updateSettings } = useStore();

  const [formData, setFormData] = useState({
    storeName: settings.storeName || "Blossom Organics",
    storeTagline: settings.storeTagline || "Pure Herbal Cosmetics & Personal Care",
    phone: settings.phone || "+92 300 1234567",
    whatsapp: settings.whatsapp || "+92 300 1234567",
    email: settings.email || "support@blossomorganics.com",
    freeShippingThreshold: settings.freeShippingThreshold || 2500,
    standardShippingFee: settings.standardShippingFee || 200,
    address: settings.address || "Lahore, Pakistan"
  });

  const [savedMsg, setSavedMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings({
      ...formData,
      freeShippingThreshold: Number(formData.freeShippingThreshold),
      standardShippingFee: Number(formData.standardShippingFee)
    });
    setSavedMsg("Store settings saved successfully!");
    setTimeout(() => setSavedMsg(""), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Configure Pakistani helpline details, shipping costs, and free delivery thresholds.
        </p>
      </div>

      {savedMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>{savedMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/70 shadow-xs space-y-5 text-xs">
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-100">
            Store Identity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Brand Name</label>
              <input
                type="text"
                required
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Brand Tagline</label>
              <input
                type="text"
                value={formData.storeTagline}
                onChange={(e) => setFormData({ ...formData, storeTagline: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-100">
            Customer Support & WhatsApp
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Helpline Phone</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">WhatsApp Orders Number</label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-700 font-semibold mb-1">Support Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-100">
            Delivery & Shipping Thresholds (PKR)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Free Delivery Order Minimum (Rs.)
              </label>
              <input
                type="number"
                required
                value={formData.freeShippingThreshold}
                onChange={(e) => setFormData({ ...formData, freeShippingThreshold: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
              />
              <span className="text-[11px] text-gray-400 mt-0.5 block">
                Orders above this amount will get FREE delivery automatically.
              </span>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Standard Shipping Fee (Rs.)
              </label>
              <input
                type="number"
                required
                value={formData.standardShippingFee}
                onChange={(e) => setFormData({ ...formData, standardShippingFee: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
              />
              <span className="text-[11px] text-gray-400 mt-0.5 block">
                Charged when order total is below the free threshold.
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white font-bold rounded-xl transition-colors shadow-sm flex items-center space-x-1.5 text-xs uppercase tracking-wider"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
