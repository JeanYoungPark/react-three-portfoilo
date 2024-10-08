import React from "react";
import "../css/contract.min.css";
import { Tilt } from "react-tilt";

export const Contact = () => {
    return (
        <div className='contact-container'>
            <Tilt options={{ max: 15, speed: 400, glare: true, perspective: 1000 }} className='card'>
                <div className='elements bg'></div>
                <div className='elements imgBx'>
                    <img src='' />
                </div>
                <div className='elements name'>
                    <h2>Jean Young Park</h2>
                </div>
                <div className='elements content'>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem laboriosam at, molestias repellat neque suscipit nulla nobis
                        debitis sed corporis, perferendis consequuntur asperiores quidem ea esse eveniet quod illum iure.
                    </p>
                </div>
                <div className='backCard'></div>
            </Tilt>
            <div className='contact'>
                <div className='liquid-box'></div>
                <div className='elements'>
                    <h3>Contact Me</h3>
                    <div className='form'>
                        <div className='elem'>
                            <label>title</label>
                            <p>
                                <input type='text' placeholder='title' />
                            </p>
                        </div>
                        <div className='elem'>
                            <label>name</label>
                            <p>
                                <input type='text' placeholder='name' />
                            </p>
                        </div>
                        <div className='elem'>
                            <label>email</label>
                            <p>
                                <input type='email' placeholder='email' />
                            </p>
                        </div>
                        <textarea placeholder='Type your message.'></textarea>
                    </div>
                    <button type='submit'>SEND</button>
                </div>
            </div>
        </div>
    );
};
