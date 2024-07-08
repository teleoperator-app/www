
### Krok 3: Tworzenie Podstawowych Komponentów

#### 1. `src/components/Header.js`

```jsx
import React from 'react';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/marketplace">Marketplace</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/support">Support</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
```

#### 2. `src/components/Footer.js`

```jsx
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2023 Monitoring Installer App</p>
    </footer>
  );
};

export default Footer;
```

#### 3. `src/components/InstallerList.js`

```jsx
import React from 'react';

const InstallerList = () => {
  return (
    <div>
      <h2>Select an Installer</h2>
      {/* Placeholder list of installers */}
      <ul>
        <li>Installer 1</li>
        <li>Installer 2</li>
        <li>Installer 3</li>
      </ul>
    </div>
  );
};

export default InstallerList;
```

#### 4. `src/components/Marketplace.js`

```jsx
import React from 'react';

const Marketplace = () => {
  return (
    <div>
      <h2>Products and Services</h2>
      {/* Placeholder list of products */}
      <ul>
        <li>Product 1</li>
        <li>Product 2</li>
        <li>Product 3</li>
      </ul>
    </div>
  );
};

export default Marketplace;
```

#### 5. `src/components/Dashboard.js`

```jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2>Client Dashboard</h2>
      {/* Placeholder content for Dashboard */}
      <p>Status of active orders, messages, and more...</p>
    </div>
  );
};

export default Dashboard;
```

### Krok 4: Konfiguracja głównego pliku aplikacji

#### 1. `src/App.js`

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import InstallerList from './components/InstallerList';
import Marketplace from './components/Marketplace';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={InstallerList} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
```

### Krok 5: Stylizacja (opcjonalnie minimalna stylizacja w CSS)

#### 1. `src/App.css`

```css
.App {
  font-family: Arial, sans-serif;
}

header {
  background: #333;
  color: white;
  padding: 1em;
}

header nav ul {
  list-style-type: none;
  padding: 0;
}

header nav ul li {
  display: inline;
  margin: 0 1em;
}

footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1em 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}
```

To setup should allow you to quickly iterate on your initial mockup and provide a basic structure for all necessary pages and components. From here, you can expand with more specific features, enhance the styling, and integrate backend functionalities as required.### Krok 6: Dodanie przykładowych danych i funkcji

Aby zobaczyć przykładowe dane na stronie i bardziej interaktywne funkcje, dodajmy więcej szczegółów do komponentów.

#### 1. `src/components/InstallerList.js`

```jsx
import React, { useState, useEffect } from 'react';

const InstallerList = () => {
  const [installers, setInstallers] = useState([]);

  useEffect(() => {
    // Tymczasowe dane, w przyszłości zamienione prawdziwym API
    const dummyInstallers = [
      { id: 1, name: 'Installer 1', region: 'Warsaw', rating: 4.5, cost: '200-400 PLN' },
      { id: 2, name: 'Installer 2', region: 'Krakow', rating: 4.0, cost: '180-350 PLN' },
      { id: 3, name: 'Installer 3', region: 'Gdansk', rating: 5.0, cost: '220-450 PLN' },
    ];
    setInstallers(dummyInstallers);
  }, []);

  return (
    <div>
      <h2>Select an Installer</h2>
      <ul>
        {installers.map(installer => (
          <li key={installer.id}>
            <h3>{installer.name}</h3>
            <p>Region: {installer.region}</p>
            <p>Rating: {installer.rating}</p>
            <p>Cost: {installer.cost}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstallerList;
```

#### 2. `src/components/Marketplace.js`

```jsx
import React, { useState, useEffect } from 'react';

const Marketplace = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Tymczasowe dane, w przyszłości zamienione prawdziwym API
    const dummyProducts = [
      { id: 1, name: 'Camera Model A', description: 'High quality camera', price: '400 PLN' },
      { id: 2, name: 'Camera Model B', description: 'Budget-friendly camera', price: '200 PLN' },
      { id: 3, name: 'DVR System', description: 'Advanced recording system', price: '800 PLN' },
    ];
    setProducts(dummyProducts);
  }, []);

  return (
    <div>
      <h2>Products and Services</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Marketplace;
```

#### 3. `src/components/Dashboard.js`

```jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2>Client Dashboard</h2>
      <p>Status of active orders, messages, and more...</p>

      {/* Placeholder for active orders */}
      <div>
        <h3>Active Orders</h3>
        <ul>
          <li>
            <h4>Order 1</h4>
            <p>Installer: Installer 1</p>
            <p>Status: In Progress</p>
          </li>
          <li>
            <h4>Order 2</h4>
            <p>Installer: Installer 2</p>
            <p>Status: Completed</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
```

### Krok 7: Dodanie stylizacji (rozbudowany CSS)

#### 1. `src/App.css`

```css
.App {
  font-family: Arial, sans-serif;
}

header {
  background-color: #333;
  color: white;
  padding: 1em;
}

header nav ul {
  list-style: none;
  padding: 0;
}

header nav ul li {
  display: inline;
  margin-right: 1em;
}

header nav ul li a {
  color: white;
  text-decoration: none;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1em 0;
  position: absolute;
  bottom: 0;
  width: 100%;
}

h2 {
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 1em;
  border: 1px solid #ddd;
  padding: 1em;
  border-radius: 5px;
}

li h3 {
  margin: 0 0 0.5em;
}

li p {
  margin: 0 0 0.5em;
}

li p:last-child {
  margin-bottom: 0;
}
```

### Krok 8: Uruchomienie projektu

Uruchom projekt, aby widzieć zmiany na bieżąco. W terminalu:

```sh
npm start
```

### Podsumowanie

Ta podstawowa makieta aplikacji webowej za pomocą React.js zapewni łatwy w modyfikacji interfejs z podstawową logiką. W przyszłości można ją rozbudowywać poprzez integrację z backendem, autoryzację użytkowników, bardziej zaawansowane funkcjonalności związane z zamówieniami i płatnościami oraz lepszą stylizację i responsywność.Aby jeszcze bardziej ułatwić rozwój i zrozumienie całego procesu, oto kilka dodatkowych wskazówek, które mogą pomóc w dalszym rozwoju aplikacji:

### Dodawanie Routing'u

Dodajmy routing, aby umożliwić łatwe nawigowanie między stronami.

#### 1. Instalacja react-router-dom

```sh
npm install react-router-dom
```

#### 2. Aktualizacja `src/components/Header.js`

Dodaj router linki do nawigacji:

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/marketplace">Marketplace</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/support">Support</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
```

### Mimiczna Integracja API

+ zintegrować rzeczywiste API dla danych
+ Mock Service Worker (MSW), aby udawać żądania sieciowe. MSW symuluje API w lokalnym środowisku.

#### 1. Instalacja MSW

```sh
npm install msw --save-dev
```

#### 4. Używanie danych z Mock API w komponentach

Aktualizuj użycie efektów w `InstallerList.js` i `Marketplace.js`:

##### `src/components/InstallerList.js`

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstallerList = () => {
  const [installers, setInstallers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://api.example.com/installers');
      setInstallers(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Select an Installer</h2>
      <ul>
        {installers.map(installer => (
          <li key={installer.id}>
            <h3>{installer.name}</h3>
            <p>Region: {installer.region}</p>
            <p>Rating: {installer.rating}</p>
            <p>Cost: {installer.cost}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstallerList;
```

##### `src/components/Marketplace.js`

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Marketplace = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://api.example.com/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Products and Services</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Marketplace;
```
