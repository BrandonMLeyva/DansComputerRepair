function Header() {
    return (
        <header className="site-header">
            <div className="brand">
                <img src="/Danlogo.jpg" alt="Dan's Computer Repair Logo" width="80" height="80" />
                <div className="brand-text">
                    <h1> Dan's Computer Repair</h1>
                    <p>IT Services and Computer Repair</p>
                </div>
            </div>
            <nav className="main-nav">
                <ul className="nav-list">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">Products</a></li>
                    <li><a href="/services">Service Request</a></li>
                    {/* admin login button with different styling from other links */}
                    <li>
                        <a
                            href="/contact"
                            style={{
                                background: '#333',
                                color: '#fff',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}
                        >Admin Login</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;