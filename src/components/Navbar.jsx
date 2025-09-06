import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

import logo from '../assets/img/logo.png'

import '../assets/styles/Navbar.css'
import "swiper/css";

export default function Navbar({ openDrawerHandler, menus }) {

    const [theme, setTheme] = useState('light');
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                root: null,
                rootMargin: '-100px 0px 0px 0px', // افست بالا
                threshold: 0.5
            }
        );

        menus.forEach(menu => {
            const el = document.getElementById(menu.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [menus]);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        const navbarHeight = 80;
        const extraOffset = 150;
        if (section) {
            window.scrollTo({
                top: section.offsetTop - navbarHeight - extraOffset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav>
            <div className="navbar__brand">
                <img src={logo} alt="logo" />
                <div className='navbar__btns'>
                    {theme === 'light' ? <MdDarkMode className='navbar__btn' onClick={() => setTheme('dark')} /> : <MdOutlineLightMode className='navbar__btn' onClick={() => setTheme('light')} />}
                    <AiOutlineShopping className='navbar__btn' onClick={openDrawerHandler} />
                </div>
            </div>
            <div className='navbar__categories'>
                <Swiper slidesPerView={2.3} loop className="mySwiper">
                    {menus?.map(menu => (
                        <SwiperSlide key={menu.id}>
                            <div className='navbar__category' onClick={() => scrollToSection(menu.id)}>
                                <div className='navbar__category__icon'>
                                    <div className='image'>
                                        <img src={`/img/${menu.id}.png`} alt="" />
                                    </div>
                                </div>
                                <span className='navbar__category__text'>{menu.category}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </nav>
    )
}
