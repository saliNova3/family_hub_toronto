import React, { useEffect } from 'react';
import { 
  Container, Box, Typography, Button, Grid, Paper, 
  Card, CardContent, CardMedia, Divider, Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import homeBanner from "../assets/images/Toronto_neighborhood.png";
import { useInView } from 'react-intersection-observer';
import childcareCenters from "../assets/images/Childcare_Centers.png";
import ParentingWorkShops from "../assets/images/Parenting_Workshops_community_workshops.png"
import FamilyFriendly from "../assets/images/Family_friendly.png"
import { useNavigate } from "react-router"; 


const HomePage = () => {
  const [refHero, inViewHero] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [refCards, inViewCards] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerCards = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const featuredServices = [
    {
      title: "Childcare Centers",
      description: "Find licensed childcare centers in your neighborhood.",
      image: childcareCenters,
    },
    {
      title: "Parenting Workshops",
      description: "Join community workshops designed for parents.",
      image: ParentingWorkShops,
    },
    {
      title: "Family Events",
      description: "Discover upcoming family-friendly events in Toronto.",
      image: FamilyFriendly,
    }
  ];

  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      
      {/* Main container with improved gradient */}
      <Box
        sx={{
          backgroundColor: '#f8f9fa',
          background: 'linear-gradient(to bottom, #ffffff 0%, #e9f2fd 100%)',
          minHeight: '100vh',
          width: '100%',
          color: '#2C3E50',
        }}
      >
        {/* Hero Section with Animation */}
        <motion.div
          ref={refHero}
          initial="hidden"
          animate={inViewHero ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <Container
            maxWidth="xl"
            sx={{
              py: 10,
              background: 'linear-gradient(135deg, #F0F4F8 0%, #E6F2FF 100%)',
              minHeight: "90vh",
              borderRadius: { xs: 0, md: 4 },
              boxShadow: 3,
              mt: { xs: 0, md: 3 },
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Decorative Elements */}
            <Box
              sx={{
                position: 'absolute',
                top: 40,
                right: 40,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(24,188,156,0.2) 0%, rgba(24,188,156,0) 70%)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 60,
                left: 60,
                width: 180,
                height: 180,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(44,62,80,0.1) 0%, rgba(44,62,80,0) 70%)',
              }}
            />

            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    textAlign: { xs: 'center', md: 'left' },
                    pr: { md: 6 },
                  }}
                >
                  <Chip 
                    label="Serving Toronto Families" 
                    sx={{ 
                      mb: 3, 
                      bgcolor: 'rgba(24,188,156,0.2)', 
                      color: '#18BC9C',
                      fontWeight: 'bold',
                      px: 1
                    }} 
                  />
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      fontWeight: 800,
                      mb: 3,
                      color: "#2C3E50",
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      lineHeight: 1.2,
                      letterSpacing: '-0.5px'
                    }}
                  >
                    Toronto Family Hub
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#566573",
                      mb: 5,
                      maxWidth: 600,
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                    }}
                  >
                    Discover early childhood and family centres across Toronto. Find resources, support, and community for your growing family.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate("/find-centers")}
                      sx={{
                        backgroundColor: "#18BC9C",
                        '&:hover': { backgroundColor: "#169c82" },
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    >
                      Find Centers
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      href='/about'
                      sx={{
                        borderColor: "#2C3E50",
                        color: "#2C3E50",
                        '&:hover': { borderColor: "#2C3E50", backgroundColor: "rgba(44,62,80,0.1)" },
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    >
                      About Us
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      position: 'relative',
                      transform: 'perspective(1000px) rotateY(-5deg)',
                      transformStyle: 'preserve-3d',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Box
                      component="img"
                      src={homeBanner}
                      alt="Toronto neighborhoods"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                        p: 3,
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                      }}
                    >
                      <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                        Vibrant Toronto communities waiting to be explored
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </motion.div>

        {/* Services Section with Staggered Animation */}
        <Container maxWidth="xl" sx={{ py: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "#2C3E50",
              }}
            >
              Our Services
            </Typography>
            <Divider sx={{ maxWidth: 100, mx: 'auto', mb: 3, borderColor: '#18BC9C', borderWidth: 2 }} />
            <Typography
              variant="h6"
              sx={{
                color: "#566573",
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              Supporting Toronto families with comprehensive resources and services
            </Typography>
          </Box>

          <motion.div
            ref={refCards}
            variants={staggerCards}
            initial="hidden"
            animate={inViewCards ? "visible" : "hidden"}
          >
            <Grid container spacing={4}>
              {featuredServices.map((service, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    variants={fadeIn}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={service.image}
                        alt={service.title}
                        sx={{
                          transition: 'transform 0.5s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600, color: '#2C3E50' }}>
                          {service.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                          {service.description}
                        </Typography>
                        <Button
                          size="small"
                          sx={{
                            color: '#18BC9C',
                            fontWeight: 600,
                            '&:hover': {
                              backgroundColor: 'rgba(24,188,156,0.1)',
                            },
                            pl: 0,
                          }}
                        >
                          Learn More →
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        {/* Stats Section */}
        <Box sx={{ bgcolor: '#2C3E50', py: 10, color: 'white' }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Grid container spacing={3} justifyContent="center">
                {[
                  { number: '50+', label: 'Family Centers' },
                  { number: '5,000+', label: 'Families Helped' },
                  { number: '200+', label: 'Programs Available' },
                  { number: '25', label: 'Toronto Districts' }
                ].map((stat, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h2" sx={{ fontWeight: 700, color: '#18BC9C', mb: 1 }}>
                        {stat.number}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "#2C3E50",
              }}
            >
              Testimonials
            </Typography>
            <Divider sx={{ maxWidth: 100, mx: 'auto', mb: 3, borderColor: '#18BC9C', borderWidth: 2 }} />
          </Box>

          <Grid container spacing={4}>
            {[
              {
                quote: "The Toronto Family Hub has been an incredible resource for our family. We found excellent childcare options through their platform.",
                author: "Sarah M.",
                role: "Parent of two"
              },
              {
                quote: "As a newcomer to Toronto, this platform helped me connect with local family services and meet other parents in my neighborhood.",
                author: "David L.",
                role: "Parent"
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 8,
                        height: '100%',
                        bgcolor: '#18BC9C',
                      }
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 20,
                        color: 'rgba(24,188,156,0.1)',
                        fontSize: '6rem',
                        fontFamily: 'serif',
                        lineHeight: 1,
                      }}
                    >
                      "
                    </Typography>
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 3, fontStyle: 'italic' }}>
                        {testimonial.quote}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2C3E50' }}>
                        {testimonial.author}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#566573' }}>
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Call to Action */}
        <Box 
          sx={{ 
            backgroundImage: `linear-gradient(rgba(44,62,80,0.85), rgba(44,62,80,0.85)), url(/api/placeholder/1920/500)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            py: 12,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                Ready to find family resources?
              </Typography>
              <Typography variant="h6" sx={{ mb: 5, opacity: 0.9 }}>
                Join thousands of Toronto families who've found the perfect programs and services
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#18BC9C",
                  '&:hover': { backgroundColor: "#169c82" },
                  px: 6,
                  py: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                Get Started Today
              </Button>
            </motion.div>
          </Container>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default HomePage;