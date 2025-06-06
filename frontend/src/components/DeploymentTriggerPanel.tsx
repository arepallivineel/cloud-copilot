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
  TextField,
  Alert,
  Paper,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Rocket as RocketIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Settings as SettingsIcon,
  PlayArrow as TriggerIcon,
  RestartAlt as RestartIcon,
  HealthAndSafety as HealthIcon,
  LocalShipping as ArtifactIcon,
  Schedule as TimeIcon,
} from "@mui/icons-material";

const DeploymentTriggerPanel: React.FC = () => {
  const [service, setService] = useState("auth-service");
  const [env, setEnv] = useState("prod");
  const [version, setVersion] = useState("v1.0.0");

  const [suggestion, setSuggestion] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [statusLog, setStatusLog] = useState("");

  const getNowFormatted = (): string => new Date().toLocaleString();

  const mockGetSuggestion = (svc: string, env: string): string => {
    if (svc === "payment-service" && env === "prod") {
      return "⚠️ Risk: payment-service has recent degraded health post last deploy.\nSuggestion: Check logs and latency before proceeding.";
    }
    return "✅ No known issues. Safe to deploy.";
  };

  const handleTrigger = () => {
    const aiResult = mockGetSuggestion(service, env);
    setSuggestion(aiResult);

    // Show confirm only if the suggestion includes a risk or warning
    if (aiResult.includes("⚠️") || aiResult.includes("❌")) {
      setShowConfirm(true);
    } else {
      proceedWithDeployment(); // Proceed directly if safe
    }
  };

  const proceedWithDeployment = () => {
    const log = [
      `🚀 Triggering deployment...`,
      `Service: ${service}`,
      `Environment: ${env}`,
      `Version: ${version}`,
      `---------------------------`,
      `✅ Deployment successful!`,
      `🔁 Restarting pods...`,
      `🔍 Running pre-checks...`,
      `✅ Health: OK`,
      `📦 Artifact: ${service}:${version}`,
      `🕒 Completed at: ${getNowFormatted()}`,
    ].join("\n");

    setStatusLog(log);
    setShowConfirm(false);
  };

  return (
    <Stack spacing={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SettingsIcon /> Trigger Deployment
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={3}>
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

            <TextField
              label="Version"
              size="small"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              sx={{ minWidth: 120 }}
            />

            <Button
              variant="contained"
              startIcon={<TriggerIcon />}
              onClick={handleTrigger}
              sx={{ ml: { sm: 'auto' } }}
            >
              Trigger Deployment
            </Button>
          </Stack>

          {suggestion && (
            <Box>
              <Alert 
                severity={suggestion.includes("⚠️") ? "warning" : "success"}
                icon={suggestion.includes("⚠️") ? <WarningIcon /> : <CheckIcon />}
                action={
                  showConfirm && (
                    <Button
                      color="warning"
                      size="small"
                      onClick={proceedWithDeployment}
                      startIcon={<RocketIcon />}
                    >
                      Proceed Anyway
                    </Button>
                  )
                }
              >
                <Typography variant="subtitle2" gutterBottom>
                  AI Copilot Suggestion:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {suggestion}
                </Typography>
              </Alert>
            </Box>
          )}

          {statusLog && (
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <RocketIcon color="primary" /> Deployment Status
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
                    <Stack spacing={1}>
                      {statusLog.split('\n').map((line, index) => (
                        <Box key={index} display="flex" alignItems="center" gap={1}>
                          {line.includes('Triggering') && <RocketIcon fontSize="small" />}
                          {line.includes('Restarting') && <RestartIcon fontSize="small" />}
                          {line.includes('Health') && <HealthIcon fontSize="small" />}
                          {line.includes('Artifact') && <ArtifactIcon fontSize="small" />}
                          {line.includes('Completed') && <TimeIcon fontSize="small" />}
                          <Typography
                            variant="body2"
                            component="pre"
                            sx={{
                              fontFamily: 'monospace',
                              m: 0,
                              fontSize: '0.875rem',
                            }}
                          >
                            {line}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default DeploymentTriggerPanel;