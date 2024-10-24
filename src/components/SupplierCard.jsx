import React, { useEffect, useState } from 'react';
import "../styles/supplier.css";
import PhoneInput from 'react-phone-number-input';
import PhoneInputWithCountrySelect from 'react-phone-number-input';

const SupplierCard = () => {
    const [countryList, setCountryList] = useState([]);
    const [selectedCountryID, setSelectedCountryID] = useState("");  // Track selected country ID
    const [selectedStateID, setSelectedStateID] = useState("");      // Track selected state ID
    const [states, setStates] = useState([]);                        // State list for selected country
    const [cities, setCities] = useState([]);                        // City list for selected state
    const [dataValid, setDataVlid] = useState(false);

    const [supplierData, setSupplierData] = useState({
        supplierName: "",
        compnayName: "",
        email: "",
        phone: "",
    })


    useEffect(() => {
        const { supplierName, compnayName, email, phone } = supplierData;

        // Regex for basic email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (supplierName && compnayName && selectedCountryID && selectedStateID && phone) {
            if (emailRegex.test(email)) {
                setDataVlid(true);
            } else {
                setDataVlid(false);  // Email is invalid
            }
        } else {
            setDataVlid(false);  // Some other field is missing
        }
    }, [supplierData, selectedCountryID, selectedStateID, cities]);


    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const result = await fetch("https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CountryList");
                const countryData = await result.json();
                setCountryList(countryData?.data);
            } catch (error) {
                console.log("Error fetching country list", error.message);
            }
        };
        fetchCountry();
    }, []);

    // Fetch states when a country is selected
    useEffect(() => {
        if (selectedCountryID) {
            const fetchState = async () => {
                try {
                    const result = await fetch(`https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-SateList-By-Country?countryId=${selectedCountryID}`);
                    const resultState = await result.json();
                    setStates(resultState?.data);
                } catch (error) {
                    console.log("Error fetching states", error.message);
                }
            };
            fetchState();
        }
    }, [selectedCountryID]);


    // Fetch cities when a state is selected
    useEffect(() => {
        if (selectedStateID) {
            const fetchCities = async () => {
                try {
                    const result = await fetch(`https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CityList-By-Country-State?countryId=${selectedCountryID}&stateId=${selectedStateID}`);
                    const resultCity = await result.json();
                    
                    setCities(resultCity?.data);
                } catch (error) {
                    console.log("Error fetching cities", error.message);
                }
            };
            fetchCities();
        }
    }, [selectedStateID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSupplierData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }



    const handleSave = () => {
    }

    return (
        <div className='supplier-container'>
            <h1 className='item-title'>Supplier Detail</h1>
            <div className='title-container'>
                <div className='input-section'>
                    <label htmlFor="" className='input-label'>
                        Supplier Name
                        <input type="text"
                            className='input-box'
                            placeholder='Enter supplier Name'
                            maxLength={50}
                            name='supplierName'
                            value={supplierData.supplierName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <span className='rule'>max 50 character</span>
                </div>
                <div className='input-section'>
                    <label htmlFor="" className='input-label'>
                        Company Name
                        <input type="text"
                            className='input-box'
                            placeholder='Enter Company Name'
                            maxLength={50}
                            name='compnayName'
                            value={supplierData.compnayName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <span className='rule'>max 50 character</span>
                </div>

                {/* Country Dropdown */}
                <div className='input-section'>
                    <label htmlFor="country" className='input-label'>
                        Country
                        <select
                            value={selectedCountryID}
                            onChange={(e) => setSelectedCountryID(e.target.value)}  // Capture countryId
                            id="country"
                            className='option-header'
                        >
                            <option value="">Select Country</option>
                            {
                                countryList?.countyList?.map((item) => (
                                    <option value={item.countryId} key={item.countryId} className='option-list'>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </label>
                    <span className='rule'>Select country from the list</span>
                </div>

                {/* State Dropdown */}
                <div className='input-section'>
                    <label htmlFor="state" className='input-label'>
                        State
                        <select
                            value={selectedStateID}
                            onChange={(e) => setSelectedStateID(e.target.value)}  // Capture stateId
                            id="state"
                            className='option-header'
                        >
                            <option value="">Select State</option>
                            {
                                states?.stateList?.map((item) => (
                                    <option value={item.stateId} key={item.stateId} className='option-list'>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </label>
                    <span className='rule'>Select state from the list</span>
                </div>

                {/* City Dropdown */}
                <div className='input-section'>
                    <label htmlFor="city" className='input-label'>
                        City
                        <select
                            id="city"
                            className='option-header'
                        >
                            <option value="">Select City</option>
                            {
                                cities?.cityList?.map((item) => (
                                    <option value={item.cityId} key={item.cityId} className='option-list'>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </label>
                    <span className='rule'>Select city from the list</span>
                </div>
                <div className='input-section'>
                    <label htmlFor="" className='input-label'>
                        Email Address
                        <input type="email"
                            className='input-box'
                            placeholder='Enter email address'
                            name='email'
                            value={supplierData.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    <span className='rule'>valid email address</span>
                </div>

                <div className='input-section'>
                    <label htmlFor="" className='input-label'>
                        Phone No
                        <PhoneInput
                            className='phone-input'
                            name='phone'
                            defaultCountry="IN"
                            placeholder="Enter phone No"
                            value={supplierData.phone}
                            onChange={(value) =>
                                setSupplierData((prevData) => ({
                                    ...prevData,
                                    phone: value
                                }))
                            }
                        />

                    </label>
                    <span className='rule'>valid phone address</span>
                </div>
            </div>
            {
                dataValid && <div className='btn-container'>
                    <button className='submit-btn' onClick={handleSave}>Save Changes</button>
                </div>
            }
        </div>
    );
};

export default SupplierCard;
