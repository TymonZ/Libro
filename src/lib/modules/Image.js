class Image {
	constructor(id, name, url, size, channelID) {
		this.id = id;
		this.name = name;
		this.url = url;
		this.size = size;
		this.chan = channelID;
		this.isOnGDrive = false;
	}
}
exports.Image = Image;