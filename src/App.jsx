import './index.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { Application } from '@nmfs-radfish/react-radfish';
import { GridContainer, Title, NavMenuButton, PrimaryNav, Header } from '@trussworks/react-uswds';
import CruiseListPage from './pages/CruiseList';
import CruiseNewPage from './pages/CruiseNew';

function App({ application }) {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <Application application={application}>
      <a className='usa-skipnav' href='#main-content'>
        Skip to main content
      </a>
      <main id='main-content' className='bg-primary-darker text-white'>
        <BrowserRouter>
          <Header basic showMobileOverlay={isExpanded} className='header-container bg-base-lightest'>
            <div className='usa-nav-container'>
              <div className='usa-navbar'>
                <Title>
                  <img src='/logo.png' alt='RADFish Cruise App logo' className='header-logo' />
                </Title>
                <NavMenuButton onClick={() => setExpanded((prvExpanded) => !prvExpanded)} label='Menu' />
              </div>
              <PrimaryNav
                items={[
                  <Link to='/' style={{ color: `${isExpanded ? 'black' : 'blue'}` }}>
                    Home
                  </Link>,
                ]}
                mobileExpanded={isExpanded}
                onToggleMobileNav={() => setExpanded((prvExpanded) => !prvExpanded)}
              ></PrimaryNav>
            </div>
          </Header>
          <GridContainer>
            <Routes>
              <Route path='/cruises/new' element={<CruiseNewPage />} />
              <Route path='/cruises/:id' element={<CruiseNewPage />} />
              <Route path='/*' element={<CruiseListPage />} />
            </Routes>
          </GridContainer>
        </BrowserRouter>
      </main>
    </Application>
  );
}

export default App;
