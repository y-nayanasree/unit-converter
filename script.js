
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");
const result = document.getElementById("result");
const message = document.getElementById("message");

const units = {
    length: {
        m: { name: "Meters (m)", factor: 1 },
        ft: { name: "Feet (ft)", factor: 0.3048 },
        km: { name: "Kilometers (km)", factor: 1000 },
        mi: { name: "Miles (mi)", factor: 1609.344 }
    },
    weight: {
        kg: { name: "Kilograms (kg)", factor: 1 },
        lb: { name: "Pounds (lb)", factor: 0.45359237 },
        g: { name: "Grams (g)", factor: 0.001 },
        oz: { name: "Ounces (oz)", factor: 0.028349523125 }
    }
};

function populateUnits() {
    const selectedCategory = category.value;
    const options = units[selectedCategory];

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    Object.entries(options).forEach(([key, unit]) => {
        const optionFrom = new Option(unit.name, key);
        const optionTo = new Option(unit.name, key);

        fromUnit.add(optionFrom);
        toUnit.add(optionTo);
    });

    if (selectedCategory === "length") {
        fromUnit.value = "m";
        toUnit.value = "ft";
    } else {
        fromUnit.value = "kg";
        toUnit.value = "lb";
    }

    convertUnits();
}

function convertUnits() {
    message.textContent = "";

    if (amount.value.trim() === "") {
        result.textContent = "—";
        message.textContent = "Please enter a value.";
        return;
    }

    const value = Number(amount.value);

    if (!Number.isFinite(value)) {
        result.textContent = "—";
        message.textContent = "Please enter a valid number.";
        return;
    }

    const selectedUnits = units[category.value];
    const fromFactor = selectedUnits[fromUnit.value].factor;
    const toFactor = selectedUnits[toUnit.value].factor;

    const convertedValue = (value * fromFactor) / toFactor;

    result.textContent = Number(convertedValue.toFixed(6)).toLocaleString(
        "en-US",
        { maximumFractionDigits: 6 }
    );
}

function swapUnits() {
    const previousFrom = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = previousFrom;
    convertUnits();
}

category.addEventListener("change", populateUnits);
convertBtn.addEventListener("click", convertUnits);
swapBtn.addEventListener("click", swapUnits);
amount.addEventListener("input", convertUnits);
fromUnit.addEventListener("change", convertUnits);
toUnit.addEventListener("change", convertUnits);

populateUnits();
