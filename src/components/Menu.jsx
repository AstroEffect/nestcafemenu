import React, { useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import Card from './Card';
import DailyHighlight from './DailyHighlight';
import Loading from './Loading';

import '../assets/styles/Menu.css';

export default function Menu() {
    const [loading, setLoading] = useState(false);
    const [menus, setMenus] = useState(null);
    const [highlightItem, setHighlightItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [menuRes, highlightRes] = await Promise.all([
                    fetch('http://192.168.1.103:4000/menu'),
                    fetch('http://192.168.1.103:4000/hightlight'),
                ]);

                const [menuData, highlightData] = await Promise.all([
                    menuRes.json(),
                    highlightRes.json(),
                ]);

                setMenus(menuData);

                // پیدا کردن آیتم هایلایت مستقیم همین‌جا
                const item =
                    menuData.flatMap(menu => menu.items).find(i => i.id === highlightData.id) ||
                    null;

                setHighlightItem(item);
            } catch (err) {
                console.error('Failed to fetch menu or highlight:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <>
            {highlightItem && <DailyHighlight item={highlightItem} />}
            {menus?.map(menu => (
                <React.Fragment key={menu.id}>
                    <Divider id={menu.id} className="divider">{menu.category}</Divider>
                    <section className="menu__cards">
                        {menu.items.map(item => (
                            <Card key={item.id} {...item} />
                        ))}
                    </section>
                </React.Fragment>
            ))}
        </>
    );
}