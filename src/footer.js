import React from 'react';
import './css/footer.css';

const Footer = () => {
    return (

        <footer class="bg-white text-dark d-flex align-items-center">
            <div class="container">
                <div class="row  ">
                    <div class="col-12 ">
                        <ul class="list-unstyled list d-flex justify-content-center ">
                            <li class="mx-3"><a href="#" class="text-dark text-decoration-none">Home</a></li>
                            <li class="mx-3"><a href="#" class="text-dark text-decoration-none">Gift Card</a></li>
                            <li class="mx-3"><a href="#" class="text-dark text-decoration-none">Customer Service</a></li>
                            <li class="mx-3"><a href="#" class="text-dark text-decoration-none">Discount</a></li>
                            <li class="mx-3"><a href="#" class="text-dark text-decoration-none">About Us</a></li>
                            <li class="mx-3"><a href="#" class="text-dark text-decoration-none">Affiliates</a></li>
                        </ul>
                        <p className='rights'>© 2023 RoastedCup. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;