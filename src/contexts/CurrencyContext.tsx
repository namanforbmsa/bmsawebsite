import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'USD' | 'INR' | 'CHF' | 'SGD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (usdPrice: number) => string;
  getCurrencySymbol: () => string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Currency symbols
const currencySymbols: Record<Currency, string> = {
  USD: '$',
  INR: '₹',
  CHF: 'CHF',
  SGD: 'S$',
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [conversionRates, setConversionRates] = useState<Record<Currency, number>>({
    USD: 1,
    INR: 83.50,
    CHF: 0.85,
    SGD: 1.33,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch real-time exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        
        setConversionRates({
          USD: 1,
          INR: data.rates.INR || 83.50,
          CHF: data.rates.CHF || 0.85,
          SGD: data.rates.SGD || 1.33,
        });
      } catch (error) {
        console.error('Failed to fetch exchange rates, falling back to USD:', error);
        // Fall back to USD on error
        setCurrency('USD');
        setConversionRates({
          USD: 1,
          INR: 83.50,
          CHF: 0.85,
          SGD: 1.33,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
    
    // Refresh rates every hour
    const interval = setInterval(fetchRates, 3600000);
    return () => clearInterval(interval);
  }, []);

  const convertPrice = (usdPrice: number): string => {
    const convertedPrice = usdPrice * conversionRates[currency];
    const symbol = currencySymbols[currency];
    
    // Format with appropriate decimal places
    if (currency === 'INR') {
      return `${symbol}${Math.round(convertedPrice)}`;
    }
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  const getCurrencySymbol = (): string => {
    return currencySymbols[currency];
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, getCurrencySymbol, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
