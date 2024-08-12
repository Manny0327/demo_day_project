let salaryInput = document.getElementById("salary_input");
let rent_MortgageInput = document.getElementById("rent_mortgage_input");
let waterBillInput = document.getElementById("waterBill_input");
let electricityBillInput = document.getElementById("electricityBill_input");
let gasBillInput = document.getElementById("gasBill_input");
let phoneBillInput = document.getElementById("phoneBill_input");
let submitBtn = document.getElementById("submit_btn");
let remainingDisplay = document.getElementById("remaining_display");

function updateBarGraph(budget) {
    console.log("Updating bar graph with budget:", budget);
    const maxBudget = Math.max(...Object.values(budget), 1); // Ensure maxBudget is at least 1 to avoid division by zero
    console.log("Max budget:", maxBudget);

    for (const category in budget) {
        const barId = category.replace(/_/g, '') + "-bar"; // Ensure underscores are removed in ID matching
        const bar = document.getElementById(barId);
        if (bar) {
            const percentage = (budget[category] / maxBudget) * 100;
            console.log(`Setting height of ${barId} to ${percentage}%`);
            bar.style.height = `${percentage}%`;
            bar.textContent = `$${budget[category]}`;
        } else {
            console.error(`Bar with ID ${barId} not found`);
        }
    }
}

function updateSalaryDisplay(e) {
    const salary = e.target.value || 0;
    remainingDisplay.textContent = `Amount of Money Left After Expenses: $${salary}`;
}

salaryInput.addEventListener("input", updateSalaryDisplay);

function handleFormSubmit(event) {
    event.preventDefault();

    const salary = parseFloat(salaryInput.value)||0;
    const budget = {
        rent_mortgage: parseFloat(rent_MortgageInput.value) || 0,
        waterBill: parseFloat(waterBillInput.value) || 0,
        electricityBill: parseFloat(electricityBillInput.value) || 0,
        gasBill: parseFloat(gasBillInput.value) || 0,
        phoneBill: parseFloat(phoneBillInput.value) || 0,
    };
//math
    const totalExpenses = Object.values(budget).reduce((sum,value) => sum+value,0);
    const remainingAmount = salary-totalExpenses;

    updateBarGraph(budget);
    salaryDisplay.textContent = `Your Salary: $${salary}    ||  Remaining Amount after expenses: $${remainingAmount.toFixed(2)}`;
}
salaryInput.addEventListener("input",updateSalaryDisplay);
submitBtn.addEventListener("click", handleFormSubmit);

// New button to add more expenses

document.getElementById('addBarButton').addEventListener('click', function() {
    const form = document.getElementById('budget_form');

    // Create a new div element for the new bill input
    const newDiv = document.createElement('div');

    // Generate a unique ID for the new input
    const billInputs = form.querySelectorAll('input[type="number"]').length;
    const newId = `bill_input_${billInputs + 1}`;

    // Create the label element
    const newLabel = document.createElement('label');
    newLabel.setAttribute('for', newId);
    newLabel.innerHTML = `Other bill: `;

    // Create the input element
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('id', newId);
    newInput.setAttribute('placeholder', '  Enter cost here');

    // Append the label and input to the new div
    newDiv.appendChild(newLabel);
    newDiv.appendChild(newInput);

    // Add some spacing using CSS
    newDiv.style.marginBottom = '20px';
    newInput.style.marginLeft = '3vw'

    // Append the new div before the "Add Bill Section" button
    form.insertBefore(newDiv, document.getElementById('addBarButton'));
});

