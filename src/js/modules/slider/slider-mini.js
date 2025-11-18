import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay, onlySlide,) {
        super(container, next, prev, activeClass, animate, autoplay, onlySlide,);
        this.paused = false;
    }

    getSlidesCollection() {
        if (this.onlySlide) {
            return Array.from(this.slides).filter(slide => slide.tagName === 'DIV');
        } else {
            return Array.from(this.slides);
        }
    }

    decorizeSlide() {
        const slidesArray = this.getSlidesCollection();
        for (let slide of slidesArray) {
            slide.classList.remove(this.activeClass)
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4'
                slide.querySelector('.card__controls-arrow').style.opacity = '0'
            }
        }

        slidesArray[0].classList.add(this.activeClass)
        if (this.animate) {
            slidesArray[0].querySelector('.card__title').style.opacity = '1'
            slidesArray[0].querySelector('.card__controls-arrow').style.opacity = '1'
        }
    }

    bindTrigger() {
        this.next.addEventListener('click', () => this.nextSlide())

        this.prev.addEventListener('click', () => {
            const slidesArray = this.getSlidesCollection();
            const lastSlide = slidesArray[slidesArray.length - 1];
            this.container.insertBefore(lastSlide, slidesArray[0]);
            this.decorizeSlide()
        })
    }

    nextSlide() {
        const slidesArray = this.getSlidesCollection();
        this.container.appendChild(slidesArray[0]);
        this.decorizeSlide()
    }

    activateAnimation() {
        this.paused = setInterval(() => {
            this.nextSlide()
        }, 5000)
    }

    init() {

        try {
            this.container.style = `
            display: flex;
            overflow: hidden;
            flex-wrap: wrap;
            align-items: flex-start;
     `
            this.bindTrigger()
            this.decorizeSlide()



            if (this.autoplay) {
                this.activateAnimation()
                this.container.addEventListener('mouseenter', () => {
                    clearInterval(this.paused)
                })

                this.next.addEventListener('mouseenter', () => {
                    clearInterval(this.paused)
                })

                this.prev.addEventListener('mouseenter', () => {
                    clearInterval(this.paused)
                })

                this.container.addEventListener('mouseleave', () => {
                    this.activateAnimation();
                })

                this.next.addEventListener('mouseleave', () => {
                    this.activateAnimation();
                })

                this.prev.addEventListener('mouseleave', () => {
                    this.activateAnimation();
                })
            }
        } catch (e) { }

    }
}