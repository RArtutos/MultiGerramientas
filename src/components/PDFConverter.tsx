import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FileType } from 'lucide-react';

export default function PDFConverter() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    onDrop: (acceptedFiles) => {
      // Note: Actual PDF conversion would require a backend service
      console.log('Files to convert:', acceptedFiles);
    }
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'}`}
      >
        <input {...getInputProps()} />
        <FileType className="mx-auto mb-4 w-12 h-12" />
        <p className="text-lg mb-2">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop files here, or click to select'}
        </p>
        <p className="text-sm text-gray-400">
          Supported formats: DOCX, DOC, JPG, PNG
        </p>
      </div>

      <div className="bg-yellow-600/20 rounded-lg p-4">
        <p className="text-yellow-400 text-sm">
          Note: PDF conversion requires a backend service. This is a frontend-only demo.
        </p>
      </div>
    </div>
  );
}