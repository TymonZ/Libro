function randomImageName(guild, channel, searchedName) {
    const imageList = require(`./../../servers/${guild.id}/images.json`);
    
	const chanList = require(`./../../servers/${guild.id}/channels.json`);

    let il = imageList;
    let cl = chanList;

	let newChanList = [];
	let newImageList = [];
	let imageUrl;

    for(let i=0; i < cl.length; i++) {
		if (cl[i].name == searchedName) {
            newChanList.push(cl[i].id);
        }
    }
    
	for(let i=0; i < il.length; i++) {
		if(newChanList.indexOf(il[i].chan) >= 0) {
			newImageList.push(il[i]);
		}
	}

	if(newImageList.length > 0) {
		imageUrl = newImageList[Math.floor(Math.random()*newImageList.length)].url;
		channel.send(imageUrl);
	}
	else {
		channel.send('The array of searched images is empty');
	}
	
}

exports.randomImageName = randomImageName;