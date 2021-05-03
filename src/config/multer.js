import multer from 'multer';

export default multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
	  cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
	  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
	  const [name, extension] = file.originalname.split('.');
	  cb(null, `${name}-${uniqueSuffix}.${extension}`);
    }
  }),
  fileSize: 1024 * 1024 * 10
});