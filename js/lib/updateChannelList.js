const fs = require(`fs`);

function updateChannelList(channel) {
	fs.access(`./servers/${channel.guild.id}/channels.json`, (err)=> {
		if(err) {
			console.log(`Server ${channel.guild.name} is not initialized`);
			throw err;
		}
		else {
			const channelList = require(`./../../servers/${channel.guild.id}/channels.json`);

			let cl = channelList;

			for(let i = 0; i < cl.length; i++) {
				if(channel.id == cl[i].id) {
					console.log(`CHANNEL NAME UPDATED: ${cl[i].name} => ${channel.name}`);
					cl[i].name = channel.name;
				}
			}

			fs.writeFile(
				`./servers/${channel.guild.id}/channels.json`, 
				JSON.stringify(cl, null, 4),
				(err) => { if (err) throw err });
		}
	});
}

exports.updateChannelList = updateChannelList;