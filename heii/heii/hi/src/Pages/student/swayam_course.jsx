import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, PlusCircle } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Student/layout/Layout';
import CourseSearch from '@/components/Student/courses/CourseSearch';
import CourseCard from '@/components/Student/courses/CourseCard';
import CourseDetailsDialog from '@/components/Student/courses/CourseDetailsDialog';
// import CourseStatusDropdown from '@/components/courses/CourseStatusDropdown';
import { filterCoursesByStatus } from '@/types/courses';

const MOCK_COURSES = [
  {
    id: 'CS101',
    name: 'Introduction to Computer Science',
    credits: 4,
    description: 'An introduction to the basic principles of programming and computer science.',
    status: 'Applied',
    appliedDate: '2023-05-15T10:00:00Z',
    statusHistory: [
      { status: 'Applied', date: '2023-05-15T10:00:00Z' }
    ]
  },
  {
    id: 'AI201',
    name: 'Artificial Intelligence',
    credits: 4,
    description: 'Study of intelligent agents and how to implement them.',
    status: 'Approved',
    appliedDate: '2023-04-10T14:30:00Z',
    approvedDate: '2023-04-20T09:15:00Z',
    statusHistory: [
      { status: 'Applied', date: '2023-04-10T14:30:00Z' },
      { status: 'Approved', date: '2023-04-20T09:15:00Z' }
    ]
  },
  {
    id: 'ML301',
    name: 'Machine Learning',
    credits: 3,
    description: 'Introduction to machine learning algorithms and their applications.',
    status: 'Rejected',
    appliedDate: '2023-03-20T11:45:00Z',
    rejectedDate: '2023-03-30T16:20:00Z',
    statusHistory: [
      { status: 'Applied', date: '2023-03-20T11:45:00Z' },
      { status: 'Rejected', date: '2023-03-30T16:20:00Z' }
    ]
  }
];

