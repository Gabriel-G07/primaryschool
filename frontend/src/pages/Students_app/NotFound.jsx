function NotFound() {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#fff',
          borderRadius: '10px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ color: '#2e302e' }}>Mount Sunset Group of Schools Students Portal</h1>
        <br /><br />
        <img src="https://i.imgur.com/juL1aAc.png" alt="GG Logo" style={{ width: '100%', borderRadius: '1rem' }}/>
        
        <br />
        <h2 style={{ color: 'red' }}>Page Not Found</h2>
        <p style={{ color: '#666' }}>Page doesn't exist in system!</p>
      </div>
    );
  }
  
  export default NotFound;