const fs = require("fs");
const path = require("path");

try {
    const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");
    launch(data);
} catch (err) {
    console.error(err);
}

function launch(data) {
    data = data.split("\n").map(i => parseInt(i));

    function partOne() {
        let result = false;

        data.forEach(num1 => {
            data.forEach(num2 => {
                if (num1 + num2 === 2020)
                    result = num1 * num2;
            });
        });

        return result;
    }

    function partTwo() {
        let result = false;

        data.forEach(num1 => {
            data.forEach(num2 => {
                data.forEach(num3 => {
                    if (num1 + num2 + num3 === 2020)
                        result = num1 * num2 * num3;
                });
            });
        });

        return result;
    }

    console.log("P1: " + partOne());
    console.log("P2: " + partTwo());
}