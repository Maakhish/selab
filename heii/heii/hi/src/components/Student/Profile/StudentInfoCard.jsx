import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save, Upload, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const StudentInfoCard = ({ studentData, onUpdate }) => {
  const [editableData, setEditableData] = useState({
    orcidId: '',
    researchArea: '',
    admissionScheme: ''
  });
  const [profileImage, setProfileImage] = useState(studentData.profilePicture);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/students/${studentData.rollNumber}`, {
          withCredentials: true
        });

        if (response.data) {
          const { orcid, areaofresearch, admissionscheme } = response.data;

          setEditableData({
            orcidId: orcid || '',               // Ensure it's not null
            researchArea: areaofresearch || '',  // Ensure it's not null
            admissionScheme: admissionscheme || ''
          });

          console.log("Fetched Data:", response.data); // Verify the fetched data
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [studentData.rollNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:8080/api/students/${studentData.rollNumber}`, editableData)
      .then(() => {
        alert("Data saved successfully!");
        if (onUpdate) onUpdate(editableData);
      })
      .catch(error => console.error("Error saving data:", error));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full glass">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Student Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative group cursor-pointer" onClick={handleImageClick}>
            <Avatar className="h-32 w-32 group-hover:opacity-80">
              <AvatarImage src={profileImage} alt={studentData.name} />
              <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full">
              <Upload className="text-white h-6 w-6" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <span className="text-sm text-muted-foreground">Click to upload photo</span>
        </div>
        
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              <Input value={studentData.name} readOnly className="bg-muted/30" />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Roll Number</label>
              <Input value={studentData.rollNumber} readOnly className="bg-muted/30" />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <Input value={studentData.email} readOnly className="bg-muted/30" />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">ORCID ID</label>
              <Input
                name="orcidId"
                value={editableData.orcidId}
                onChange={handleChange}
                placeholder="Enter ORCID ID"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Admission Scheme</label>
              <Input
                name="admissionScheme"
                value={editableData.admissionScheme}
                onChange={handleChange}
                placeholder="Enter Admission Scheme"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Major Area of Research</label>
            <Textarea
              name="researchArea"
              value={editableData.researchArea}
              onChange={handleChange}
              placeholder="Enter your Research Area"
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentInfoCard;
