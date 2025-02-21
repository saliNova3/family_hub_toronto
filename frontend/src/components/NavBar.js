
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  InputBase,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import logoIcon from "../assets/images/Toronto_Hub_family__logo-removebg-preview.png"
import { Link } from "react-router";
//
// Color Scheme - Updated to match HomePage gradient theme
//
const navBarBg = '#2C3E50';  // Dark slate blue
const textColor = '#F0F4F8'; // Light gray-blue
const hoverColor = '#18BC9C'; // Teal
const searchBgColor = alpha('#ffffff', 0.15);
const searchHoverColor = alpha('#ffffff', 0.25);

//
// Styled Search container
//
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: searchBgColor,
  '&:hover': {
    backgroundColor: searchHoverColor,
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: 'auto',
  transition: 'all 0.3s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  padding: theme.spacing(1),
  paddingRight: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.shorter,
  }),
  width: '12ch',
  '&:focus': {
    width: '20ch',
  },
}));

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add search logic here
  };

  return (
    <Box sx={{ 
      position: 'sticky',
      top: 0,
      zIndex: 1100,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: navBarBg,
          color: textColor,
          backgroundImage: 'linear-gradient(to right, #2C3E50 0%, #34495E 100%)',
        }}
      >
        <Toolbar>
          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={toggleMobileMenu}
              sx={{
                mr: 2,
                color: textColor,
                '&:hover': { color: hoverColor, transform: 'scale(1.05)' },
                transition: 'all 0.2s ease',
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo and Title */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <Box
              component="img"
              src={logoIcon}
              alt="Toronto Hub Logo"
              sx={{ 
                width: 55, 
                height: 55, 
                mr: 1,
                filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))',
              }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: textColor,
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                letterSpacing: '0.5px',
              }}
            >
              Toronto Family Hub
            </Typography>
          </Box>

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                color="inherit"
                startIcon={<HomeIcon />}
                sx={{
                  textTransform: 'none',
                  color: textColor,
                  mx: 0.5,
                  py: 1,
                  '&:hover': { 
                    color: hoverColor,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Home
              </Button>
              <Button
  color="inherit"
  startIcon={<InfoIcon />}
  component={Link}  // Import Link from react-router-dom
  to="/about"       // This needs to match your route path
  sx={{
    textTransform: 'none',
    color: textColor,
    mx: 0.5,
    py: 1,
    '&:hover': { 
      color: hoverColor,
      backgroundColor: 'rgba(255,255,255,0.05)',
      transform: 'translateY(-2px)',
    },
    transition: 'all 0.2s ease',
  }}
>
  About
</Button>
              
            </Box>
          )}

          {/* Desktop Search Bar */}
          {!isMobile && (
            <form onSubmit={handleSearch}>
              <Search>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    '::placeholder': {
                      color: alpha(textColor, 0.7),
                      opacity: 1,
                    }
                  }}
                />
                <SearchIconWrapper>
                  <IconButton 
                    type="submit" 
                    sx={{ 
                      p: 0, 
                      color: 'inherit',
                      '&:hover': { color: hoverColor },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </SearchIconWrapper>
              </Search>
            </form>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Menu - Enhanced with smooth animation */}
      {isMobile && (
        <Box 
          sx={{ 
            backgroundColor: navBarBg,
            backgroundImage: 'linear-gradient(to bottom, #2C3E50 0%, #34495E 100%)',
            overflow: 'hidden',
            maxHeight: mobileMenuOpen ? '300px' : '0px',
            transition: 'all 0.3s ease-in-out',
            boxShadow: mobileMenuOpen ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
          }}
        >
          <Box sx={{ p: mobileMenuOpen ? 2 : 0 }}>
            <Button
              fullWidth
              startIcon={<HomeIcon />}
              onClick={toggleMobileMenu}
              sx={{
                justifyContent: 'flex-start',
                color: textColor,
                py: 1.5,
                my: 0.5,
                borderRadius: 1,
                '&:hover': { 
                  color: hoverColor,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Home
            </Button>
            <Button
  fullWidth
  startIcon={<InfoIcon />}
  component={Link}  // Import Link from react-router-dom
  to="/about"       // This needs to match your route path
  sx={{
    justifyContent: 'flex-start',
    color: textColor,
    py: 1.5,
    my: 0.5,
    borderRadius: 1,
    '&:hover': { 
      color: hoverColor,
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
    transition: 'all 0.2s ease',
  }}
>
  About
</Button>
            
            <Box component="form" onSubmit={handleSearch} sx={{ mt: 2 }}>
              <Search sx={{ width: '100%', mx: 0 }}>
                <StyledInputBase
                  placeholder="Search…"
                  fullWidth
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    width: '100%',
                    '&:focus': {
                      width: '100%',
                    },
                    '::placeholder': {
                      color: alpha(textColor, 0.7),
                      opacity: 1,
                    }
                  }}
                />
                <SearchIconWrapper>
                  <IconButton 
                    type="submit" 
                    sx={{ 
                      p: 0, 
                      color: 'inherit',
                      '&:hover': { color: hoverColor },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </SearchIconWrapper>
              </Search>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;