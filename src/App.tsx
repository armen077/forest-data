import React, { FC } from 'react'
import { NavBar } from './components/NavBar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import styled from 'styled-components'
import { Upload } from './pages/Upload'
import { Map } from './pages/Map'
import { useSelector } from 'react-redux'
import { selectStands } from './features/forest/forestSlice'
import { Histogram } from './pages/Histogram'
import { Scatterplot } from './pages/Scatterplot'
import { SpeciesFilter } from './components/SpeciesFilter'
import { Pie } from './pages/Pie'

const RouterContainer = styled.div`
  padding: 1rem;
`

const baseUrl = process.env.PUBLIC_URL || '/'

const App: FC = () => {
  const stands = useSelector(selectStands)

  return (
    <Router basename={baseUrl}>
      <div>
        <NavBar/>
        <RouterContainer>
          <Switch>
            <Route path="/" component={Upload} exact/>
            <Route path="/pie" render={() => (!!stands.length ? <Pie/> : <Redirect to="/"/>)}/>
            <>
              <SpeciesFilter/>
              <Route path="/map" render={() => (!!stands.length ? <Map/> : <Redirect to="/"/>)}/>
              <Route path="/histogram" render={() => (!!stands.length ? <Histogram/> : <Redirect to="/"/>)}/>
              <Route path="/scatterplot" render={() => (!!stands.length ? <Scatterplot/> : <Redirect to="/"/>)}/>
            </>
          </Switch>
        </RouterContainer>
      </div>
    </Router>
  )
}

export default App
