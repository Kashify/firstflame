import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./catalog";
import { applyCoupon } from "./coupons";

export interface CartLine {
  slug: string;
  weight: string;
  qty: number;
}

export interface CartLineView extends CartLine {
  product: Product;
  lineTotal: number;
}

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface OrderRecord {
  id: string;
  placedAt: string;
  lines: { name: string; weight: string; qty: number; price: number }[];
  total: number;
  status: "Confirmed" | "Packed" | "Shipped" | "Delivered";
  paymentId?: string;
  address?: Address;
}

interface StoreState {
  cart: CartLine[];
  wishlist: string[];
  addresses: Address[];
  orders: OrderRecord[];
  recentSearches: string[];
  recentlyViewed: string[];
  couponCode: string | null;
}

const EMPTY: StoreState = {
  cart: [],
  wishlist: [],
  addresses: [],
  orders: [],
  recentSearches: [],
  recentlyViewed: [],
  couponCode: null,
};

const KEY = "ffs.store.v1";

interface StoreContextValue {
  hydrated: boolean;
  cart: CartLine[];
  cartLines: CartLineView[];
  cartCount: number;
  subtotal: number;
  wishlist: string[];
  addresses: Address[];
  orders: OrderRecord[];
  recentSearches: string[];
  recentlyViewed: Product[];
  couponCode: string | null;
  discount: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setCoupon: (code: string | null) => void;
  viewProduct: (slug: string) => void;
  moveToWishlist: (slug: string, weight: string) => void;
  addToCart: (slug: string, weight: string, qty?: number) => void;
  setQty: (slug: string, weight: string, qty: number) => void;
  removeLine: (slug: string, weight: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  saveAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  addOrder: (order: OrderRecord) => void;
  rememberSearch: (term: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const weightMultiplier = (product: Product, weight: string): number => {
  const index = product.weights.indexOf(weight);
  return index <= 0 ? 1 : index === 1 ? 1.85 : 3.4;
};

export function lineUnitPrice(product: Product, weight: string): number {
  return Math.round((product.price * weightMultiplier(product, weight)) / 5) * 5;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setState({ ...EMPTY, ...(JSON.parse(raw) as StoreState) });
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable */
    }
  }, [state, hydrated]);

  const setCoupon = useCallback((code: string | null) => {
    setState((prev) => ({ ...prev, couponCode: code }));
  }, []);

  const viewProduct = useCallback((slug: string) => {
    setState((prev) =>
      prev.recentlyViewed[0] === slug
        ? prev
        : {
            ...prev,
            recentlyViewed: [slug, ...prev.recentlyViewed.filter((s) => s !== slug)].slice(0, 8),
          },
    );
  }, []);

  const addToCart = useCallback((slug: string, weight: string, qty = 1) => {
    setCartOpen(true);
    setState((prev) => {
      const existing = prev.cart.find((l) => l.slug === slug && l.weight === weight);
      const cart = existing
        ? prev.cart.map((l) =>
            l.slug === slug && l.weight === weight ? { ...l, qty: Math.min(20, l.qty + qty) } : l,
          )
        : [...prev.cart, { slug, weight, qty }];
      return { ...prev, cart };
    });
  }, []);

  const setQty = useCallback((slug: string, weight: string, qty: number) => {
    setState((prev) => ({
      ...prev,
      cart:
        qty <= 0
          ? prev.cart.filter((l) => !(l.slug === slug && l.weight === weight))
          : prev.cart.map((l) =>
              l.slug === slug && l.weight === weight ? { ...l, qty: Math.min(20, qty) } : l,
            ),
    }));
  }, []);

  const removeLine = useCallback((slug: string, weight: string) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((l) => !(l.slug === slug && l.weight === weight)),
    }));
  }, []);

  const clearCart = useCallback(() => setState((prev) => ({ ...prev, cart: [] })), []);

  const toggleWishlist = useCallback((slug: string) => {
    setState((prev) => ({
      ...prev,
      wishlist: prev.wishlist.includes(slug)
        ? prev.wishlist.filter((s) => s !== slug)
        : [slug, ...prev.wishlist],
    }));
  }, []);

  const moveToWishlist = useCallback((slug: string, weight: string) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((l) => !(l.slug === slug && l.weight === weight)),
      wishlist: prev.wishlist.includes(slug) ? prev.wishlist : [slug, ...prev.wishlist],
    }));
  }, []);

  const saveAddress = useCallback((address: Address) => {
    setState((prev) => {
      const exists = prev.addresses.some((a) => a.id === address.id);
      const addresses = exists
        ? prev.addresses.map((a) => (a.id === address.id ? address : a))
        : [...prev.addresses, address];
      return {
        ...prev,
        addresses: addresses.map((a) => ({ ...a, isDefault: a.id === address.id })),
      };
    });
  }, []);

  const removeAddress = useCallback((id: string) => {
    setState((prev) => ({ ...prev, addresses: prev.addresses.filter((a) => a.id !== id) }));
  }, []);

  const addOrder = useCallback((order: OrderRecord) => {
    setState((prev) => ({ ...prev, orders: [order, ...prev.orders] }));
  }, []);

  const rememberSearch = useCallback((term: string) => {
    const t = term.trim();
    if (!t) return;
    setState((prev) => ({
      ...prev,
      recentSearches: [t, ...prev.recentSearches.filter((s) => s !== t)].slice(0, 6),
    }));
  }, []);

  const cartLines = useMemo<CartLineView[]>(() => {
    return state.cart.flatMap((line) => {
      const product = products.find((p) => p.slug === line.slug);
      if (!product) return [];
      return [{ ...line, product, lineTotal: lineUnitPrice(product, line.weight) * line.qty }];
    });
  }, [state.cart]);

  const subtotal = useMemo(
    () => cartLines.reduce((sum, l) => sum + l.lineTotal, 0),
    [cartLines],
  );

  const couponResult = useMemo(
    () => (state.couponCode ? applyCoupon(state.couponCode, subtotal) : null),
    [state.couponCode, subtotal],
  );
  const discount = couponResult?.ok ? couponResult.discount : 0;

  // A coupon that no longer qualifies (items removed) must not silently linger.
  useEffect(() => {
    if (state.couponCode && couponResult && !couponResult.ok) {
      setState((prev) => ({ ...prev, couponCode: null }));
    }
  }, [state.couponCode, couponResult]);

  const recentlyViewed = useMemo(
    () => state.recentlyViewed.flatMap((slug) => products.filter((p) => p.slug === slug)),
    [state.recentlyViewed],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      hydrated,
      cart: state.cart,
      cartLines,
      cartCount: state.cart.reduce((sum, l) => sum + l.qty, 0),
      subtotal,
      recentlyViewed,
      couponCode: state.couponCode,
      discount,
      cartOpen,
      setCartOpen,
      setCoupon,
      viewProduct,
      moveToWishlist,
      wishlist: state.wishlist,
      addresses: state.addresses,
      orders: state.orders,
      recentSearches: state.recentSearches,
      addToCart,
      setQty,
      removeLine,
      clearCart,
      toggleWishlist,
      isWishlisted: (slug: string) => state.wishlist.includes(slug),
      saveAddress,
      removeAddress,
      addOrder,
      rememberSearch,
    }),
    [
      hydrated,
      state,
      cartLines,
      subtotal,
      recentlyViewed,
      discount,
      cartOpen,
      setCoupon,
      viewProduct,
      moveToWishlist,
      addToCart,
      setQty,
      removeLine,
      clearCart,
      toggleWishlist,
      saveAddress,
      removeAddress,
      addOrder,
      rememberSearch,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
