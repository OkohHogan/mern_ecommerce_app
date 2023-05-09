import React from "react";

const AccountData = () => {
    return (
        <>
            <div className="box heading">
            <h1 className="mr-0">Hi Okoh</h1>
            </div>

            <div className="details_box">
            <div className="details_header">
            <h1>My Details</h1>
            <p>Feel free to edit any of your details below so your account is up to date.</p>
            </div>


            <div className="item_details">
            <h4>Okoh Hogan</h4>
            <h4>1993-03-02</h4>
            <h4>Male</h4>
            <h4>hoganansa@gmail.com</h4> 
            <span>Edit</span>
            </div>

            <div className="item_details">
            <h5>Password</h5>
            <h4>*****</h4>
            <span>Edit</span>
            </div>

            <div className="item_details">
            <h5>Address Book</h5>
            <h4>Name: Okoh Hogan</h4>
            <h4>Address: 19 Frank Ajaero Drive, Graceland</h4>
            <h4>State: Imo</h4>
            <h4>City: Owerri</h4>
            <h4>Phone: +2344939339393</h4>
            <span>Edit</span>
            </div>
            </div>
</>
    )
}

export default AccountData;