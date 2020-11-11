require('dotenv').config();
const { readdirSync } = require('fs');
const { Client } = require('@androz2091/insta.js');

const bot = new Client({ disableReplyPrefix: true });

readdirSync('./src/events/').forEach(file => {
    bot.on(file.split('.')[0], (...args) => require(`./events/${file}`)(bot, ...args));
    console.log(`Memuat events ${file.split('.')[0]}`);
});

bot.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);