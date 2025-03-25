import { useState } from 'react'
import Link from 'next/link'

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
    <div>
      <h2>{listing.title}</h2>
      <p>Type: {listing.bhk} {listing.type}</p>
      <p>Location: {listing.landmark}</p>
      <p>Posted: {new Date(listing.created_at).toLocaleDateString()}</p>
      
      <button onClick={handleCopyLink}>
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
      
      <Link href={`/tour/${listing.id}`}>
        <button>View Tour</button>
      </Link>
    </div>
  )
}