const fs = require(`fs`);

function deleteImagesType(guild, channel, filetype) {
	const imageList = require(`./../../servers/${guild.id}/images.json`);

	let il = imageList;
	let newil = [];
	let name;

	let numberDeleted = 0;

	console.log('FILETYPE:', filetype);

	for(let i=0; i < il.length; i++) {
		name = il[i].name.split('.');
		console.log(name.pop());

		if(name.pop() == filetype) {
			numberDeleted++;
			console.log(`Image ${il[i].id} deleted`);
		}
		else {
			newil.push(il[i]);
		}		
	}

	channel.send(`Deleted **${numberDeleted}** images.`);

	fs.writeFile(
		`./servers/${guild.id}/images.json`, 
		JSON.stringify(newil, null, 4), 
		(err) => { 
			if (err) throw err;
		}
	);
}

exports.deleteImagesType = deleteImagesType;