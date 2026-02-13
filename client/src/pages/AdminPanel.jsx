import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { IoDocumentOutline } from "react-icons/io5";
import { getDocuments, uploadDocuments } from "../services/documentService";

const AdminPanel = () => {
  const [documents, setDocuments] = useState([]);
  const [stagedFiles, setStagedFiles] = useState([]); // new files
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ? when file uploaad

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const staged = files.map((file, idx) => ({
      id: Date.now() + idx,
      name: file.name,
      type: file.name.split(".").pop(),
      status: "pending",
      fileObject: file,
    }));

    setStagedFiles((prev) => [...staged, ...prev]);
  };

  // Submit all staged files
  const handleSubmitAll = async () => {
    if (!stagedFiles.length) return;
    setLoading(true);

    try {
      console.log("before submitting");
      const uploaded = await uploadDocuments(stagedFiles);
      setDocuments((prev) => [...stagedFiles, ...prev]);
      setStagedFiles([]);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative pt-16 px-8 text-white">
      <header className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage documents and content for the AI chatbot
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg bg-card text-sm min-w-55 focus-within:border-blue-600">
            <FaSearch />
            <input
              type="text"
              placeholder="Search documents..."
              className="bg-transparent border-none outline-none w-full text-sm ml-2"
            />
          </div>
        </div>
      </header>

      {/* File Upload */}
      <label
        htmlFor="fileInput"
        className="block my-4 border-dashed border-2 border-gray-700 rounded-xl px-12 py-8 text-center cursor-pointer hover:border-blue-600 hover:bg-card/50 transition"
      >
        <input
          type="file"
          multiple
          accept=".pdf,.txt,.csv"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="w-16 h-16 mx-auto mb-4 bg-[#18181b] border border-gray-800 rounded-lg flex items-center justify-center text-gray-400">
          <FiUpload size={35} />
        </div>
        <h3 className="text-base font-semibold mb-2">
          Drop files here or click to browse
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Upload documents to add to the knowledge base
        </p>
      </label>

      {/* Submit all staged files button */}
      {stagedFiles.length > 0 && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleSubmitAll}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
          >
            Submit All ({stagedFiles.length})
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-800">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#18181b]/50 text-gray-400">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold w-[40%]">
                Document
              </th>
              <th className="px-6 py-4 text-sm font-semibold">Type</th>
              <th className="px-6 py-4 text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-sm font-semibold">Added</th>
              <th className="px-6 py-4 text-sm font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : stagedFiles.length + documents.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-20 text-center text-gray-400">
                  <IoDocumentOutline className="mx-auto mb-4" size={40} />
                  <div className="font-semibold mb-1 text-white">
                    No documents found
                  </div>
                  <div className="text-sm">
                    Upload files to build your chatbot's knowledge base.
                  </div>
                </td>
              </tr>
            ) : (
              [...stagedFiles, ...documents].map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-[#18181b]/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold border ${
                          doc.type === "pdf"
                            ? "border-red-900/50 text-red-500 bg-red-500/10"
                            : doc.type === "txt"
                              ? "border-green-900/50 text-green-500 bg-green-500/10"
                              : "border-blue-900/50 text-blue-500 bg-blue-500/10"
                        }`}
                      >
                        {doc.type.toUpperCase()}
                      </div>
                      <div className="truncate">
                        <div className="font-medium text-sm text-gray-200">
                          {doc.name}
                        </div>
                        <div className="text-xs text-gray-500">{doc.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 font-medium uppercase">
                    {doc.type}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        doc.status === "indexed"
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : doc.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          doc.status === "indexed"
                            ? "bg-emerald-500"
                            : doc.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-amber-500"
                        } animate-pulse`}
                      ></span>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {doc.added || "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-500 hover:text-white">
                      ⋮
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
