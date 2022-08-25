import { useState, useEffect } from "react"
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { StoreProvider } from "../utils/Store"

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  const lightTheme = createTheme({
    type: "light",
    theme: {
      colors: {}
    }
  })

  const darkTheme = createTheme({
    type: 'dark',
    theme: {
      colors: {
        // brand colors
        background: '#1d1d1d',
        text: '#fff',
        // you can also create your own color
        myDarkColor: '#ff4ecd',
        searchBackground: "white"
        // ...  more colors
      },
      space: {},
      fonts: {}
    }
  })
  if (!showChild) {
    return null
  }

  if (typeof window === "undefined") {
    return <></>
  } else {
    return (
      <StoreProvider>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          value={{
            light: lightTheme.className,
            dark: darkTheme.className
          }}
        >
          <NextUIProvider>
            <Component {...pageProps} />
          </NextUIProvider>
        </NextThemesProvider>
      </StoreProvider>



    )
  }


}

export default MyApp
