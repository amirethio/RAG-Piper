import axiosInstance from "./../API/axiosInstance";

export const getDocuments = async () => {
  const response = await axiosInstance.get("/documents");
  return response.data;
};

export const uploadDocuments = async (stagedFiles) => {
  const formData = new FormData();
  stagedFiles.forEach((f) => formData.append("files", f.fileObject));

  const response = await axiosInstance.post("/admin/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const fetchDocuments = async () => {
  const response = await axiosInstance.get("/admin/documents");
  return response.data;
};
