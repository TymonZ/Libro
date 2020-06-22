const { ServerLibrary } = require("./ServerLibrary");

const { ChannelLibrary } = require("./ChannelLibrary");

const fs = require(`fs`);

let ID;
let NAME;
let data;

function createLibrary(guild, channel) {
	let lib = new ServerLibrary(guild.id, guild.name);
	
	arr = guild.channels.cache.array();
	for(let i=0; i < arr.length; i++) {
		if(arr[i].type == 'text') {
			let ch = new ChannelLibrary(
				arr[i].id,
				false,
				'notag'
			);
			lib.channels.push(ch);
		}
	}

	if(fs.existsSync(`./servers/${lib.id}`)) {
		console.log(`${lib.id} directory alredy exists!`)
		channel.send('The server library alredy exists!');
	}
	else {
		ID = lib.id;
		NAME = lib.name;
		data = {ID, NAME}

		fs.mkdir(
			`./servers/${lib.id}`, (err) => {
			if (err) throw err;
			console.log(`${lib.id} directory is created.`);
		});

		fs.writeFile(
			`./servers/${lib.id}/data.json`, JSON.stringify(data, null, 4), (err) => { 
				if (err) throw err;
				console.log(`data.json file is created.`);
		});

		fs.writeFile(
			`./servers/${lib.id}/channels.json`, JSON.stringify(lib.channels, null, 4), (err) => { 
				if (err) throw err; 
				console.log(`channels.json file is created.`);
		});

		fs.writeFile(
			`./servers/${lib.id}/images.json`, JSON.stringify(lib.images, null, 4), (err) => { 
				if (err) throw err; 
				console.log(`images.json file is created.`);
			});

		channel.send('The server library have been created! Now tell me what channels to collect from (`:: channel collect`)');
	}
}
exports.createLibrary = createLibrary;
