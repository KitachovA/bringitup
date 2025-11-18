import postData from "../servises/request";

export default class Form {
    constructor(form) {
        this.forms = document.querySelectorAll(form);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Loading...',
            success: 'Thank you! We will contact you soon.',
            failure: 'Something went wrong...',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png'
        };
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = ''
        });
    }


    initPostData() {
        this.forms.forEach(form => {
            addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.textAlign = 'center';
                statusMessage.style.marginTop = '100px';
                form.parentElement.append(statusMessage)

                form.classList.add('animated', 'fadeOutUp');
                setTimeout(() => {
                    form.style.display = 'none';
                }, 400);

                let statusImg = document.createElement('img');
                statusImg.setAttribute('src', this.message.spinner);
                statusImg.classList.add('animated', 'fadeInUp');
                statusMessage.append(statusImg);

                let textMessage = document.createElement('div');
                textMessage.textContent = this.message.loading;
                statusMessage.appendChild(textMessage);

                const formData = new FormData(form);
                const json = JSON.stringify(Object.fromEntries(formData.entries()));

                postData('https://jsonplaceholder.typicode.com/posts', json)
                    .then(res => {
                        console.log(res)
                        statusImg.setAttribute('src', this.message.ok);
                        textMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusImg.setAttribute('src', this.message.fail);
                        textMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs()
                        setTimeout(() => {
                            statusMessage.remove();
                            form.style.display = 'block';
                            form.classList.remove('fadeOutUp');
                            form.classList.add('fadeInUp');
                        }, 5000);
                    })
            })
        })
    }


}