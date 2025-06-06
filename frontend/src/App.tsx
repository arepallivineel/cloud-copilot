import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import DeploymentDashboard from "./components/DeploymentDashboard";
import ObservabilityPanel from "./components/ObservabilityPanel";
import ChatInterface from "./components/ChatInterface";
import RCAView from "./components/RCAView";
import DeploymentTriggerPanel from "./components/DeploymentTriggerPanel";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0967D2',
      light: '#47A3F3',
      dark: '#03449E',
    },
    background: {
      default: '#F7FAFC',
      paper: '#FFFFFF',
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minWidth: 0,
          padding: '12px 16px',
          fontWeight: 500,
          '&.Mui-selected': {
            color: '#0967D2',
          },
        },
      },
    },
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const MotionBox = motion(Box);

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box mb={4} textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom>
            CloudOps Copilot
          </Typography>
        </Box>

        <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="navigation tabs"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: 'primary.main',
                },
              }}
            >
              <Tab label="📊 Observability" />
              <Tab label="🚀 Deployment" />
              <Tab label="🧠 RCA" />
              <Tab label="⚙️ Trigger" />
            </Tabs>
          </Box>

          <TabPanel value={activeTab} index={0}>
            <AnimatePresence mode="wait">
              <MotionBox
                key="observability"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ObservabilityPanel />
              </MotionBox>
            </AnimatePresence>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <AnimatePresence mode="wait">
              <MotionBox
                key="deployment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DeploymentDashboard />
              </MotionBox>
            </AnimatePresence>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <AnimatePresence mode="wait">
              <MotionBox
                key="rca"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RCAView />
              </MotionBox>
            </AnimatePresence>
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <AnimatePresence mode="wait">
              <MotionBox
                key="trigger"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DeploymentTriggerPanel />
              </MotionBox>
            </AnimatePresence>
          </TabPanel>
        </Paper>

        <Box mt={4}>
          <ChatInterface />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;