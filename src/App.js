import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import UserCart from './components/UserCart';
import Loading from './components/Loading';

import './App.css';

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const [highlight, setHighlight] = useState(null);
  const [loading, setLoading] = useState(false);

  const openDrawerHandler = () => setIsDrawerOpen(true);
  const closeDrawerHandler = () => setIsDrawerOpen(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const menuRes = await fetch('http://192.168.1.103:4000/menu');
      const menuData = await menuRes.json();
      setMenus(menuData);

      const highlightRes = await fetch('http://192.168.1.103:4000/hightlight');
      const highlightData = await highlightRes.json();
      setHighlight(highlightData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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