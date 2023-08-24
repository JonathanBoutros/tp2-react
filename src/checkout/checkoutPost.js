import React, { useEffect, useState } from "react";

const PostCheckout = () => {
    const [contactEmail, setContactEmail] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactFirstName, setContactFirstName] = useState("");
    const [contactLastName, setContactLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [creditCardExpirationMonth, setCreditCardExpirationMonth] = useState(0);
    const [creditCardExpirationYear, setCreditCardExpirationYear] = useState(0);
    const [creditCardCvv, setCreditCardCvv] = useState(0);
    const [shippingMode, setShippingMode] = useState("");
    const [total, setTotal] = useState(0);
    const [cartId, setId] = useState(0);

    const [shippingCost, setShippingCost] = useState(0);

    const [working, setWorking] = useState("");
  
    const [messageError, setMessageError] = useState("");

    const clearMessageError = () => {
        setTimeout(() => {
        setMessageError("");
        }, 5000);
    };

    const submit = async () => {
        try {

            let calculatedTotal = total + shippingCost;

            
            if (calculatedTotal > 100) {
                calculatedTotal -= shippingCost;
                setShippingCost(0);
            }

        const requestData = {
            contactEmail: contactEmail,
            contactName: contactName,
            contactFirstName: contactFirstName,
            contactLastName: contactLastName,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            province: province,
            postalCode: postalCode,
            contactPhone: contactPhone,
            creditCardNumber: creditCardNumber,
            creditCardExpirationMonth: creditCardExpirationMonth,
            creditCardExpirationYear: creditCardExpirationYear,
            creditCardCvv: creditCardCvv,
            shippingMode: shippingMode,
            total: calculatedTotal,
            cartId: cartId,
        };
    
        const response = await fetch(
            "https://insta-api-api.0vxq7h.easypanel.host/checkout",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
            }
        );
    
        if (response.ok) {
            setWorking("Transaction réussie")
            const data = await response.json();
            console.log("votre transaction est un succès:", data);
        }
        } catch (error) {
        console.error("Error transaction:", error);
        }
    };
  

    useEffect(() => {
        fetch("https://insta-api-api.0vxq7h.easypanel.host/checkout")
        .then((response) => response.json())
        .then((data) => {
            let calculatedTotal = 0;
            data.products.forEach((product) => {
            calculatedTotal += product.discountedPrice * product.quantity;
            });
            setTotal(calculatedTotal);
            setId(data.cartId)
        })
        .catch((error) => console.error("Error fetch:", error));
    }, []);

  
    return (
        <div>
            <h1>Payer</h1>
            <input
                type="text"
                name="contactEmail"
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Email"
                required
            />

            <input
                type="text"
                name="contactName"
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Full Name"
                required
            />

            <input
                type="text"
                name="contactFirstName"
                onChange={(e) => setContactFirstName(e.target.value)}
                placeholder="First Name"
            />

            <input
                type="text"
                name="contactLastName"
                onChange={(e) => setContactLastName(e.target.value)}
                placeholder="Last Name"
            />

            <input
                type="text"
                name="addressLine1"
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="Address Line 1"
            />

            <input
                type="text"
                name="addressLine2"
                onChange={(e) => setAddressLine2(e.target.value)}
                placeholder="Address Line 2"
            />

            <input
                type="text"
                name="city"
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
            />

            <input
                type="text"
                name="province"
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Province"
            />

            <input
                type="text"
                name="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Postal Code"
            />

            <input
                type="number"
                name="contactPhone"
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Contact Phone"
            />

            <input
                type="text"
                name="creditCardNumber"
                onChange={(e) => setCreditCardNumber(e.target.value)}
                placeholder="4111-1111-1111-1111"
            />
            
            <input
                type="number"
                name="creditCardExpirationMonth"
                onChange={(e) => setCreditCardExpirationMonth(e.target.value)}
                placeholder="Credit Card Expiration Month"
            />

            <input
                type="number"
                name="creditCardExpirationYear"
                onChange={(e) => setCreditCardExpirationYear(e.target.value)}
                placeholder="Credit Card Expiration Year"
            />

            <input
                type="number"
                name="creditCardCvv"
                onChange={(e) => setCreditCardCvv(e.target.value)}
                placeholder="Credit Card CVV"
            />

            <div>
                <label>Shipping Mode:</label>

                <br></br> 

                <input
                    type="radio"
                    name="shippingMode"
                    value="standard"
                    checked={shippingMode === "standard"}
                    onChange={() => {
                        if (total >= 100) {
                            setShippingMode("standard");
                            setShippingCost(0);
                        } else {
                            setShippingMode("standard");
                            setShippingCost(10);
                        }
                    }}
                />

                <label htmlFor="standard">Standard</label>

                <br></br>
                
                <input
                    type="radio"
                    name="shippingMode"
                    value="express"
                    checked={shippingMode === "express"}
                    onChange={() => {
                        if (total >= 100) {
                            setShippingMode("express");
                            setShippingCost(0);
                        } else {
                            setShippingMode("express");
                            setShippingCost(10);
                        }
                    }}
                />
                <label htmlFor="express">Express</label>
                
                <br></br>

                <input
                    type="radio"
                    name="shippingMode"
                    value="pickup"
                    checked={shippingMode === "pickup"}
                    onChange={() => {
                        setShippingMode("pickup");
                        setShippingCost(0);
                    }}
                />
                <label htmlFor="pickup">Pickup</label>
            </div>

            <p>Total: {total + shippingCost}</p>

            <p>Cart ID: {cartId}</p>

            <button onClick={() => submit()}>submit</button>

            <div>{messageError}</div>
            <div>{working}</div>
        </div>
  );
};

export default PostCheckout;
