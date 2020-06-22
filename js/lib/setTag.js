const fs = require(`fs`);

function setTag(guild, channel, tagName) {
	const channelList = require(`./../../servers/${guild.id}/channels.json`);

	let cl = channelList;

	for(let i=0; i < cl.length; i++) {
		if(cl[i].id == channel.id) {
			cl[i].tag = tagName

			channel.send(`Set #${channel.name} channel tag as ${tagName}`);
		}
	}

	fs.writeFile(
		`./servers/${guild.id}/channels.json`, 
		JSON.stringify(cl, null, 4), 
		(err) => { 
			if (err)
				throw err;
	});
}
exports.setTag = setTag;
