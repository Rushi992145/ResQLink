import React, { useState } from 'react';
import { Star } from 'lucide-react';

const CertificateGenerator = ({ disasterName }) => {
  const [volunteerName, setVolunteerName] = useState('');
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  const handleGenerateCertificate = () => {
    setCertificateGenerated(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white text-center py-4">
          <h1 className="text-2xl font-bold">ResqLink Volunteer Appreciation Certificate Generator</h1>
        </div>

        <div className="p-8">
          {!certificateGenerated ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="volunteerName" className="block mb-2 text-gray-700">Volunteer Name</label>
                <input
                  id="volunteerName"
                  type="text"
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                  placeholder="Enter full name of volunteer"
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button 
                onClick={handleGenerateCertificate}
                disabled={!volunteerName}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Generate Certificate
              </button>
            </div>
          ) : (
            <>
              <div 
                className="certificate-container relative bg-white p-12 border-4 border-blue-200 shadow-2xl"
                style={{
                  backgroundImage: 'linear-gradient(to bottom right, #f0f8ff, #e6f2ff)',
                  fontFamily: 'Garamond, serif'
                }}
              >
                {/* Decorative Stars */}
                <div className="absolute top-4 left-4 text-yellow-400 print:hidden">
                  <Star className="w-12 h-12 rotate-12" />
                </div>
                <div className="absolute top-4 right-4 text-yellow-400 print:hidden">
                  <Star className="w-12 h-12 -rotate-12" />
                </div>

                {/* Certificate Content */}
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-blue-900 mb-4 tracking-wider">
                    CERTIFICATE OF APPRECIATION
                  </h1>
                  
                  <div className="border-b-4 border-blue-500 w-3/4 mx-auto mb-8"></div>
                  
                  <p className="text-2xl text-gray-700 mb-4">Presented to</p>
                  
                  <h2 className="text-4xl font-bold text-blue-800 mb-6 uppercase tracking-widest">
                    {volunteerName}
                  </h2>
                  
                  <p className="text-xl text-gray-800 mb-8 italic">
                    In heartfelt recognition of extraordinary humanitarian service during the
                    <span className="font-bold"> {disasterName} </span>
                    disaster relief efforts
                  </p>
                  
                  <div className="text-lg text-gray-700 mb-12 leading-relaxed px-12">
                    Your unwavering compassion, courage, and selfless dedication have been instrumental 
                    in providing hope and relief to those most vulnerable. Your actions embody the true 
                    spirit of volunteerism and human solidarity.
                  </div>
                  
                  <div className="flex justify-between items-center border-t-2 border-blue-300 pt-8">
                    <div className="w-1/3">
                      <div className="border-b-2 border-blue-500 mb-2"></div>
                      <p className="text-sm text-gray-600">Authorized Signature</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-blue-900">ResqLink</p>
                      <p className="text-sm text-gray-600">Humanitarian Relief Organization</p>
                    </div>
                    <div className="w-1/3 text-right">
                      <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center space-x-4 print:hidden">
                <button 
                  onClick={handlePrint} 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Star className="mr-2 h-4 w-4" /> Print/Download Certificate
                </button>
                <button 
                  onClick={() => setCertificateGenerated(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Create New Certificate
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Print-specific styling */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .certificate-container, 
          .certificate-container * {
            visibility: visible;
          }
          .certificate-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            transform: none !important;
            margin: 0 !important;
            padding: 20px !important;
            box-sizing: border-box;
          }
        }
      `}</style>
    </div>
  );
};

export default CertificateGenerator;