import React, { useState, useEffect } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock course suggestions
const COURSE_SUGGESTIONS = [
  { id: 'CS101', name: 'Introduction to Computer Science', credits: 4 },
  { id: 'AI201', name: 'Artificial Intelligence', credits: 4 },
  { id: 'ML301', name: 'Machine Learning', credits: 3 },
  { id: 'DL401', name: 'Deep Learning', credits: 3 },
  { id: 'NLP501', name: 'Natural Language Processing', credits: 4 },
  { id: 'DS201', name: 'Data Structures', credits: 3 },
  { id: 'ALG301', name: 'Algorithms', credits: 4 },
  { id: 'DB401', name: 'Database Systems', credits: 3 },
];

const CourseSearch = ({ onAddCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredSuggestions = COURSE_SUGGESTIONS.filter(course => 
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSelectCourse = (course) => {
    onAddCourse(course);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-[30%] transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          {searchTerm && (
            <X 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" 
              onClick={() => setSearchTerm('')}
            />
          )}
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border py-1 max-h-60 overflow-auto">
              {suggestions.map((course) => (
                <div 
                  key={course.id}
                  className="px-4 py-2 hover:bg-muted cursor-pointer flex justify-between items-center"
                  onClick={() => handleSelectCourse(course)}
                >
                  <div>
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Badge variant="outline" className="mr-2">{course.id}</Badge>
                      <span>{course.credits} credits</span>
                    </div>
                  </div>
                  <Plus size={16} className="text-primary" />
                </div>
              ))}
            </div>
          )}
        </div>
        <Button 
          onClick={() => {
            if (suggestions.length > 0) {
              handleSelectCourse(suggestions[0]);
            }
          }}
          disabled={suggestions.length === 0}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add
        </Button>
      </div>
    </div>
  );
};

export default CourseSearch;
