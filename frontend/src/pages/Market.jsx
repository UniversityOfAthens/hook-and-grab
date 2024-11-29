import '../styles/Market.css';

const Market = () => {
    return (
        <div className="market-container">
            <header className="market-header">
                <h1>Market Page</h1>
                <p>Welcome to the Market page!</p>
            </header>
            <section className="market-search">
                <input type="text" placeholder="Search for items..." className="market-search-input" />
                <button className="market-search-button">Search</button>
            </section>
            <section className="market-items">
                <div className="market-item">
                    <h2>Item 1</h2>
                    <p>Description of item 1.</p>
                </div>
                <div className="market-item">
                    <h2>Item 2</h2>
                    <p>Description of item 2.</p>
                </div>
                <div className="market-item">
                    <h2>Item 3</h2>
                    <p>Description of item 3.</p>
                </div>

            </section>
            <footer className="market-footer">
                <p>&copy; 2024 Hook&Grab Marketplace. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Market;