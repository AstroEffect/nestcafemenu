import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import UserCart from './components/UserCart';
import Loading from './components/Loading';

import './App.css';

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [menus, setMenus] = useState([]);           // فقط آرایه menu
  const [highlight, setHighlight] = useState(null); // آیتم highlight
  const [loading, setLoading] = useState(false);

  const openDrawerHandler = () => setIsDrawerOpen(true);
  const closeDrawerHandler = () => setIsDrawerOpen(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/db.json');
      const data = await res.json();

      setMenus(data.menu || []);           // فقط آرایه menu
      setHighlight(data.highlight || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // پیدا کردن آیتم highlight
  const highlightItem = highlight
    ? menus.flatMap(menu => menu.items).find(item => item.id === highlight.id)
    : null;

  if (loading) return <Loading />;

  return (
    <>
      <Navbar menus={menus} openDrawerHandler={openDrawerHandler} />
      <div className='container'>
        <Menu menus={menus} highlightItem={highlightItem} />
      </div>
      {isDrawerOpen && <UserCart onClose={closeDrawerHandler} />}
    </>
  );
}
