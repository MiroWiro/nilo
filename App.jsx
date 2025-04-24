
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://usmwumkhzhgdajizljrx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzbXd1bWtoemhnZGFqaXpsanJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTg4NDUsImV4cCI6MjA2MTA3NDg0NX0.r1fIXtCDtoG1MYUrRQAO0y_1Je-Yv4AIsQaTwN7AvkE'
);

export default function App() {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: shops } = await supabase.from('shops').select('*');
    const { data: products } = await supabase.from('products').select('*');
    setShops(shops);
    setProducts(products);
  }

  return (
    <div>
      <h1>Nilo Marketplace</h1>
      {shops.map((shop) => (
        <div key={shop.id}>
          <h2>{shop.name}</h2>
          {products.filter(p => p.shop_id === shop.id).map((product) => (
            <div key={product.id}>
              <p>{product.name}: €{product.price}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
