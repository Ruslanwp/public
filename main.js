let upperCase = /[A-Z]/;
let lowerCase = /[a-z]/g;
let numbers = /[0-9]/g;
let allow = /[A-Za-z0-9]/g;

let send = document.getElementById('send');
num = '';

document.getElementById('phone').onkeypress = function (event) {
    if (event.key.match(numbers) || event.key == '+') {
        return true;
    }
    return false;
}

document.getElementById('phone').onkeyup = function (event) {
    let phoneValue = document.getElementById('phone').value;
    let parent = document.querySelector('#parent');
    let img = document.createElement('img');

    function isPhoneHasCode(phoneValue) {
        for (let i = 0; i < countries.length; i++) {
            if (phoneValue.indexOf(countries[i].dial_code) == 0) {
                num = i;
                return true;
            }
        }
    }

    function setFlag(phoneValue) {
        if (parent.children.length == 1) {
            parent.removeChild(parent.firstChild);
        }
        if (isPhoneHasCode(phoneValue)) {
            img.src = "./flags/32x32/" + countries[num].flag;
            return parent.appendChild(img);
        }
    }

    setFlag(phoneValue)

    send.addEventListener('click', function (e) {
        if (parent.children.length == 0) {
            return e.preventDefault();
        }
    });

}

document.getElementById('password').onkeypress = function (event) {
    if (event.key.match(allow)) {
        return true;
    }
    return false;
}

document.getElementById('password').onkeyup = function (event) {
    let myPasswordValue = document.getElementById('password').value;
    let barScale = document.querySelector('#barScale');
    let lock = document.querySelector('#lock');

    send.addEventListener('click', function (e) {
        if (!lock.classList.contains('fa-lock-open')) {
            return e.preventDefault();
        }
    });

    function isLockOpen(myPasswordValue) {
        if (isValid(myPasswordValue)
            && myPasswordValue.length >= 6) {
            return true;
        }
        return false;
    }

    function changeLock() {
        if (isLockOpen(myPasswordValue)) {
            return lock.classList.add('fa-lock-open');
        }
        return lock.classList.remove('fa-lock-open');
    }

    changeLock();

    function isStringHasNumbers(myPasswordValue) {
        if (myPasswordValue.match(numbers)) {
            return true;
        }
        return false;
    }

    function isStringHasUpperCase(myPasswordValue) {
        if (myPasswordValue.match(upperCase)) {
            return true;
        }
        return false;
    }

    function isStringHasLowerCase(myPasswordValue) {
        if (myPasswordValue.match(lowerCase)) {
            return true;
        }
        return false;
    }

    function isValid(myPasswordValue) {
        if (isStringHasNumbers(myPasswordValue)
            && isStringHasUpperCase(myPasswordValue)
            && isStringHasLowerCase(myPasswordValue)) {
            return true;
        }
        return false;
    }

    function isPasswordLow(myPasswordValue) {
        if (myPasswordValue.length > 0
            && myPasswordValue.length < 6
            || myPasswordValue.length > 0
            && !isValid(myPasswordValue)) {
            return true;
        }
        return false;
    }

    function isPasswordMedium(myPasswordValue) {
        if (myPasswordValue.length >= 6
            && myPasswordValue.length <= 8
            && isValid(myPasswordValue)) {
            return true;
        }
        return false;
    }

    function isPasswordHigh(myPasswordValue) {
        if (myPasswordValue.length > 8
            && isValid(myPasswordValue)) {
            return true;
        }
        return false;
    }

    function setProgressBar(setLength) {
        barScale.setAttribute('style', 'width:' + setLength + '%')
        if (setLength > 0
            && setLength <= 33) {
            return barScale.style.background = 'red';
        }
        if (setLength > 33
            && setLength <= 67) {
            return barScale.style.background = 'yellow';
        }
        if (setLength > 67
            && setLength <= 100) {
            return barScale.style.background = '#52ac56';
        }
    }

    function checkPassword(myPasswordValue) {
        if (isPasswordLow(myPasswordValue)) {
            return setProgressBar(33);
        }
        if (isPasswordMedium(myPasswordValue)) {
            return setProgressBar(67);
        }
        if (isPasswordHigh(myPasswordValue)) {
            return setProgressBar(100);
        }
        return setProgressBar(0);
    }

    checkPassword(myPasswordValue);

}


