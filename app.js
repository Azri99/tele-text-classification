const { Telegraf } = require('telegraf')
const { prediction } = require('./src')

require('dotenv').config();

const bot = new Telegraf(process.env.TELE_TOKEN);

bot.start( (ctx) => ctx.reply('Welcome To Tweet Disaster Classification'));
bot.help((ctx) => ctx.reply('Will guess if the text enter are disaster tweet or not'))

bot.on('text', async (ctx) => {
    const { text } = ctx.message;
    text.trim() === '' && ctx.reply('Enter a statement about disaster');
    const result = await prediction(text.trim());
    ctx.reply(`Text are ${result} of disaster`);
});

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))