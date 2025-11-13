export default class Slider {
    constructor(page, btns) {
        this.page = document.querySelector(page);
        this.slides = [...this.page.children];
        this.btns = document.querySelectorAll(btns);
        this.slidesIndex = 1
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slidesIndex = 1
        }

        if (n < 1) {
            this.slidesIndex = this.slides.length
        }

        this.slides.forEach(slide => {
            slide.style.display = 'none'
        })
        this.slides[this.slidesIndex - 1].style.display = 'block'
    }

    plusSlides(n) {
        this.showSlides(this.slidesIndex += n);
    }

    render() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => this.plusSlides(1))

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slidesIndex = 1;
                this.showSlides(this.slidesIndex);
            });

        })

        this.showSlides(this.slidesIndex)
    }
}