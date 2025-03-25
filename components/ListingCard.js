import { useState } from 'react'
import Link from 'next/link'
import { Copy, Home, MapPin, Calendar, ArrowRightCircle } from 'lucide-react'

export default function ListingCard({ listing, onCopyLink }) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    // Create the local tour URL
    const localTourUrl = `${window.location.origin}/tour/${listing.id}`

    // Copy the local tour URL
    navigator.clipboard.writeText(localTourUrl).then(() => {
      setCopied(true)

      // Call onCopyLink prop if provided
      if (onCopyLink) {
        onCopyLink(localTourUrl)
      }

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    }).catch(err => {
      console.error('Failed to copy: ', err)
    })
  }

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800 truncate max-w-[70%]">
            {listing.title}
          </h2>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {listing.bhk} {listing.type}
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
            <span className="truncate">{listing.landmark}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2 text-green-500" />
            <span>Posted: {new Date(listing.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <button 
            onClick={handleCopyLink}
            className={`
              flex items-center justify-center w-full py-2 rounded-lg transition-all duration-300
              ${copied 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}
            `}
          >
            <Copy className="w-5 h-5 mr-2" />
            {copied ? 'Copied!' : 'Copy Link'}
          </button>

          <Link href={`/tour/${listing.id}`} className="w-full">
            <button className="
              flex items-center justify-center w-full py-2 
              bg-indigo-50 text-indigo-600 rounded-lg 
              hover:bg-indigo-100 transition-all duration-300
            ">
              <ArrowRightCircle className="w-5 h-5 mr-2" />
              View Tour
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}