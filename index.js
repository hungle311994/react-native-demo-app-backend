index.js;
/**
 * npm init
 * npm i express
 * npm i -g nodemon
 * adb reverse tcp:3000  tcp:3000
 * nodemon index.js
 */

const express = require("express");
const fs = require("fs"); // fileSystem

// Tạo app watch express
// --- Server ---
const app = express();
const port = 3000;
const rawData = fs.readFileSync("./data/data.json");
const data = JSON.parse(rawData).transactions;

// --- Client ---
app.use(express.json());

// --- Methods ---
app.listen(port, () => {
  console.log(`Listening on port: ${port}, connected!`);
});

// GET METHOD
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Connetion to server",
  });
});

app.get("/transactions", (req, res) => {
  try {
    res.status(200).json({
      result: true,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      result: false,
      message: error.message,
    });
  }
});

app.get("/transactions/:id", (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const product = data.find((e) => e.id === id);
    if (product) {
      res.status(200).json({
        result: true,
        data: product,
      });
    } else {
      res.status(400).json({
        result: false,
        message: "Transaction not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      result: false,
      message: error.message,
    });
  }
});

app.get("/transaction-by-id", (req, res) => {
  const id = parseInt(req.query.id);
  try {
    const transaction = data.find((e) => e.id === id);
    if (transaction) {
      res.status(200).json({
        result: true,
        data: transaction,
      });
    } else {
      res.status(400).json({
        result: false,
        message: "Transaction not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      result: false,
      message: error.message,
    });
  }
});

app.get("/search-transactions", (req, res) => {
  const name = req.query.name;
  try {
    const transactions = data.filter((e) =>
      e.title.toLowerCase().includes(name.toLowerCase())
    );
    if (transactions) {
      console.log(transactions);
      res.status(200).json({
        result: true,
        data: transactions,
      });
    } else {
      res.status(400).json({
        result: false,
        message: "Transaction not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      result: false,
      message: error.message,
    });
  }
});

app.get("/transactions-by-category", (req, res) => {
  const cat = req.query.cat;
  try {
    const transactions = data.filter((e) =>
      e.category.toLowerCase().includes(cat.toLowerCase())
    );
    if (transactions) {
      res.status(200).json({
        result: true,
        data: transactions,
      });
    } else {
      res.status(400).json({
        result: false,
        message: "Transactions not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      result: false,
      message: error.message,
    });
  }
});

// POST METHOD
app.post("/add-transaction", (req, res) => {
  const resBody = req.body;
  try {
    data.unshift(resBody);
    res.status(200).json({
      result: true,
      message: "Add transaction success",
    });
    console.log(data);
  } catch (error) {
    res.status(400).json({
      result: false,
      message: error.message,
    });
  }
});

// PUT METHOD
app.put("/update-transaction/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const resBody = req.body;
  try {
    const index = data.findIndex((e) => e.id === id);
    data[index] = resBody;
    res.status(200).json({
      result: true,
      message: "Update transaction success",
    });
  } catch (error) {
    res.status(400).json({
      result: false,
      message: error.message,
    });
  }
});

// DELETE METHOD
app.delete("/delete-transaction", (req, res) => {
  const id = parseInt(req.query.id);
  try {
    const index = data.findIndex((e) => e.id === id);
    data.splice(index, 1);
    res.status(200).json({
      result: true,
      message: "Delete transaction success",
    });
  } catch (error) {
    res.status(400).json({
      result: false,
      message: error.message,
    });
  }
});
