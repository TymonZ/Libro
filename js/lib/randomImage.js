function randomImage(guild, channel, tagName) {
	const imageList = require(`./../../servers/${guild.id}/images.json`)

	let il = imageList;
	let tagImageList = [];
	let imageUrl;

	for(let i=0; i < il.length; i++) {
		if(il[i].tagList[0] == tagName) {
			tagImageList.push(il[i]);
		}
	}

	if(tagImageList.length > 0) {
		imageUrl = tagImageList[Math.floor(Math.random()*tagImageList.length)].url;
		channel.send(imageUrl);
	}
	else {
		channel.send('This tag do not exist. Type `:: taglist` for list of all existing tags');
	}
	
}

exports.randomImage = randomImage;