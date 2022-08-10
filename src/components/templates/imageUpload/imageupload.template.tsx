import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { iUploadImage } from "./imageUpload.interface";

const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const ImageUpload = ({ colors, fileProps }: iUploadImage) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    fileProps.setFileList(fileProps.fileList);
  }, [fileProps]);

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

  const handleChange = ({ fileList: newFileList }: any) => {
    fileProps.setFileList(newFileList);
  };

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
        action="http://localhost:3000/src/images"
        listType="picture-card"
        fileList={fileProps.fileList as any}
        onPreview={handlePreview}
        onChange={handleChange}
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
