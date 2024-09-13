function check_velidity(a, base1) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] >= 'A') {
            if (a.charCodeAt(i) >= ('A'.charCodeAt(0) - 10 + base1)) {
                return false;
            }
        }
       else if (a[i] >= '0' && a[i] <= '9') {
            if (a[i] - '0' >= base1) {
                return false;
            }
        }
    }
    return true;
}

function convertBase() {
    const base1 = parseInt(document.getElementById('base1').value);
    let a = document.getElementById('number').value;
    const base2 = parseInt(document.getElementById('base2').value);

    let check = check_velidity(a, base1);
    if (!check) {
        document.getElementById('result').innerText = "Sorry! You entered an invalid number.";
        return;
    }

    let k = 0;
    let decimal = 0;
    let fricdecimal = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] === '.') {
            break;
        }
        k++;
    }

    let w = -1;
    let p = k - 1;
    for (let i = 0; i < a.length; i++) {
        if (i < k) {
            if (a[i] >= 'A' && a[i] <= 'Z') {
                decimal = decimal + Math.pow(base1, p) * (a.charCodeAt(i) - '7'.charCodeAt(0));
                p--;
            } else {
                decimal = decimal + Math.pow(base1, p) * (a[i] - '0');
                p--;
            }
        } else if (i > k) {
            if (a[i] >= 'A' && a[i] <= 'Z') {
                fricdecimal = fricdecimal + Math.pow(base1, w) * (a.charCodeAt(i) - '7'.charCodeAt(0));
                w--;
            } else {
                fricdecimal = fricdecimal + Math.pow(base1, w) * (a[i] - '0');
                w--;
            }
        }
    }

    let count_decimal = 20;
    let count_deci1 = 8;

    let decimal1 = Math.floor(decimal);
    let res = decimal + fricdecimal;

    let v1 = [];
    while (true) {
        let k = decimal1 % base2;
        v1.push(k);
        if (decimal1 < base2) {
            break;
        }
        decimal1 = Math.floor(decimal1 / base2);
    }

    let ans1 = 0;
    let arr1 = new Array(count_decimal).fill(0);
    let answerfric = 0;

    let bs2 = base2;
    for (let i = 0; i <= count_decimal + 4; i++) {
        fricdecimal = fricdecimal * bs2;
        answerfric = Math.floor(fricdecimal);
        fricdecimal = fricdecimal - answerfric;
        arr1[i] = answerfric;
    }

    let resultString = ``;
    for (let j = v1.length - 1; j >= 0; j--) {
        let x = v1[j];
        if (x >= 10) {
            let a = String.fromCharCode('A'.charCodeAt(0) - 10 + x);
            resultString += a;
        } else {
            resultString += x;
        }
    }
    resultString += ".";
    for (let k = 0; k < count_deci1 + 3; k++) {
        let x = arr1[k];
        if (x >= 10) {
            let a = String.fromCharCode('A'.charCodeAt(0) - 10 + x);
            resultString += a;
        } else {
            resultString += x;
        }
    }

    document.getElementById('result').innerText = resultString;
}

document.getElementById('converterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    convertBase();
});
