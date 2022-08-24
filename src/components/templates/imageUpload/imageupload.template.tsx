import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useCallback, useEffect, useState } from "react";
import {
  deleteImageFromStorage,
  uploadImagesToStorage,
} from "../../../auth/firebase/firebase.storage";
import { iUploadImage } from "./imageUpload.interface";

const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const ImageUpload = ({ colors, fileProps, urlProps }: iUploadImage) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    fileProps.setFileList(fileProps.fileList);
    urlProps.setUrlList(urlProps.urlList);
  }, [fileProps, urlProps]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ file, fileList: newFileList }: any) => {
    fileProps.setFileList(newFileList);
  };

  const handleImageUpload = useCallback(
    async ({ file, onSuccess, onError }: any) => {
      await uploadImagesToStorage(file).then((data) => {
        if (data.status === "ok") {
          urlProps.setUrlList([
            ...urlProps.urlList,
            {
              id: file.uid,
              name: file.uid + "." + file.type.split("/")[1],
              url: data.res,
            },
          ]);
          onSuccess("ok");
        } else {
          onError(data.res);
        }
      });
    },
    [urlProps]
  );

  const handleRemove = useCallback(
    (file: any) => {
      urlProps.setUrlList(
        urlProps.urlList.filter(
          (currentFiles: any) => currentFiles.id !== file.uid
        )
      );

      deleteImageFromStorage(file);
    },
    [urlProps]
  );

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Image
      </div>
    </div>
  );
  return (
    <>
      <Upload
        customRequest={handleImageUpload}
        listType="picture-card"
        fileList={fileProps.fileList as any}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileProps.fileList.length >= (colors ? 8 : 1) ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        zIndex={1301}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default ImageUpload;
