import { Link } from "react-router-dom";
import { Typography, TextField, Button, Box, Container, Grid2 } from "@mui/material";
import { Card } from "antd";
import { FacebookFilled, TwitterSquareFilled, LinkedinFilled, MailFilled, PhoneFilled, GlobalOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <Card style={{ backgroundColor: "#000", color: "#fff", borderRadius: 0, boxShadow: "none" }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={4} justifyContent="space-between" py={5}>
          
          {/* Branding & Tagline */}
          <Grid2 size={{xs: 12, sm: 6, md: 3}}>
            <Typography variant="h4" fontWeight="bold" gutterBottom style={{ fontFamily: "Poppins, sans-serif" }}>
              AyuMed
            </Typography>
            <Typography variant="body1" color="gray" style={{ fontFamily: "Poppins, sans-serif" }}>
              Empowering your healthcare journey with precision and care.
            </Typography>
          </Grid2>

          {/* Quick Links */}
          <Grid2 size={{xs: 12, sm: 6, md: 2}}>
            <Typography variant="h5" fontWeight="bold" gutterBottom style={{ fontFamily: "Poppins, sans-serif" }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["About Us", "Our Services", "Careers", "Contact Us"].map((link, index) => (
                <Link
                  key={index}
                  to={`/${link.toLowerCase().replace(" ", "-")}`}
                  style={{ textDecoration: "none", color: "#1890ff", fontFamily: "Poppins, sans-serif" }}
                >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid2>

          {/* Support */}
          <Grid2 size={{xs: 12, sm: 6, md: 2}}>
            <Typography variant="h5" fontWeight="bold" gutterBottom style={{ fontFamily: "Poppins, sans-serif" }}>
              Support
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Help Center", "FAQ", "Privacy Policy", "Terms & Conditions"].map((link, index) => (
                <Link
                  key={index}
                  to={`/${link.toLowerCase().replace(/ /g, "-")}`}
                  style={{ textDecoration: "none", color: "#1890ff", fontFamily: "Poppins, sans-serif" }}
                >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid2>

          {/* Contact Info */}
          <Grid2 size={{xs: 12, sm: 6, md: 3}}>
            <Typography variant="h5" fontWeight="bold" gutterBottom style={{ fontFamily: "Poppins, sans-serif" }}>
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body1" color="gray">
                <MailFilled /> <a href="mailto:support@ayumed.com" style={{ textDecoration: "none", color: "#1890ff", fontFamily: "Poppins, sans-serif" }}>support@ayumed.com</a>
              </Typography>
              <Typography variant="body1" color="gray">
                <PhoneFilled /> <a href="tel:+02254545252" style={{ textDecoration: "none", color: "#1890ff", fontFamily: "Poppins, sans-serif" }}>+022 5454 5252</a>
              </Typography>
              <Typography variant="body1" color="gray">
                <GlobalOutlined /> <a href="https://www.ayumed.com" style={{ textDecoration: "none", color: "#1890ff", fontFamily: "Poppins, sans-serif" }}>www.ayumed.com</a>
              </Typography>
            </Box>
          </Grid2>
          
        </Grid2>

        {/* Social Media */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom style={{ fontFamily: "Poppins, sans-serif" }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookFilled style={{ fontSize: "35px", color: "#1877F2" }} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterSquareFilled style={{ fontSize: "35px", color: "#1DA1F2" }} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedinFilled style={{ fontSize: "35px", color: "#0077B5" }} />
            </a>
          </Box>
        </Box>

        {/* Footer Bottom */}
        <Box sx={{ mt: 4, textAlign: "center", py: 2, borderTop: "1px solid gray" }}>
          <Typography variant="body1" color="gray" style={{ fontFamily: "Poppins, sans-serif" }}>
            © 2024 AyuMed. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Card>
  );
}

export default Footer;
