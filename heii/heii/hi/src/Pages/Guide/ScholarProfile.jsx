import React, { useState } from "react";
import PageLayout from "@/components/Guide/layout/Layout";
import ScholarsList from "@/components/Guide/Scholars/ScholarList";
import ScholarDetail from "@/components/Guide/Scholars/ScholarDetail";

// Sample data for demonstration
const SAMPLE_SCHOLARS = [
  {
    id: "1",
    name: "Rahul Kumar",
    regNo: "P2019001",
    department: "Computer Science and Engineering",
    researchArea: "Quantum Computing Applications in Cryptography",
    guide: "Dr. Anand Kumar",
    admissionYear: "2019",
  },
  {
    id: "2",
    name: "Priya Singh",
    regNo: "P2020005",
    department: "Electrical Engineering",
    researchArea: "Machine Learning for Medical Diagnostics",
    guide: "Dr. Anand Kumar",
    admissionYear: "2020",
  },
  {
    id: "3",
    name: "Amit Patel",
    regNo: "PHD2018002",
    department: "Electronics and Communication",
    researchArea: "Advanced Neural Networks for Image Recognition",
    guide: "Dr. Anand Kumar",
    admissionYear: "2018",
  },
  {
    id: "4",
    name: "Deepak Sharma",
    regNo: "PHD2020010",
    department: "Mechanical Engineering",
    researchArea: "Sustainable Energy Systems Optimization",
    guide: "Dr. Anand Kumar",
    admissionYear: "2020",
  },
  {
    id: "5",
    name: "Meena Gupta",
    regNo: "PHD2019007",
    department: "Chemical Engineering",
    researchArea: "Natural Language Processing for Regional Languages",
    guide: "Dr. Anand Kumar",
    admissionYear: "2019",
  },
];

const ScholarProfiles = () => {
  const [selectedScholarId, setSelectedScholarId] = useState(null);
  const [scholars] = useState(SAMPLE_SCHOLARS);

  const selectedScholar = scholars.find(scholar => scholar.id === selectedScholarId);

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Scholar Profiles</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ScholarsList 
              scholars={scholars}
              selectedScholarId={selectedScholarId}
              onScholarSelect={setSelectedScholarId}
            />
          </div>
          <div className="lg:col-span-2">
            {selectedScholar ? (
              <ScholarDetail scholar={selectedScholar} />
            ) : (
              <div className="h-full flex items-center justify-center p-8 border rounded-lg bg-secondary/30">
                <p className="text-muted-foreground">
                  Select a scholar from the list to view their profile.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ScholarProfiles;