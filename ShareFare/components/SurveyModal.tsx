import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { Button } from './Button';
import { User, Item } from '../types';

interface SurveyModalProps {
  activeItem: Item;
  otherParticipant: User;
  isOwner: boolean;
  onClose: () => void;
  onSubmit: (rating: number, feedback: string) => void;
}

export const SurveyModal: React.FC<SurveyModalProps> = ({ 
  activeItem, 
  otherParticipant, 
  isOwner, 
  onClose, 
  onSubmit 
}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(rating, feedback);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-in zoom-in-95">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
             {isOwner ? 'Rate Pickup Experience' : 'Leave Feedback'}
          </h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400"/></button>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3 mb-6">
           <img src={activeItem.image} className="w-12 h-12 rounded object-cover" />
           <div>
              <p className="text-sm font-bold text-gray-900">{activeItem.title}</p>
              <p className="text-xs text-green-600">Pickup completed</p>
           </div>
        </div>

        <p className="text-gray-600 mb-6 text-sm">
           How was your experience with <span className="font-semibold text-gray-900">{otherParticipant.name}</span>?
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)} className="focus:outline-none transition-transform hover:scale-110">
                <Star className={`w-8 h-8 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
          <textarea 
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none min-h-[100px] text-sm text-gray-900"
            placeholder="Share details about your experience..."
          />
        </div>

        <div className="flex gap-3">
           <Button variant="outline" fullWidth onClick={onClose}>Cancel</Button>
           <Button fullWidth onClick={handleSubmit}>Submit Feedback</Button>
        </div>
      </div>
    </div>
  );
};
