import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { ChatBot } from './components/ChatBot';

// Sample products data
const products = [
  {
    id: '1',
    name: 'Premium Watch',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    category: 'Accessories',
    description: 'Elegant timepiece with premium materials and precise movement.',
  },
  {
    id: '2',
    name: 'Running Shoes',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'Footwear',
    description: 'Comfortable running shoes with advanced cushioning technology.',
  },
  {
    id: '3',
    name: 'Leather Wallet',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
    category: 'Accessories',
    description: 'Handcrafted genuine leather wallet with multiple card slots.',
  },
  {
    id: '4',
    name: 'Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'Electronics',
    description: 'Premium wireless headphones with noise cancellation.',
  },
  {
    id: '5',
    name: 'Smart Fitness Band',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8',
    category: 'Electronics',
    description: 'Track your fitness goals with this advanced smart band.',
  },
  {
    id: '6',
    name: 'Formal Shoes',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1',
    category: 'Footwear',
    description: 'Classic formal shoes perfect for business attire.',
  },
  {
    id: '7',
    name: 'Sunglasses',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    category: 'Accessories',
    description: 'Stylish sunglasses with UV protection.',
  },
  {
    id: '8',
    name: 'Laptop Backpack',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    category: 'Bags',
    description: 'Water-resistant backpack with laptop compartment.',
  },
  {
    id: '9',
    name: 'Smart Watch',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a',
    category: 'Electronics',
    description: 'Feature-rich smartwatch with health monitoring.',
  },
  {
    id: '10',
    name: 'Designer Belt',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553704571-c32e6602d943',
    category: 'Accessories',
    description: 'Premium leather belt with designer buckle.',
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-blue-600" size={24} />
            <h1 className="text-xl font-semibold">Virtual Shopping Assistant</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Cart />
            <ChatBot />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;