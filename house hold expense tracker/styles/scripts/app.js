// ===== Initialize =====
let totalBudget = parseFloat(localStorage.getItem('totalBudget')) || 0;
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const totalBudgetInput = document.getElementById('total-budget');
const spentAmountEl = document.getElementById('spent-amount');
const remainingAmountEl = document.getElementById('remaining-amount');

const categorySelect = document.getElementById('expense-category');
const paymentSelect = document.getElementById('payment-method');
const amountInput = document.getElementById('expense-amount');
const notesInput = document.getElementById('expense-notes');
const addExpenseBtn = document.getElementById('add-expense-btn');

const expenseListTbody = document.getElementById('expense-list');
const insightMsg = document.getElementById('insight-msg');

let chart;

// ===== Load initial data =====
totalBudgetInput.value = totalBudget;
updateDashboard();

// ===== Update Budget =====
totalBudgetInput.addEventListener('input', ()=>{
    totalBudget = parseFloat(totalBudgetInput.value) || 0;
    localStorage.setItem('totalBudget', totalBudget);
    updateDashboard();
});

// ===== Add Expense =====
addExpenseBtn.addEventListener('click', ()=>{
    const category = categorySelect.value;
    const method = paymentSelect.value;
    const amount = parseFloat(amountInput.value);
    const notes = notesInput.value.trim();

    if(!category || !method || !amount || amount <=0){
        alert('Please enter valid category, payment method, and amount.');
        return;
    }

    expenses.push({category, method, amount, notes});
    localStorage.setItem('expenses', JSON.stringify(expenses));

    updateDashboard();

    // Clear inputs
    categorySelect.value='';
    paymentSelect.value='';
    amountInput.value='';
    notesInput.value='';
});

// ===== Delete Expense =====
function deleteExpense(idx){
    expenses.splice(idx,1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateDashboard();
}
window.deleteExpense = deleteExpense;

// ===== Update Dashboard =====
function updateDashboard(){
    renderExpenseTable();
    updateBudgetOverview();
    renderChart();
    generateInsights();
}

// ===== Render Expense Table =====
function renderExpenseTable(){
    expenseListTbody.innerHTML='';
    expenses.forEach((exp, idx)=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${exp.category}</td>
            <td>₹${exp.amount}</td>
            <td>${exp.method}</td>
            <td>${exp.notes}</td>
            <td><button onclick="deleteExpense(${idx})">Delete</button></td>
        `;
        expenseListTbody.appendChild(tr);
    });
}

// ===== Update Budget Overview =====
function updateBudgetOverview(){
    const spent = expenses.reduce((sum,e)=>sum+e.amount,0);
    spentAmountEl.innerText = spent;
    remainingAmountEl.innerText = (totalBudget - spent).toFixed(2);
}

// ===== Render Pie Chart =====
function renderChart(){
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const categoryTotals = {};
    expenses.forEach(e=>{
        categoryTotals[e.category] = (categoryTotals[e.category]||0)+e.amount;
    });

    const data = {
        labels: Object.keys(categoryTotals),
        datasets:[{
            data: Object.values(categoryTotals),
            backgroundColor:['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#C9CBCF','#8A2BE2']
        }]
    };

    if(chart) chart.destroy();
    chart = new Chart(ctx,{ type:'pie', data:data });
}

// ===== Generate Insights =====
function generateInsights(){
    const spent = expenses.reduce((sum,e)=>sum+e.amount,0);
    const remaining = totalBudget - spent;

    let highestCategory='', maxAmount=0;
    const categoryTotals = {};
    expenses.forEach(e=>{
        categoryTotals[e.category] = (categoryTotals[e.category]||0)+e.amount;
    });
    for(let cat in categoryTotals){
        if(categoryTotals[cat]>maxAmount){
            highestCategory=cat;
            maxAmount=categoryTotals[cat];
        }
    }

    let msg = `Total Spent: ₹${spent}, Remaining: ₹${remaining.toFixed(2)}.`;
    if(highestCategory){
        msg += ` Highest spending: ${highestCategory} ₹${maxAmount}.`;
        msg += ` Suggested saving: Try to save at least ₹${Math.max(0,remaining).toFixed(2)} this month.`;
    }
    if(remaining<0){
        msg += " ⚠️ You are overspending!";
    }
    insightMsg.innerText = msg;
}
