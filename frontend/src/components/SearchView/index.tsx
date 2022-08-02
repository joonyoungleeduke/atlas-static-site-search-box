import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ListItem from '@mui/material/ListItem'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import { decode } from 'html-entities'
import LinearProgress from '@mui/material/LinearProgress'
// @ts-ignore
import mongoSearchIcon from 'query_search.png'
import { Link } from '@mui/material'
import SearchHistory, { addResultToSearchHistory } from '../History'
import { Documents, Result } from '../../types'
import { truncateText } from '../../utils'
import HighlightedText from './HighlightedText'

const style = {
  width: 550,
  backgroundColor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 5,
  height: 600,
  p: 2
}

interface SearchModalProps {
  query: string
  handleQueryChange: Function
  searchResults: Array<Result>
  loading: boolean
  noResults: boolean
}

export default function SearchView({
  query,
  handleQueryChange,
  searchResults,
  loading,
  noResults
}: SearchModalProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  const [expandedState, setExpandedState] = useState({})

  const toggleExpand = (_id: string) => {
    if (expandedState[_id]) {
      setExpandedState({
        ...expandedState,
        [_id]: false
      })
    } else {
      setExpandedState({
        ...expandedState,
        [_id]: true
      })
    }
  }

  return (
    <div>
      <Button
        variant='outlined'
        startIcon={<SearchIcon />}
        onClick={() => setOpen(true)}
        style={{
          textTransform: 'none',
          borderRadius: '10px'
        }}
        color='success'
        size='large'
      >
        Search...
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
          paddingTop: '10%'
        }}
        BackdropProps={{
          style: {
            opacity: 0.5
          }
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            backgroundColor: '#F6F6F6'
          }}
          sx={style}
        >
          <InputBase
            placeholder='Search...'
            startAdornment={
              <IconButton disabled>
                <SearchIcon fontSize='large' color='success' />
              </IconButton>
            }
            style={{
              width: '100%',
              borderBottom: '0.5px solid gray',
              padding: '15px',
              fontSize: '18px',
              backgroundColor: 'white'
            }}
            onChange={(e) => handleQueryChange(e)}
            value={query}
            autoFocus
          />

          <List
            component='nav'
            style={{
              width: '100%',
              height: '100%',
              overflowX: 'hidden',
              overflowY: 'scroll'
            }}
          >
            {loading && (
              <div>
                <LinearProgress color='success' />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%',
                    opacity: '1',
                    animation: 'fade 1.5s linear'
                  }}
                >
                  <Typography variant='h1'>
                    <MongoSearchIcon />
                  </Typography>
                </div>
              </div>
            )}
            {noResults && (
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                >
                  <Typography variant='h1'>
                    <MongoSearchIcon />
                  </Typography>
                </div>
              </div>
            )}
            {!loading && searchResults && searchResults.length > 0 && (
              <div
                style={{
                  width: '100%',
                  padding: '5px'
                }}
              >
                <p
                  style={{
                    color: '#92D293',
                    padding: 0,
                    margin: 0
                  }}
                >
                  Results
                </p>
              </div>
            )}
            {!loading &&
              searchResults.map((searchResult, idx) => {
                return (
                  <div key={String(searchResult._id)}>
                    <ListItem
                      secondaryAction={
                        searchResult.highlights &&
                        searchResult.highlights.length > 1 && (
                          <IconButton
                            edge='end'
                            onClick={() => toggleExpand(searchResult._id)}
                          >
                            {expandedState[searchResult._id] ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </IconButton>
                        )
                      }
                      style={{
                        width: '100%',
                        borderRadius: '10px',
                        backgroundColor: selected === idx ? '#92D293' : 'white',
                        marginTop: '5px',
                        marginBottom: '5px'
                      }}
                    >
                      <ListItemButton
                        onClick={() => {
                          window.open(searchResult._id)
                          addResultToSearchHistory(searchResult)
                        }}
                        onMouseOver={() => setSelected(idx)}
                        style={{
                          backgroundColor: 'transparent'
                        }}
                      >
                        {
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-around',
                              gap: '5px'
                            }}
                          >
                            {
                              // If there are no highlights, we default to showing title as primary and link as secondary
                            }
                            {!searchResult.highlights ||
                              (searchResult.highlights &&
                                searchResult.highlights.length === 0 && (
                                  <div>
                                    <p
                                      style={{
                                        color:
                                          selected === idx ? 'white' : 'black',
                                        margin: 0,
                                        fontSize: '.9em'
                                      }}
                                    >
                                      {truncateText(decode(searchResult.title))}
                                    </p>

                                    <span
                                      style={{
                                        color:
                                          selected === idx ? 'white' : 'gray',
                                        fontSize: '.75em'
                                      }}
                                    >
                                      {truncateText(searchResult._id, 12, 70)}
                                    </span>
                                  </div>
                                ))}
                            {
                              // If there are highlights, we show highlights as primary and title as secondary
                              // multiple highlights warrants a dropdown
                            }
                            {searchResult.highlights &&
                              searchResult.highlights.length > 0 && // for multiple highlights we only grab one for now -- may add extra feature later
                              searchResult.highlights
                                .slice(0, 1)
                                .map((highlight: { texts: any[] }, i: any) => {
                                  return (
                                    <div
                                      key={searchResult._id + `_highlight_${i}`}
                                    >
                                      <HighlightedText
                                        inFocus={selected === idx}
                                        textDocs={highlight.texts}
                                        style={{
                                          color:
                                            selected === idx
                                              ? 'white'
                                              : 'black',
                                          margin: 0,
                                          fontSize: '.9em'
                                        }}
                                        truncateBy={25}
                                      />

                                      <span
                                        style={{
                                          color:
                                            selected === idx ? 'white' : 'gray',
                                          fontSize: '.75em'
                                        }}
                                      >
                                        {truncateText(
                                          decode(searchResult.title), 0, 70
                                        )}
                                      </span>
                                    </div>
                                  )
                                })}
                          </div>
                        }
                      </ListItemButton>
                    </ListItem>

                    <Collapse in={expandedState[searchResult._id]}>
                      {searchResult.highlights &&
                        searchResult.highlights.length > 1 &&
                        searchResult.highlights
                          .slice(1, searchResults.length)
                          .map((highlight: { texts: any[] }, i: any) => {
                            return (
                              <ListItem
                                key={searchResult._id + `_highlight_${i + 1}`}
                                style={{
                                  width: '100%',
                                  borderRadius: '10px',
                                  backgroundColor: 'gray',
                                  marginTop: '5px',
                                  marginBottom: '5px'
                                }}
                                onMouseOver={() => setSelected(idx)}
                              >
                                <HighlightedText
                                  inFocus={selected === idx}
                                  textDocs={highlight.texts}
                                  style={{
                                    color: 'white',
                                    margin: 0,
                                    fontSize: '.9em'
                                  }}
                                  truncateBy={30}
                                />
                              </ListItem>
                            )
                          })}
                    </Collapse>
                  </div>
                )
              })}
            {!loading && !noResults && (!query || !query.trim()) && (
              <SearchHistory />
            )}
          </List>
          <Typography variant='subtitle1'>
            Powered by{' '}
            <Link
              href='https://www.mongodb.com/atlas/database'
              style={{ color: '#2E7D32', textDecorationColor: '#2E7D32' }}
            >
              MongoDB Atlas
            </Link>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

const MongoSearchIcon = () => (
  <img alt='Search icon' src={mongoSearchIcon} style={{ width: 120 }} />
)
