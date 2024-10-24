import React, { useEffect, useState } from 'react'
import "../styles/item.css";
import { useDispatch, useSelector } from 'react-redux';
import { submitData } from '../reduxToolkit/supplierItemSlice';

const ItemCard = () => {
    const supplierSlice = useSelector((state) => state.supplierItem.submittedData);

    const dispatch = useDispatch();

    const [inputData, setInputData] = useState({
        itemName: "",
        price: "",
        quantity: "",
    });

    const [dateOfSubmission, setDateOfSubmission] = useState("");
    const [isDataValid, setIsDataValid] = useState(false);

    const handleSave = () => {
        const data = {
            itemName: inputData.itemName,
            price: inputData.price,
            quantity: inputData.quantity,
            dateOfSubmission: dateOfSubmission
        };
        // Dispatch the action with the combined data
        dispatch(submitData(data));
        
    };

    const formatUnitPrice = (price) => {
        const formatPrice = price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formatPrice;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'price') {
            const cleanedValue = value.replace(/,/g, "");
            setInputData((prevData) => ({ ...prevData, [name]: cleanedValue }));
        } else {
            setInputData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const getTodayOrFuture = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0'); // Fix here, changed getDay() to getDate()
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const { itemName, price, quantity } = inputData;
        if (itemName && price && quantity && dateOfSubmission) {
            setIsDataValid(true);
        } else {
            setIsDataValid(false);
        }
    }, [inputData, dateOfSubmission]); // Added dateOfSubmission to the dependencies

    return (
        <>
            <h1 className='item-title'>Item Detail</h1>
            <div className='title-container'>
                <div className='input-section'>
                    <label htmlFor="" className='input-label'>
                        Item Name
                        <input
                            type="text"
                            className='input-box'
                            placeholder='Enter Item Name'
                            maxLength={225}
                            name='itemName'
                            value={inputData.itemName} // Corrected value from inputData.name to inputData.itemName
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <span className='rule'>max 50 characters</span>
                </div>

                <div className='input-section'>
                    <label htmlFor="" className='input-label'>
                        Quantity
                        <input
                            type="number"
                            className='input-box'
                            placeholder='Enter Quantity'
                            name='quantity'
                            value={inputData.quantity}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <span className='rule'>Numeric Value</span>
                </div>

                <div className='input-section'>
                    <label htmlFor="" className='input-label'>
                        Unit Price
                        <input
                            type="number"
                            className='input-box'
                            placeholder='Enter Unit Price'
                            value={inputData.price}
                            onChange={handleInputChange}
                            name='price'
                            required
                        />
                    </label>
                    <span className='rule'>Numeric Value (USD)</span>
                </div>

                <div className='input-section'>
                    <label htmlFor="" className='input-label'>
                        Date Of Submission
                        <input
                            type="date"
                            className='input-box'
                            placeholder='Select Date'
                            value={dateOfSubmission}
                            name='date'
                            onChange={(e) => setDateOfSubmission(e.target.value)}
                            min={getTodayOrFuture()}
                            required
                        />
                    </label>
                    <span className='rule'>Format DD/MM/YYYY</span>
                </div>
            </div>

            {isDataValid && (
                <div className='btn-container'>
                    <button className='submit-btn' onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            )}
        </>
    )
}

export default ItemCard;
