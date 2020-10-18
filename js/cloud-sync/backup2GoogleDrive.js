const fs = require('fs');

var onFinished = require('on-finished')

const https = require('https');

const { google } = require('googleapis');

async function backup2GoogleDrive(auth, message) {
    const drive = google.drive({version: 'v3', auth});
	const imageList = require(`./../../servers/${message.guild.id}/images.json`);
	const chanList = require(`./../../servers/${message.guild.id}/channels.json`);
	
	let il = imageList;
	let cl = chanList;
	let path = './1niesmak.png';
	let chanName = 'undef';
	let imageCount = 0;

    //list files named xyz
	//q: "name='xyz'"
	
	for (let i = 0; i < il.length; i++) {
		if (il[i].isOnGDrive == false) {
			for (let j = 0; j < cl.length; j++) {
				if (il[i].chan == cl[j].id) {
					chanName = cl[j].name;
				}
			}
			const file = fs.createWriteStream(`./servers/${message.guild.id}/temp/${il[i].name}`);
			https.get(il[i].url, (response) => {
				response.pipe(file);
				const stream = fs.createReadStream(`./servers/${message.guild.id}/temp/${il[i].name}`);
				onFinished(stream, (err) => {

					if (err) {
						console.error(err);
					}
					else {
						const folderID = '1J6aJYK2WjfmGO2uVGLY7mc2T1dMlTrEg'; // TEMPORARY!!!!
						const res = drive.files.create({
							requestBody: {
								'name': `${chanName} ${il[i].name}`,
								parents: [folderID]
							},
							media: {
								body: stream
							},
							fields: 'id'
							// requestBody: {
							// 	name: `${chanName} ${il[i].name}`,
							// },
							// media: {
							// 	body: stream
							// }
						}, (err, file) => {
							if (err) {
								// Handle error
    							console.error(err);
							} else {
								console.log('GDRIVED FILE:', res);
							}
						});
					}
				});
			});
			il[i].isOnGDrive = true;
			fs.writeFile(
				`./servers/${message.guild.id}/images.json`, 
				JSON.stringify(il, null, 4),
				(err) => { if (err) throw err }
			);
			imageCount++;
		}
	}
	if (imageCount == 0) {
		message.channel.send('There are no files to backup; Google Drive is up to date');
	}
	else if (imageCount == 1) {
		message.channel.send(`Added **1** new file`)
	}
	else {
		message.channel.send(`Added **${imageCount}** new files`);
	}
}

exports.backup2GoogleDrive = backup2GoogleDrive;