// Predefined price list (expanded Shoprite style)
const priceList = {
  // Bakery
  bread: 20,
  rolls: 15,
  cake: 45,

  // Dairy
  milk: 15,
  cheese: 40,
  yogurt: 12,

  // Beverages
  coke: 18,
  juice: 25,
  water: 10,

  // Pantry
  sugar: 30,
  rice: 50,
  flour: 35,
  oil: 65,
  salt: 10,
  tea: 28,
  coffee: 75,

  // Produce
  apples: 5,
  bananas: 4,
  oranges: 6,
  potatoes: 40,
  onions: 25,
  tomatoes: 30,

  // Meat
  chicken: 80,
  beef: 120,
  fish: 90,

  // Cleaning
  soap: 12,
  toothpaste: 20,
  detergent: 55,

  // Snacks
  chips: 15,
  biscuits: 18,
  chocolate: 22
};

// Discounts
const discounts = {
  rice: 10,
  chicken: 5,
  coke: 5,
  chocolate: 15
};

let cart = [];


// Add item to cart
function addItem() {
  const itemName = document.getElementById("itemName").value.toLowerCase();
  const qty = parseInt(document.getElementById("itemQty").value);

  if (!priceList[itemName]) {
    alert("Item not found in price list!");
    return;
  }

  cart.push({ name: itemName, qty });
  generateReceipt();

  document.getElementById("itemName").value = ""; // clear input
  document.getElementById("itemQty").value = 1;
}


// Generate receipt
function generateReceipt() {
  let output = "    SHOPRITE\n";
  output += "   CUSTOMER RECEIPT\n";
  output += "=========================\n";
  output += new Date().toLocaleString() + "\n";
  output += "=========================\n\n";
  output += "Item        Qty  Price  Disc   Total\n";
  output += "-----------------------------------\n";

  let grandTotal = 0;

  cart.forEach(item => {
    let price = priceList[item.name];
    let subtotal = price * item.qty;
    let discountRate = discounts[item.name] || 0;
    let discountAmount = (subtotal * discountRate) / 100;
    let finalTotal = subtotal - discountAmount;

    output += `${item.name.padEnd(10)} ${String(item.qty).padEnd(3)} R${price.toFixed(2).padEnd(5)} ${discountRate}%   R${finalTotal.toFixed(2)}\n`;

    grandTotal += finalTotal;
  });

  output += "-----------------------------------\n";
  output += `TOTAL: R${grandTotal.toFixed(2)}\n`;
  output += "===================================\n";
  output += "  THANK YOU FOR SHOPPING AT\n";
  output += "         SHOPRITE\n";
  output += "===================================\n";
  output += "|||||||||||||||||||||||||||||||||\n"; // Fake barcode

  document.getElementById("receiptOutput").textContent = output;
}


// Print / Download Receipt
function printReceipt() {
  const receiptContent = document.getElementById("receiptOutput").textContent;

  const printWindow = window.open("", "", "width=400,height=600");
  printWindow.document.write(`
    <html>
      <head>
        <title>Shoprite Receipt</title>
        <style>
          body { text-align: center; font-family: monospace; }
          pre {
            font-family: monospace;
            font-size: 14px;
            white-space: pre-wrap;
            width: 280px;
            margin: auto;
            text-align: center; /* ensure text is centered */
          }
          img { width: 150px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <img src="Shoprite.jpeg" alt="Shoprite Logo">
        <pre>${receiptContent}</pre>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}
