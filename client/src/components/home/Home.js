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
        // altText: 'Slide 1',
        // caption: 'Slide 1',
        key: 1,
    },
    {
        src: '/images/Capstonepic1.jpg',
        // altText: 'Slide 2',
        // caption: 'Slide 2',
        key: 2,
    },
    {
        src: '/images/Capstonepic2.jpg',
        // altText: 'Slide 3',
        // caption: 'Slide 3',
        key: 3,
    },
    {
        src: '/images/Capstonepic3.jpg',
        // altText: 'Slide 3',
        // caption: 'Slide 3',
        key: 4,
    },
    {
        src: '/images/Capstonepic4.jpg',
        // altText: 'Slide 3',
        // caption: 'Slide 3',
        key: 5,
    },
    {
        src: '/images/Capstonepic5.jpg',
        // altText: 'Slide 3',
        // caption: 'Slide 3',
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


// function Home() {
//     return <>
//         <section className="homeSection">
//             <div className="titleDiv">
//                 <h1>Welcome to Crafty Corner</h1>
//             </div>
//             <div className="subtitleDiv">
//                 <h3>Where Crafters Come Together for Community, Creativity, and Crafting</h3>
//             </div>
//             <div className="p1Div">
//                 <h4>The purpose of this site is to give crafters a place to coordinate crafting play dates, share crafting items, and form a crafting community.</h4>
//             </div>
//             <div className="p2Div">
//                 <h4>A crafter can add their crafting items that they feel comfortable sharing with other crafters, either loaning out or having someone come over to use.</h4>
//             </div>
//             <div className="p3Div">
//                 <h4>Crafters can also comment on other crafters' items that they would like to try out. This allows us to expand our creativity without having to expand our wallets.</h4>
//             </div>
//             <div className="footerDiv">
//                 <h3>Let's Get Crafty!</h3>
//             </div>
//             <div className="pictureDiv">
//                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBE2RoSOZ49eYC-XN6VUJm84p11GY2rZeOzJoBdGH6rQnIEOuvAQMmen5ApN-deFrDa_Q&usqp=CAU" alt="calling all crafters" />
//             </div>
//         </section >
//     </>
// }
// export default Home;