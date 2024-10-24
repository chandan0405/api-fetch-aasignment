import React from 'react'
import "../styles/record.css";

const Record = () => {
    return (
        <div className='record-container'>
            <table cellPadding={2} cellSpacing={5} className='record-table'>

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

                <tr>
                    <td><input type="checkbox" value="" /></td>
                    <td>sdjfhskjd</td>
                    <td>sdjfhskjd</td>
                    <td>12</td>
                    <td>dskjfnksd</td>
                    <td>dskjfk</td>
                    <td>skdjnfsk@sdjhbfdjs</td>
                    <td>2398749832</td>
                </tr>

            </table>
        </div>
    )
}

export default Record