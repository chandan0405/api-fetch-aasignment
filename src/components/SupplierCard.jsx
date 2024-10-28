import React, { useEffect, useState } from 'react';
import "../styles/supplier.css";
import PhoneInput from 'react-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';
import { submitSupplierData } from '../reduxToolkit/supplierItemSlice';

const SupplierCard = () => {
    const dispatch = useDispatch();
    const [countryList, setCountryList] = useState([]);
    const [selectedCountryID, setSelectedCountryID] = useState("");  // Track selected country ID
    const [selectedStateID, setSelectedStateID] = useState("");      // Track selected state ID
    const [selectedCityID, setSelectedCityID] = useState("")
    const [states, setStates] = useState([]);                        // State list for selected country
    const [cities, setCities] = useState([]);                        // City list for selected state
    const [dataValid, setDataVlid] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setselectedCity] = useState("");

    const [supplierData, setSupplierData] = useState({
        supplierName: "",
        compnayName: "",
        supplierEmail: "",
        supplierPhone: "",
    })


    useEffect(() => {
        const { supplierName, compnayName, supplierEmail, supplierPhone } = supplierData;

        // Regex for basic email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (supplierName && compnayName && selectedCity && selectedCountry && supplierPhone) {
            if (emailRegex.test(supplierEmail)) {
                setDataVlid(true);
            } else {
                console.log("Email is invalid", emailRegex.test(supplierEmail));
                setDataVlid(false);  // Email is invalid
            }
        } else {
            setDataVlid(false);  // Some other field is missing
        }
    }, [supplierData, selectedCountry, selectedCity, selectedStateID]);



    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const result = await fetch("https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CountryList");
                const countryData = await result.json();
                setCountryList(countryData?.data);
            } catch (error) {
                console.log("Error fetching country list:", error.message);
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

    const handleChangeCountry = (e) => {
        const countryId = e.target.value;
        setSelectedCountryID(countryId);
        // Find the selected country's name from countryList
        const countryName = countryList?.countyList?.find(country => country.countryId === Number(countryId))?.name;
        setSelectedCountry(countryName);
    };

    const handleChangeCity = (e) => {
        const cityID = e.target.value;
        setSelectedCityID(cityID);
        const cityName = cities.cityList?.find((city) => city.cityId === Number(cityID))?.name;
        setselectedCity(cityName)
    }


    // SupplierCard Component
    const handleSupplierSave = () => {
        const data = {
            supplierName: supplierData.supplierName,
            companyName: supplierData.compnayName,
            supplierEmail: supplierData.supplierEmail,
            supplierPhone: supplierData.supplierPhone,
            country:selectedCountry,
            city:selectedCity,
        };
        console.log(data)
        dispatch(submitSupplierData(data)); 
    };


    return (
        <div className='supplier-container'>
            <h1 className='item-title'>Supplier Detail</h1>
            <div className='title-container'>
                <div className='input-section'>
                    <label htmlFor="" className='input-label'>
                        Supplier Name{''}
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
                        Company Name{''}
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
                        Country{''}
                        <select
                            value={selectedCountryID}
                            onChange={(e) => {
                                handleChangeCountry(e)
                            }}  // Capture countryId
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
                        State{''}
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
                        City{''}
                        <select
                            id="city"
                            className='option-header'
                            value={selectedCityID}
                            onChange={(e) => handleChangeCity(e)}
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
                        Email Address{''}
                        <input type="email"
                            className='input-box'
                            placeholder='Enter email address'
                            name='supplierEmail'
                            value={supplierData.supplierEmail}
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
                            name='supplierPhone'
                            defaultCountry="IN"
                            placeholder="Enter phone No"
                            value={supplierData.supplierPhone}
                            onChange={(value) =>
                                setSupplierData((prevData) => ({
                                    ...prevData,
                                    supplierPhone: value
                                }))
                            }
                        />

                    </label>
                    <span className='rule'>valid phone address</span>
                </div>
            </div>
            {
                dataValid && (<div className='btn-container'>
                    <button className='submit-btn' onClick={handleSupplierSave}>Save Changes</button>
                </div>)
            }
        </div>
    );
};

export default SupplierCard;
