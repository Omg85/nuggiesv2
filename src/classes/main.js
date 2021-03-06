const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
let win;
const schema = require('../models/giveawayschema');
const { MessageButton } = require('discord-buttons');
const giveaways = require('./giveaways');
class main {
/**
	*
	* @param {string} url - MongoDB connection URI.
	*/
	static async connect(url) {
		if (!url) throw new TypeError('NuggiesError: You didn\'t provide a MongoDB connection string');
		return mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}
	static async buttonclick(client, button) {
		if (!client) throw new Error('NuggiesError: client not provided');
		if (!button) throw new Error('NuggiesError: button not provided');
		await button.clicker.fetch();
		const id = button.id;
		if (id.startsWith('giveaways')) {
			const tag = id.split('-');
			if (tag[1] === 'enter') {
				const data = await schema.findOne({ messageID: button.message.id });
				if (data.requirements.enabled == true) {
					if (data.clickers.includes(button.clicker.user.id)) { return button.reply.send('you already entered this giveaway!', true); }
					const roles = data.requirements.roles.map(x => button.message.guild.members.cache.get(button.clicker.user.id).roles.cache.get(x));
					if (!roles[0]) {
						return button.reply.send(`You do not have the required role(s)\n${button.message.guild.roles.cache.filter(x => data.requirements.roles.includes(x.id)).filter(x => !button.message.guild.members.cache.get(button.clicker.user.id).roles.cache.get(x.id)).array().map(x => `\`${x.name}\``).join(', ')}\n for the giveaway!`, true);
					}
				}
				if (!data.clickers.includes(button.clicker.user.id)) {
					data.clickers.push(button.clicker.user.id);
					data.save();
					return button.reply.send('๐๐จ๐ฎ ๐ก๐๐ฏ๐ ๐๐ง๐ญ๐๐ซ๐๐ ๐ญ๐ก๐ข๐ฌ ๐ ๐ข๐ฏ๐๐๐ฐ๐๐ฒ ๐ ๐จ๐จ๐๐ฅ๐ฎ๐๐ค (;ยดเผเบถูนเผเบถ`)', true);
				}
				if (data.clickers.includes(button.clicker.user.id)) {
					return button.reply.send('๐๐จ๐ฎ ๐๐ฅ๐ซ๐๐๐๐ฒ ๐๐ง๐ญ๐๐ซ๐๐ ๐ญ๐ก๐ข๐ฌ ๐ ๐ข๐ฏ๐๐๐ฐ๐๐ฒ เฒ _เฒ ', true);
				}
			}
			if (tag[1] === 'reroll') {
				if (button.clicker.user.id !== tag[2]) return button.reply.send('You cannot end this giveaway as you didnt host it!', { ephemeral: true });
				try {
					button.reply.send('rerolled!', true);
					win = await giveaways.reroll(client, button.message.id);
				}
				catch (err) {
					console.log(err);
					return button.message.channel.send('๐๐ง๐๐๐ฅ๐ ๐ญ๐จ ๐๐ข๐ง๐ ๐ญ๐ก๐ข๐ฌ ๐ ๐ข๐ฏ๐๐๐ฐ๐๐ฒ');
				}
				if (!win.length) return button.message.channel.send('๐๐ก๐๐ซ๐ ๐๐ซ๐ ๐ง๐จ๐ญ ๐๐ง๐จ๐ฎ๐ ๐ก ๐ฉ๐๐จ๐ฉ๐ฅ๐ ๐ข๐ง ๐ญ๐ก๐ข๐ฌ ๐ ๐ข๐ฏ๐๐๐ฐ๐๐ฒ');
				button.message.channel.send(`Rerolled! <@${win}> is the new winner of the giveaway!`, { component: new MessageButton().setLabel('Giveaway').setURL(`https://discord.com/channels/${button.message.guild.id}/${button.message.channel.id}/${button.message.id}`).setStyle('url') });
			}
			if (tag[1] === 'end') {
				button.reply.send('ended!', true);
				if (button.clicker.user.id !== tag[2]) return button.reply.send('๐๐จ๐ฎ ๐๐๐ง๐ง๐จ๐ญ ๐๐ง๐ ๐ญ๐ก๐ข๐ฌ ๐ ๐ข๐ฏ๐๐๐ฐ๐๐ฒ ๐๐๐ฎ๐ฌ๐ ๐ฒ๐จ๐ฎ๐ซ ๐ง๐จ๐ญ ๐ญ๐ก๐ ๐ก๐จ๐ฌ๐ญ', { ephemeral: true });
				await giveaways.endByButton(client, button.message.id, button);
			}
		}
		if (button.id.startsWith('br')) {
			let member;
			const fetchMem = await button.guild.members.fetch(button.clicker.member.id, false);
			if (fetchMem) member = button.guild.members.cache.get(button.clicker.member.id);
			await member.fetch(true);
			const role = id.split(':')[1];
			if (button.clicker.member.roles.cache.has(role)) {
				button.clicker.member.roles.remove(role);
				button.reply.send(`๐ ๐ก๐๐ฏ๐ ๐ซ๐๐ฆ๐จ๐ฏ๐๐ ๐ญ๐ก๐ <@&${role}> ๐ซ๐จ๐ฅ๐ ๐๐ซ๐จ๐ฆ ๐ฒ๐จ๐ฎ!`, true);
			}
			else {
				button.clicker.member.roles.add(role);
				button.reply.send(`๐ ๐ก๐๐ฏ๐ ๐๐๐๐๐ ๐ญ๐ก๐ <@&${role}> ๐ซ๐จ๐ฅ๐ ๐ญ๐จ ๐ฒ๐จ๐ฎ!`, true);
			}
		}
	}
	static async dropclick(client, menu) {
		if (!client) throw new Error('NuggiesError: client not provided');
		if (!menu) throw new Error('NuggiesError: button not provided');
		await menu.clicker.fetch();
		if(menu.id == 'dr') {
			let member;
			const fetchMem = await menu.guild.members.fetch(menu.clicker.member.id, false);
			if (fetchMem) member = menu.guild.members.cache.get(menu.clicker.member.id);
			await member.fetch(true);
			const role = menu.values[0];
			if (menu.clicker.member.roles.cache.has(role)) {
				menu.clicker.member.roles.remove(role);
				menu.reply.send(`๐ ๐ก๐๐ฏ๐ ๐ซ๐๐ฆ๐จ๐ฏ๐๐ ๐ญ๐ก๐ <@&${role}> ๐ซ๐จ๐ฅ๐ ๐๐ซ๐จ๐ฆ ๐ฒ๐จ๐ฎ!`, true);
			}
			else {
				menu.clicker.member.roles.add(role);
				menu.reply.send(`๐ ๐ก๐๐ฏ๐ ๐๐๐๐๐ ๐ญ๐ก๐ <@&${role}> ๐ซ๐จ๐ฅ๐ ๐ญ๐จ ๐ฒ๐จ๐ฎ!`, true);
			}
		}
	}
}
module.exports = main;
