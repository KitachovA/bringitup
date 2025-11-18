export default class Mask {
    constructor(inputs) {
        this.inputs = document.querySelectorAll(inputs)
        // this.createMask = this.createMask.bind(this);
    }

    setCursorPosition(pos, elem) {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }

    }

    setCursorPositionByDefault(pos, elem) {
        if (elem.selectionStart < elem.value.length) {
            setTimeout(() => {
                elem.setSelectionRange(pos, pos);
            });
        }
    }

    createMask = (event) => {
        let matrix = "+1 (___) ___-____",
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = event.target.value.replace(/\D/g, '');

        if (def.length >= val.length) {
            val = def;
        }

        event.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
            if (event.target.value.length == 1) {
                event.target.value = '';
            }
        } else {
            this.setCursorPosition(event.target.value.length, event.target);
        }

        if (event.type === 'click') {
            this.setCursorPositionByDefault(def.length, event.target)
        }
    }

    init() {
        this.inputs.forEach(input => {
            input.addEventListener('input', this.createMask);
            input.addEventListener('focus', this.createMask);
            input.addEventListener('blur', this.createMask);
            input.addEventListener('click', this.createMask)
        })
    }
}