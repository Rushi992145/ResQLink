import React,{useRef} from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Award, BookOpen, Download, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Learning = () => {
  const navigate = useNavigate();
  const certificateRef = useRef(null);

  const courses = [
    {
      id: 1,
      title: 'First Aid Basics',
      description: 'Learn essential first aid techniques and emergency response procedures.',
      duration: '2 hours',
      level: 'Beginner',
      modules: 5,
      progress: 60,
      image: 'https://example.com/first-aid.jpg',
      videos: [
        {
          id: 1,
          title: "Introduction to First Aid",
          description: "Learn the basics of first aid and emergency response",
          duration: "10:30",
          thumbnail: "thumbnail1.jpg",
          videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
        },
        {
          id: 2,
          title: "Basic Life Support",
          description: "Understanding basic life support techniques",
          duration: "15:45",
          thumbnail: "thumbnail2.jpg",
          videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
        },
      ]
    },
    {
      id: 2,
      title: 'Disaster Management',
      description: 'Understanding disaster types and effective response strategies.',
      duration: '3 hours',
      level: 'Intermediate',
      modules: 8,
      progress: 30,
      image: 'https://example.com/disaster.jpg',
      videos: [
        {
          id: 1,
          title: "Types of Disasters",
          description: "Understanding different types of disasters",
          duration: "12:30",
          thumbnail: "thumbnail3.jpg",
          videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
        },
        // Add more videos
      ]
    },
    {
      id: 3,
      title: 'Emergency Communication',
      description: 'Master effective communication during crisis situations.',
      duration: '1.5 hours',
      level: 'Advanced',
      modules: 4,
      progress: 0,
      image: 'https://example.com/communication.jpg', // Add appropriate image URL
    },
  ];

  const certificates = [
    {
      id: 1,
      title: 'First Aid Certification',
      issueDate: '2024-01-15',
      validUntil: '2025-01-15',
    },
    // Add more certificates as needed
  ];
  

  const downloadCertificate = (cert) => {
    const element = document.getElementById(`certificate-${cert.id}`);
    html2pdf().from(element).save(`${cert.title}.pdf`);
  };

  const handleCourseClick = (course) => {
    navigate(`/volunteer/learning/course/${course.id}`, { 
      state: { courseData: course } 
    });
  };

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>All Courses</span>
            </motion.button>
          </div>
        </div>

        {/* Course Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
  <motion.div
    key={course.id}
    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-green-500 transition-colors duration-200 cursor-pointer"
    whileHover={{ y: -5 }}
    // onClick={() => handleCourseClick(course)}
  >
    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
      <div className="w-full h-48 bg-gray-200"></div>
    </div>
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-lg text-gray-900">{course.title}</h3>
      <p className="text-sm text-gray-600">{course.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {course.duration}
        </span>
        <span className="flex items-center">
          <BookOpen className="w-4 h-4 mr-1" />
          {course.modules} Modules
        </span>
      </div>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
              {course.progress}% Complete
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
          <div
            style={{ width: `${course.progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
          ></div>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2 bg-green-600 text-white rounded-lg flex items-center justify-center space-x-2"
      >
        <Play className="w-4 h-4" />
        <span>{course.progress > 0 ? 'Continue' : 'Start'} Course</span>
      </motion.button>
    </div>
  </motion.div>
))}

        </div>

        {/* Certificates Section */}
        
      </div>
    </motion.div>
  );
};

export default Learning; 