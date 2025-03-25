import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabase'
import LoadingScreen from '../../components/LoadingScreen'

export default function TourPage() {
  const router = useRouter()
  const { id } = router.query
  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Prevent body scrolling
    document.body.style.overflow = 'hidden'
    
    // Cleanup function to restore body scrolling
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    if (id) fetchListingDetails()
  }, [id])

  const fetchListingDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('virtual_tours')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setListing(data)
      setIsLoading(false)
    } catch (err) {
      console.error('Error fetching listing', err)
      router.push('/')
    }
  }

  if (isLoading) return <LoadingScreen />
  if (!listing) return null

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        zIndex: 9999
      }}
    >
      <iframe
        src={listing.virtual_tour_url}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
          margin: 0,
          padding: 0
        }}
        title="Virtual Tour"
        allowFullScreen
        frameBorder="0"
      />
    </div>
  )
}