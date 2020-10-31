const fs = require(`fs`);

// Function gets info about channel and add it to server library .json file
function collectFromChannel(guild, channel) {
	const channelList = require(`./../../servers/${guild.id}/channels.json`);

	let ch = channelList;

	for(let i=0; i < ch.length; i++) {
		if(ch[i].id == channel.id) {

			if(ch[i].collect == false) {
				ch[i].collect = true;
				channel.send(`Started collecting from channel #${channel.name}.`);
			}
			else {
				ch[i].collect = false
				channel.send(`Stopped collecting from channel #${channel.name}`);
			}
			
			console.log(ch[i]);
		}
	}
	
	fs.writeFile(
		`./servers/${guild.id}/channels.json`, 
		JSON.stringify(ch, null, 4), 
		(err) => { if (err) throw err; }
	);
}
exports.collectFromChannel = collectFromChannel;