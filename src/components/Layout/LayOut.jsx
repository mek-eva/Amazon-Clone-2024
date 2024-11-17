import React from 'react'

const LayOut = ({children}) => {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}

export default LayOut
