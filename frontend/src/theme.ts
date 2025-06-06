import { createTheme } from '@mui/material/styles';

// Define custom transitions
const transitions = {
  smooth: 'all 0.3s ease-in-out',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563EB', // Modern blue
      light: '#60A5FA',
      dark: '#1E40AF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7C3AED', // Modern purple
      light: '#A78BFA',
      dark: '#5B21B6',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    success: {
      main: '#059669',
      light: '#34D399',
      dark: '#065F46',
    },
    warning: {
      main: '#D97706',
      light: '#FBBF24',
      dark: '#92400E',
    },
    error: {
      main: '#DC2626',
      light: '#F87171',
      dark: '#991B1B',
    },
    info: {
      main: '#0284C7',
      light: '#38BDF8',
      dark: '#075985',
    },
    grey: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.35,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(15, 23, 42, 0.08)',
    '0px 4px 8px rgba(15, 23, 42, 0.08)',
    '0px 8px 16px rgba(15, 23, 42, 0.08)',
    '0px 12px 24px rgba(15, 23, 42, 0.08)',
    '0px 16px 32px rgba(15, 23, 42, 0.08)',
    '0px 20px 40px rgba(15, 23, 42, 0.08)',
    '0px 24px 48px rgba(15, 23, 42, 0.12)',
    '0px 24px 48px rgba(15, 23, 42, 0.16)',
    '0px 24px 48px rgba(15, 23, 42, 0.20)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
    '0px 24px 48px rgba(15, 23, 42, 0.24)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        '#root': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          transition: transitions.smooth,
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: '0px 4px 8px rgba(15, 23, 42, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: '16px',
          boxShadow: '0px 4px 8px rgba(15, 23, 42, 0.08)',
          transition: transitions.smooth,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 12px 24px rgba(15, 23, 42, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          padding: '12px 24px',
          transition: transitions.smooth,
          '&.Mui-selected': {
            fontWeight: 600,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          transition: transitions.smooth,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0px 8px 16px rgba(15, 23, 42, 0.12)',
          transition: transitions.smooth,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 12px 24px rgba(15, 23, 42, 0.16)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: transitions.smooth,
            '&:hover': {
              borderColor: 'rgba(15, 23, 42, 0.16)',
            },
          },
        },
      },
    },
  },
});

export default theme; 