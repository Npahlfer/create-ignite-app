import ThemeProvider from '@material-ui/styles/ThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'
import { global } from 'api/mock'
import { CheckoutProvider, GlobalProvider, I18nProvider } from 'api'
import { AppProvider } from 'containers/App/AppContext'
import createTheme from 'components/styles/createTheme'
// As of NextJS 9, all global css *must* be imported in pages/_app.js
// https://github.com/zeit/next.js/blob/master/errors/css-global.md
import 'swiper/swiper-bundle.min.css'

export const parameters = {
  layout: 'fullscreen',
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Common', 'Components', 'Containers', 'Blocks', 'Pages'],
    },
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
}

export const decorators = [
  (Story, context) => {
    const type = context.globals.theme
    const theme = createTheme({ palette: { type } })

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <I18nProvider>
          <GlobalProvider {...global}>
            <CheckoutProvider>
              <AppProvider>
                <Story />
              </AppProvider>
            </CheckoutProvider>
          </GlobalProvider>
        </I18nProvider>
      </ThemeProvider>
    )
  },
]
