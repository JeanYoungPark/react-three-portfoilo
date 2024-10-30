import React, { useRef, useState } from "react";
import "../css/projects.min.css";

export const Projects = () => {
    const [cards, setCards] = useState(["Card 1", "Card 2", "Card 3", "Card 4"]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [clickedCardIndex, setClickedCardIndex] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const isFirst = useRef(false);

    const slideUp = () => {
        const nextIndex = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
    };

    const slideDown = () => {
        const prevIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
    };

    const handleCardClick = (index: number) => {
        if (currentIndex === index) {
            setClickedCardIndex(clickedCardIndex === index ? null : index);
        } else {
            setCurrentIndex(index);
            setClickedCardIndex(null);
        }

        hideInfo();
    };

    // 리액트의 마우스 이벤트 타입, 위에 선언해서 사용하면 DOM의 기본 MouseEvent 타입으로 인식
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const startY = e.clientY;

        const handleMouseUp = (e: MouseEvent) => {
            const endY = e.clientY;
            if (startY - endY > 200) {
                slideUp();
                hideInfo();
            } else if (endY - startY > 200) {
                slideDown();
                hideInfo();
            }
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mouseup", handleMouseUp);
    };

    const hideInfo = () => {
        if (!isFirst.current) isFirst.current = true;
    };

    return (
        <div>
            <div className='portfolio-container' ref={containerRef} onMouseDown={handleMouseDown}>
                <div className='portfolio'>
                    <div className='cards' style={{ transform: `rotate(${currentIndex * -45}deg)` }}>
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className={`card ${index === currentIndex ? "active" : ""} ${index === clickedCardIndex ? "clicked" : ""}`}
                                onClick={() => handleCardClick(index)}>
                                <div
                                    className='inner'
                                    style={{
                                        transform:
                                            clickedCardIndex === index
                                                ? `rotate(-360deg) rotateX(0deg) translateZ(150px) translateY(-100px)`
                                                : `rotate(${-360 + 45 * (currentIndex - index)}deg) rotateX(-30deg) translateZ(-100px)`,
                                    }}>
                                    <div className='text'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas recusandae, ullam ipsam sed, ipsum
                                        voluptatibus, repellendus quis illum ut doloribus mollitia aspernatur quas cupiditate at ratione. Amet harum
                                        molestiae nisi!
                                    </div>
                                    <div className='link'>https://codepen.io/cobra_winfrey/pen/ZNGQKx</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`info ${isFirst.current && "hide"}`}>
                <p>Grab or Click the cards!</p>
                <div className='grab'>
                    <img src='https://img.icons8.com/?size=100&id=eE2AKkZiuPV0&format=png&color=ffffff' alt='grab' />
                </div>
            </div>
        </div>
    );
};
