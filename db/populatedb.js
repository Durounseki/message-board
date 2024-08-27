#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ) NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username,message) 
VALUES
  ('Durounseki', 'Hi there! Feel free to share your thoughts.');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    await client.query(SQL);
  } catch(err) {
    console.error('Error executing query: ', err);
  } finally {
    await client.end();
    console.log("done");
  }
}

main();