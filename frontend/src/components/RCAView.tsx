import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Button,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import {
  Science as ScienceIcon,
  BugReport as BugIcon,
  Settings as ConfigIcon,
  SmartToy as AIIcon,
  PlayArrow as SimulateIcon,
} from "@mui/icons-material";
import { getRcaData } from "../mock/rcaData";

const RCAView: React.FC = () => {
  const [service, setService] = useState("auth-service");
  const [env, setEnv] = useState("prod");
  const [rcaResult, setRcaResult] = useState<any | null>(null);

  const handleSimulate = () => {
    const result = getRcaData(service, env);
    setRcaResult(result);
  };

  return (
    <Stack spacing={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          🧠 RCA Simulation
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Service</InputLabel>
            <Select
              value={service}
              onChange={(e) => setService(e.target.value)}
              label="Service"
            >
              <MenuItem value="auth-service">auth-service</MenuItem>
              <MenuItem value="payment-service">payment-service</MenuItem>
              <MenuItem value="checkout-service">checkout-service</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Environment</InputLabel>
            <Select
              value={env}
              onChange={(e) => setEnv(e.target.value)}
              label="Environment"
            >
              <MenuItem value="dev">dev</MenuItem>
              <MenuItem value="test">test</MenuItem>
              <MenuItem value="prod">prod</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<SimulateIcon />}
            onClick={handleSimulate}
            sx={{ ml: { sm: 'auto' } }}
          >
            Simulate RCA
          </Button>
        </Stack>
      </Paper>

      {rcaResult && (
        <Stack spacing={3}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <BugIcon color="info" />
                <Typography variant="h6">Log Summary</Typography>
              </Stack>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
                  {rcaResult.logs}
                </Typography>
              </Paper>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <ScienceIcon color="info" />
                <Typography variant="h6">Health Check (Pre vs Post)</Typography>
              </Stack>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(rcaResult.health, null, 2)}
                </Typography>
              </Paper>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <ConfigIcon color="info" />
                <Typography variant="h6">Config Differences</Typography>
              </Stack>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
                  {rcaResult.configDiff}
                </Typography>
              </Paper>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <AIIcon color="info" />
                <Typography variant="h6">AI Copilot Suggestion</Typography>
              </Stack>
              <Alert severity="info" variant="outlined" sx={{ '& .MuiAlert-message': { width: '100%' } }}>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {rcaResult.suggestion}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Stack>
      )}
    </Stack>
  );
};

export default RCAView;