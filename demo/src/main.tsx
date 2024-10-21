import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import CompanyApp from './CompanyApp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card } from './components/card';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="max-w-screen-sm mx-auto p-2">
      <Tabs defaultValue="simple">
        <TabsList>
          <TabsTrigger value="simple">Simple</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
        </TabsList>
        <TabsContent value="simple">
          <Card>
            <App />
          </Card>
        </TabsContent>
        <TabsContent value="company">
          <Card>
            <CompanyApp />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </StrictMode>,
);
