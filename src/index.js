require('dotenv').config(); // Memuat file .env
const { Client } = require('@androz2091/insta.js');
const { readdirSync } = require('fs');

const client = new Client({ disableReplyPrefix: true });

readdirSync('./src/handler/').forEach(file => {
    client.on(file.split('.')[0], (...args) => require(`./handler/${file}`)(client, ...args));
    console.log(file);
});

client.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);