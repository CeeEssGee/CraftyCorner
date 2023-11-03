import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';
import "./Home.css"


const items = [
    {
        src: '/images/Home.jpg',
        altText: 'Crafty Corner',
        key: 1,
    },
    {
        src: '/images/Capstonepic1.jpg',
        altText: 'card craft',
        key: 2,
    },
    {
        src: '/images/Capstonepic2.jpg',
        altText: 'afghan craft',
        key: 3,
    },
    {
        src: '/images/Capstonepic3.jpg',
        altText: 'card craft',
        key: 4,
    },
    {
        src: '/images/Capstonepic4.jpg',
        altText: 'card craft',
        key: 5,
    },
    {
        src: '/images/Capstonepic5.jpg',
        altText: 'card craft',
        key: 6,
    },
];

function Home(args) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem className='carouselItem'
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img className="carouselImg" src={item.src} alt={item.altText} />
                <CarouselCaption
                    captionText={item.caption}
                    captionHeader={item.caption}
                />
            </CarouselItem>
        );
    });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            {...args}
        >
            <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
            />
            {slides}
            <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
            />
            <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
            />
        </Carousel>
    );
}

export default Home;


