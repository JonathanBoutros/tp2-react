import React, { useEffect, useState } from "react";

const Checkout = () => {
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

    const [error, setError] = useState("");

    const [formValid, setFormValid] = useState(true);

    const [shippingCost, setShippingCost] = useState(0);

    const [working, setWorking] = useState("");

    const validateForm = () => {
        if (
            contactEmail === "" ||
            contactName === "" ||
            contactFirstName === "" ||
            contactLastName === "" ||
            addressLine1 === "" ||
            city === "" ||
            province === "" ||
            postalCode === "" ||
            contactPhone === "" ||
            creditCardNumber === "" ||
            creditCardExpirationMonth === 0 ||
            creditCardExpirationYear === 0 ||
            creditCardCvv === 0
        ) {
            setError("Please fill in all required fields.");
            setFormValid(false);
        } else if (creditCardNumber !== "4111-1111-1111-1111") {
            setError("la carte de credit doit etre 4111-1111-1111-1111.");
            setFormValid(false);
        } else {
            setError("");
            setFormValid(true);
        }
    }

    const submit = async () => {
        try {

            validateForm();

            if (!formValid) {
                return;
            }

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
                setWorking("Transaction réussie");
                const data = await response.json();
                console.log("votre transaction est un succès:", data);
            }
        } catch (error) {
            console.error("Error transaction:", error);
            setError("Error dans la transaction: " + error.message);

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
                setId(data.cartId);
            })
            .catch((error) => console.error("Error fetch:", error));
    }, []);


    return (
        <div className="container">
            <div className="row">

                <div className="col-6">
                    <h1 className="my-3">Payer</h1>

                    <div className="mb-3">
                        <input className="form-control" type="text" name="contactEmail" onChange={(e) => setContactEmail(e.target.value)} placeholder="Email" required />
                    </div>

                    <div className="mb-3">
                        <input className="form-control" type="text" name="contactName" onChange={(e) => setContactName(e.target.value)} placeholder="Full Name" required />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <input className="form-control" type="text" name="contactFirstName" onChange={(e) => setContactFirstName(e.target.value)} placeholder="First Name" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input className="form-control" type="text" name="contactLastName" onChange={(e) => setContactLastName(e.target.value)} placeholder="Last Name" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <input className="form-control" type="text" name="addressLine1" onChange={(e) => setAddressLine1(e.target.value)} placeholder="Address Line 1" />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="text" name="addressLine2" onChange={(e) => setAddressLine2(e.target.value)} placeholder="Address Line 2" />
                    </div>

                    <div className="mb-3">
                        <input className="form-control" type="text" name="city" onChange={(e) => setCity(e.target.value)} placeholder="City" />
                    </div>

                    <div className="mb-3">
                        <input className="form-control" type="text" name="province" onChange={(e) => setProvince(e.target.value)} placeholder="Province" />
                    </div>

                    <div className="mb-3">
                        <input className="form-control" type="text" name="postalCode" onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" />
                    </div>

                    <div className="mb-3">
                        <input className="form-control" type="number" name="contactPhone" onChange={(e) => setContactPhone(e.target.value)} placeholder="Contact Phone" />
                    </div>

                    <div className="mb-3">
                        <input className="form-control" type="text" name="creditCardNumber" onChange={(e) => setCreditCardNumber(e.target.value)} placeholder="4111-1111-1111-1111" />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <input className="form-control" type="number" name="creditCardExpirationMonth" onChange={(e) => setCreditCardExpirationMonth(e.target.value)} placeholder="Expiration Month" />
                        </div>

                        <div className="col-md-6 mb-3">
                            <input className="form-control" type="number" name="creditCardExpirationYear" onChange={(e) => setCreditCardExpirationYear(e.target.value)} placeholder="Expiration Year" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <input className="form-control" type="number" name="creditCardCvv" onChange={(e) => setCreditCardCvv(e.target.value)} placeholder="CVV" />
                    </div>
                </div>

                {/* ************* */}

                <div className="col-4">
                    <div className="mb-3 mt-5">
                        <label className="mb-3 mt-4">Shipping Mode:</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="shippingMode" value="standard" checked={shippingMode === "standard"}
                                onChange={() => {
                                    if (total >= 100) {
                                        setShippingMode("standard");
                                        setShippingCost(0);
                                    } else {
                                        setShippingMode("standard");
                                        setShippingCost(10);
                                    }
                                }} />
                            <label className="form-check-label" htmlFor="standard">Standard</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="shippingMode" value="express" checked={shippingMode === "express"}
                                onChange={() => {
                                    if (total >= 100) {
                                        setShippingMode("express");
                                        setShippingCost(0);
                                    } else {
                                        setShippingMode("express");
                                        setShippingCost(10);
                                    }
                                }} />

                            <label className="form-check-label" htmlFor="express">Express</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="shippingMode" value="pickup" checked={shippingMode === "pickup"}
                                onChange={() => {
                                    setShippingMode("pickup");
                                    setShippingCost(0);
                                }} />

                            <label className="form-check-label" htmlFor="pickup">Pickup</label>
                        </div>
                    </div>
                    <p className="mt-3">Total: {total + shippingCost}</p>
                    <p>Cart ID: {cartId}</p>

                    <button type="button" className="btn btn-primary" onClick={() => submit()}>Submit</button>

                    <div className="mt-3">{working}</div>
                    <div className="mt-3 text-danger">{error}</div>
                </div>
            </div>

        </div>
    );
};

export default Checkout;
