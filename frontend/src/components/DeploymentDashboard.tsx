import React, { useEffect, useState } from "react";
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
  Chip,
  IconButton,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  CheckCircle as HealthyIcon,
  Warning as DegradedIcon,
  Error as UnhealthyIcon,
  Schedule as TimeIcon,
  LocalShipping as ArtifactIcon,
  Tag as VersionIcon,
} from "@mui/icons-material";

type Deployment = {
  id: string;
  service: string;
  environment: string;
  status: string;
  version: string;
  lastDeployed: string;
  artifact: string;
  health_checks: {
    pre: string;
    post: string;
  };
};

const mockFetchDeployments = (env: string): Deployment[] => {
  const now = new Date();
  return [
    {
      id: "1",
      service: "auth-service",
      environment: env,
      status: "healthy",
      version: "v2.3.1",
      lastDeployed: new Date(now.getTime() - 3600_000).toISOString(),
      artifact: "auth-service:v2.3.1",
      health_checks: { pre: "healthy", post: "healthy" },
    },
    {
      id: "2",
      service: "payment-service",
      environment: env,
      status: "degraded",
      version: "v1.9.4",
      lastDeployed: new Date(now.getTime() - 7200_000).toISOString(),
      artifact: "payment-service:v1.9.4",
      health_checks: { pre: "healthy", post: "degraded" },
    },
    {
      id: "3",
      service: "checkout-service",
      environment: env,
      status: "healthy",
      version: "v3.0.0",
      lastDeployed: new Date(now.getTime() - 1800_000).toISOString(),
      artifact: "checkout-service:v3.0.0",
      health_checks: { pre: "healthy", post: "healthy" },
    },
  ];
};

const DeploymentDashboard: React.FC = () => {
  const [environment, setEnvironment] = useState<"dev" | "test" | "prod">("prod");
  const [deployments, setDeployments] = useState<Deployment[]>([]);

  const fetchData = () => {
    const mockData = mockFetchDeployments(environment);
    setDeployments(mockData);
  };

  useEffect(() => {
    fetchData(); // auto-fetch on env change
  }, [environment]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "healthy":
        return { color: "success", icon: <HealthyIcon /> };
      case "degraded":
        return { color: "warning", icon: <DegradedIcon /> };
      case "unhealthy":
        return { color: "error", icon: <UnhealthyIcon /> };
      default:
        return { color: "default", icon: <HealthyIcon /> };
    }
  };

  return (
    <Stack spacing={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          📦 Deployment Status Dashboard
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Environment</InputLabel>
            <Select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value as "dev" | "test" | "prod")}
              label="Environment"
            >
              <MenuItem value="dev">dev</MenuItem>
              <MenuItem value="test">test</MenuItem>
              <MenuItem value="prod">prod</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchData}
            size="small"
          >
            Refresh
          </Button>
        </Box>
      </Box>

      <Stack spacing={2}>
        {deployments.map((d) => {
          const statusInfo = getStatusInfo(d.status);
          return (
            <Card key={d.id} variant="outlined">
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" component="h3">
                    {d.service}
                  </Typography>
                  <Chip
                    icon={statusInfo.icon}
                    label={d.status}
                    color={statusInfo.color as any}
                    variant="outlined"
                  />
                </Box>

                <Stack spacing={1.5}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <VersionIcon color="action" fontSize="small" />
                    <Typography variant="body2">
                      Version: <Typography component="span" sx={{ fontFamily: 'monospace' }}>{d.version}</Typography>
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <ArtifactIcon color="action" fontSize="small" />
                    <Typography variant="body2">
                      Artifact: <Typography component="span" sx={{ fontFamily: 'monospace' }}>{d.artifact}</Typography>
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <TimeIcon color="action" fontSize="small" />
                    <Typography variant="body2">
                      Last Deployed: {new Date(d.lastDeployed).toLocaleString()}
                    </Typography>
                  </Box>

                  <Divider />

                  <Box display="flex" gap={2}>
                    <Chip
                      size="small"
                      label={`Pre-check: ${d.health_checks.pre}`}
                      color={d.health_checks.pre === "healthy" ? "success" : "warning"}
                      variant="outlined"
                    />
                    <Chip
                      size="small"
                      label={`Post-check: ${d.health_checks.post}`}
                      color={d.health_checks.post === "healthy" ? "success" : "warning"}
                      variant="outlined"
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default DeploymentDashboard;