import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/firebase';
import { uuidv4 } from '@firebase/util';
import heic2any from 'heic2any';

const uploadImgAndGetSrc = async (file: File | Blob) => {
  const imageRef = ref(storage, 'notices/' + uuidv4());
  // 'file' comes from the Blob or File API
  const snapshot = await uploadBytes(imageRef, file);
  const src = await getDownloadURL(snapshot.ref);

  return src;
};

export async function onEditorImageUpload(file: File, quillRef: any) {
  if (quillRef.current) {
    try {
      if (!file) {
        return;
      }

      if (/\.(heic)$/i.test(file.name)) {
        file = (await heic2any({
          blob: file,
          toType: 'image/jpeg',
        })) as any;
      }
      const imgSrc = await uploadImgAndGetSrc(file);
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();

      editor.insertEmbed(range.index, 'image', imgSrc);
    } catch (error) {
      console.error('Editor image upload Error:', error);
    }
  }
}

// const resizeImage = async (file: File) => {
//   const imgSrc = URL.createObjectURL(file);
//   const image = new Image();
//   image.src = imgSrc;
//   image.alt = file.name;
//   // 원래 이미지 크기
//   const { width, height }: any = await getImageSize(imgSrc);
//   // 리사이징된 이미지 크기
//   const canvasWidth = Math.min(width, 800);
//   const canvasHeight = width < 800 ? height : 800 * (height / width);
//   // canvas 그리기
//   const canvas = document.createElement('canvas');
//   canvas.width = canvasWidth;
//   canvas.height = canvasHeight;
//   const coord = [0, 0] as const;
//   const originalSize = [width, height] as const;
//   const newSize = [canvasWidth, canvasHeight] as const;
//   canvas
//     .getContext('2d')
//     ?.drawImage(image, ...coord, ...originalSize, ...coord, ...newSize); // canvas에 변경된 크기의 이미지 다시 그려줌
//   const dataUrl = canvas.toDataURL('image/jpeg');
//   return dataURItoBlob(dataUrl);
// };

// const generate = async (dispatch: Dispatch<any>, file: File, form: Form) => {
//   const resizedFile =
//     file.type === 'image/jpeg' ? await resizeImage(file) : file;
//   const params = {
//     product_name: form.productName,
//     file_name: file.name,
//   };
//   const response = await axiosApiInstance(dispatch).post(
//     `/sellers/product-attachments/${form.modelCode}`,
//     params
//   );
//   if (response === undefined || response.status !== 200) return;
//   return { uploadParams: { ...response.data }, file: resizedFile };
// };

// const putFile = async ({
//   uploadParams,
//   file,
// }: {
//   uploadParams: any;
//   file: File;
// }) => {
//   const config = {
//     headers: {
//       'Content-Type': file.type,
//     },
//   };
//   const response = await axios.put(
//     uploadParams.presigned_url_vo.url,
//     file,
//     config
//   );
//   if (response === undefined || response.status !== 200) return;
//   return { uploadParams, file };
// };

// const onFileUpload = async (
//   dispatch: Dispatch<any>,
//   form: Form,
//   paramFiles: any,
//   isFileLoading: boolean,
//   setIsFileLoading: (loading: boolean) => void,
//   setAttachments: (attachments: IAttachment[]) => void
// ) => {
//   if (!isImageUploadable(form.productName, form.modelCode)) {
//     alert('프로모션 이름과 제품명을 입력해주세요.');
//     return;
//   }

//   if (isFileLoading) return;
//   setIsFileLoading(true);

//   const resultArr = [];

//   await Promise.all(
//     Array.from(paramFiles).map((file: File) => generate(dispatch, file, form))
//   )
//     .then((results: any) => Promise.all(results.map(putFile)))
//     .then((results: any) => {
//       if (results.indexOf((v: any) => v === undefined) !== -1) {
//         throw Error('upload fail');
//       }
//       results.forEach((v: any) => {
//         resultArr.push({
//           domain: v.uploadParams.presigned_url_vo.url.split('?')[0],
//           fileKey: v.uploadParams.presigned_url_vo.file_key,
//           fileName: v.uploadParams.presigned_url_vo.filename,
//         });
//       });
//       console.log(form.attachments);
//       setAttachments([...form.attachments, ...resultArr]);
//       setIsFileLoading(false);
//     })
//     .catch((error) => {
//       setIsFileLoading(false);
//       console.error('error!!!!!!!', error);
//       return [];
//     });

//   return resultArr;
// };

// export const getImageSrc = (domain: string, fileKey: string) => {
//   if (isPreSignedUrl(domain)) return domain;
//   return domain + formatFileKey(fileKey);
// };

// export const formatFileKey = (fileKey: string) => {
//   if (!fileKey) return fileKey;
//   return fileKey[0] === '/' ? fileKey : `/${fileKey}`;
// };

// /**
//  * 서버에서 불러온 거면 false, pre signed url이면 true
//  */
// const isPreSignedUrl = (domain: string) => {
//   return domain.includes('test-storage-queue.s3');
// };

// /**
//  * POST 시 pre-signed-url에서 storage url로 바꿔주는 함수
//  */
// export const substitutionDomain = (imageUrl: string) => {
//   const beforeDomain =
//     'https://bikelabs-test-storage-queue.s3.ap-northeast-2.amazonaws.com';
//   const afterDomain =
//     'https://bikelabs-test-storage.s3.ap-northeast-2.amazonaws.com';
//   return imageUrl.replaceAll(beforeDomain, afterDomain);
// };

// /**
//  * 프로모션 이름, 모델명이 존재해야 이미지 업로드 가능
//  */
// export const isImageUploadable = (productName: string, modelCode: string) => {
//   return productName && modelCode;
// };
