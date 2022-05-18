class Slider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.currentActiveSlideIndex = 3;
        this.currentTranslateValue = 0; // defult translate value of 'slider' class element given in css code. you have to change it according to the initial translate value of the slider. with 7 slides it is initially zero but with even number of slides, you may need to translate your slider little bit left or right.
        this.valueToTranslate = 0;
        this.direction = '';
    }

    slide(direction) {
        this.slider = document.querySelector('.slider');
        this.direction = direction;
        const slideWidth = this.slides[0].offsetWidth;
        this.valueToTranslate = slideWidth + 60; // we have added 60 as we are having margin left and margin right as 30

        if (direction === 'right') {
            console.log('currentTranslateValue  -> ', this.currentTranslateValue);
            this.currentTranslateValue = this.currentTranslateValue - this.valueToTranslate // we will always get negative value from this line which is good to translate the slide track left hand side on X axis.
            // console.log(this.currentTranslateValue)
            this.slider.style.transform = `translate(${this.currentTranslateValue}px)`


            // we can use the sliding window algorith to find the exact value of previous node, next node, next+1 node and so on.

            // [0,1,2,3,4,5]
            // found formula for the following patter -- 
            // this pattern has been created just because we have given extra functionality of swipping with clicking on prev and next card.
            // if this functionality is not there, we do not need this part.
            // patter -- > 
            /*
                0 -> 5,0,1,2
                1 -> 0,1,2,3
                2 -> 1,2,3,4
                3 -> 2,3,4,5
                4 -> 3,4,5,0
                5 -> 4,5,0,1

                FORMULA -> (currentIndex +/- slideNumber + arrayLength) % arrayLength
            */
            this.slides[(this.currentActiveSlideIndex - 1 + this.slides.length) % this.slides.length].classList.remove('prev'); // this gives current index - 1

            this.slides[this.currentActiveSlideIndex].classList.replace('active', 'prev');

            this.slides[(this.currentActiveSlideIndex + 1 + this.slides.length) % this.slides.length].classList.replace('next', 'active'); // gives current index + 1

            this.slides[(this.currentActiveSlideIndex + 2 + this.slides.length) % this.slides.length].classList.add('next'); // gives current index + 2

            this.dots[this.currentActiveSlideIndex].classList.remove('active');

            if (this.currentActiveSlideIndex < this.slides.length - 1) {
                this.currentActiveSlideIndex++;
            }
            else {
                this.currentActiveSlideIndex = 0;
            }

            this.dots[this.currentActiveSlideIndex].classList.add('active');
        }
        else if (direction === 'left') {
            console.log('currentTranslateValue  -> ', this.currentTranslateValue);
            this.currentTranslateValue = this.currentTranslateValue + this.valueToTranslate // we will always get negative value from this line which is good to translate the slide track left hand side on X axis.
            // console.log(this.currentTranslateValue)
            this.slider.style.transform = `translate(${this.currentTranslateValue}px)`

            this.slides[(this.currentActiveSlideIndex + 1 + this.slides.length) % this.slides.length].classList.remove('prev'); // this gives current index + 1

            this.slides[this.currentActiveSlideIndex].classList.replace('active', 'next');

            this.slides[(this.currentActiveSlideIndex - 1 + this.slides.length) % this.slides.length].classList.replace('prev', 'active'); // gives current index - 1

            this.slides[(this.currentActiveSlideIndex - 2 + this.slides.length) % this.slides.length].classList.add('prev'); // gives current index + 2

            this.dots[this.currentActiveSlideIndex].classList.remove('active'); // removing active class from current dot

            if (this.currentActiveSlideIndex > 0) {
                this.currentActiveSlideIndex--;
            }
            else {
                this.currentActiveSlideIndex = this.slides.length - 1;
            }

            this.dots[this.currentActiveSlideIndex].classList.add('active'); // adding active class to the next dot once slider slides
        }
    }
}



function main() {
    let carousel = document.querySelector('.carousel');
    let sliderTrack = document.querySelector('.slider');
    let navigator = document.querySelector('.navigator');
    let slider = new Slider();

    carousel.addEventListener('click', (e) => {

        clearInterval(timer);

        let closestElement = false;

        // The closest() method of the Element interface returns the closest ancestor of the current element (or the current element itself).

        // the closest element or the top ancestor on which we have clicked should have class of eight 'slide', 'right' or 'left'. 
        if (e.target.closest('.slide') || e.target.closest('.right') || e.target.closest('.left')) {
            closestElement = true;
        }


        // important logic to move slides left and right 
        if (
            // if clicked element has class 'left'
            e.target.classList.contains('left') ||

            // if clicked element has class 'prev'
            e.target.classList.contains('prev') ||

            // if there is closest element present for that clicked item, either with 'slide', 'right' or 'left' class AND that element is having class as 'left'
            (closestElement && e.target.closest('.left')) ||


            // if there is closest element present for that clicked item, either with 'slide', 'right' or 'left' class AND that element is having class as 'prev'. (slide and prev class is of same element)
            (closestElement && e.target.closest('.prev'))) {

            slider.slide('left');
        }
        else if (
            // if clicked element has class 'right'
            e.target.classList.contains('right') ||

            // if clicked element has class 'prev'
            e.target.classList.contains('next') ||

            // if there is closest element present for that clicked item, either with 'slide', 'right' or 'left' class AND that element is having class as 'right'
            (closestElement) && e.target.closest('.right') ||

            // if there is closest element present for that clicked item, either with 'slide', 'right' or 'left' class AND that element is having class as 'next'. (slide and next class is of same element)
            (closestElement && e.target.closest('.next'))) {

            slider.slide('right');
        }
    })

    sliderTrack.addEventListener('transitionend', () => {
        sliderTrack.style.transition = 'none'; // this to remove transition after appending element at last index. so that use can not see the reverse transition due to appending child.

        if (slider.direction === 'right') {
            sliderTrack.append(sliderTrack.firstElementChild);
            slider.currentTranslateValue = slider.currentTranslateValue + slider.valueToTranslate; // making negative sign for reverse translate due to last child append.
            console.log(`translate(${slider.currentTranslateValue}px)`);
            sliderTrack.style.transform = `translate(${slider.currentTranslateValue}px)`;
        }
        else if (slider.direction === 'left') {
            sliderTrack.prepend(sliderTrack.lastElementChild);
            slider.currentTranslateValue = slider.currentTranslateValue - slider.valueToTranslate; // making negative sign for reverse translate due to last child append.
            console.log(`translate(${slider.currentTranslateValue}px)`);
            sliderTrack.style.transform = `translate(${slider.currentTranslateValue}px)`;
        }

        // putting setTimeout API to confirm that setting transtion back will surely happend at last of the process. If not purring setTimeout, then we face wierd problem of ordering of execution and then program behaves differently.

        // no need to put any time as second argument as we do not want it to execute at any specific time. we just want to send this setTimeout API to web API environtment and then this eventhadnler will itself gets executed once all the code will get executed first and GEC(global execution context) is completley cleared.
        setTimeout(() => {
            sliderTrack.style.transition = 'all 0.5s';
        })
    })

    let timer = setInterval(() => {
        slider.slide('right');
    }, 2000)
}

main();