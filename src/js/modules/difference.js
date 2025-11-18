export default class Difference {
    constructor(officerOld, officerNew, items) {
        try {
            this.officerOld = document.querySelector(officerOld);
            this.officerNew = document.querySelector(officerNew);
            this.oldItems = this.officerOld.querySelectorAll(items);
            this.newItems = this.officerNew.querySelectorAll(items);
            this.oldCounter = 0;
            this.newCounter = 0
        } catch (e) { }
    }

    hideItems(itemsChoice) {
        itemsChoice.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none'
                item.classList.add('animated')
            } else {
                item.style.display = 'flex'
            }
        })
    }

    showCards(officerChoice, counterChoice, itemsChoice) {
        officerChoice.querySelector('.plus').addEventListener('click', () => {
            if (counterChoice < itemsChoice.length - 2) {
                itemsChoice[counterChoice].style.display = 'flex'
                itemsChoice[counterChoice].classList.add('fadeIn')
                counterChoice++
            } else {
                itemsChoice[counterChoice].style.display = 'flex'
                itemsChoice[counterChoice].classList.add('fadeIn')
                itemsChoice[itemsChoice.length - 1].remove()
            }
        })
    }

    init() {
        try {
            this.hideItems(this.oldItems)
            this.hideItems(this.newItems)
            this.showCards(this.officerOld, this.oldCounter, this.oldItems)
            this.showCards(this.officerNew, this.newCounter, this.newItems)
        } catch (e) { }
    }
}