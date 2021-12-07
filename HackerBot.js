const TelegramBot = require('node-telegram-bot-api');
const envConfig = require('dotenv').config();
const token = envConfig.parsed.token;
const bot = new TelegramBot(token, {polling: true});

const api = require('./Objectives/endpoints.js');
const httpUtils = require('./Utils/HttpUtils.js');
const parsers = require('./Parsers/parsers.js');
const text = require('./Text/Text.js');

let h1_users  = {};
let h1_tokens = {};

// Debug
bot.on("polling_error", console.log);

// Commands
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, text.start.replace("USERNAME", msg.chat.username), {parse_mode : "Markdown"});
});

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, text.help, {parse_mode : "Markdown"});
});

bot.onText(/\/config/, (msg) => {
    let h1_user = msg.text.split(" ")[1];
    let h1_token = msg.text.split(" ")[2];
    let success = true;

    try {
        if( (h1_user === undefined) || (h1_token === undefined) ) { throw "You have not introduced any arguments" }
        h1_users[msg.chat.id] = h1_user;
        h1_tokens[msg.chat.id] = h1_token;
    }
    catch(error) {
        success = false;
        bot.sendMessage(msg.chat.id, "`configuration is not complete => `"+`${error}`, {parse_mode : "Markdown"});
    }
    if(success) bot.sendMessage(msg.chat.id, "`Configuration is complete`", {parse_mode : "Markdown"});
});

bot.onText(/\/reports/, (msg) => {
    option = msg.text.split(" ")[1]?.toLowerCase();

    if(option === "all") {
        httpUtils.requestToApi(...[
            api.endpoints.reports.all,
            h1_users[msg.chat.id],
            h1_tokens[msg.chat.id],
            parsers.parseReports
        ])
        .then(response => {
            // Telegram API only allows me to send 10 reports per message.
            let reports = response.split("SPLIT_HERE");
            for(ten_reports of reports) {
                bot.sendMessage(msg.chat.id, ten_reports);
            }
        })
        .catch(error => bot.sendMessage(msg.chat.id, error))
    }
    else if(option === "unique") {
        Report_ID = msg.text.split(" ")[2];

        httpUtils.requestToApi(...[
            api.endpoints.reports.unique.replace("ID", Report_ID),
            h1_users[msg.chat.id],
            h1_tokens[msg.chat.id],
            parsers.parseReports
        ])
        .then(response => bot.sendMessage(msg.chat.id, response))
        .catch(error => bot.sendMessage(msg.chat.id, error))
    }
    else {
        bot.sendMessage(msg.chat.id, "`Wrong option`", {parse_mode : "Markdown"});
    }
});

bot.onText(/\/balance/, (msg) => {
    httpUtils.requestToApi(...[
        api.endpoints.balance.current,
        h1_users[msg.chat.id],
        h1_tokens[msg.chat.id],
        parsers.parseBalance
    ])
    .then(response => bot.sendMessage(msg.chat.id, response, {parse_mode : "Markdown"}))
    .catch(error   => bot.sendMessage(msg.chat.id, error))
});

bot.onText(/\/earnings/, (msg) => {
    httpUtils.requestToApi(...[
        api.endpoints.earnings.all,
        h1_users[msg.chat.id],
        h1_tokens[msg.chat.id],
        parsers.parseEarnings
    ])
    .then(response => bot.sendMessage(msg.chat.id, response))
    .catch(error   => bot.sendMessage(msg.chat.id, error))
});

bot.onText(/\/payouts/, (msg) => {
    httpUtils.requestToApi(...[
        api.endpoints.payouts.all,
        h1_users[msg.chat.id],
        h1_tokens[msg.chat.id],
        parsers.parsePayouts
    ])
    .then(response => bot.sendMessage(msg.chat.id, response))
    .catch(error   => bot.sendMessage(msg.chat.id, error))
});

bot.onText(/\/programs/, (msg) => {
    option = msg.text.split(" ")[1]?.toLowerCase();

    if(option === "weak_unique") {
        programName = msg.text.split(" ")[2]?.toLowerCase();

        response = httpUtils.requestToApi(...[
            api.endpoints.programs.weaknesses_unique.replace("HANDLE", programName),
            h1_users[msg.chat.id],
            h1_tokens[msg.chat.id],
            parsers.parseWeaks
        ])
        .then(response => {
            // Telegram API only allows me to send 25 programs per message.
            let programs = response.split("SPLIT_HERE");
            for(twenty_five_programs of programs) {
                bot.sendMessage(msg.chat.id, twenty_five_programs);
            }
        })
        .catch(error   => bot.sendMessage(msg.chat.id, error))
    }
    else if(option === "all") {
        response = httpUtils.requestToApi(...[
            api.endpoints.programs.all,
            h1_users[msg.chat.id],
            h1_tokens[msg.chat.id],
            parsers.parsePrograms
        ])
        .then(response => {
            // Telegram API only allows me to send 25 programs per message.
            let programs = response.split("SPLIT_HERE");
            for(twenty_five_programs of programs) {
                bot.sendMessage(msg.chat.id, twenty_five_programs);
            }
        })
        .catch(error   => bot.sendMessage(msg.chat.id, error))
    }
    else if(option === "unique") {
        programName = msg.text.split(" ")[2]?.toLowerCase();

        response = httpUtils.requestToApi(...[
            api.endpoints.programs.unique.replace("HANDLE", programName),
            h1_users[msg.chat.id],
            h1_tokens[msg.chat.id],
            parsers.parsePrograms
        ])
        .then(response => bot.sendMessage(msg.chat.id, response))
        .catch(error   => bot.sendMessage(msg.chat.id, error))
    }
    else {
        bot.sendMessage(msg.chat.id, "`Wrong option`", {parse_mode : "Markdown"});
    }
});