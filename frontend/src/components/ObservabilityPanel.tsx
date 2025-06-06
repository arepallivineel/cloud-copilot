import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
} from "@mui/material";
import {
  CheckCircleOutline as HealthyIcon,
  WarningAmber as DegradedIcon,
  Info as InfoIcon,
  BugReport as DebugIcon,
} from "@mui/icons-material";

const services = ["auth-service", "payment-service", "checkout-service"];

const ObservabilityPanel: React.FC = () => {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [metrics, setMetrics] = useState({ health: "healthy", latency: 120 });
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetching metrics/logs
    const interval = setInterval(() => {
      const fakeLatency = Math.floor(Math.random() * 200) + 50;
      const fakeLogs = [
        `[INFO] ${selectedService}: request completed in ${fakeLatency}ms`,
        `[DEBUG] ${selectedService}: auth header valid`,
        `[INFO] ${selectedService}: 200 OK`,
      ];
      setMetrics({ health: fakeLatency < 180 ? "healthy" : "degraded", latency: fakeLatency });
      setLogs(fakeLogs);
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedService]);

  const getLogIcon = (logLine: string) => {
    if (logLine.includes("[INFO]")) return <InfoIcon color="info" />;
    if (logLine.includes("[DEBUG]")) return <DebugIcon color="action" />;
    return <InfoIcon />;
  };

  const getHealthColor = (health: string) => {
    return health === "healthy" ? "success" : "warning";
  };

  return (
    <Stack spacing={3}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Service</InputLabel>
        <Select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value as string)}
          label="Service"
        >
          {services.map((svc) => (
            <MenuItem key={svc} value={svc}>
              {svc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Service Health
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Chip
                icon={metrics.health === "healthy" ? <HealthyIcon /> : <DegradedIcon />}
                label={metrics.health.toUpperCase()}
                color={getHealthColor(metrics.health)}
                variant="outlined"
                sx={{ mr: 2 }}
              />
            </Box>
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              Latency
            </Typography>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1} mr={2}>
                <LinearProgress
                  variant="determinate"
                  value={(metrics.latency / 250) * 100}
                  color={metrics.latency < 180 ? "success" : "warning"}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {metrics.latency}ms
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Logs
            </Typography>
            <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto' }}>
              <List dense>
                {logs.map((log, idx) => (
                  <ListItem key={idx}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {getLogIcon(log)}
                    </ListItemIcon>
                    <ListItemText
                      primary={log}
                      primaryTypographyProps={{
                        variant: 'body2',
                        sx: { fontFamily: 'monospace' }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};

export default ObservabilityPanel;