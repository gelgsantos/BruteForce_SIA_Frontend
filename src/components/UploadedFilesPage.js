import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UploadedFilesPage.css"; // Optional for styling

const UploadedFilesPage = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch files from the backend
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/files");
        setFiles(response.data);
        console.log(response.data)
      } catch (err) {
        setError("Failed to fetch files");
        console.error(err);
      }
    };

    fetchFiles();
  }, []);

  const handleSelectForBruteforce = async (file) => {
    try {
      setSelectedFile(file);
      // Call the backend to initiate the bruteforce
      const response = await axios.post("http://127.0.0.1:5000/api/bruteforce", {
        file_id: file.id,
      });
      alert(response.data.message);
    } catch (err) {
      setError("Failed to initiate bruteforce");
      console.error(err);
    }
  };

  return (
    <div className="files-container">
      <h1>Files </h1>
      {error && <p className="error-message">{error}</p>}
      {files.length > 0 ? (
        <table className="files-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>File Name</th>
              <th>File Path</th>
              <th>File Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>{file.id}</td>
                <td>{file.filename}</td>
                <td>
                  <a href={`http://127.0.0.1:5000/${file.file_path}`} target="_blank" rel="noopener noreferrer">
                    {file.file_path}
                  </a>
                </td>
                <td>{file.file_type}</td>
                <td>{file.bruteforce_status}</td>
                <td>
                  <button onClick={() => handleSelectForBruteforce(file)}>Bruteforce</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No files uploaded yet.</p>
      )}
      {selectedFile && (
        <div className="selected-file">
          <h3>Selected File for Bruteforce:</h3>
          <p>ID: {selectedFile.id}</p>
          <p>Filename: {selectedFile.filename}</p>
        </div>
      )}
    </div>
  );
};

export default UploadedFilesPage;
