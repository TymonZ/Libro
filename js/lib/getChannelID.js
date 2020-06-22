

function getChannelID(guild, channel) {
	const channelList = require(`./../../servers/${guild.id}/channels.json`);

	const imageList = require(`./../../servers/${guild.id}/images.json`)
	
	let collects;
	let tag;
	let numOfTaggedImages = 0;
	let cl = channelList;
	let il = imageList;

	// gets info from channels.json
	for(let i=0; i < cl.length; i++) {
		if(cl[i].id == channel.id) {
			collects = cl[i].collect;
			tag = cl[i].tag;
		}
	}

	// gets info from images.json
	for(let i=0; i < il.length; i++) {
		if(il[i].tagList[0] == tag) {
			numOfTaggedImages++;
		}
	}

	channel.send(
		`Channel Name: **${channel.name}**\nChannel ID: **${channel.id}**\nCollects from this channel:  **${collects}**\nChannel tag:  **${tag}**\nNumber of images with channel tag: **${numOfTaggedImages}**\n`
	)
}
exports.getChannelID = getChannelID;