export interface iUploadImage {
  colors: boolean;
  fileProps: { fileList: any; setFileList: React.Dispatch<any> };
  urlProps: { urlList: any; setUrlList: React.Dispatch<any> };
}
