const fs = require('fs');

function randomAmount(min = 10, max = 5000) {
  // Returns a negative float with 2 decimals
  return -parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function randomDate(start, end) {
  // Returns a date string before 2025-09-10
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0] + 'T00:00:00';
}

const payments = [];
const today = new Date('2025-09-10');
const earliest = new Date('2024-01-01');

for (let i = 1; i <= 101; i++) {
  const amount = randomAmount();
  const date = randomDate(earliest, today);
  payments.push({
    balance: amount,
    dueDate: date,
    id: `PAY${String(i).padStart(7, '0')}`,
    isSupressed: "N",
    originalAmount: amount,
    prepayCode: 0,
    transactionDate: date,
    transactionDescription: `Incoming Payment (PAY${String(i).padStart(7, '0')})`,
    transactionType: "Customer Payment",
    __typename: "AccountActivityItem"
  });
}

// Read your existing file
const filePath = './activityByAccountPayments.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Add new payments
data.data.activityByAccount.items.push(...payments);
data.data.activityByAccount.totalItems = data.data.activityByAccount.items.length;

// Write back to file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log(`Added 101 Customer Payment records to ${filePath}`);