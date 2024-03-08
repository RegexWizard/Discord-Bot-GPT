require('dotenv/config'); // Gives access to .env
const { Client } = require('discord.js'); // Variable
const { OpenAI } = require('openai'); // Variable

const client = new Client({ // New Var, with tables
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent']
})

client.on('ready', () => { // Events if the client ready
    console.log("Bot is online!");
})

const IGNORE_PREFIX = "!"; // Optional, bot will ignore
const CHANNELS = ['1156785778546987172']

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})

client.on('messageCreate', async (message) => { // Basicalyy message is a function
    if (message.author.bot) return;
    if (message.content.startsWith(IGNORE_PREFIX)) return;
    if (!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id)) return;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                // name:
                role: 'system',
                content: 'Chat GPT moment',
            },
            {
                // name:
                role: 'user',
                content: 'message.content',
            },
        ],
    }) 
    .catch((error) => console.error('OpenAI ErrirL\n', error));

    message.reply(response.choices[0].message.content);
});



client.login(process.env.TOKEN); // Clients login with token