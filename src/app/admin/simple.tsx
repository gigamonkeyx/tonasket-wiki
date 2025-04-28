export default function SimpleAdminPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Simple Admin Page</h1>
      <p>This is a very simple admin page with no dependencies.</p>
      <p>If you can see this, the basic routing is working correctly.</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/admin" style={{ color: 'blue', textDecoration: 'underline', marginRight: '10px' }}>
          Admin Home
        </a>
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          Back to Home
        </a>
      </div>
    </div>
  );
}