const Courses = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('add');
  const [activeStatusTab, setActiveStatusTab] = useState('all');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [allCourses, setAllCourses] = useState(MOCK_COURSES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getFilteredCourses = () => {
    let filtered = allCourses;
    
    if (activeStatusTab !== 'all') {
      filtered = filterCoursesByStatus(filtered, activeStatusTab);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredCourses = getFilteredCourses();

  const handleAddCourse = (course) => {
    if (!selectedCourses.some(c => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
      toast({
        title: "Course added",
        description: `${course.name} has been added to your selection.`,
      });
    } else {
      toast({
        title: "Course already added",
        description: `${course.name} is already in your selection.`,
        variant: "destructive",
      });
    }
  };

  const handleRemoveCourse = (courseId) => {
    setSelectedCourses(selectedCourses.filter(course => course.id !== courseId));
    toast({
      title: "Course removed",
      description: "Course has been removed from your selection.",
    });
  };

  const handleSubmitCourses = () => {
    if (selectedCourses.length === 0) {
      toast({
        title: "No courses selected",
        description: "Please select at least one course before submitting.",
        variant: "destructive",
      });
      return;
    }

    const now = new Date().toISOString();
    const newCourses = selectedCourses.map(course => ({
      ...course,
      status: 'Applied',
      appliedDate: now,
      statusHistory: [{ status: 'Applied', date: now }]
    }));

    setAllCourses([...allCourses, ...newCourses]);
    setSelectedCourses([]);
    setActiveTab('view');
    
    toast({
      title: "Courses submitted successfully",
      description: `${newCourses.length} course(s) have been submitted.`,
    });
  };

  const handleViewDetails = (course) => {
    const courseWithHistory = allCourses.find(c => c.id === course.id);
    if (courseWithHistory) {
      setSelectedCourse(courseWithHistory);
      setIsDetailsOpen(true);
    }
  };



  const downloadCourseLog = () => {
    toast({
      title: "Download started",
      description: "Your course log is being downloaded.",
    });
  };

  return (
<Layout>
      <div className="space-y-8">
        <Tabs defaultValue="add" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Swayam Courses</h1>
              
            </div>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="add">Add Courses</TabsTrigger>
              <TabsTrigger value="view">View Courses</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Courses</CardTitle>
                <CardDescription>
                  Search for courses and add them to your request list.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <CourseSearch onAddCourse={handleAddCourse} />
                
                {selectedCourses.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Selected Courses ({selectedCourses.length})</h3>
                    <div className="grid gap-3">
                      {selectedCourses.map(course => (
                        <CourseCard 
                          key={course.id} 
                          course={course} 
                          onRemove={handleRemoveCourse}
                        />
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      onClick={handleSubmitCourses}
                    >
                      Submit Course Requests
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-10 border rounded-md border-dashed">
                    <p className="text-muted-foreground">No courses selected yet. Use the search bar above to find courses.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="view" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>View Requested Courses</CardTitle>
                    <CardDescription>
                      Track the status of your course requests.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search courses..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={downloadCourseLog}
                      title="Download course log"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => setActiveTab('add')}
                      className="hidden sm:flex items-center gap-1"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add New
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" value={activeStatusTab} onValueChange={setActiveStatusTab} className="w-full mb-6">
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="Applied">Requested</TabsTrigger>
                    <TabsTrigger value="Approved">Approved</TabsTrigger>
                    <TabsTrigger value="Rejected">Rejected</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {filteredCourses.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course ID</TableHead>
                          <TableHead>Course Name</TableHead>
                          <TableHead>Credits</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCourses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell className="font-medium">{course.id}</TableCell>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.credits}</TableCell>
                            <TableCell>{new Date(course.appliedDate || '').toLocaleDateString()}</TableCell>
                            <TableCell>
                            <span
                            className={`px-2 py-1 rounded-md text-sm font-semibold 
                                ${course.status === "Approved" ? "bg-green-200 text-green-800" : ""}
                                ${course.status === "Rejected" ? "bg-red-200 text-red-800" : ""}
                                 ${course.status ==="Applied" ? "bg-gray-200 text-gray-800" : ""}
                                  `}
                            >
                            {course.status}
                            </span>


                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewDetails(course)}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-10 border rounded-md border-dashed">
                    <p className="text-muted-foreground">
                      {searchTerm ? 'No courses match your search.' : activeStatusTab !== 'all' ? `No ${activeStatusTab.toLowerCase()} courses found.` : 'No courses requested yet.'}
                    </p>
                    {searchTerm === '' && activeStatusTab === 'all' && (
                      <Button
                        variant="link"
                        onClick={() => setActiveTab('add')}
                        className="mt-2"
                      >
                        Add your first course
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Course Log</CardTitle>
                <CardDescription>
                  Complete history of all your course activities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course ID</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allCourses.flatMap(course => 
                        course.statusHistory.map((history, idx) => (
                          <TableRow key={`${course.id}-${idx}`}>
                            <TableCell className="font-medium">{course.id}</TableCell>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.credits}</TableCell>
                            <TableCell>
                            <Badge className={`
                            px-2 py-1 rounded-md text-sm font-semibold 
                            ${history.status === 'Applied' ? 'bg-gray-200 text-gray-800' : ''}
                            ${history.status === 'Approved' ? 'bg-green-200 text-green-800' : ''}
                            ${history.status === 'Rejected' ? 'bg-red-200 text-red-800' : ''}
                            `}>
                                 {history.status}
                            </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(history.date).toLocaleDateString()} {new Date(history.date).toLocaleTimeString()}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" onClick={downloadCourseLog} className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Download Log
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <CourseDetailsDialog 
          isOpen={isDetailsOpen} 
          onClose={() => setIsDetailsOpen(false)} 
          course={selectedCourse}
        />
      </div>
    </Layout>
  );
};

export default Courses;
