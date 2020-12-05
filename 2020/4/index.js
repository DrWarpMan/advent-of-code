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

    const ignored = ["cid"];
    const required = [
        "byr",
        "iyr",
        "eyr",
        "hgt",
        "hcl",
        "ecl",
        "pid"
    ];

    /* Validating variables */
    const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

    function partOne() {
        let result = 0;


        data.forEach(i => {
            const parts = i.trim().split(/\s+/);
            const passport = {};

            parts.forEach(part => {
                const ppData = part.split(":");
                const ppField = ppData[0];
                const ppValue = ppData[1];

                if (!(ignored.includes(ppField)))
                    passport[ppField] = ppValue;
            });

            if (Object.keys(passport).length === required.length)
                result++;
        });

        return result;
    }

    function partTwo() {
        let result = 0;

        data.forEach(i => {
            const parts = i.trim().split(/\s+/);
            const passport = {};

            parts.forEach(part => {
                const ppData = part.split(":");
                const ppField = ppData[0];
                const ppValue = ppData[1];

                if (!(ignored.includes(ppField)))
                    passport[ppField] = ppValue;
            });

            if (Object.keys(passport).length === required.length)
                if (!(Object.keys(passport).some(ppField => !isValid(ppField, passport[ppField]))))
                    result++;
        });

        return result;
    }

    function isValid(field, value) {
        if (value.length <= 0) return false;

        switch (field) {
            case "byr":
                return (value.length === 4 && /^\d+$/.test(value) && value >= 1920 && value <= 2002);
            case "iyr":
                return (value.length === 4 && /^\d+$/.test(value) && value >= 2010 && value <= 2020);
            case "eyr":
                return (value.length === 4 && /^\d+$/.test(value) && value >= 2020 && value <= 2030);
            case "hgt":
                const unit = value.substring(value.length - 2);
                const len = value.substring(0, value.length - unit.length);

                if (!(/^\d+$/.test(len))) return false;

                if (unit === "cm")
                    return (len >= 150 && len <= 193);
                else if (unit === "in")
                    return (len >= 59 && len <= 76);
                else return false;
            case "hcl":
                return (value.startsWith("#") && value.length === 7 && /^([abcdef]|[0-9])+$/.test(value.substring(1)));
            case "ecl":
                return (eyeColors.includes(value));
            case "pid":
                return (value.length === 9 && /^\d+$/.test(value));
            default:
                throw new Error("Invalid field!");
        }
    }

    console.log("P1: " + partOne());
    console.log("P2: " + partTwo());
}