var str = "";
var operator = [];
let result;
let totalResult = 0;
document.querySelectorAll("input:not(#equal):not(#delete):not(#AC)").forEach(el => {
    el.addEventListener('click', function () {
        const value = el.value;
        if (["+", "-", "*", "/"].indexOf(value) > -1) {
            operator.push(value);
        }
        str += value;
        if (str.length >= 16) {
            document.getElementById("screen").value = "Qua do dai cho phep";
            return;
        }
        document.getElementById("screen").value = str;
    })
});
document.getElementById("equal").addEventListener('click', function () {
    let arr = str.split("");
    const lastIndex = arr[arr.length - 1];
    if (["+", "-", "*", "/"].indexOf(lastIndex) > -1) {
        document.getElementById("screen").value = "Loi Nhap";
    }
    else if (arr.indexOf(operator[operator.length - 1]) === arr.indexOf("+") + 1 ||
        arr.indexOf(operator[operator.length - 1]) === arr.indexOf("-") + 1 ||
        arr.indexOf(operator[operator.length - 1]) === arr.indexOf("*") + 1 ||
        arr.indexOf(operator[operator.length - 1]) === arr.indexOf("/") + 1
    ) {
        document.getElementById("screen").value = "Loi Nhap";
    }
    else {
        //lấy phần tử số trong array
        let operands = giveDigits(arr);
        let j = 0;
        //lap qua cac phan tu trong array roi tinh
        for (let i = 0; i < arr.length; i++) {
            //khi tim thay phep toan
            if (operator.indexOf(arr[i]) > -1) {
                if (!operands.includes(operands[j + 1])) {
                    //ket thuc day so, dat array phep toan va array so ve ban dau
                    result = calculate(result, arr[i], operands[operands.length - 1]);
                    totalResult = result;
                    operands = [];
                    operator = [];
                }
                else {
                    result = calculate(operands[j], arr[i], operands[j + 1]);
                    j += 2;
                    totalResult = result;
                }

            }
        }
        str = totalResult.toString();
        document.getElementById("screen").value = str;
    }
});

document.getElementById("delete").addEventListener('click', function () {
    let arr = str.split("");
    arr.pop();
    str = arr.join("");
    document.getElementById("screen").value = str;
});
document.getElementById("AC").addEventListener('click', function () {
    totalResult = 0;
    result = 0;
    operator = [];
    str = "";
    document.getElementById("screen").value = str;
})

const calculate = (n1, operator, n2) => {
    const firstNumber = parseFloat(n1)
    const secondNumber = parseFloat(n2)
    if (operator === '+') return firstNumber + secondNumber
    if (operator === '-') return firstNumber - secondNumber
    if (operator === '*') return firstNumber * secondNumber
    if (operator === '/') return firstNumber / secondNumber
}

const giveDigits = (arr) => {
    return arr.join('').match(/\d+/g).map(e => +e)
}