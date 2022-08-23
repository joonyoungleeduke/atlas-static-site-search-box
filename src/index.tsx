import React, { useEffect, useState } from 'react'
import SearchView from './components/SearchView'
import { API } from './api/API'
import { Highlight, SearchResult } from './types'

interface SearchProps {
  id: string
}

export default function Search({ id }: SearchProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [api, setApi] = useState<API>()
  const [noResults, setNoResults] = useState<boolean>(false)
  const [query, setQuery] = useState('')
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  const [results, setResults] = useState<SearchResult['results']>([])

  useEffect(() => {
    API.init(id).then((api) => setApi(api))
  }, [id])
  async function getNewSearchResults() {
    if (!query || !query.trim() || !api) {
      setResults([])
    } else {
      const { results } = await api.searchDocs(query)
      setResults(results || [])
    }
  }

  useEffect(() => {
    setLoading(false)

    if (query && query.trim() && (!results || results.length === 0)) {
      setNoResults(true)
    } else {
      setNoResults(false)
    }
  }, [results])

  useEffect(() => {
    setLoading(true)

    if (!query || !query.trim()) {
      setResults([])
      return
    }

    const delayFetchResults = setTimeout(() => {
      getNewSearchResults()
    }, 100)

    return () => clearTimeout(delayFetchResults)
  }, [query])

  return (
    <SearchView
      searchResults={results}
      query={query}
      handleQueryChange={handleQueryChange}
      loading={loading}
      noResults={noResults && !loading}
    />
  )
}
