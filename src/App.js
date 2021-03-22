import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs'
import { Container } from 'react-bootstrap'
import {useDarkMode} from './useDarkMode';
import {Toggle} from './Toggle';
import {GlobalStyles, lightTheme, darkTheme} from './globalStyles';
import {ThemeProvider} from 'styled-components';
import Job from './Job'
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';


function App() {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page)

  function handleParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return{ ...prevParams, [param]: value}
    })
  }
  
  return (
    <ThemeProvider theme={themeMode}>
      <Container className="my-5">
        <GlobalStyles />
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <center><h1 className="mb-4">Github Jobs</h1></center>
        <SearchForm params = {params} onParamChange={handleParamChange} />
        <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error. Try refreshing.</h1>}
        {jobs.map(job => {
          return <Job key={job.id} job={job} />
        })}
        <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      </Container>
    </ThemeProvider>
  )
}

export default App;
