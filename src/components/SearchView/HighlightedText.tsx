import React from 'react'
import { Documents } from '../../types'
import { decode } from 'html-entities'
import { truncateText } from '../../utils'

interface HighLightedTextProps {
  inFocus: boolean
  textDocs: Array<Documents>
  // other props
  [x: string]: any
}

export default function HighlightedText({
  inFocus,
  textDocs,
  ...rest
}: HighLightedTextProps) {
  const textBeforeHighlight = []
  const textAfterHighlight = []
  let highlightPos = -1
  let highlightText = ''
  for (let i = 0; i < textDocs.length; i++) {
    const textDoc = textDocs[i]
    if (textDoc.type === 'hit') {
      highlightText = textDoc.value
      highlightPos = i
      continue
    }

    if (highlightPos < 0) {
      textBeforeHighlight.push(textDocs[i].value)
    } else {
      textAfterHighlight.push(textDocs[i].value)
    }
  }

  const textBefore =
    textBeforeHighlight.length > 0 ? textBeforeHighlight.join('') : ''
  const textAfter =
    textAfterHighlight.length > 0 ? textAfterHighlight.join('') : ''

  return (
    <p {...rest}>
      {truncateText(decode(textBefore), 0, 30, false)}
      {highlightText && (
        <em
          style={{
            textDecoration: inFocus ? 'underline' : '',
            color: inFocus ? 'inherit' : '#92D293',
            fontStyle: 'normal'
          }}
        >
          {decode(highlightText)}
        </em>
      )}
      {truncateText(decode(textAfter), 0, 30)}
    </p>
  )
}
