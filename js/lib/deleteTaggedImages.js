const fs = require(`fs`);

function deleteTaggedImages(guild, channel, tagName) {
	const imageList = require(`./../../servers/${guild.id}/images.json`);

	let il = imageList;
	let newil = [];

	let numberDeleted = 0;

	for(let i=0; i < il.length; i++) {
		for(let j=o; j < il[i].tagList.length; j++) {
			if(il[i].tagList[j] != tagName) {
				newil.push(il[i]);
			}
			else {
				numberDeleted++;
				console.log(`Image ${il[i].id} deleted`);
			}
		}
		
	}

	//il.splice(0);
	//console.log(il[0].tagList[0]);

	channel.send(`Deleted ${numberDeleted} images.`);

	fs.writeFile(
		`./servers/${guild.id}/images.json`, 
		JSON.stringify(newil, null, 4), 
		(err) => { 
			if (err)
				throw err;
	});
}

exports.deleteTaggedImages = deleteTaggedImages;