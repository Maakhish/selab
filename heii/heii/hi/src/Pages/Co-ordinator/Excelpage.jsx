import { useState, useEffect, useCallback } from "react";
import { FileSpreadsheet, User, UserCog, Eye } from "lucide-react";
import Layout from "@/components/Co-ordinator/layout/Layout";
import FileUpload from "@/components/Co-ordinator/FileUpload";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(() => {
    return localStorage.getItem("uploadCompleted") === "true"; // Check if uploaded
  });
  const [students, setStudents] = useState([]);
  const [isViewing, setIsViewing] = useState(false);

  // Fetch student data from the backend
  const fetchStudents = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/api/students/all");
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Fetched students:", data);
  
      if (data.length > 0) {
        setStudents(data);
        setUploadSuccess(true);
        localStorage.setItem("uploadCompleted", "true");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(`Fetch error: ${error.message}`);
    }
  }, []);
  
  

  // Fetch students on page load
  useEffect(() => {
    if (localStorage.getItem("uploadCompleted") === "true") {
      fetchStudents();  // Ensure data is fetched on refresh
    }
  }, [fetchStudents]);
  

  // Handle file selection
  const handleFileSelect = useCallback((selectedFile) => {
    setFile(selectedFile);
    setUploadSuccess(false);
  }, []);

  // Handle file upload
  const handleUpload = useCallback(async () => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/students/upload", {
        method: "POST",
        body: formData,
        mode: 'cors'
      });

      if (!response.ok) throw new Error("Failed to upload file");

      const data = await response.json();
      setStudents(data);
      setUploadSuccess(true); // Hide upload after first submission
      localStorage.setItem("uploadCompleted", "true"); // Prevent upload option from appearing

      toast.success("Student data processed", {
        description: `${data.length} students imported from ${file.name}`,
      });
    } catch (error) {
      toast.error("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  }, [file]);

  // Fetch latest student data when "View Student Details" is clicked
  const handleViewStudents = () => {
    setIsViewing(true);
    fetchStudents(); // Ensure fresh data is fetched
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex items-center space-x-2 mb-2">
          <FileSpreadsheet className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Upload Student-Guide List</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Upload an Excel sheet containing student information and their assigned guides.
        </p>

        {!uploadSuccess ? (
          <>
            {/* File Upload Section (ONLY SHOWS ON FIRST UPLOAD) */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border mb-8">
              <h2 className="text-xl font-semibold mb-4">Upload Excel File</h2>
              <FileUpload onFileSelect={handleFileSelect} accept=".xlsx,.xls,.csv" maxSize={5} />
              
              <div className="mt-6">
                <Button 
                  onClick={handleUpload} 
                  disabled={!file || isUploading}
                  className="w-full sm:w-auto"
                >
                  {isUploading ? "Processing..." : "Process Excel Data"}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* View Student Details Button */}
            <div className="mt-6">
              <Button onClick={handleViewStudents} className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                View Student Details
              </Button>
            </div>

            {/* Student List Display */}
            {isViewing && students.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border animate-slide-up mt-6">
                <h2 className="text-xl font-semibold mb-4">Student-Guide List</h2>

                <div className="overflow-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted border-b border-border">
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Guide</th>
                        <th className="py-3 px-4 text-left">Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4">{student.id}</td>
                          <td className="py-3 px-4">
      <span className="py-3 px-4 flex items-center space-x-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <span>{student.name}</span>
        </span>
      </td>
      <td className="py-3 px-4 ">
      <span className="py-3 px-4 flex items-center space-x-2">
        <UserCog className="h-4 w-4 text-muted-foreground" />
        <span>{student.guide}</span>
        </span>
      </td>
                          <td className="py-3 px-4">{student.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default UploadExcel;
