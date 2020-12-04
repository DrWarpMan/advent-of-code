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

    const tree = "#";
    const square = ".";

    function calcTrees(x, y) {
        let trees = 0;
        let squares = 0;

        const handle = (item) => {
            if (item === tree)
                trees++;
            else if (item === square)
                squares++;
            else throw new Error("Invalid item!");
        }

        const addX = x;
        const addY = y;
        const lines = data.length;
        const lineLength = data[0].length;

        let curX = 0;
        let curY = 0;

        while (curY < lines) {
            let item = data[curY][curX];

            if (curX >= lineLength) {
                curX -= lineLength;
                item = data[curY][curX];
            }

            handle(item);

            curX += addX;
            curY += addY;
        }

        return trees;
    }

    function partOne() {
        let result = 0;

        result = calcTrees(3, 1);

        return result;
    }

    function partTwo() {
        let result = 0;

        result =
            calcTrees(1, 1) *
            calcTrees(3, 1) *
            calcTrees(5, 1) *
            calcTrees(7, 1) *
            calcTrees(1, 2)

        return result;
    }

    console.log("P1: " + partOne());
    console.log("P2: " + partTwo());
}