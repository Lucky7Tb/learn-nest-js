export class UploadFileHelper {
	static fileSavePath(_, __, callback) {
		callback(null, './public/images');
	}

	static fileName(_, file, callback) {
		const fileExtension: string = (file.mimetype.split('/'))[1];
		let fileName: string = '';
		fileName = `${Date.now()}.${fileExtension}`;
		callback(null, fileName);
	}
}