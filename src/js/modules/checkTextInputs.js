export default class CheckTextInputs {
    constructor(selector) {
        this.selector = selector
    }

    init() {
        const txtInputs = document.querySelectorAll(this.selector);
        txtInputs.forEach(input => {
            input.addEventListener('keypress', function (e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }
}
