import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ArrowRight, Upload, FileText, Clock, Shield } from 'lucide-react'
import UpwardShadowDivider from '../components/UpwardShadowDivider'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFileName(file ? file.name : null)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                Logo
              </Link>
            </div>
            <div className="hidden sm:flex sm:items-center">
              <Link
                href="/signin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium ml-2"
              >
                Register
              </Link>
            </div>
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/signin"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </nav>
      <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Welcome to our site</h1>
        <p className="mt-4 text-gray-600 text-center">This is the main content area of your page.</p>
        
        <section className="mt-12 w-full max-w-2xl">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <select className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
            
            <ArrowRight className="h-8 w-8 text-blue-500" />
            
            <select className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>Choice A</option>
              <option>Choice B</option>
              <option>Choice C</option>
            </select>
          </div>
          
          <div className="mt-6 w-full">
            <div className="text-center mb-2">
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                Upload a file
              </label>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-full max-w-md">
                <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span>Choose file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                </label>
                <span className="ml-3 text-sm text-gray-500">
                  {fileName ? fileName : 'No file chosen'}
                </span>
              </div>
            </div>
          </div>
        </section>

        <hr className="w-full max-w-4xl border-t border-gray-300 my-16" />

        <section className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <FileText className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Accurate Conversion</h3>
              <p className="text-gray-600">Our advanced algorithms ensure precise conversion of your paperwork files, maintaining the integrity of your documents.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-600">Experience lightning-fast conversion times, allowing you to access your digital documents in minutes, not hours.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Secure Handling</h3>
              <p className="text-gray-600">Your files are protected with state-of-the-art encryption, ensuring the confidentiality and security of your sensitive information.</p>
            </div>
          </div>
        </section>

        <hr className="w-full max-w-4xl border-t border-gray-300 my-16" />
        
        <section className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Our Converters</h2>
          <p className="text-gray-600 text-center mb-12">
            Our state-of-the-art converters are designed to handle a wide range of file formats, ensuring that your documents are transformed with the highest level of accuracy and efficiency. Explore our range of conversion tools below:
          </p>

          <div className="space-y-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="PDF to PowerPoint Converter"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold mb-4">PDF to PowerPoint Converter</h3>
                <p className="text-gray-600">
                  Transform your static PDF documents into dynamic, editable PowerPoint presentations. Our converter maintains the original layout, fonts, and images, allowing you to easily modify and enhance your content for impactful presentations.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2 md:pl-8 mb-6 md:mb-0">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Prompt to PowerPoint Converter"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold mb-4">Prompt to PowerPoint Converter</h3>
                <p className="text-gray-600">
                  Turn your ideas into professional presentations with ease. Simply input your prompts or outline, and our AI-powered converter will generate a structured PowerPoint presentation, complete with relevant content, layouts, and design elements.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="PDF to Audio Converter"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold mb-4">PDF to Audio Converter</h3>
                <p className="text-gray-600">
                  Convert your PDF documents into high-quality audio files. Perfect for accessibility, multitasking, or learning on-the-go. Our advanced text-to-speech technology ensures clear pronunciation and natural-sounding voices in multiple languages.
                </p>
              </div>
            </div>
          </div>
        </section>

        <UpwardShadowDivider />

        <section className="w-full max-w-4xl mt-16 mb-8">
          <Link
            href="/register"
            className="block w-64 mx-auto bg-blue-500 hover:bg-blue-600 text-white text-center px-4 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out transform hover:scale-105"
          >
            Register Now
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Logo</h2>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
              <Link href="/about" className="hover:text-gray-300">About</Link>
              <Link href="/services" className="hover:text-gray-300">Services</Link>
              <Link href="/contact" className="hover:text-gray-300">Contact</Link>
              <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

