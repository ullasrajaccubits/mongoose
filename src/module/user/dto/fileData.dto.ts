/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
export const csvFileFilter = (req: any, file: any, next: any) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    req.fileValidationError = 'only csv files allowed';
    return next(null, false);
  }
  next(null, true);
};
