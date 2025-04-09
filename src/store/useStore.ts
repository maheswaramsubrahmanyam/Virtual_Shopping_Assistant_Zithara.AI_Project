import { create } from 'zustand';
import { Product, CartItem, ChatMessage } from '../types';

interface Store {
  cart: CartItem[];
  chatMessages: ChatMessage[];
  deliveryAddress: string | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearCart: () => void;
  setDeliveryAddress: (address: string) => void;
  findProductByName: (name: string) => Product | undefined;
  checkoutSpecificItems: (productNames: string[]) => CartItem[];
}

export const useStore = create<Store>((set, get) => ({
  cart: [],
  chatMessages: [],
  deliveryAddress: null,
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),
  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    })),
  clearCart: () => set({ cart: [] }),
  setDeliveryAddress: (address) => set({ deliveryAddress: address }),
  findProductByName: (name) => {
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
    return products.find(p => 
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  },
  checkoutSpecificItems: (productNames) => {
    const state = get();
    const itemsToCheckout = state.cart.filter(item =>
      productNames.some(name => 
        item.name.toLowerCase().includes(name.toLowerCase())
      )
    );
    return itemsToCheckout;
  },
}));
