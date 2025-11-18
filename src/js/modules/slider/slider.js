export default class Slider {
    constructor({ container = null,
        btns = null,
        next = null,
        prev = null,
        prevModule = null,
        nextModule = null,
        activeClass,
        animate,
        autoplay,
        onlySlide, } = {}) {
        this.container = document.querySelector(container);
        try { this.slides = this.container.children; } catch (e) { }
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next)
        this.prevModule = document.querySelectorAll(prevModule)
        this.nextModule = document.querySelectorAll(nextModule)
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.onlySlide = onlySlide;
        this.slidesIndex = 1;
    }

}