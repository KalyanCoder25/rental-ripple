import { useEffect, useState } from 'react';
import Api from '../services/api';

export default function Messages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [conversationId, setConversationId] = useState('global');
  const [text, setText] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    Api.getMessages(conversationId).then((d:any) => setMessages(d || []));
  }, [conversationId]);

  const send = async () => {
    if (!text) return;
    await Api.sendMessage({ conversationId, fromUserId: user?.id, message: text });
    setText('');
    Api.getMessages(conversationId).then((d:any) => setMessages(d || []));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Messages</h2>
        <div className="mb-4">
          <input value={conversationId} onChange={(e) => setConversationId(e.target.value)} className="p-2 border rounded" placeholder="Conversation ID (e.g., prop-12)" />
          <button onClick={() => Api.getMessages(conversationId).then((d:any) => setMessages(d || []))} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">Load</button>
        </div>
        <div className="h-64 overflow-y-auto bg-gray-50 p-4 rounded">
          {messages.length === 0 ? <div>No messages</div> : (
            messages.map((m:any) => (
              <div key={m.id} className={`p-2 rounded mb-2 ${m.fromUserId === user?.id ? 'bg-blue-100 self-end' : 'bg-gray-100'}`}>
                <div className="text-sm font-bold">{m.fromUserName || m.fromUserId}</div>
                <div>{m.message}</div>
                <div className="text-xs text-gray-500">{new Date(m.date).toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Write a message..." />
          <button onClick={send} className="px-4 py-2 bg-green-600 text-white rounded">Send</button>
        </div>
      </div>
    </div>
  );
}
