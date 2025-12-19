import React from 'react'

const Footer = () => {
  return (
    <div style={styles.footer}>
      
      {/* Footer Content */}
      <div style={styles.footerContent}>
        
        {/* Left Section */}
        <div style={styles.footerContentLeft}>
          <h2 style={styles.logoText}>SHOPAHOLIC</h2>
          <p style={styles.description}>
            Discover the latest trends in fashion. Quality and style delivered right to your door.
          </p>

          <div style={styles.socialIcons}>
            <div style={styles.iconPlaceholder}>FB</div>
            <div style={styles.iconPlaceholder}>TW</div>
            <div style={styles.iconPlaceholder}>IG</div>
          </div>
        </div>

        {/* Center Section */}
        <div style={styles.footerContentCenter}>
          <h2 style={styles.title}>COMPANY</h2>
          <ul style={styles.list}>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div style={styles.footerContentRight}>
          <h2 style={styles.title}>GET IN TOUCH</h2>
          <ul style={styles.list}>
            <li>+94-77-123-4567</li>
            <li>contact@shopaholic.com</li>
            <li>Ruhunupura, Sri Lanka</li>
          </ul>
        </div>

      </div>

      <hr style={styles.divider} />

      <p style={styles.copyright}>
        © 2025 Shopaholic. All Rights Reserved.
      </p>
    </div>
  )
}

const styles = {
  footer: {
    width: '100%', 					
    backgroundColor: '#323232',
    color: '#d9d9d9',
    margin: 0,
    padding: '60px 0', 					
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: "'Outfit', sans-serif",
    // 🚀 UPDATED margin-top to 100px for more spacing
    marginTop: '100px', 
  },

  footerContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '0 5%',
    boxSizing: 'border-box',
    gap: '40px',
  },

  footerContentLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flexBasis: '300px',
  },

  footerContentCenter: {
    flexBasis: '200px',
  },

  footerContentRight: {
    flexBasis: '200px',
  },

  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'white'
  },

  description: {
    fontSize: '14px',
  },

  socialIcons: {
    display: 'flex',
    gap: '15px',
  },

  iconPlaceholder: {
    width: '30px',
    height: '30px',
    backgroundColor: '#555',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    cursor: 'pointer'
  },

  title: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '15px',
    color: 'white',
  },

  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    lineHeight: '28px',
  },

  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#555',
    border: 'none',
    marginTop: '40px',
  },

  copyright: {
    fontSize: '14px',
    marginTop: '20px',
    textAlign: 'center',
  }
};

export default Footer;