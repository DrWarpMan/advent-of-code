const fs = require("fs");
const path = require("path");

try {
    const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");
    launch(data);
} catch (err) {
    console.error(err);
}

function launch(data) {
    data = data.split("\n\n");

    function partOne() {
        let result = 0;



        return result;
    }

    function partTwo() {
        let result = 0;


        return result;
    }

    console.log("P1: " + partOne());
    console.log("P2: " + partTwo());
}