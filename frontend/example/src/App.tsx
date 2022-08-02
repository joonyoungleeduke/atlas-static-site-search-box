import React from 'react'
import Search from 'atlas-static-site-search-box'
import 'atlas-static-site-search-box/dist/index.css'
import Typography from "@mui/material/Typography"
import {APP_ID} from "./constants"

export default function SearchPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "400px",
      }}
    >
      <Typography variant="h3">🥭</Typography>
      <Search id={APP_ID} />
    </div>
  );
}
