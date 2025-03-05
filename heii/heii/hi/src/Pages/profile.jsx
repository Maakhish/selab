import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import StudentInfoCard from '@/components/profile/StudentInfoCard';
import DCInfoCard from '@/components/profile/DCInfoCard';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [student, setStudent] = useState(null); // Initially null
  const [dc, setDC] = useState(null); // Initially null
  const { toast } = useToast();

  // Fetch profile data from backend
  useEffect(() => {
    fetch('/profile', { credentials: 'include' }) // Include cookies for session-based auth
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then((data) => {
        // Extract student and DC data from the response
        setStudent({
          profilePicture: data.photo,
          name: data.name,
          rollNumber: data.rollNumber,
          email: data.email,
          orcidId: '0000-0002-1825-0097', // Mocked ORCID ID
          degree: data.degree,
          department: data.department,
          dateOfJoining: data.dateOfJoining,
          admissionScheme: data.admissionScheme,
          researchArea: data.researchArea,
        });

        setDC(data.dcInfo);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  const handleStudentUpdate = (updatedData) => {
    setStudent({ ...student, ...updatedData });
    toast({
      title: 'Profile updated',
      description: 'Your information has been saved successfully.',
      duration: 3000,
    });
  };

  const handleDCUpdate = (updatedData) => {
    setDC({ ...dc, ...updatedData });
    toast({
      title: 'Committee details updated',
      description: 'DC information has been saved successfully.',
      duration: 3000,
    });
  };

  if (!student || !dc) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <Layout>
      <div className="w-full max-w-5xl mx-auto space-y-8 py-6">
        <h1 className="text-3xl font-semibold mb-6 text-primary">Profile Information</h1>

        <StudentInfoCard studentData={student} onUpdate={handleStudentUpdate} />

        <DCInfoCard dcData={dc} onUpdate={handleDCUpdate} />
      </div>
    </Layout>
  );
};

export default Profile;
