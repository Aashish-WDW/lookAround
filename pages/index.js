import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import ListingCard from '../components/ListingCard'

export default function Home() {
  const [listings, setListings] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('virtual_tours')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setListings(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCopyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url)
    } catch (err) {
      console.error('Failed to copy link', err)
    }
  }

  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>360° Virtual Tours</h1>
      {listings.map(listing => (
        <ListingCard 
          key={listing.id} 
          listing={listing} 
          onCopyLink={handleCopyLink}
        />
      ))}
    </div>
  )
}