const fs = require(`fs`);
const https = require(`https`);

function downloadImagesTag(guild, channel, tagName) {
	const imageList = require(`./../../servers/${guild.id}/images.json`);

	let il = imageList;
	let file;
	let request;

	for(let i=0; i < il.length; i++) {
		for(let j=0; j < il[i].tagList.length; j++) {
			if(il[i].tagList[j] == tagName) {

				file = fs.createWriteStream(`./servers/${guild.id}/temp/${il[i].name}`);
				request = https.get(`${il[i].url}`, (response) => {
					response.pipe(file);
				});
			}
		}
	}

}

exports.downloadImagesTag = downloadImagesTag;