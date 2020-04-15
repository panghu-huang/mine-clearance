import * as React from 'react'
import { AppProps } from 'server-renderer'

type IAppProps = AppProps<{
  error?: string
}>

const App: React.FC<IAppProps> = ({
  Component, pageProps,
}) => {
  if (Component) {
    return <Component {...pageProps}/>
  }
  return (
    <div>{pageProps.error}</div>
  )
}

export default App