# Nuggiesv2

A utility package for Discord Bots!
<div align="center">
  <p>
    <a href="https://nodei.co/npm/nuggiesv2
/"><img src="https://nodei.co/npm/nuggiesv2.png?downloads=true&stars=true" alt="NPM Info" /></a>
  </p>
</div>

<div align="center">
 <p>
 For errors and questions you can join <a href="https://discord.gg/Z4ebH8PXeA">our support server</a></p>
</div>

# Table of content:
## ➪ [𝐈𝐧𝐬𝐭𝐚𝐥𝐥𝐚𝐭𝐢𝐨𝐧](https://www.npmjs.com/package/nuggiesv2#installation)
## ➪ [𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐨𝐧](https://www.npmjs.com/package/nuggiesv2#connect-to-database)
## ➪ [𝐆𝐢𝐯𝐞𝐚𝐰𝐚𝐲𝐬](https://www.npmjs.com/package/nuggiesv2#giveaways)
## ➪ [𝐁𝐮𝐭𝐭𝐨𝐧 𝐑𝐨𝐥𝐞𝐬](https://www.npmjs.com/package/nuggiesv2#button-roles)
## ➪ [𝐃𝐫𝐨𝐩𝐝𝐨𝐰𝐧 𝐑𝐨𝐥𝐞𝐬](https://www.npmjs.com/package/nuggiesv2#dropdown-roles)
## ➪ [𝐇𝐚𝐧𝐝𝐥𝐞𝐫 𝐈𝐧𝐭𝐞𝐫𝐚𝐜𝐭𝐢𝐨𝐧](https://www.npmjs.com/package/nuggiesv2#handle-interactions)

# Installation
```powershell
npm i nuggiesv2
 ```

yarn:
```powershell
yarn add nuggiesv2
 ```

## Connect to database
features like giveaways require a database connection, you can connect to database using 
```js
Nuggies.connect(mongodburi)
```
> ### 𝐏𝐚𝐫𝐚𝐦𝐬
uri - the mongoDB connection string

# __Giveaways__
## [𝐂𝐥𝐢𝐜𝐤 𝐡𝐞𝐫𝐞](https://github.com/Nuggies-bot/giveaways-example) for giveaways bot code using nuggies package
# Preview <img src = "https://cdn.discordapp.com/emojis/546353169341349888.png?v=1" width = "40">
<img src="https://cdn.discordapp.com/attachments/788386910757584906/855532163091922985/dbPdcey4.gif">

 # Usage <img src = "https://cdn.discordapp.com/emojis/837910195450937384.png?v=1" alt = "hmmm" width=40>

## 𝐂𝐨𝐧𝐧𝐞𝐜𝐭

You can connect to the mongoDB database

```js
const Nuggies = require('nuggiesv2');
Nuggies.connect(mongURI);
```

> ### 𝐏𝐚𝐫𝐚𝐦𝐬
mongoURI: the mongo URI

## 𝐂𝐫𝐞𝐚𝐭𝐞

You can create giveaways with `.create`
<br><br>
Example code can be found below
 ```js
        const Nuggies = require('nuggiesv2')
        Nuggies.giveaways.create({
            message: message,
            prize: 'test',
            host: message.author.id,
            winners: 1,
            endAfter: '10s',
            requirements: { enabled: false },
            channel: message.channel.id,
        });
 ```

  > ### 𝐎𝐩𝐭𝐢𝐨𝐧𝐬
 message: Discord Message

 prize: String, prize of the giveaway

 host: the host of the giveaway

 winners: Number, the winners count

endAfter: String, The time after the giveaway will end

requirements: Object, the requirements for the giveaway. example: `requirements: {enabled: true, roles: ['role']}`

channel: the channel ID the embed will be sent to
  ## 𝐃𝐫𝐨𝐩
  you can create drops with `.drop`, first to click the button gets the win!

 𝙴𝚡𝚊𝚖𝚙𝚕𝚎:

  ```js
  Nuggies.giveaways.drop({
			message: message,
			prize: 'test',
			channel: message.channel.id,
			host: message.author.id,
		});
  ```
> ### 𝐎𝐩𝐭𝐢𝐨𝐧𝐬
 message: Discord Message

 prize: String, prize of the giveaway

 host: the host of the giveaway

 channel: The channel where the drop will be sent

  ## 𝐄𝐧𝐝

 End is a function which will help you end giveaways easily <br> <br>

You can end giveaways with `.end`
 ```js
    Nuggies.giveaways.end(message, data, giveawaymsg);
 ```
 > ### ℙ𝕒𝕣𝕒𝕞𝕤
 message: Discord Message
 
 data: data from the database, can be obtained by using the `.getByMessageID` property

 giveawaymsg: fetched giveaway message
 
 
## 𝐑𝐞𝐫𝐨𝐥𝐥

 You can reroll giveaways easily with `.reroll` <br> <br>


You can simply use this function by writing a line of code.

```js
    (async () => {   
    const win = await Nuggies.giveaways.reroll(client, messageID);
    }()

```

> ### ℙ𝕒𝕣𝕒𝕞𝕤

client: The Discord Client

messageID: The message ID of the giveaway

## startTimer

you can start the timer again after restart, note that it automatically starts the timer when the giveaway start.

You can simply use this function by writing a line of code.

```js
    await Nuggies.giveaways.startTimer(message, data);
```
> ### ℙ𝕒𝕣𝕒𝕞𝕤

message: Discord Message

data: mongoose document, can be obtained by using `.getByMessageID`

## 𝐠𝐨𝐭𝐨𝐆𝐢𝐯𝐞𝐚𝐰𝐚𝐲

