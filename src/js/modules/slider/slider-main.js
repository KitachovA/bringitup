import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns, prevModule) {
        super(btns, prevModule)
    }

    showSlides(n) {
        try {
            if (n > this.slides.length) {
                this.slidesIndex = 1
            }

            if (n < 1) {
                this.slidesIndex = this.slides.length
            }

            for (let slide of this.slides) {
                slide.style.display = 'none'
            }

            this.slides[this.slidesIndex - 1].style.display = 'block'

        } catch (e) { }
        try {
            this.hanson.style.opacity = '0';

            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch (e) { }

    }

    plusSlides(n) {
        this.showSlides(this.slidesIndex += n);
    }

    render() {

        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson')
            } catch (e) { }


            this.btns.forEach(btn => {
                btn.addEventListener('click', () => this.plusSlides(1))

                btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.slidesIndex = 1;
                    this.showSlides(this.slidesIndex);
                });

            })

            this.prevModule.forEach(btn => {
                btn.addEventListener('click', () => this.plusSlides(-1))
            })
            this.nextModule.forEach(btn => {
                btn.addEventListener('click', () => this.plusSlides(1))
            })

            this.showSlides(this.slidesIndex)
        }
    }
}