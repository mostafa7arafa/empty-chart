export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  installment?: number;
  specs?: Record<string, string>;
  description?: string;
  images?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  productCount: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  product: string;
  text: string;
  date: string;
}

export const categories: Category[] = [
  { id: "ac", name: "Air Conditioners", icon: "❄️", image: "https://images.unsplash.com/photo-1631545806609-35d4ae44dfa4?w=400&h=300&fit=crop", productCount: 156 },
  { id: "refrigerators", name: "Refrigerators", icon: "🧊", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop", productCount: 89 },
  { id: "washing", name: "Washing Machines", icon: "🫧", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=300&fit=crop", productCount: 124 },
  { id: "tvs", name: "TVs & Entertainment", icon: "📺", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop", productCount: 203 },
  { id: "kitchen", name: "Kitchen Appliances", icon: "🍳", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", productCount: 178 },
  { id: "smart-home", name: "Smart Home Devices", icon: "🏠", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop", productCount: 92 },
  { id: "small-appliances", name: "Small Appliances", icon: "⚡", image: "https://images.unsplash.com/photo-1570222094714-4281f1aa6883?w=400&h=300&fit=crop", productCount: 267 },
  { id: "audio", name: "Audio Systems", icon: "🎵", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop", productCount: 145 },
];

export const brands: Brand[] = [
  { id: "samsung", name: "Samsung", logo: "/brands/samsung.svg" },
  { id: "lg", name: "LG", logo: "/brands/lg.svg" },
  { id: "sharp", name: "Sharp", logo: "/brands/sharp.svg" },
  { id: "toshiba", name: "Toshiba", logo: "/brands/toshiba.svg" },
  { id: "fresh", name: "Fresh", logo: "/brands/fresh.svg" },
  { id: "carrier", name: "Carrier", logo: "/brands/carrier.svg" },
  { id: "midea", name: "Midea", logo: "/brands/midea.svg" },
  { id: "beko", name: "Beko", logo: "/brands/beko.svg" },
  { id: "haier", name: "Haier", logo: "/brands/haier.svg" },
  { id: "blackdecker", name: "Black & Decker", logo: "/brands/blackdecker.svg" },
];

export const bestSellers: Product[] = [
  {
    id: "1",
    name: "Samsung 65\" Crystal UHD 4K Smart TV",
    brand: "Samsung",
    category: "TVs & Entertainment",
    price: 32999,
    originalPrice: 39999,
    rating: 4.8,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    badge: "Best Seller",
    installment: 12,
  },
  {
    id: "2",
    name: "LG 18 Cu. Ft. French Door Refrigerator",
    brand: "LG",
    category: "Refrigerators",
    price: 45999,
    originalPrice: 52999,
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
    badge: "Premium",
    installment: 12,
  },
  {
    id: "3",
    name: "Carrier 2.25 HP Split Air Conditioner",
    brand: "Carrier",
    category: "Air Conditioners",
    price: 24999,
    originalPrice: 28999,
    rating: 4.6,
    reviews: 521,
    image: "https://images.unsplash.com/photo-1631545806609-35d4ae44dfa4?w=400&h=400&fit=crop",
    badge: "Top Rated",
    installment: 12,
  },
  {
    id: "4",
    name: "Samsung 9 Kg Front Load Washing Machine",
    brand: "Samsung",
    category: "Washing Machines",
    price: 18999,
    originalPrice: 22999,
    rating: 4.5,
    reviews: 276,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop",
    badge: "New",
    installment: 12,
  },
  {
    id: "5",
    name: "Midea Portable Air Conditioner 1.5 HP",
    brand: "Midea",
    category: "Air Conditioners",
    price: 15999,
    originalPrice: 18999,
    rating: 4.4,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    installment: 12,
  },
  {
    id: "6",
    name: "Sharp 50\" 4K Android Smart TV",
    brand: "Sharp",
    category: "TVs & Entertainment",
    price: 19999,
    originalPrice: 24999,
    rating: 4.3,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&h=400&fit=crop",
    badge: "Deal",
    installment: 12,
  },
  {
    id: "7",
    name: "Black & Decker Digital Air Fryer 7L",
    brand: "Black & Decker",
    category: "Kitchen Appliances",
    price: 4999,
    originalPrice: 6499,
    rating: 4.7,
    reviews: 834,
    image: "https://images.unsplash.com/photo-1626509653291-18d9a934b9db?w=400&h=400&fit=crop",
    badge: "Best Seller",
    installment: 6,
  },
  {
    id: "8",
    name: "Beko 10 Kg Top Load Washing Machine",
    brand: "Beko",
    category: "Washing Machines",
    price: 12999,
    originalPrice: 15999,
    rating: 4.4,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=400&h=400&fit=crop",
    installment: 12,
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    name: "Ahmed M.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    product: "Samsung 65\" Crystal UHD 4K Smart TV",
    text: "Absolutely stunning picture quality! The delivery was incredibly fast and the installation team was professional. Best purchase I've made this year.",
    date: "2 weeks ago",
  },
  {
    id: "2",
    name: "Sara K.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    product: "LG French Door Refrigerator",
    text: "The refrigerator is spacious and energy-efficient. EmptyChart's installment plan made it affordable. Highly recommend their service!",
    date: "1 month ago",
  },
  {
    id: "3",
    name: "Mohamed R.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    product: "Carrier Split Air Conditioner",
    text: "Great cooling performance and very quiet operation. The warranty service gives peace of mind. Installed in just 2 days after ordering.",
    date: "3 weeks ago",
  },
  {
    id: "4",
    name: "Nour A.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    product: "Black & Decker Air Fryer",
    text: "This air fryer changed my cooking routine completely! Perfect for healthy meals and so easy to clean. Amazing value for the price.",
    date: "1 week ago",
  },
];

export const promotions = [
  {
    id: "summer",
    title: "Summer Cooling Deals",
    subtitle: "Up to 40% off on Air Conditioners",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=400&fit=crop",
    cta: "Shop Now",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: "smart-home",
    title: "Smart Home Collection",
    subtitle: "Transform your home into a connected space",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=400&fit=crop",
    cta: "Explore",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    id: "wedding",
    title: "Wedding Starter Packages",
    subtitle: "Complete home bundles starting from EGP 89,999",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop",
    cta: "View Packages",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: "kitchen",
    title: "Kitchen Essentials Sale",
    subtitle: "Upgrade your kitchen with top brands",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop",
    cta: "Shop Kitchen",
    gradient: "from-emerald-500 to-teal-600",
  },
];

export const lifestyleArticles = [
  {
    id: "1",
    title: "Choosing the Perfect Air Conditioner for Your Home",
    excerpt: "A comprehensive guide to selecting the right cooling solution based on room size, efficiency ratings, and budget.",
    image: "https://images.unsplash.com/photo-1631545806609-35d4ae44dfa4?w=600&h=400&fit=crop",
    readTime: "5 min read",
    category: "Buying Guide",
  },
  {
    id: "2",
    title: "Best Appliances for New Homes in 2025",
    excerpt: "Essential appliances every new homeowner needs, from refrigerators to smart devices.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    readTime: "7 min read",
    category: "Lifestyle",
  },
  {
    id: "3",
    title: "Energy Saving Tips: Reduce Your Electric Bill",
    excerpt: "Smart strategies and appliance choices that can significantly lower your monthly energy costs.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    readTime: "4 min read",
    category: "Tips & Tricks",
  },
  {
    id: "4",
    title: "Smart Home Trends Shaping Egyptian Homes",
    excerpt: "How connected devices are transforming daily life in modern Egyptian households.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop",
    readTime: "6 min read",
    category: "Trends",
  },
];

export const productDetails: Product = {
  id: "1",
  name: "Samsung 65\" Crystal UHD 4K Smart TV - CU7000 Series",
  brand: "Samsung",
  category: "TVs & Entertainment",
  price: 32999,
  originalPrice: 39999,
  rating: 4.8,
  reviews: 342,
  image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop",
  badge: "Best Seller",
  installment: 12,
  description: "Experience crystal-clear 4K resolution with Samsung's Crystal Processor 4K. This 65-inch smart TV delivers vibrant colors and sharp details with HDR support. Enjoy seamless streaming with built-in apps including Netflix, YouTube, and Shahid.",
  images: [
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=800&h=800&fit=crop",
  ],
  specs: {
    "Screen Size": "65 inches",
    "Resolution": "3840 x 2160 (4K UHD)",
    "Panel Type": "Crystal UHD",
    "HDR": "HDR10+",
    "Refresh Rate": "60Hz",
    "Smart TV": "Tizen OS",
    "Connectivity": "Wi-Fi, Bluetooth 5.2, HDMI x3, USB x1",
    "Sound": "20W, Dolby Digital Plus",
    "Dimensions": "145.0 x 83.1 x 2.6 cm",
    "Weight": "17.3 kg",
    "Warranty": "2 Years Official Samsung Warranty",
    "Energy Rating": "A+",
  },
};
