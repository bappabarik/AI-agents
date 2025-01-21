import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from "react-markdown";
import { AiOutlineMessage } from 'react-icons/ai';

function ChatInterface() {
  const { handleSubmit, register, setValue } = useForm();
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const submit = async (data) => {
    setError('');
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: data.query }]);
    const langflowRequestBody = {
      input_value: data.query,
      output_type: "chat",
      input_type: "chat",
      tweaks: {},
    };

    setValue("query", "");

    try {
      setIsTyping(true);
      const response = await fetch(import.meta.env.VITE_PROXY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(langflowRequestBody),
      });

      if (!response.ok) {
        setIsTyping(false);
        setError(response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { id: data.session_id, role: "AI", content: data.outputs[0].outputs[0].results.message.text },
      ]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error during fetch:', error);
      setError(`failed to fetch message:: ${error}`);
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 m-4">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        >
          <AiOutlineMessage size={24} />
        </button>
      )}

      {isOpen && (
        <div className="w-full max-w-md bg-white rounded-xl shadow-md">
          <div className="p-4 border-b flex justify-center items-center gap-2 rounded-t-xl w-full">
           <div className="w-full">
           <h2 className="text-xl font-bold">FAQ Assistant</h2>
           <p className='text-slate-600 italic text-sm'>Your AI companion for smarter and faster FAQ answers.</p>
           </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:bg-gray-300 p-1 rounded-md focus:outline-none"
            >
              ✖
            </button>
          </div>
          <div className="h-[60vh] overflow-y-auto p-4">
            {messages?.map((m) => (
              <div
                key={m.id}
                className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <p className='block mb-2'>{m.role === 'AI' && '🤖: '}</p>
                <span
                  className={`inline-block p-2 rounded-lg ${
                    m.role === 'user' ? 'bg-green-700 text-white rounded-tr' : 'bg-gray-200 text-black rounded-tl-none'
                  }`}
                >
                  {m.role === 'user' ? m.content : <ReactMarkdown className="prose">{m.content}</ReactMarkdown>}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="text-left">
                <span className="inline-block p-2 rounded-lg rounded-tl-none bg-gray-200 text-black">
                  AI is typing<span className='animate-bounce'>...</span>
                </span>
              </div>
            )}
            {error && (
              <div className="text-left">
                <span className="inline-block p-2 rounded-lg rounded-tl-none bg-gray-200 text-black">
                  😢 {error}
                </span>
              </div>
            )}
          </div>
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit(submit)} className="flex space-x-2">
              <input
                placeholder="Type your message..."
                className="flex-grow p-2 border rounded focus:outline-green-500"
                autoComplete='off'
                {...register("query", {
                  required: { value: true, message: "query is required" },
                })}
              />
              <button
                type="submit"
                disabled={isTyping}
                className="px-4 py-2 text-white bg-green-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatInterface;
