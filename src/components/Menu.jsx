import React, { useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import Card from './Card';
import DailyHighlight from './DailyHighlight';
import Loading from './Loading';

import '../assets/styles/Menu.css';

export default function Menu({menus, highlightItem}) {
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