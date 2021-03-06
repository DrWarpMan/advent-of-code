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

            rowPos = calcSeat("row", row);
            columnPos = calcSeat("column", column);
            const seatID = rowPos * 8 + columnPos;

            if (result < seatID)
                result = seatID;
        });

        if (result === 0) throw new Error("Prolly something bad happened..");

        return result;
    }

    function partTwo() {
        let result = false;
        let allSeatIDs = [];

        data.forEach(i => {
            const row = i.substring(0, 7);
            const column = i.substring(7);

            rowPos = calcSeat("row", row);
            columnPos = calcSeat("column", column);
            const seatID = rowPos * 8 + columnPos;

            allSeatIDs.push(seatID);
        });

        allSeatIDs.sort((a, b) => a - b);

        allSeatIDs.forEach((seatID, index) => {
            if (result === false) {
                const prev = allSeatIDs[index - 1];
                const next = allSeatIDs[index + 1];

                if (next && seatID + 1 !== next)
                    result = seatID + 1;
                if (prev && seatID - 1 !== prev)
                    result = seatID - 1;
            }
        });

        if (result === false) throw new Error("Prolly something bad happened..");

        return result;
    }

    function calcSeat(type, chars) {
        let top = (type === "row") ? maxRow : maxColumn;
        let bottom = 0;
        let final = false;

        chars.split("").forEach(char => {
            const half = (top - bottom + 1) / 2;
            if (char === "F" || char === "L") {
                const middle = top - half;
                top = middle;
                //bottom = bottom;
            } else if (char === "B" || char === "R") {
                const middle = bottom + half;
                bottom = middle;
                //top = top;
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