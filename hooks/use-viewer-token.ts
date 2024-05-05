import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { type JwtPayload, jwtDecode } from 'jwt-decode'
import { createViewerToken } from '@/actions/token'

interface ExtendedJwtPayload extends JwtPayload {
  name?: string
}

export const useViewerToken = (
  hostIdentity: string
): {
  token: string
  name: string
  identity: string
} => {
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [identity, setIdentity] = useState('')

  useEffect(() => {
    const createToken = async (): Promise<void> => {
      try {
        const viewerToken = await createViewerToken(hostIdentity)
        setToken(viewerToken)

        const decodedToken = jwtDecode<ExtendedJwtPayload>(viewerToken)

        const name = decodedToken?.name
        const identity = decodedToken.sub

        if (identity) {
          setIdentity(identity)
        }

        if (name) {
          setName(name)
        }
      } catch {
        toast.error('Something went wrong')
      }
    }

    createToken().catch((error) => {
      console.error('Failed to create token:', error)
    })
  }, [hostIdentity])

  return {
    token,
    name,
    identity
  }
}
