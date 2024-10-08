import React, { useEffect, useRef, useState } from "react";
import "../css/about.min.css";
import { useTypingEffect } from "../hook/about/useTypingEffect";
import { useScrollEffect } from "../hook/about/useScrollEffect";
import { FaAngleDown } from "react-icons/fa6";
import { useTouchBottomEffect } from "../hook/about/useTouchBottomEffect";

export const About = () => {
    const aboutContainerRef = useRef<HTMLDivElement>(null);
    const texts = ["Frontender", "Challenger", "Traveler"];
    const { currentText } = useTypingEffect({ texts, delay: 4000 });

    const descriptionText =
        "안녕하세요! 저는 프론트엔드 개발자 박진영입니다. 대학 시절부터 시각 디자이너로 시작해 현재는 리액트를 활용한 프론트엔드 개발과 백엔드 개발을 병행하며, 사용자 친화적인 인터페이스를 구현하고 있습니다. 다양한 기술 스택을 다루며, 끊임없이 새로운 도전을 추구하는 개발자로 성장하고 있습니다. \n여행과 도전을 좋아하는 저는 새로운 곳을 탐험하고 다양한 문화와 사람들을 만나면서 영감을 얻습니다. 또한, 취미로는 운동과 노래 듣기를 즐기며, 규칙적인 운동을 통해 체력을 유지하고 스트레스를 해소합니다. 음악은 저에게 큰 위로와 동기부여가 됩니다. 이 포트폴리오는 저의 기술력과 프로젝트 경험을 담고 있으며, 제 작업물들을 통해 저의 열정과 노력을 느껴보실 수 있기를 바랍니다. 감사합니다!";
    const { visibleIndexes, descClass } = useScrollEffect({ containerRef: aboutContainerRef, descriptionText });

    const { skillClass } = useTouchBottomEffect();

    const [scrollClass, setScrollClass] = useState("");
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight / 4) {
                setScrollClass("none");
            } else {
                setScrollClass("");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <div className='typing-container'>
                <div className='typing'>
                    <span className='text first'>I'm a</span>
                    <span className='text sec'>{currentText}</span>
                </div>
            </div>
            <div className='about-container' ref={aboutContainerRef}>
                <div className='cover-bg'></div>
                <div className={`description ${descClass}`}>
                    <div>
                        <h2>Who am I?</h2>
                        <ul className='urls'>
                            <li>
                                <a href='https://github.com/JeanYoungPark' target='_blank' rel='noreferrer'>
                                    <img src='https://img.icons8.com/?size=100&id=62856&format=png&color=ffffff' alt='github' />
                                </a>
                            </li>
                            <li>
                                <a style={{ padding: "5px" }} href='https://velog.io/@jjing9/posts' target='velog'>
                                    <svg style={{ filter: "invert(100%)" }} role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                        <title>Velog</title>
                                        <path d='M3 0C1.338 0 0 1.338 0 3v18c0 1.662 1.338 3 3 3h18c1.662 0 3-1.338 3-3V3c0-1.662-1.338-3-3-3H3Zm6.883 6.25c.63 0 1.005.3 1.125.9l1.463 8.303c.465-.615.846-1.133 1.146-1.553.465-.66.893-1.418 1.283-2.273.405-.855.608-1.62.608-2.295 0-.405-.113-.727-.338-.967-.21-.255-.608-.577-1.193-.967.6-.765 1.35-1.148 2.25-1.148.48 0 .878.143 1.193.428.33.285.494.704.494 1.26 0 .93-.39 2.093-1.17 3.488-.765 1.38-2.241 3.457-4.431 6.232l-2.227.156-1.711-9.628h-2.25V7.24c.6-.195 1.305-.406 2.115-.63.81-.24 1.358-.36 1.643-.36Z' />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <p>
                            {descriptionText.split("").map((char, index) => (
                                <span
                                    key={index}
                                    className={`char ${visibleIndexes.includes(index) ? "active" : ""}`}
                                    style={{ transitionDelay: `20ms` }}>
                                    {char === "\n" ? <br /> : char}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
            <div className='skill-container'>
                <div className='cover-bg'></div>
                <div className='skills'>
                    <h2>My Skills</h2>
                    <div className={`skill-list ${skillClass}`}>
                        <ul>
                            <li className='glass' style={{ transform: "rotate(calc(-25deg))" }} data-text='html5'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=9nmz9TYzN8iO&format=png&color=ffffff' alt='html-5--v2' />
                                </div>
                            </li>
                            <li className='glass' style={{ transform: "rotate(calc(-5deg))" }} data-text='css/scss'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=1045&format=png&color=ffffff' alt='css3' />
                                </div>
                            </li>
                            <li className='glass' style={{ transform: "rotate(calc(15deg))" }} data-text='javascript'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=39853&format=png&color=ffffff' alt='javascript' />
                                </div>
                            </li>
                            <li className='glass' style={{ transform: "rotate(calc(-15deg))" }} data-text='typscript'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=vMqgHSToxrJR&format=png&color=ffffff' alt='typescript' />
                                </div>
                            </li>
                            <li className='glass' style={{ transform: "rotate(calc(10deg))" }} data-text='react'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=122637&format=png&color=ffffff' alt='react' />
                                </div>
                            </li>
                        </ul>
                        <ul>
                            <li className='glass' style={{ transform: "rotate(calc(10deg))" }} data-text='nodejs'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=t9oCxEN7McHZ&format=png&color=ffffff' alt='nodejs' />
                                </div>
                            </li>
                            <li className='glass' style={{ transform: "rotate(calc(10deg))" }} data-text='express'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=ffffff' alt='express' />
                                </div>
                            </li>
                            <li className='glass' style={{ transform: "rotate(calc(-15deg))" }} data-text='php'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=39852&format=png&color=ffffff' alt='php' />
                                </div>
                            </li>
                            <li className='glass' style={{ transform: "rotate(calc(5deg))" }} data-text='laravel'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=114956&format=png&color=ffffff' alt='laravel' />
                                </div>
                            </li>
                            <li className='glass' style={{ transform: "rotate(calc(-25deg))" }} data-text='mysql'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=39858&format=png&color=ffffff' alt='mysql' />
                                </div>
                            </li>
                            <li className='glass' style={{ transform: "rotate(calc(10deg))" }} data-text='oracle'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=36681&format=png&color=ffffff' alt='oracle' />
                                </div>
                            </li>
                        </ul>
                        <ul>
                            <li className='glass' style={{ transform: "rotate(calc(-20deg))" }} data-text='github'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=62856&format=png&color=ffffff' alt='github' />
                                </div>
                            </li>
                            <li className='glass' style={{ transform: "rotate(calc(0deg))" }} data-text='git'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=38389&format=png&color=ffffff' alt='git' />
                                </div>
                            </li>
                            <li className='glass' style={{ transform: "rotate(calc(15deg))" }} data-text='notion'>
                                <div>
                                    <img src='https://img.icons8.com/?size=100&id=nvtEH6DpqruC&format=png&color=ffffff' alt='notion' />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id='scroll' className={scrollClass}>
                <FaAngleDown />
            </div>
        </div>
    );
};
