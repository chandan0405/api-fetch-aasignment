import React, { useState } from 'react'
import "../styles/header.css";
import ItemCard from './ItemCard';
import SupplierCard from './SupplierCard';
import { Link } from 'react-router-dom';

const Header = () => {
    const [titleCheckBox, setTitleCheckBox] = useState(false);
    const [supplierCheckBox, setSupplierCheckBox] = useState(false);
    return (
        <>
            <header>
                <p className='logo'></p>
                <div className='header-container'>
                    <p className='title'>Inventary Management System</p>
                    <div style={{ display: 'flex' }}>
                        <p className='home'>Home</p>
                        <Link to={"/record"} className='record'>record</Link>
                    </div>
                </div>
            </header>
            <div className='checkbox-container'>
                <label htmlFor="checkbox1" className='checkbox-label'>
                    <input
                        type="checkbox"
                        name="chcekbox1"
                        id="chcekbox1"
                        className='chcekbox-1'
                        checked={titleCheckBox}
                        onChange={() => {
                            setTitleCheckBox((prev) => !prev)
                            setSupplierCheckBox(false)
                        }}
                    />
                    Item
                </label>
                <label htmlFor="checkbox1" className='checkbox-label'>
                    <input
                        type="checkbox"
                        name="checkbox2"
                        id="chcekbox2"
                        className='chcekbox-2'
                        checked={supplierCheckBox}
                        onChange={() => {
                            setSupplierCheckBox((prev) => !prev)
                            setTitleCheckBox(false)
                        }}
                    />
                    Supplier
                </label>
            </div>
            {
                titleCheckBox && (
                    <ItemCard />
                )
            }
            {
                supplierCheckBox && (
                    <SupplierCard />
                )
            }
        </>
    )
}

export default Header