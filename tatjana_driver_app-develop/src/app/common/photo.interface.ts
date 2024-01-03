export interface Photo {
    base64: string;
    webviewPath: string;
    imageId:string
}
export interface UploadImageCache {
    image: Photo;
    backUrl: string;
    placeholderName: string;
}