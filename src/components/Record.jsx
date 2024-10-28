import React, { useEffect, useState } from 'react'
import "../styles/record.css";

const Record = () => {
    const [wholeData, setWholeData] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("itemSupplierData"));
        setWholeData(data);

    }, [])
    return (
        <div className='record-container'>
            <table cellPadding={2} cellSpacing={5} className='record-table'>
                <thead>
                    <tr>
                        <th><input type="checkbox" value="" /></th>
                        <th>Supplier</th>
                        <th>Item name</th>
                        <th>Quantity</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                {
                    wholeData.map((item, index) => (
                        <tr key={index}>
                            <td><input type="checkbox" value="" /></td>
                                <td>{item.supplierData.supplierName}</td>
                                <td>{item.itemData.itemName}</td>
                                <td>{item.itemData.quantity}</td>
                                <td>{item.supplierData.city}</td>
                                <td>{item.supplierData.country}</td>
                                <td>{item.supplierData.supplierEmail}</td>
                                <td>{item.supplierData.supplierPhone}</td>
                                </tr>
                            ))
                        }
                </tbody>

            </table>
        </div>
    )
}

export default Record