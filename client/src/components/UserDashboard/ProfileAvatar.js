import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfileAvatar() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageId, setImageId] = useState(""); 

  const handleSelectFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (imageId) {
          const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };
          const res = await axios.get(`http://localhost:3636/api/user/images/${imageId}`, {
            headers,
          });
          setUploadedImageUrl(res.data.newImage.image);
        }
      } catch (error) {
        console.error("Failed to fetch image:", error);
      }
    };
    fetchImage();
  }, [imageId]);

  const handleUpload = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      setLoading(true);
      const data = new FormData();
      data.append("image", file);
      const res = await axios.post("http://localhost:3636/api/upload", data, { headers });
      const uploadedImageId = res.data.newImage._id; 
      setImageId(uploadedImageId); 
      setUploadedImageUrl(res.data.newImage.image);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    {/* Form */}
    <label htmlFor="file" className="btn-grey">
      Select File
    </label>
    <input id="file" type="file" onChange={handleSelectFile} multiple={false} />
    {/*Button */}
    <button onClick={handleUpload} className="btn-green">
      {loading ? "Uploading..." : "Upload"}
    </button>
    {/* Image */}
    <div>
    {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" width="200" />}
    </div>
    
  </div>

  );
}

export default ProfileAvatar;
