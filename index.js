const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');

const token = '6182098561:AAGowfBSJC-Sj8zQtMIYiJrvoZISEVWGmE4';
const bot = new TelegramApi(token, { polling: true });

const chats = {};

const startGame = async chatId => {
    await bot.sendMessage(chatId, 'Now I will guess the number from 0 to 9, try to guess.');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Guess number', gameOptions);
};

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Initial greeting' },
        { command: '/info', description: 'Get user information' },
        { command: '/game', description: 'Game guess number' },
    ]);

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/422/93d/42293d5f-7cd5-49f6-a8fd-939f71b06a83/1.webp');
            return bot.sendMessage(chatId, `Welcome to our telegram bot VlTon`);
        }

        if (text === '/info') {
            return bot.sendMessage(chatId, `You name ${msg.from.first_name} ${msg.from.last_name}`);
        }

        if (text === '/game') {
            return startGame(chatId);
        }

        return bot.sendMessage(chatId, `I don't understand you, try again`);
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId);
        }

        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `Congratulations, you guessed the number ${chats[chatId]}`, againOptions);
        } else {
            return bot.sendMessage(chatId, `Unfortunately, you did not guess correctly, the bot guessed the number ${chats[chatId]}`, againOptions);
        }
    });
};

start();
