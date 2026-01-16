import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Camera } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';
import { DietaryType } from '../types';

export const AddItem = () => {
  const { addItem, updateItem, items, currentUser } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Produce',
    quantity: '',
    expiryDate: '',
    pickupTime: '',
    image: '',
    tags: [] as string[]
  });

  useEffect(() => {
    if (isEditing && id) {
       const item = items.find(i => i.id === id);
       if (item) {
          setFormData({
             title: item.title,
             description: item.description,
             category: item.category,
             quantity: item.quantity,
             expiryDate: item.expiryDate,
             pickupTime: item.pickupTime,
             image: item.image,
             tags: item.tags
          });
       }
    }
  }, [id, isEditing, items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
       if (isEditing && id) {
          updateItem(id, formData);
          navigate('/profile');
       } else {
          addItem({
            title: formData.title,
            description: formData.description,
            quantity: formData.quantity,
            expiryDate: formData.expiryDate,
            category: formData.category,
            image: formData.image || `https://loremflickr.com/400/300/food?random=${Date.now()}`,
            tags: formData.tags,
            pickupTime: formData.pickupTime || 'Flexible',
            locationName: currentUser?.location || 'Unknown'
          });
          navigate('/');
       }
       setLoading(false);
    }, 500);
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => navigate(-1)}><ChevronLeft className="w-6 h-6 text-gray-500"/></button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Item' : 'Share Food'}</h1>
          <p className="text-sm text-gray-500">{isEditing ? 'Update your item details' : 'Help reduce waste in your community'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photo *</label>
          {formData.image ? (
              <div className="relative h-48 rounded-xl overflow-hidden mb-2 group">
                 <img src={formData.image} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white font-medium">Change Photo</span>
                 </div>
              </div>
          ) : (
             <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                <Camera className="w-8 h-8 mb-2 text-gray-400" />
                <span className="text-sm font-medium">Click to upload food photo</span>
                <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</span>
             </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Item Title *</label>
          <input required type="text" placeholder="e.g. Fresh Garden Tomatoes" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 text-gray-900" 
            value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900"
              value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
            >
              {['Produce', 'Dairy', 'Pantry', 'Baked Goods', 'Prepared Food', 'Other'].map(c => <option key={c}>{c}</option>)}
            </select>
           </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
            <input required type="text" placeholder="e.g. 3 lbs" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900"
              value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})}
            />
           </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea rows={3} placeholder="Share more details about the food, condition, etc." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-gray-50 text-gray-900"
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
            <input type="text" placeholder="e.g. Nov 12" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
               value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
            <input type="text" placeholder="e.g. Today 5-8pm" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
               value={formData.pickupTime} onChange={e => setFormData({...formData, pickupTime: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Tags</label>
          <div className="flex flex-wrap gap-2">
            {Object.values(DietaryType).map(tag => (
              <button 
                key={tag} type="button" 
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  formData.tags.includes(tag) 
                    ? 'bg-primary-50 border-primary-500 text-primary-700' 
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Button fullWidth size="lg" type="submit" disabled={loading}>
            {loading ? 'Saving...' : (isEditing ? 'Update Item' : 'Post Item')}
          </Button>
        </div>
      </form>
    </div>
  );
};
