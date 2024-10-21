import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import CompanyApp from './CompanyApp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card } from './components/card';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import ZustandApp from './ZustandApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <div className="max-w-screen-sm mx-auto p-2">
        <Tabs defaultValue="simple">
          <TabsList>
            <TabsTrigger value="simple">Simple</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="zustand">Zustand</TabsTrigger>
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
          <TabsContent value="zustand">
            <Card>
              <ZustandApp />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MantineProvider>
  </StrictMode>,
);
