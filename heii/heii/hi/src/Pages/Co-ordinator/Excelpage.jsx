import { useState, useCallback } from "react";
import { FileSpreadsheet, User, UserCog, CheckCircle2, Send } from "lucide-react";
import Layout from "@/components/Co-ordinator/layout/Layout";
import FileUpload from "@/components/Co-ordinator/FileUpload";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [students, setStudents] = useState([]);

  // Handle file selection
  const handleFileSelect = useCallback((selectedFile) => {
    setFile(selectedFile);
    setUploadSuccess(false);
    setIsSubmitted(false);
  }, []);

  // Handle file upload and send to backend
  const handleUpload = useCallback(async () => {
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/students/upload", {
        method: "POST",
        body: formData,  // ✅ Don't set Content-Type manually for FormData
        mode: 'cors'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    // .catch(error => console.error('Error:', error));
    

      if (!response.ok) throw new Error("Failed to upload file");

      const data = await response.json();
      setStudents(data);
      setUploadSuccess(true);
      
      toast.success("Student data processed", {
        description: `${data.length} students imported from ${file.name}`,
      });
    } catch (error) {
      toast.error("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  }, [file]);

  // Handle submission
  const handleSubmit = useCallback(async () => {
    if (!uploadSuccess || students.length === 0) return;

    try {
      const response = await fetch("http://localhost:8080/api/submit-student-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(students),
      });

      if (!response.ok) throw new Error("Failed to submit data");

      setIsSubmitted(true);
      toast.success("Student-Guide list submitted", {
        description: `${students.length} student records added successfully.`,
      });
    } catch (error) {
      toast.error("Failed to submit student data");
    }
  }, [uploadSuccess, students]);

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

        {!isSubmitted ? (
          <>
            {/* File Upload Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border mb-8">
              <h2 className="text-xl font-semibold mb-4">Upload Excel File</h2>
              <FileUpload onFileSelect={handleFileSelect} accept=".xlsx,.xls,.csv" maxSize={5} />
              
              <div className="mt-6">
                <Button 
                  onClick={handleUpload} 
                  disabled={!file || isUploading || uploadSuccess}
                  className="w-full sm:w-auto"
                >
                  {isUploading ? "Processing..." : "Process Excel Data"}
                </Button>
              </div>
            </div>

            {/* Processed Student List */}
            {uploadSuccess && students.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border animate-slide-up mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Processed Students</h2>
                  <Button onClick={handleSubmit} className="flex items-center gap-2" disabled={students.length === 0}>
                    <Send className="h-4 w-4" />
                    Submit Student List
                  </Button>
                </div>

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
                          <td className="py-3 px-4 flex items-center space-x-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{student.name}</span>
                          </td>
                          <td className="py-3 px-4 flex items-center space-x-2">
                            <UserCog className="h-4 w-4 text-muted-foreground" />
                            <span>{student.guide}</span>
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
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100 animate-fade-in">
            <div className="flex flex-col items-center py-6">
              <div className="bg-green-50 p-4 rounded-full mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">Student List Submitted</h2>
              <p className="text-muted-foreground mb-6">
                {students.length} students have been successfully added to the system.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null);
                  setUploadSuccess(false);
                  setIsSubmitted(false);
                  setStudents([]);
                }}
              >
                Upload Another List
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UploadExcel;
