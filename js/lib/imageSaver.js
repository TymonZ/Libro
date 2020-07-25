const fs = require(`fs`);

const { Image } = require(`./Image`)

function imageSaver(message, attachment) {
	const imageList = require(`./../../servers/${message.guild.id}/images.json`)

	const channelList = require(`./../../servers/${message.guild.id}/channels.json`);

	let il = imageList;
	let cl = channelList;

	for(let i=0; i < cl.length; i++) {
		if(cl[i].id == message.channel.id) {
			if(cl[i].collect) {
				let img = new Image(
					attachment.id,
					attachment.name,
					attachment.url,
					attachment.size
				);	
				img.tagList.push(cl[i].tag);
				il.push(img);

				console.log('FILE SAVED', {
					'server': message.guild.name,
					'channel': message.channel.name,
					'filename': attachment.name,
					'size': attachment.size
				});
				message.react('✅');
			}
			else {
				console.log(`NOT COLLECTING FROM ${message.channel.name}`);
			}
		}
	}

	fs.writeFile(
		`./servers/${message.guild.id}/images.json`, 
		JSON.stringify(il, null, 4),
		(err) => { if (err) throw err });
}
exports.imageSaver = imageSaver;
