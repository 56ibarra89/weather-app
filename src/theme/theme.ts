import { createTheme, alpha } from '@mui/material/styles';

const glassStyles = (mode: 'light' | 'dark') => ({
  backgroundColor: mode === 'light' 
    ? alpha('#ffffff', 0.8) 
    : alpha('#0f172a', 0.8),
  backdropFilter: 'blur(12px)',
  border: `1px solid ${mode === 'light' ? alpha('#e2e8f0', 0.5) : alpha('#1e293b', 0.5)}`,
  boxShadow: mode === 'light'
    ? '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
    : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6366f1' }, // Indigo
    secondary: { main: '#10b981' }, // Emerald
    background: { default: '#f8fafc', paper: '#ffffff' },
    text: { primary: '#1e293b', secondary: '#64748b' },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          ...glassStyles('light'),
          borderRadius: 24,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          ...glassStyles('light'),
          color: '#1e293b',
          marginTop: '1rem',
          borderRadius: 24,
          position: 'static' as const,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontWeight: 600,
          borderRadius: 12,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#818cf8' }, // Lighter Indigo
    secondary: { main: '#34d399' }, // Lighter Emerald
    background: { default: '#020617', paper: '#0f172a' },
    text: { primary: '#f8fafc', secondary: '#94a3b8' },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          ...glassStyles('dark'),
          borderRadius: 24,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          ...glassStyles('dark'),
          marginTop: '1rem',
          borderRadius: 24,
          position: 'static' as const,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontWeight: 600,
          borderRadius: 12,
        },
      },
    },
  },
});