returns a url button leading to the giveaway.

```js
    (async () => {   
    const button = await Nuggies.giveaways.gotoGiveaway(data);
    }()

```
> ### ℙ𝕒𝕣𝕒𝕞𝕤
data: mongoose document, can be obtained by using `.getByMessageID`

## 𝐠𝐞𝐭𝐁𝐲𝐌𝐞𝐬𝐬𝐚𝐠𝐞𝐈𝐃
This gets the mongoose document for the giveaway
 ```js
    (async () => {   
    const doc = await Nuggies.giveaways.getByMessageID(messageID);
    }()
 ```
 > ### ℙ𝕒𝕣𝕒𝕞𝕤
 messageID: the message ID of the giveaway

 ## 𝐬𝐭𝐚𝐫𝐭𝐀𝐠𝐚𝐢𝐧

starts the giveaway again after restart, put this in ready event to start All the giveaways again.
 ```js
 Nuggies.giveaways.startAgain(client)
 ```
 > ### ℙ𝕒𝕣𝕒𝕞𝕤
 client: Discord Client
<br> <br>
 # __Button Roles__
  ### [click here for fully functional button-roles bot](https://github.com/Nuggies-bot/buttonroles-example)
<image src = 'https://cdn.discordapp.com/attachments/801132115755270164/857108297688285204/TBbPNb4S7a.gif'>

 ## 𝐂𝐨𝐧𝐬𝐭𝐫𝐮𝐜𝐭𝐨𝐫

 constructor. use .setrole() on it to create buttons
 ```js
 const something = new Nuggies.buttonroles().addrole({
   color: 'red', 
   label: 'test', 
   role: '781061040514269185',
   });
 ```

 > ### 𝕆𝕡𝕥𝕚𝕠𝕟𝕤

 color: the button color. Optional. Defaults to gray
 
 label: Button label

 role: role that would be added on click

 emoji: ID of the emoji on the button, optional.

 ## 𝐂𝐫𝐞𝐚𝐭𝐞

 creates the button roles

 ```js
 Nuggies.buttonroles.create({ 
   message: message, 
   role: something,  /*buttonroles constructor*/ 
   content: new Discord.MessageEmbed().setTitle('xd').setDescription('xdxd') });
 ```
 
 > ### 𝐎𝐩𝐭𝐢𝐨𝐧𝐬

 message: Discord Message

 role: The object recieved from the buttonroles constructor.

 content: content, can be a string or a Discord Embed

 # __dropdown roles__

<img src="https://cdn.discordapp.com/attachments/801132115755270164/860549628075835413/v3gHFgjz.gif">

 constructor. use .setrole() on it to create dropdown options
 ```js
 const something = new Nuggies.dropdownroles().addrole({ 
   label: 'test', 
   role: 'roleID',
   emoji: 'emojiID'
   });
 ```

 > ### 𝐎𝐩𝐭𝐢𝐨𝐧𝐬
 
 label: dropdown option label

 role: role that would be added on click

 emoji: ID of the emoji on the dropdown option, optional.

 ## 𝐂𝐫𝐞𝐚𝐭𝐞

 𝑪𝒓𝒆𝒂𝒕𝒆𝒔 𝒕𝒉𝒆 𝒅𝒓𝒐𝒑𝒅𝒐𝒘𝒏 𝒓𝒐𝒍𝒆

 ```js
 Nuggies.dropdownroles.create({ 
   message: message, 
   role: role, /*dropdownroles constructor*/ 
   content: new Discord.MessageEmbed().setTitle('xd').setDescription('xdxd') });
 ```

# __handle interactions__

### features including buttons and dropdown menus require certain functions to handle the interaction


## Buttonclick
𝐇𝐚𝐧𝐝𝐥𝐞𝐬 𝐚𝐥𝐥 𝐧𝐮𝐠𝐠𝐢𝐞𝐬 𝐢𝐧𝐭𝐞𝐫𝐚𝐜𝐭𝐢𝐨𝐧 𝐭𝐨 𝐰𝐨𝐫𝐤
```js
client.on('clickButton', button => {
	Nuggies.buttonclick(client, button);
});
```
> ### 𝐏𝐚𝐫𝐚𝐦𝐬
client: the discord client
button: the button callback from the clickButton event

## 𝐃𝐫𝐨𝐩 𝐂𝐥𝐢𝐜𝐤
handles all the dropdown interactions
```js
client.on('clickMenu', async (menu) => {
	Nuggies.dropclick(client, menu);
});
```
> ### 𝐏𝐚𝐫𝐚𝐦𝐬
client: the discord client
menu: the menu callback from the clickMenu event

### 𝐔𝐩𝐝𝐚𝐭𝐞𝐬
1.0.0
-Nuggies.giveaways.connect(mongodburi)
+Nuggies.connect(mongodburi)

1.0.1
𝐁𝐞𝐭𝐭𝐞𝐫 𝐅𝐨𝐧𝐭𝐬

### 𝐋𝐢𝐜𝐞𝐧𝐬𝐞
Nuggies𝐯3 npm licensed under the terms of [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://github.com/Nuggies-bot/nuggies-npm/blob/main/license) ("CC-BY-NC-SA-4.0"). Commercial use is not allowed under this license. This includes any kind of revenue made with or based upon the software, even donations.

The CC-BY-NC-SA-4.0 allows you to:
- [x] **Share** -- copy and redistribute the material in any medium or format
- [x] **Adapt** -- remix, transform, and build upon the material

Under the following terms:
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- **NonCommercial** — You may not use the material for commercial purposes. 
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

More information can be found [here](https://creativecommons.org/licenses/by-nc-sa/4.0/).
