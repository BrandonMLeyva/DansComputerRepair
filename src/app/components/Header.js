function Header() {
    return (
        <header className="site-header">
            <div className="brand">
            <img src="/Danlogo.jpg" alt="Dan's Computer Repair Logo" width="80" height="80" />
            <h1> Dan's Computer Repair</h1>
            <p>IT Services and Computer Repair</p>
            </div>
            <nav className="main-nav">
                <ul className="nav-list">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;