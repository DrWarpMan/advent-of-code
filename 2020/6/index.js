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

        data.forEach(i => {
            const chars = i.replace(/\s/g, "").split("");
            let unique = "";

            chars.forEach(char => {
                if (unique.indexOf(char) === -1)
                    unique += char;
            });

            result += unique.length;
        });

        return result;
    }

    function partTwo() {
        let result = 0;

        data.forEach(i => {
            const people = i.split("\n");
            const peopleCount = people.length;

            const answers = {};

            people.forEach(human => {
                human.split("").forEach(char => {
                    if (!answers[char]) answers[char] = 1;
                    else answers[char] += 1;
                });
            });

            let everyone = "";

            Object.keys(answers).forEach(char => {
                if (answers[char] === peopleCount)
                    everyone += char;
            });

            result += everyone.length;
        });

        return result;
    }

    console.log("P1: " + partOne());
    console.log("P2: " + partTwo());
}