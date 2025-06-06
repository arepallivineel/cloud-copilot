import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Fab,
  Zoom,
  Slide,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import {
  Close as CloseIcon,
  Send as SendIcon,
  Chat as ChatIcon,
  SmartToy as BotIcon,
  Person as UserIcon,
} from "@mui/icons-material";

type Message = {
  type: "user" | "bot";
  text: string;
};

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockProcessQuery = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("version") && q.includes("login-service")) {
      return "Login-service in prod is currently running version `v2.3.1`.";
    }
    if (q.includes("status") && q.includes("pods")) {
      return "All pods are running: 3/3 Ready in `auth-service-prod`.";
    }
    if (q.includes("env") || q.includes("config")) {
      return "Environment variables for `payment-service-prod`:\n- DB_URL: postgres://...\n- FEATURE_X_ENABLED: true";
    }
    return "Sorry, I couldn't understand your request. Try asking about deployment version, pod status, or configs.";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const answer = mockProcessQuery(input);
    const botMsg: Message = { type: "bot", text: answer };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 500);

    setInput("");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Zoom in={!open}>
        <Fab
          color="primary"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          sx={{ boxShadow: 3 }}
        >
          <ChatIcon />
        </Fab>
      </Zoom>

      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={6}
          sx={{
            width: 350,
            height: 500,
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <BotIcon />
              <Typography variant="subtitle1">CloudOps Copilot</Typography>
            </Stack>
            <IconButton
              size="small"
              onClick={() => setOpen(false)}
              sx={{ color: "inherit" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              bgcolor: "grey.50",
            }}
          >
            <Stack spacing={2}>
              {messages.map((msg, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="flex-start"
                    sx={{
                      maxWidth: "80%",
                    }}
                  >
                    {msg.type === "bot" && (
                      <BotIcon fontSize="small" color="primary" sx={{ mt: 0.5 }} />
                    )}
                    <Paper
                      elevation={1}
                      sx={{
                        p: 1.5,
                        bgcolor: msg.type === "user" ? "primary.main" : "background.paper",
                        color: msg.type === "user" ? "primary.contrastText" : "text.primary",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          fontFamily: msg.text.includes('`') ? "monospace" : "inherit",
                        }}
                      >
                        {msg.text}
                      </Typography>
                    </Paper>
                    {msg.type === "user" && (
                      <UserIcon fontSize="small" color="primary" sx={{ mt: 0.5 }} />
                    )}
                  </Stack>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Stack>
          </Box>

          <Divider />

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 2,
              bgcolor: "background.paper",
              display: "flex",
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about version, pods..."
              variant="outlined"
            />
            <IconButton
              color="primary"
              type="submit"
              disabled={!input.trim()}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
                "&.Mui-disabled": {
                  bgcolor: "action.disabledBackground",
                  color: "action.disabled",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Slide>
    </Box>
  );
};

export default ChatInterface;
