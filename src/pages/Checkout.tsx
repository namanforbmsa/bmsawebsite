/**
 * Checkout Page
 * Lists selected services and shows totals.
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";

const Checkout = () => {
  const { items, removeItem, clearCart, totalUsd, addItem, decrementItem } = useCart();
  const { convertPrice } = useCurrency();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const hasItems = items.length > 0;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-12 md:py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Checkout</h1>
            <p className="text-muted-foreground">Review and confirm your selected services.</p>
          </div>
          {hasItems && (
            <Button variant="outline" onClick={clearCart}>
              Clear All
            </Button>
          )}
        </div>

        {!hasItems ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
            <h3 className="text-xl font-semibold text-foreground">No services added yet</h3>
            <p className="mt-2 text-muted-foreground">Go to a service page and click “Add” to include it here.</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.unit}</p>
                    <p className="mt-2 text-lg font-bold text-primary">
                      {convertPrice(item.price)} <span className="text-xs font-normal text-muted-foreground">per selection</span>
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded-lg border border-border bg-background">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => decrementItem(item.id)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="min-w-[2rem] text-center font-semibold">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => addItem({ id: item.id, name: item.name, price: item.price, unit: item.unit })}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground">
                          Subtotal: {convertPrice(item.price * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} aria-label="Remove item">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="mb-4 font-display text-xl font-bold text-foreground">Order Summary</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{convertPrice(totalUsd)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                <span>Taxes & fees</span>
                <span>Calculated at confirmation</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-lg font-semibold text-foreground">
                <span>Total</span>
                <span>{convertPrice(totalUsd)}</span>
              </div>
              <Button className="mt-6 w-full" disabled>
                Proceed to Payment (coming soon)
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
