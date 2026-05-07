import WindowControls from '#components/WindowControls'
import WindowWrapper from '#hoc/WindowWrapper'
import { Download } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  const containerRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(600);

  // Measure container width and set PDF page width to match
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setPageWidth(containerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <>
      {/* ── 1. Window Header ── */}
      <div id="window-header">
        <WindowControls target='resume' />
        <h2 className='font-bold text-sm text-center flex-1'>Resume.pdf</h2>
        <a
          href="files/resume.pdf"
          download
          className='cursor-pointer shrink-0'
          title='Download Resume'
        >
          <Download className='icon' />
        </a>
      </div>

      {/* ── 2. PDF Viewer ── */}
      <div
        ref={containerRef}
        className='overflow-y-auto w-full max-h-[calc(100dvh-56px)]  bg-gray-100'
      >
        <Document
          file="files/resume.pdf"
          loading={
            <div className='flex items-center justify-center py-20 text-sm text-gray-400'>
              Loading resume...
            </div>
          }
          error={
            <div className='flex items-center justify-center py-20 text-sm text-red-400'>
              Failed to load resume.
            </div>
          }
        >
          <Page
            pageNumber={1}
            width={pageWidth}
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;