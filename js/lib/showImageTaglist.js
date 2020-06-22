function showImageTaglist(guild, channel) {
	const channelList = require(`./../../servers/${guild.id}/channels.json`);

	const imageList = require(`./../../servers/${guild.id}/images.json`)

	let cl = channelList;
	let il = imageList;
	let tags = [];

	// gets info from channels.json
	for(let i=0; i < cl.length; i++) {
		if(cl[i].id == channel.id) {
			
		}
	}

	// gets info from images.json
	for(let i=0; i < il.length; i++) {
		for(let j=0; j < il[i].tagList.length; j++) {
			if(tags.includes(il[i].tagList[j])) {
				console.log(`TAG ${il[i].tagList[j]} INCLUDED`);
			}
			else {
				tags.push(il[i].tagList[j]);
			}
		}
	}

	channel.send(`**List of tags appearing on images:**\n${tags.join(', ')}`);
}

exports.showImageTaglist = showImageTaglist;