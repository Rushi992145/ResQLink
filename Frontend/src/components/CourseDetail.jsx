import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Play, X, ChevronLeft, Clock, BookOpen, ArrowLeft, Award, CheckCircle, Lock } from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState(null);
  const [courseData, setCourseData] = useState(location.state?.courseData);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (location.state?.courseData) {
      setCourseData(location.state.courseData);
      // Load completed videos from localStorage
      const saved = localStorage.getItem(`course-${id}-progress`);
      if (saved) {
        setCompletedVideos(JSON.parse(saved));
      }
    } else {
      navigate('/volunteer/learning');
    }
  }, [location.state, navigate, id]);

  useEffect(() => {
    // Calculate and update progress
    if (courseData?.videos) {
      const progress = (completedVideos.length / courseData.videos.length) * 100;
      setCurrentProgress(progress);
    }
  }, [completedVideos, courseData]);

  const handleVideoSelect = (video) => {
    if (!canAccessVideo(video)) return;
    setActiveVideo(video);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.requestFullscreen();
      }
    }, 100);
  };

  const handleVideoComplete = (videoId) => {
    const newCompleted = [...completedVideos, videoId];
    setCompletedVideos(newCompleted);
    localStorage.setItem(`course-${id}-progress`, JSON.stringify(newCompleted));
  };

  const canAccessVideo = (video, index) => {
    if (index === 0) return true;
    return completedVideos.includes(courseData.videos[index - 1].id);
  };

  const handleCloseVideo = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setActiveVideo(null);
  };

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-white rounded-xl shadow-lg"
        >
          <p className="text-red-600 text-xl mb-4">Course not found</p>
          <button
            onClick={() => navigate('/volunteer-dashboard')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 mb-6"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft size={20} />
          <span>Back to Courses</span>
        </motion.button>

        {/* Course Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-8 mb-6"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{courseData.title}</h1>
              <p className="text-gray-600">{courseData.description}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{Math.round(currentProgress)}%</div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5 text-green-600" />
              <span>{courseData.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <BookOpen className="w-5 h-5 text-green-600" />
              <span>{courseData.modules} Modules</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Award className="w-5 h-5 text-green-600" />
              <span>{courseData.level}</span>
            </div>
          </div>
        </motion.div>

        {/* Video List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Course Content</h2>
          <div className="space-y-4">
            {courseData.videos?.map((video, index) => (
              <motion.div
                key={video.id}
                className={`border rounded-lg p-4 transition-colors duration-200 ${
                  canAccessVideo(video, index)
                    ? 'border-gray-200 hover:border-green-500 cursor-pointer'
                    : 'border-gray-200 bg-gray-50 opacity-75'
                }`}
                whileHover={canAccessVideo(video, index) ? { scale: 1.01 } : {}}
                onClick={() => handleVideoSelect(video)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{video.title}</h3>
                      {completedVideos.includes(video.id) && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{video.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{video.duration}</span>
                    {canAccessVideo(video, index) ? (
                      <Play className="w-5 h-5 text-green-600" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Video Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
            ref={videoRef}
          >
            <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent absolute top-0 left-0 right-0 z-10">
              <h3 className="text-white font-medium">{activeVideo.title}</h3>
              <button
                onClick={handleCloseVideo}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <iframe
              src={`${activeVideo.videoUrl}?autoplay=1&controls=1`}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              onEnded={() => handleVideoComplete(activeVideo.id)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDetail; 