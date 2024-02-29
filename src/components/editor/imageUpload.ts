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
