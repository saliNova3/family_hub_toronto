// src/components/NavBar.jsx

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Button,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookIcon from '@mui/icons-material/Book';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';

const primaryColor = '#322645';
const menuBgColor = '#3A2C4E';
const hoverColor = '#46A897';

// Styled Search component
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#ffffff', 0.15),
  '&:hover': {
    backgroundColor: alpha('#ffffff', 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: 'auto',
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
  padding: theme.spacing(1, 1, 1, 1),
  paddingRight: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create('width'),
  width: '12ch',
  '&:focus': {
    width: '20ch',
  },
}));

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <Box>
      <AppBar position="sticky" sx={{ backgroundColor: primaryColor }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Toronto Family Hub
          </Typography>

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button color="inherit" startIcon={<HomeIcon />} sx={{ textTransform: 'none' }}>
                Home
              </Button>
              <Button color="inherit" startIcon={<InfoIcon />} sx={{ textTransform: 'none' }}>
                About
              </Button>
              <Button
                color="inherit"
                startIcon={<BookIcon />}
                endIcon={<ExpandMoreIcon />}
                onClick={handleMenuOpen}
                sx={{ textTransform: 'none' }}
              >
                Services
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: { backgroundColor: menuBgColor, color: '#fff' },
                }}
              >
                <MenuItem onClick={handleMenuClose} startIcon={<CalendarTodayIcon />}>
                  Family Programs
                </MenuItem>
                <MenuItem onClick={handleMenuClose} startIcon={<PersonIcon />}>
                  Counseling Services
                </MenuItem>
                <MenuItem onClick={handleMenuClose} startIcon={<BookIcon />}>
                  Educational Resources
                </MenuItem>
              </Menu>
              <Button color="inherit" startIcon={<MailIcon />} sx={{ textTransform: 'none' }}>
                Contact
              </Button>
            </Box>
          )}

          {/* Search Bar */}
          {!isMobile && (
            <form onSubmit={handleSearch}>
              <Search>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIconWrapper>
                  <IconButton type="submit" sx={{ p: 0, color: 'inherit' }}>
                    <SearchIcon />
                  </IconButton>
                </SearchIconWrapper>
              </Search>
            </form>
          )}

          {/* Notification and Login Buttons */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit">
                <Badge badgeContent={notifications} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Button color="inherit" startIcon={<PersonIcon />} sx={{ textTransform: 'none' }}>
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <Box sx={{ backgroundColor: primaryColor, p: 2 }}>
          <Button fullWidth color="inherit" startIcon={<HomeIcon />} onClick={toggleMobileMenu}>
            Home
          </Button>
          <Button fullWidth color="inherit" startIcon={<InfoIcon />} onClick={toggleMobileMenu}>
            About
          </Button>
          <Button
            fullWidth
            color="inherit"
            startIcon={<MailIcon />}
            onClick={toggleMobileMenu}
          >
            Contact
          </Button>
          <Box component="form" onSubmit={handleSearch} sx={{ mt: 2 }}>
            <Search sx={{ width: '100%' }}>
              <StyledInputBase
                placeholder="Search…"
                fullWidth
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIconWrapper>
                <IconButton type="submit" sx={{ p: 0, color: 'inherit' }}>
                  <SearchIcon />
                </IconButton>
              </SearchIconWrapper>
            </Search>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton color="inherit">
              <Badge badgeContent={notifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Button color="inherit" startIcon={<PersonIcon />} onClick={toggleMobileMenu} sx={{ textTransform: 'none' }}>
              Login
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
