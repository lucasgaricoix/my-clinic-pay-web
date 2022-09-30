import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { HomeComponent } from '../src/components/home/home'
import { RootState } from '../src/store/store'

export default function Home() {
  const router = useRouter()
  const state = useSelector((state: RootState) => state.userSession)

  useEffect(() => {
    if (!state.name) {
      router.push('/login')
    }
  }, [state, router])

  return <HomeComponent />
}
