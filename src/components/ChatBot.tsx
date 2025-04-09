import React, { useState, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CartItem } from '../types';

export const ChatBot: React.FC = () => {
  const [input, setInput] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isListening, setIsListening] = useState(false);
  const { 
    chatMessages, 
    addChatMessage, 
    addToCart, 
    findProductByName, 
    cart, 
    clearCart, 
    setDeliveryAddress,
    checkoutSpecificItems 
  } = useStore();

  const handleProductPurchase = (productName: string) => {
    const product = findProductByName(productName);
    if (product) {
      addToCart(product);
      addChatMessage({
        role: 'assistant',
        content: `I've added ${product.name} to your cart. Would you like to continue shopping or checkout?`
      });
    } else {
      addChatMessage({
        role: 'assistant',
        content: `I'm sorry, I couldn't find a product matching "${productName}". Could you please try again with a different product name?`
      });
    }
  };

  const handleCheckout = async (address?: string) => {
    if (!address && !isCheckingOut) {
      setIsCheckingOut(true);
      addChatMessage({
        role: 'assistant',
        content: 'Please provide your delivery address to complete the checkout.'
      });
      return;
    }

    if (address) {
      setDeliveryAddress(address);
      const itemsToProcess = checkoutItems.length > 0 ? checkoutItems : cart;
      const total = itemsToProcess.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const estimatedDays = Math.floor(Math.random() * 3) + 3;

      addChatMessage({
        role: 'assistant',
        content: `Thank you! Your order has been successfully placed!\n\nOrder Summary:\n${itemsToProcess.map(item => 
          `- ${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}`
        ).join('\n')}\n\nTotal: $${total.toFixed(2)}\nDelivery Address: ${address}\nEstimated Delivery: ${estimatedDays} days`
      });

      if (checkoutItems.length > 0) {
        checkoutItems.forEach(item => {
          const cartItem = cart.find(i => i.id === item.id);
          if (cartItem) {
            cartItem.quantity = 0;
          }
        });
      } else {
        clearCart();
      }
      
      setCheckoutItems([]);
      setIsCheckingOut(false);
    }
  };

  const processMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    addChatMessage({ role: 'user', content: message });

    if (isCheckingOut) {
      handleCheckout(message);
      return;
    }

    if (lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
      const productName = message.replace(/buy|purchase/i, '').trim();
      handleProductPurchase(productName);
    } else if (lowerMessage.includes('checkout')) {
      if (cart.length === 0) {
        addChatMessage({
          role: 'assistant',
          content: 'Your cart is empty. Would you like to shop for something specific?'
        });
        return;
      }

      const checkoutMatch = lowerMessage.match(/checkout\s+(.+)/i);
      if (checkoutMatch) {
        const itemsToCheckout = checkoutMatch[1].split(/(?:,|\sand\s)+/).map(item => item.trim());
        const foundItems = checkoutSpecificItems(itemsToCheckout);
        
        if (foundItems.length > 0) {
          setCheckoutItems(foundItems);
          addChatMessage({
            role: 'assistant',
            content: `I'll help you checkout these items:\n${foundItems.map(item => `- ${item.name}`).join('\n')}\n\nPlease provide your delivery address.`
          });
          setIsCheckingOut(true);
        } else {
          addChatMessage({
            role: 'assistant',
            content: 'I couldn\'t find those specific items in your cart. Please check your cart and try again.'
          });
        }
      } else {
        handleCheckout();
      }
    } else {
      addChatMessage({
        role: 'assistant',
        content: 'How can I help you with your shopping today? You can ask me to buy products or checkout your cart. For example:\n- "Buy Premium Watch"\n- "Checkout Premium Watch"\n- "Checkout all"'
      });
    }
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        addChatMessage({
          role: 'assistant',
          content: 'Listening... Speak your command.'
        });
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        processMessage(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        addChatMessage({
          role: 'assistant',
          content: 'Sorry, I couldn\'t hear that. Please try again.'
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      addChatMessage({
        role: 'assistant',
        content: 'Sorry, voice recognition is not supported in your browser.'
      });
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    processMessage(input);
    setInput('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Shopping Assistant</h2>
      </div>
      <div className="h-96 overflow-y-auto p-4">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              } whitespace-pre-wrap`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex gap-2">
        <button 
          onClick={startVoiceRecognition}
          className={`p-2 ${isListening ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
          disabled={isListening}
        >
          <Mic size={20} />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={isCheckingOut ? "Enter your delivery address..." : "Type your message or click the mic to speak"}
          className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="p-2 text-blue-600 hover:text-blue-700"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};