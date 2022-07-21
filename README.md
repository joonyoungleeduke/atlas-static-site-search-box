# atlas-static-site-search-box

> Plug and play search button and modal to be used with Atlas Search and Realm

[![NPM](https://img.shields.io/npm/v/atlas-static-site-search-box.svg)](https://www.npmjs.com/package/atlas-static-site-search-box) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save atlas-static-site-search-box
```

## Usage

```tsx
import React, { Component } from 'react'

import Search from 'atlas-static-site-search-box'

class Example extends Component {
  render() {
    return <Search id={YOUR_REALM_APP_ID} />
  }
}
```

## Example


## Your Realm App
Your realm app should allow anonymous credentials for user login and have a function
`searchPageContents(query: string)` that returns search results using Atlas Search,
see [Atlas Search Highlighting](https://www.mongodb.com/docs/atlas/atlas-search/highlighting/)
for an example of the results that should be in the format:
```tsx
interface Result {
  // the link to the page / document in question
  _id: string
  // what is displayed
  title: string
  // not displayed
  doc_text: string
  // this component displays differently whether there are highlights or not
  highlights?: Array<Highlight>
}

export interface Highlight {
  path: string
  texts: Documents[]
  score: number
}

export interface Documents {
  value: string
  type: 'hit' | 'text'
}
```

## License

MIT © [joonyoungleeduke](https://github.com/joonyoungleeduke)
