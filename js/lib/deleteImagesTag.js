const fs = require(`fs`);

function deleteImagesTag(guild, channel, tagName) {
	const imageList = require(`./../../servers/${guild.id}/images.json`);

	let il = imageList;
	let newil = [];

	let numberDeleted = 0;

	for(let i=0; i < il.length; i++) {
		for(let j=0; j < il[i].tagList.length; j++) {
			if(il[i].tagList[j] == tagName) {
				numberDeleted++;
				console.log(`Image ${il[i].id} deleted`);
			}
			else {
				newil.push(il[i]);
			}
		}
		
	}
	
	channel.send(`Deleted **${numberDeleted}** images.`);

	fs.writeFile(
		`./servers/${guild.id}/images.json`, 
		JSON.stringify(newil, null, 4), 
		(err) => { 
			if (err)
				throw err;
	});
}

exports.deleteImagesTag = deleteImagesTag;