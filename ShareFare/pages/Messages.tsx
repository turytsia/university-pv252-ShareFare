import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ConversationsList } from '../components/ConversationsList';
import { ChatInterface } from '../components/ChatInterface';

export const Messages = () => {
    const { conversationId } = useParams();
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
        conversationId != undefined ? conversationId : null
    );
    const [sortMode, setSortMode] = useState<string>('date');

    const handleSelectConversation = (conversationId: string) => {
        setSelectedConversationId(conversationId);
    };

    const handleBack = () => {
        setSelectedConversationId(null);
    };

    return (
        <div className="h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex">
            <ConversationsList
                selectedConversationId={selectedConversationId}
                onSelectConversation={handleSelectConversation}
                sortMode={sortMode}
                onSortModeChange={setSortMode}
            />
            <ChatInterface
                selectedConversationId={selectedConversationId}
                onBack={handleBack}
            />
        </div>
    );
};
