import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";


const products = [
  {
    id: 1,
    title: 'Gato Que Ri',
    price: 79.99,
    rating: 4.8,
    tag: 'Novo',
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRofBH0p4nBU-iwS8s8pK9sv2Tct_yJeKivQ&s"
  },
  {
    id: 2,
    title: 'Flash',
    price: 59.50,
    rating: 4.5,
    tag: 'Promo',
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiK2gWd6kgpiWoTMopzxPeI-xE7YqeQ6qp_g&s",
  },
  {
    id: 3,
    title: 'Friends',
    price: 89.90,
    rating: 4.7,
    tag: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1yZ6-YOVUwGz4x7VkEA9EqiY9TVKZ3FQAvg&s',
  },
  {
    id: 4,
    title: 'Hello Kitty',
    price: 90.00,
    rating: 4.6,
    tag: 'Novo',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ07ByEuw92XwpTXperRVkO2hFsjUpxYyD_nw&s',
  },
  {
    id: 5,
    title: 'Rosquinha',
    price: 99.90,
    rating: 4.3,
    tag: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN1qKbMFvPwfVwmKdHWBCiHOzbwrKpSgznQg&s',
  },
  {
    id: 6,
    title: 'Friends Forever',
    price: 75.00,
    rating: 4.9,
    tag: 'Promo',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZlHtIWXQcWyc6reyYk0plaxjlFeLl9R85Rg&s',
  },
];


const themes = {
  light: {
    background: '#f3f4f6',
    cardBackground: '#ffffff',
    text: '#1f2937',
    secondaryText: '#4b5563',
  },
  dark: {
    background: '#111827',
    cardBackground: '#1f2937',
    text: '#f9fafb',
    secondaryText: '#9ca3af',
  },
};


export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0); 


useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }


    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  
  const handleAddToCart = () => setCartCount(prev => prev + 1);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };  
  
  

  const AppContainer = styled.div`
    min-height: 100vh;
    padding-top: 4rem; /* Espaço para a barra de navegação fixa */
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-family: 'Inter', sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  `;


  const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.5rem;
    margin-top: 4rem;
    
    @media (min-width: 640px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  `;


  const StyledProductCard = styled.div`
    position: relative;
    background-color: ${props => props.theme.cardBackground};
    color: ${props => props.theme.text};
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    transition: background-color 0.3s ease;
  `;

  const ProductImage = styled.img`
    width: 100%;
    height: 12rem;
    object-fit: contain;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
  `;

  const ProductTag = styled.span`
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: bold;
    border-radius: 9999px;
    color: #fff;
    background-color: ${props => props.tag === 'Novo' ? '#22c55e' : '#ef4444'};
  `;

  const ProductDetails = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `;

  const ProductTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0.25rem;
  `;

  const ProductPrice = styled.p`
    font-size: 1.5rem;
    font-weight: 800;
    color: #3b82f6;
    margin-bottom: 0.25rem;
  `;

  const StarRating = styled.div`
    display: flex;
    align-items: center;
    color: #f59e0b;
    margin-bottom: 1rem;
  `;

  const RatingValue = styled.span`
    font-size: 0.875rem;
    margin-left: 0.25rem;
    color: ${props => props.theme.secondaryText};
  `;

  const StyledButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: green;
    color: #fff;
    border: none;

    &:hover {
      background-color: darkgreen;
    }
  `;

  const StyledNavbar = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: ${props => props.theme.cardBackground};
    color: ${props => props.theme.text};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, color 0.3s ease;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const NavContent = styled.div`
    max-width: 84rem;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const NavTitle = styled.div`
    font-size: 1.25rem;
    font-weight: bold;
  `;

  const NavActions = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `;

  const ThemeButton = styled.button`
    padding: 0.5rem;
    border-radius: 9999px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${props => props.theme.secondaryText}20;
    }
  `;

  const CartWrapper = styled.span`
    position: relative;
  `;

  const CartCount = styled.span`
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
    background-color: #ef4444;
    color: #fff;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    line-height: 1;
    animation: bounce 1s infinite;
  `;

  const StyledSkeletonCard = styled.div`
    background-color: ${props => props.theme.cardBackground};
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    height: 24rem;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    
    & > div {
      background-color: ${props => props.theme.secondaryText};
      opacity: 0.5;
      border-radius: 0.375rem;
    }
  `;

  const SkeletonImage = styled.div`
    width: 100%;
    height: 12rem;
    margin-bottom: 1rem;
  `;
  const SkeletonText1 = styled.div`
    width: 75%;
    height: 1rem;
    margin-bottom: 0.5rem;
  `;
  const SkeletonText2 = styled.div`
    width: 50%;
    height: 1rem;
    margin-bottom: 0.5rem;
  `;
  const SkeletonText3 = styled.div`
    width: 25%;
    height: 1rem;
    margin-bottom: 1rem;
  `;
  const SkeletonButton = styled.div`
    width: 100%;
    height: 2.5rem;
    border-radius: 0.5rem;
    background-color: ${props => props.theme.secondaryText};
    opacity: 0.7;
  `;


  const Navbar = ({ isDarkMode, onToggleTheme, cartCount }) => {
    return (
      <StyledNavbar>
        <NavContent>
          <NavTitle>Mini Loja com Styled Components</NavTitle>
          <NavActions>
            <ThemeButton onClick={onToggleTheme} aria-label="Alternar tema">
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </ThemeButton>
            <CartWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.157 1.622.724 1.622h10.456c.881 0 1.411-.992.724-1.622L15 13m-6 4a1 1 0 11-2 0 1 1 0 012 0zm9 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
            </CartWrapper>
          </NavActions>
        </NavContent>
      </StyledNavbar>
    );
  };

  const ProductCard = ({ product, onAddToCart }) => {
    const { title, price, rating, tag, image } = product;
    const fullStars = '★'.repeat(Math.max(0, Math.floor(rating)));
    const emptyStars = '☆'.repeat(Math.max(0, 5 - Math.floor(rating)));

    return (
      <StyledProductCard>
        {tag && <ProductTag tag={tag}>{tag}</ProductTag>}
        <ProductImage src={image} alt={title} loading="lazy" />
        <ProductDetails>
          <ProductTitle>{title}</ProductTitle>
          <ProductPrice>R$ {price.toFixed(2)}</ProductPrice>
          <StarRating>
            <span>
              {fullStars}
              <span style={{ color: '#9ca3af' }}>{emptyStars}</span>
            </span>
            <RatingValue>{rating.toFixed(1)}</RatingValue>
          </StarRating>
          <StyledButton onClick={onAddToCart}>Comprar</StyledButton>
        </ProductDetails>
      </StyledProductCard>
    );
  };

  const SkeletonCard = () => (
    <StyledSkeletonCard>
      <SkeletonImage />
      <SkeletonText1 />
      <SkeletonText2 />
      <SkeletonText3 />
      <SkeletonButton />
    </StyledSkeletonCard>
  );
  
  return (
    <ThemeProvider theme={isDarkMode ? themes.dark : themes.light}>
      <AppContainer>
        <Navbar isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} cartCount={cartCount} />
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <ProductGrid>
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </ProductGrid>
          ) : (
            <ProductGrid>
              {products.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </ProductGrid>
          )}
        </main>
      </AppContainer>
    </ThemeProvider>
  );
}
