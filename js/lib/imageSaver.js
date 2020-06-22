const fs = require(`fs`);

const { Image } = require(`./Image`)

function imageSaver(guild, channel, attachment) {
	const imageList = require(`./../../servers/${guild.id}/images.json`)

	const channelList = require(`./../../servers/${guild.id}/channels.json`);

	let il = imageList;
	let cl = channelList;

	for(let i=0; i < cl.length; i++) {
		if(cl[i].id == channel.id) {
			if(cl[i].collect) {
				let img = new Image(
					attachment.id,
					attachment.name,
					attachment.url,
					attachment.size
				);	
				img.tagList.push(cl[i].tag);

				il.push(img);

				console.log(`${img.name} FILE SAVED`);
			}
			else {
				console.log(`NOT COLLECTING FROM ${channel.name}`);
			}
					
		}
	}

	fs.writeFile(
		`./servers/${guild.id}/images.json`, 
		JSON.stringify(il, null, 4), 
		(err) => { 
			if (err)
				throw err;
	});
}
exports.imageSaver = imageSaver;
