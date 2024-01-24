"use strict";
const fs = require("fs");
const pg = require("pg");
const axios = require("axios");
const connectionConfig = require("./connectionConfig");

const conn = new pg.Client(connectionConfig);

conn.connect(async (err) => {
  if (err) throw err;

  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS char_table (
        id serial PRIMARY KEY,
        name text NOT NULL,
        data jsonb NOT NULL
      );
    `);

    const response = await axios.get("https://rickandmortyapi.com/api/character/");
    const characters = response.data.results;

    for (const character of characters) {
      const { id, name } = character;
      const data = JSON.stringify(character);

      await conn.query(`
        INSERT INTO char_table (name, data) VALUES ($1, $2)
        ON CONFLICT (id) DO UPDATE SET name = $1, data = $2;
      `, [name, data]);

      console.log(`Character "${name}" with ID ${id} inserted successfully.`);
    }

    console.log("All characters inserted into the database.");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    conn.end();
  }
});