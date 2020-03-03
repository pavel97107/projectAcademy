const sendForm = (selector, selectorInput) => {
    const loadMessage = "Загрузка...";
    const form = document.getElementById(selector);
    const inputForm = document.querySelectorAll(selectorInput);
    const statusMessage = document.createElement("div");

    form.addEventListener("input", () => {
        const validForm = () => {
            inputForm.forEach(item => {
                let textInput = item.value;
                if (item.name === "user_phone") {
                    item.value = textInput.replace(/[^0-9\+]/g, "");
                }
                if ((item.name === "user_name") | (item.name === "user_message")) {
                    item.value = textInput.replace(/[^а-яА-Я\s]/g, "");
                }
            });
        };
        validForm();
    });

    const resetForm = () => {
        inputForm.forEach((item) => {
            item.value = '';
        });
    };

    const successMessage = (response) => {
        if (response.status !== 200) {
            statusMessage.textContent = 'Ошибка, что то пошло не так';
            throw new Error('status network not 200');
        } else {
            resetForm();
            statusMessage.textContent = "Спасибо! Мы скоро с вами свяжемся";
        }
    };

    form.addEventListener("submit", event => {
        event.preventDefault();
        form.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;

        const formData = new FormData(form);
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });
        postData(body)
            .then(successMessage)
            .catch();
    });

    const postData = body => {
        return fetch("./server.php", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

    };
};

export default sendForm;