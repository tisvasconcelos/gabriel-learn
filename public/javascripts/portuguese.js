let words = 0;

let checkWord = (letter, inputs) => {
    inputs.forEach(element => {
        let value = element.dataset.value;
        if(letter === value) {
            element.value = value;
        }
        done(inputs);
    });
};

let done = (inputs) => {
    let finished = true,
        correctWord = '',
        container = inputs[0].parentElement,
        attempts = container.querySelector('.attempts');

    inputs.forEach(element => {
        correctWord += element.dataset.value;
        if(element.value === '') {
            finished = false;
        };
    });

    console.log(correctWord);

    if(attempts.value.length >= 10 && !finished) {
        container.classList.add('hide', 'finished');
        document.querySelector('.error').classList.remove('hide');
        document.querySelector('.error').innerText = `Quase! A palavra era "${correctWord}", a próxima vai começar jaja!`;

        fetch('http://localhost:3000/portuguese/time/reset');
        fetch('http://localhost:3000/led/blink?color=red');

        incrementCount();

        if(container.nextElementSibling) {
            setTimeout(() => {
                container.nextElementSibling.classList.remove('hide');
                container.nextElementSibling.querySelector('.attempts').focus();
                document.querySelector('.error').classList.add('hide');
            }, 5000);
        } else {
            document.querySelector('.success').innerText = 'Parabéns você finalizou os desafios!';
        }
    } else if(finished && !container.classList.contains('finished')) {
        let points = document.getElementById('points');
        points.innerText = parseInt(points.innerText)+1;
        container.classList.add('hide', 'finished');

        document.querySelector('.success').classList.toggle('hide');
        document.querySelector('.success').innerText = `Muito bem você a certou a palavra "${correctWord}", a próxima vai começar jaja!`;
        
        fetch('http://localhost:3000/portuguese/time/reset');
        fetch('http://localhost:3000/led/blink?color=green');

        incrementCount();

        if(container.nextElementSibling) {
            setTimeout(() => {
                container.nextElementSibling.classList.remove('hide');
                container.nextElementSibling.querySelector('.attempts').focus();
                document.querySelector('.success').classList.toggle('hide');
            }, 5000);
        } else {
            document.querySelector('.success').innerText = 'Parabéns você finalizou os desafios!';
        }
    }
};

let incrementCount = () => {
    words = words + 1;
    let count = words = document.querySelectorAll('.word.finished').length;
    document.getElementById('words').innerText = `${count}/10`;
};

document.addEventListener("DOMContentLoaded", function() {
    let words = document.querySelectorAll('.word');
    words.forEach((e, i) => {
        if(i != 0) {
            e.classList.add('hide');
        }
    });

    window.onbeforeunload = function () {
        return "";
    };

    let attempts = document.querySelectorAll('input.attempts');
    attempts.forEach(element => {
        element.addEventListener('keydown', (event) => {
            if(event.code === 'Delete' || event.code === 'Backspace') {
                event.preventDefault();
                return false;
            }
        });
        element.addEventListener('keypress', (event) => {
            fetch('http://localhost:3000/portuguese/time')
                .then(response => {
                    return response.text();
                }).then(text => {
                    if(parseInt(text) <= 0) {
                        document.querySelector('.time-block').classList.remove('hide');
                        document.activeElement.blur();
                    }
                });
            var regex = new RegExp("^[a-zA-Z\b]+$");
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
               event.preventDefault();
               return false;
            }
            checkWord(event.key, element.parentElement.querySelectorAll('input[readonly]'));
        });
    });
});