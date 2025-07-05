import { useState, useEffect, useCallback, useRef } from 'react'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface UseApiOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

export function useApi<T = any>(
  url: string,
  options: UseApiOptions = {}
): UseApiState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })
  
  const abortControllerRef = useRef<AbortController | null>(null)
  const { immediate = true, onSuccess, onError } = options
  
  const fetchData = useCallback(async () => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    // Create new abort controller
    abortControllerRef.current = new AbortController()
    
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await fetch(url, {
        signal: abortControllerRef.current.signal,
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      setState({ data, loading: false, error: null })
      onSuccess?.(data)
    } catch (error) {
      // Ignore abort errors
      if (error instanceof Error && error.name === 'AbortError') {
        return
      }
      
      const errorObj = error instanceof Error ? error : new Error('Unknown error')
      setState({ data: null, loading: false, error: errorObj })
      onError?.(errorObj)
    }
  }, [url, onSuccess, onError])
  
  useEffect(() => {
    if (immediate) {
      fetchData()
    }
    
    // Cleanup function to abort request
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchData, immediate])
  
  return {
    ...state,
    refetch: fetchData,
  }
}