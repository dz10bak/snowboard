import { Routes, Route } from 'react-router-dom';
import { DesignProvider } from './context/DesignContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Design from './pages/Design';
import Community from './pages/Community';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <DesignProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design" element={<Design />} />
          <Route path="/community" element={<Community />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </DesignProvider>
  );
}
