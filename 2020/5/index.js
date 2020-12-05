const fs = require("fs");
const path = require("path");

try {
    const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");
    launch(data);
} catch (err) {
    console.error(err);
}

function launch(data) {
    data = data.split("\n");

    const maxRow = 127;
    const maxColumn = 7;

    function partOne() {
        let result = 0;

        data.forEach(i => {
            const row = i.substring(0, 7);
            const column = i.substring(7);

            rowPos = calcPos("row", row);
            columnPos = calcPos("column", column);
            const seatID = rowPos * 8 + columnPos;

            if (result < seatID)
                result = seatID;
        });

        if (result === 0) throw new Error("Prolly something bad happened..");

        return result;
    }

    function partTwo() {
        let result = 0;

        return result;
    }

    function calcPos(type, chars) {
        let top = (type === "row") ? maxRow : maxColumn;
        let bottom = 0;
        let final = false;

        chars.split("").forEach((char, index) => {
            if (char === "F" || char === "L") {
                const half = (top - bottom + 1) / 2;
                const middle = top - half;
                bottom = bottom;
                top = middle;
            } else if (char === "B" || char === "R") {
                const half = (top - bottom + 1) / 2;
                const middle = bottom + half;
                top = top;
                bottom = middle;
            } else throw new Error("Invalid char!");
        });

        if (top === bottom)
            final = top;
        else throw new Error("Invalid final!");

        return final;
    }

    console.log("P1: " + partOne());
    console.log("P2: " + partTwo());
}