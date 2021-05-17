const { Telegraf } = require('telegraf');
const { prediction } = require('./services');
const { positive, negative }  = require('./services/model/classification').text;
require('dotenv').config();

const bot = new Telegraf(process.env.TELE_TOKEN);

bot.start( (ctx) => ctx.reply('Welcome To Tweet Disaster Classification By Ahmad Azri'));
bot.help((ctx) => ctx.reply('Will guess if the text enter are disaster tweet or not'));

bot.on('text', async (ctx) => {
    const { text } = ctx.message;
    const result = await prediction(text.trim());
    const reply = result === positive ? 'Something bad is happening' : 'Its normal'; 
    ctx.reply(reply);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));