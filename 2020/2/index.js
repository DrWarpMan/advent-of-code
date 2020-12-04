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

    function partOne() {
        let result = 0;

        data.forEach(i => {
            const parts = i.split(" ");
            const nums = parts[0].split("-");
            const num1 = parseInt(nums[0]);
            const num2 = parseInt(nums[1]);
            const char = parts[1][0];
            const password = parts[2];

            const occurences = password.split("").filter(i => i === char).length;

            if (num1 <= occurences && occurences <= num2)
                result++;
        });


        return result;
    }

    function partTwo() {
        let result = 0;

        data.forEach(i => {
            const parts = i.split(" ");
            const nums = parts[0].split("-");
            const num1 = parseInt(nums[0]) - 1; // Since Toboggan Corporate Policies have no concept of "index zero"
            const num2 = parseInt(nums[1]) - 1;
            const char = parts[1][0];
            const password = parts[2];

            if ((password[num1] === char) ? !(password[num2] === char) : (password[num2] === char))
                result++;
        });

        return result;
    }

    console.log("P1: " + partOne());
    console.log("P2: " + partTwo());
}