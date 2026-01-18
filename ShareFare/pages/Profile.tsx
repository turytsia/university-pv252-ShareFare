import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, CheckCircle, MapPin, Clock, Leaf, ThumbsUp, Star, Filter 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';
import { StatsCard } from '../components/StatsCard';
import { ProfileItemCard } from '../components/ProfileItemCard';
import { ItemStatus, ProfileTab } from '../types';

export const Profile = () => {
  const { currentUser, items } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTab.POSTED);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editBio, setEditBio] = useState('Student passionate about reducing food waste!');

  if (!currentUser) return null;

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const getFilteredItems = () => {
    switch(activeTab) {
      case ProfileTab.POSTED:
        return items.filter(i => i.ownerId === currentUser.id && (i.status === ItemStatus.AVAILABLE || i.status === ItemStatus.PENDING));
      case ProfileTab.RECEIVED:
        return items.filter(i => i.claimedById === currentUser.id && (i.status === ItemStatus.RECEIVED || i.status === ItemStatus.CLAIMED || i.status === ItemStatus.PENDING));
      case ProfileTab.DONATED:
        return items.filter(i => i.ownerId === currentUser.id && i.status === ItemStatus.DONATED);
      default: return [];
    }
  };

  const displayItems = getFilteredItems();

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 text-gray-600"><ChevronLeft className="w-5 h-5"/> Edit Profile</button>
          <Button onClick={handleSaveProfile}>Save Changes</Button>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 border border-gray-100">
           <div className="flex items-center gap-6">
             <img src={currentUser.avatar} className="w-24 h-24 rounded-full object-cover" />
             <Button variant="outline">Upload Photo</Button>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
             <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"/>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
             <textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900" rows={3}/>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={currentUser.avatar} alt="Profile" className="w-20 h-20 rounded-full border-4 border-white shadow-sm" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-900">{editName}</h1>
                  {currentUser.verified && <CheckCircle className="w-5 h-5 text-blue-500" />}
                </div>
                <p className="text-gray-500 text-sm flex items-center gap-1"><MapPin className="w-3 h-3"/> {currentUser.location} • Member since Jan 2024</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1 text-green-600"><CheckCircle className="w-4 h-4"/> 98% completion</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> Responds ~20 min</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit Profile</Button>
         </div>
         
         <p className="mt-6 text-gray-600 text-sm max-w-2xl">{editBio}</p>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <StatsCard icon={Leaf} value={currentUser.stats.shared} label="Items Shared" color="text-green-600" />
            <StatsCard icon={ThumbsUp} value={currentUser.stats.helped} label="People Helped" color="text-red-500" />
            <StatsCard icon={Star} value={currentUser.stats.received} label="Items Received" color="text-blue-500" />
            <StatsCard icon={Filter} value={`${currentUser.stats.wasteReduced} lbs`} label="Waste Reduced" color="text-orange-500" />
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
        <div className="flex border-b border-gray-200">
           {[ProfileTab.POSTED, ProfileTab.RECEIVED, ProfileTab.DONATED].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`flex-1 py-4 text-sm font-medium border-b-2 capitalize transition-colors ${
                 activeTab === tab ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
               }`}
             >
               {tab} Items
             </button>
           ))}
        </div>
        
        <div className="p-6">
           {displayItems.length === 0 ? (
             <div className="text-center py-10 text-gray-400">
                <p>No items found in this category.</p>
                {activeTab === ProfileTab.POSTED && <Button className="mt-4" onClick={() => window.location.hash = '#/add'}>Post an Item</Button>}
             </div>
           ) : (
             <div className="space-y-4">
               {displayItems.map(item => (
                 <ProfileItemCard key={item.id} item={item} activeTab={activeTab} />
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
