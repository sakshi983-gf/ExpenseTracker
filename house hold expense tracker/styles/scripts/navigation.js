// Dashboard Step Navigation
const stepBudget = document.getElementById('step-budget');
const stepExpenses = document.getElementById('step-expenses');
const stepAnalytics = document.getElementById('step-analytics');

const nextToExpenses = document.getElementById('next-to-expenses');
const prevToBudget = document.getElementById('prev-to-budget');
const nextToAnalytics = document.getElementById('next-to-analytics');
const prevToExpenses = document.getElementById('prev-to-expenses');

nextToExpenses.addEventListener('click', () => {
    stepBudget.style.display = 'none';
    stepExpenses.style.display = 'block';
});

prevToBudget.addEventListener('click', () => {
    stepExpenses.style.display = 'none';
    stepBudget.style.display = 'block';
});

nextToAnalytics.addEventListener('click', () => {
    stepExpenses.style.display = 'none';
    stepAnalytics.style.display = 'block';
});

prevToExpenses.addEventListener('click', () => {
    stepAnalytics.style.display = 'none';
    stepExpenses.style.display = 'block';
});
