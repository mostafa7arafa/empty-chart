import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.reviewPhoto.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productQuestion.deleteMany();
  await prisma.productSpec.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.bundleItem.deleteMany();
  await prisma.bundle.deleteMany();
  await prisma.flashDeal.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.couponUsage.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.storeSettings.deleteMany();

  // Store Settings
  await prisma.storeSettings.create({
    data: {
      storeName: "Empty Chart Pro",
      storeEmail: "contact@emptychartpro.com",
      storePhone: "+20 123 456 7890",
      currency: "EGP",
      taxRate: 14,
      freeShippingMin: 500,
      standardShipping: 50,
      expressShipping: 100,
    },
  });

  // Announcement
  await prisma.announcement.create({
    data: {
      text: "🎉 Summer Sale! Up to 50% off on selected items. Free shipping on orders over EGP 500!",
      textAr: "🎉 تخفيضات الصيف! خصم يصل إلى 50% على منتجات مختارة. شحن مجاني للطلبات فوق 500 جنيه!",
      isActive: true,
      bgColor: "#0A1628",
      textColor: "#F59E0B",
    },
  });

  // Banners
  await prisma.banner.createMany({
    data: [
      {
        title: "Summer Cooling Deals",
        subtitle: "Up to 40% off on Air Conditioners & Fans",
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&h=500&fit=crop",
        link: "/deals",
        isActive: true,
        sortOrder: 0,
      },
      {
        title: "Smart Home Revolution",
        subtitle: "Transform your home into a connected space",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&h=500&fit=crop",
        link: "/categories/smart-home",
        isActive: true,
        sortOrder: 1,
      },
      {
        title: "Premium Kitchen Collection",
        subtitle: "Upgrade your kitchen with top brands",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=500&fit=crop",
        link: "/categories/kitchen",
        isActive: true,
        sortOrder: 2,
      },
    ],
  });

  // Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: "Air Conditioners", nameAr: "مكيفات الهواء", slug: "air-conditioners", icon: "❄️", image: "https://images.unsplash.com/photo-1631545806609-35d4ae44dfa4?w=400&h=300&fit=crop", productCount: 45, sortOrder: 0 },
    }),
    prisma.category.create({
      data: { name: "Refrigerators", nameAr: "ثلاجات", slug: "refrigerators", icon: "🧊", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop", productCount: 38, sortOrder: 1 },
    }),
    prisma.category.create({
      data: { name: "Washing Machines", nameAr: "غسالات", slug: "washing-machines", icon: "🫧", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=300&fit=crop", productCount: 42, sortOrder: 2 },
    }),
    prisma.category.create({
      data: { name: "TVs & Entertainment", nameAr: "تلفزيونات وترفيه", slug: "tvs-entertainment", icon: "📺", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop", productCount: 67, sortOrder: 3 },
    }),
    prisma.category.create({
      data: { name: "Kitchen Appliances", nameAr: "أجهزة المطبخ", slug: "kitchen-appliances", icon: "🍳", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", productCount: 89, sortOrder: 4 },
    }),
    prisma.category.create({
      data: { name: "Smart Home", nameAr: "المنزل الذكي", slug: "smart-home", icon: "🏠", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop", productCount: 34, sortOrder: 5 },
    }),
    prisma.category.create({
      data: { name: "Small Appliances", nameAr: "أجهزة صغيرة", slug: "small-appliances", icon: "⚡", image: "https://images.unsplash.com/photo-1570222094714-4281f1aa6883?w=400&h=300&fit=crop", productCount: 56, sortOrder: 6 },
    }),
    prisma.category.create({
      data: { name: "Audio Systems", nameAr: "أنظمة الصوت", slug: "audio-systems", icon: "🎵", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop", productCount: 28, sortOrder: 7 },
    }),
  ]);

  // Brands
  const brands = await Promise.all([
    prisma.brand.create({ data: { name: "Samsung", nameAr: "سامسونج", slug: "samsung", logo: "/brands/samsung.svg" } }),
    prisma.brand.create({ data: { name: "LG", nameAr: "إل جي", slug: "lg", logo: "/brands/lg.svg" } }),
    prisma.brand.create({ data: { name: "Sharp", nameAr: "شارب", slug: "sharp", logo: "/brands/sharp.svg" } }),
    prisma.brand.create({ data: { name: "Toshiba", nameAr: "توشيبا", slug: "toshiba", logo: "/brands/toshiba.svg" } }),
    prisma.brand.create({ data: { name: "Fresh", nameAr: "فريش", slug: "fresh", logo: "/brands/fresh.svg" } }),
    prisma.brand.create({ data: { name: "Carrier", nameAr: "كاريير", slug: "carrier", logo: "/brands/carrier.svg" } }),
    prisma.brand.create({ data: { name: "Midea", nameAr: "ميديا", slug: "midea", logo: "/brands/midea.svg" } }),
    prisma.brand.create({ data: { name: "Beko", nameAr: "بيكو", slug: "beko", logo: "/brands/beko.svg" } }),
    prisma.brand.create({ data: { name: "Haier", nameAr: "هاير", slug: "haier", logo: "/brands/haier.svg" } }),
    prisma.brand.create({ data: { name: "Black & Decker", nameAr: "بلاك أند ديكر", slug: "black-decker", logo: "/brands/blackdecker.svg" } }),
  ]);

  const [catAC, catFridge, catWash, catTV, catKitchen, _catSmart, _catSmall, _catAudio] = categories;
  const [samsung, lg, sharp, toshiba, fresh, carrier, midea, beko, haier, blackdecker] = brands;

  // Products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Samsung 65" Crystal UHD 4K Smart TV',
        nameAr: 'تلفزيون سامسونج 65 بوصة كريستال UHD 4K ذكي',
        slug: "samsung-65-crystal-uhd-4k-smart-tv",
        description: "Experience stunning 4K resolution with Crystal UHD technology. This Samsung Smart TV delivers crystal-clear picture quality with PurColor technology, bringing a wider range of colors to your screen. The Crystal Processor 4K optimizes your content to 4K, while the sleek AirSlim design fits beautifully into any room.",
        sku: "SAM-TV-65CU7000",
        price: 32999,
        originalPrice: 39999,
        categoryId: catTV.id,
        brandId: samsung.id,
        stock: 25,
        rating: 4.8,
        reviewCount: 342,
        badge: "Best Seller",
        isFeatured: true,
        warranty: "2 Years",
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop", alt: "Samsung 65 Crystal UHD 4K", sortOrder: 0 },
            { url: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&h=800&fit=crop", alt: "Side view", sortOrder: 1 },
            { url: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=800&fit=crop", alt: "Living room setup", sortOrder: 2 },
          ],
        },
        specs: {
          create: [
            { name: "Screen Size", value: '65"', sortOrder: 0 },
            { name: "Resolution", value: "3840 x 2160 (4K UHD)", sortOrder: 1 },
            { name: "HDR", value: "HDR10+", sortOrder: 2 },
            { name: "Smart TV", value: "Tizen OS", sortOrder: 3 },
            { name: "Refresh Rate", value: "60Hz", sortOrder: 4 },
            { name: "Connectivity", value: "3x HDMI, 1x USB, Wi-Fi, Bluetooth", sortOrder: 5 },
          ],
        },
        variants: {
          create: [
            { name: "Size", value: '55"', price: 24999, stock: 15 },
            { name: "Size", value: '65"', price: 32999, stock: 25 },
            { name: "Size", value: '75"', price: 44999, stock: 8 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "LG 18 Cu. Ft. French Door Refrigerator",
        nameAr: "ثلاجة إل جي 18 قدم بابين فرنسي",
        slug: "lg-18-french-door-refrigerator",
        description: "The LG French Door Refrigerator offers spacious storage with smart organization features. With InstaView Door-in-Door, you can see inside without opening the door. Linear Cooling maintains temperature within ±0.5°C for optimal freshness.",
        sku: "LG-FR-18FD",
        price: 45999,
        originalPrice: 52999,
        categoryId: catFridge.id,
        brandId: lg.id,
        stock: 12,
        rating: 4.7,
        reviewCount: 189,
        badge: "Premium",
        isFeatured: true,
        warranty: "10 Years Compressor",
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&h=800&fit=crop", alt: "LG French Door Refrigerator", sortOrder: 0 },
          ],
        },
        specs: {
          create: [
            { name: "Capacity", value: "18 Cu. Ft.", sortOrder: 0 },
            { name: "Type", value: "French Door", sortOrder: 1 },
            { name: "Energy Rating", value: "A++", sortOrder: 2 },
            { name: "Inverter", value: "Yes - Linear Inverter", sortOrder: 3 },
            { name: "Color", value: "Stainless Steel", sortOrder: 4 },
          ],
        },
        variants: {
          create: [
            { name: "Color", value: "Stainless Steel", price: 45999, stock: 12 },
            { name: "Color", value: "Matte Black", price: 47999, stock: 6 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Carrier 2.25 HP Split Air Conditioner",
        nameAr: "مكيف كاريير 2.25 حصان سبليت",
        slug: "carrier-2-25-hp-split-ac",
        description: "Stay cool with the Carrier Split Air Conditioner featuring optimized cooling technology and energy-efficient operation. Perfect for medium to large rooms with whisper-quiet performance.",
        sku: "CAR-AC-225SP",
        price: 24999,
        originalPrice: 28999,
        categoryId: catAC.id,
        brandId: carrier.id,
        stock: 40,
        rating: 4.6,
        reviewCount: 521,
        badge: "Top Rated",
        isFeatured: true,
        warranty: "5 Years",
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1631545806609-35d4ae44dfa4?w=800&h=800&fit=crop", alt: "Carrier Split AC", sortOrder: 0 },
          ],
        },
        specs: {
          create: [
            { name: "Capacity", value: "2.25 HP", sortOrder: 0 },
            { name: "Type", value: "Split", sortOrder: 1 },
            { name: "Cooling", value: "18,000 BTU", sortOrder: 2 },
            { name: "Energy Rating", value: "A", sortOrder: 3 },
            { name: "Inverter", value: "Yes", sortOrder: 4 },
          ],
        },
        variants: {
          create: [
            { name: "Capacity", value: "1.5 HP", price: 18999, stock: 30 },
            { name: "Capacity", value: "2.25 HP", price: 24999, stock: 40 },
            { name: "Capacity", value: "3 HP", price: 32999, stock: 15 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Samsung 9 Kg Front Load Washing Machine",
        nameAr: "غسالة سامسونج 9 كجم تحميل أمامي",
        slug: "samsung-9kg-front-load-washer",
        description: "Advanced washing technology with AI-powered SmartThings app control. EcoBubble technology dissolves detergent before the wash cycle begins, creating bubbles that penetrate fabric faster than dissolved detergent.",
        sku: "SAM-WM-9FL",
        price: 18999,
        originalPrice: 22999,
        categoryId: catWash.id,
        brandId: samsung.id,
        stock: 22,
        rating: 4.5,
        reviewCount: 276,
        badge: "New",
        isFeatured: true,
        warranty: "2 Years + 10 Years Motor",
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&h=800&fit=crop", alt: "Samsung Front Load Washer", sortOrder: 0 },
          ],
        },
        specs: {
          create: [
            { name: "Capacity", value: "9 Kg", sortOrder: 0 },
            { name: "Type", value: "Front Load", sortOrder: 1 },
            { name: "Spin Speed", value: "1400 RPM", sortOrder: 2 },
            { name: "Programs", value: "23 Wash Programs", sortOrder: 3 },
            { name: "Technology", value: "EcoBubble, AI Control", sortOrder: 4 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Black & Decker Digital Air Fryer 7L",
        nameAr: "قلاية هوائية بلاك أند ديكر 7 لتر",
        slug: "black-decker-digital-air-fryer-7l",
        description: "Cook healthier meals with 90% less oil. The 7L capacity is perfect for families. Features 8 preset cooking modes, touch screen controls, and rapid air circulation technology.",
        sku: "BD-AF-7DIG",
        price: 4999,
        originalPrice: 6499,
        categoryId: catKitchen.id,
        brandId: blackdecker.id,
        stock: 85,
        rating: 4.7,
        reviewCount: 834,
        badge: "Best Seller",
        isFeatured: true,
        warranty: "2 Years",
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1626509653291-18d9a934b9db?w=800&h=800&fit=crop", alt: "Black & Decker Air Fryer", sortOrder: 0 },
          ],
        },
        specs: {
          create: [
            { name: "Capacity", value: "7 Liters", sortOrder: 0 },
            { name: "Power", value: "1700W", sortOrder: 1 },
            { name: "Temperature Range", value: "80-200°C", sortOrder: 2 },
            { name: "Timer", value: "60 Minutes", sortOrder: 3 },
            { name: "Display", value: "Digital Touch Screen", sortOrder: 4 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Midea Portable Air Conditioner 1.5 HP",
        nameAr: "مكيف ميديا محمول 1.5 حصان",
        slug: "midea-portable-ac-1-5hp",
        description: "Portable cooling solution that requires no installation. Perfect for apartments and offices. Features self-evaporating technology, auto-swing louvers, and 24-hour timer.",
        sku: "MID-AC-15P",
        price: 15999,
        originalPrice: 18999,
        categoryId: catAC.id,
        brandId: midea.id,
        stock: 18,
        rating: 4.4,
        reviewCount: 167,
        isFeatured: false,
        warranty: "2 Years",
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=800&fit=crop", alt: "Midea Portable AC", sortOrder: 0 },
          ],
        },
        specs: {
          create: [
            { name: "Capacity", value: "1.5 HP", sortOrder: 0 },
            { name: "Type", value: "Portable", sortOrder: 1 },
            { name: "BTU", value: "12,000", sortOrder: 2 },
            { name: "Energy Rating", value: "A", sortOrder: 3 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Sharp 50" 4K Android Smart TV',
        nameAr: 'تلفزيون شارب 50 بوصة 4K أندرويد ذكي',
        slug: "sharp-50-4k-android-smart-tv",
        description: "Enjoy your favorite content in stunning 4K Ultra HD with Android TV built-in. Access thousands of apps, cast from your phone, and control with Google Assistant voice commands.",
        sku: "SHP-TV-504K",
        price: 19999,
        originalPrice: 24999,
        categoryId: catTV.id,
        brandId: sharp.id,
        stock: 30,
        rating: 4.3,
        reviewCount: 98,
        badge: "Deal",
        isFeatured: true,
        warranty: "2 Years",
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&h=800&fit=crop", alt: "Sharp 50 4K Android TV", sortOrder: 0 },
          ],
        },
        specs: {
          create: [
            { name: "Screen Size", value: '50"', sortOrder: 0 },
            { name: "Resolution", value: "3840 x 2160 (4K UHD)", sortOrder: 1 },
            { name: "Smart TV", value: "Android TV", sortOrder: 2 },
            { name: "Speakers", value: "20W (2x 10W)", sortOrder: 3 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Beko 10 Kg Top Load Washing Machine",
        nameAr: "غسالة بيكو 10 كجم تحميل علوي",
        slug: "beko-10kg-top-load-washer",
        description: "Designed for large families, this Beko washer offers generous capacity with gentle cleaning. ProSmart Inverter Motor ensures quiet operation and long-lasting durability.",
        sku: "BEK-WM-10TL",
        price: 12999,
        originalPrice: 15999,
        categoryId: catWash.id,
        brandId: beko.id,
        stock: 35,
        rating: 4.4,
        reviewCount: 203,
        isFeatured: false,
        warranty: "2 Years + 10 Years Motor",
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&h=800&fit=crop", alt: "Beko Top Load Washer", sortOrder: 0 },
          ],
        },
        specs: {
          create: [
            { name: "Capacity", value: "10 Kg", sortOrder: 0 },
            { name: "Type", value: "Top Load", sortOrder: 1 },
            { name: "Spin Speed", value: "1000 RPM", sortOrder: 2 },
            { name: "Programs", value: "15 Wash Programs", sortOrder: 3 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Toshiba 16 Cu. Ft. No-Frost Refrigerator",
        nameAr: "ثلاجة توشيبا 16 قدم نوفروست",
        slug: "toshiba-16-nofrost-refrigerator",
        description: "Spacious storage with No-Frost technology ensures even cooling throughout. Inverter compressor provides quiet and energy-efficient operation.",
        sku: "TOS-FR-16NF",
        price: 28999,
        originalPrice: 34999,
        categoryId: catFridge.id,
        brandId: toshiba.id,
        stock: 20,
        rating: 4.5,
        reviewCount: 156,
        badge: "Sale",
        isFeatured: true,
        warranty: "10 Years Compressor",
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&h=800&fit=crop", alt: "Toshiba Refrigerator", sortOrder: 0 },
          ],
        },
        specs: {
          create: [
            { name: "Capacity", value: "16 Cu. Ft.", sortOrder: 0 },
            { name: "Type", value: "Top Freezer", sortOrder: 1 },
            { name: "No-Frost", value: "Yes", sortOrder: 2 },
            { name: "Energy Rating", value: "A+", sortOrder: 3 },
            { name: "Inverter", value: "Yes", sortOrder: 4 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Fresh 1.5 HP Smart Inverter AC",
        nameAr: "مكيف فريش 1.5 حصان سمارت انفرتر",
        slug: "fresh-1-5hp-smart-inverter-ac",
        description: "Fresh Smart Inverter AC with WiFi connectivity. Control your AC from anywhere with the mobile app. Turbo cooling mode reaches desired temperature 30% faster.",
        sku: "FRE-AC-15SI",
        price: 19999,
        originalPrice: 23999,
        categoryId: catAC.id,
        brandId: fresh.id,
        stock: 50,
        rating: 4.3,
        reviewCount: 289,
        badge: "Popular",
        isFeatured: false,
        warranty: "5 Years",
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1631545806609-35d4ae44dfa4?w=800&h=800&fit=crop", alt: "Fresh Smart Inverter AC", sortOrder: 0 },
          ],
        },
        specs: {
          create: [
            { name: "Capacity", value: "1.5 HP", sortOrder: 0 },
            { name: "Type", value: "Split - Wall Mounted", sortOrder: 1 },
            { name: "Inverter", value: "Yes - Smart Inverter", sortOrder: 2 },
            { name: "WiFi", value: "Yes", sortOrder: 3 },
            { name: "Energy Rating", value: "A++", sortOrder: 4 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Haier 8 Kg Front Load Washer Dryer Combo",
        nameAr: "غسالة ومجفف هاير 8 كجم أمامي",
        slug: "haier-8kg-washer-dryer-combo",
        description: "All-in-one washing and drying solution. Smart dual spray technology ensures complete detergent removal. Anti-Bacterial Treatment keeps your clothes fresh and hygienic.",
        sku: "HAI-WD-8FC",
        price: 22999,
        originalPrice: 27999,
        categoryId: catWash.id,
        brandId: haier.id,
        stock: 14,
        rating: 4.6,
        reviewCount: 134,
        badge: "New",
        isFeatured: true,
        warranty: "3 Years",
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&h=800&fit=crop", alt: "Haier Washer Dryer", sortOrder: 0 },
          ],
        },
        specs: {
          create: [
            { name: "Wash Capacity", value: "8 Kg", sortOrder: 0 },
            { name: "Dry Capacity", value: "5 Kg", sortOrder: 1 },
            { name: "Spin Speed", value: "1400 RPM", sortOrder: 2 },
            { name: "Programs", value: "16 Programs", sortOrder: 3 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Samsung 75" QLED 4K Smart TV',
        nameAr: 'تلفزيون سامسونج 75 بوصة QLED 4K ذكي',
        slug: "samsung-75-qled-4k-smart-tv",
        description: "Quantum Dot technology delivers 100% Color Volume for breathtaking picture quality. Object Tracking Sound creates dynamic 3D audio that follows the action on screen.",
        sku: "SAM-TV-75QL",
        price: 64999,
        originalPrice: 79999,
        categoryId: catTV.id,
        brandId: samsung.id,
        stock: 5,
        rating: 4.9,
        reviewCount: 87,
        badge: "Premium",
        isFeatured: true,
        warranty: "2 Years",
        images: {
          create: [
            { url: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=800&fit=crop", alt: "Samsung 75 QLED", sortOrder: 0 },
          ],
        },
        specs: {
          create: [
            { name: "Screen Size", value: '75"', sortOrder: 0 },
            { name: "Resolution", value: "3840 x 2160 (4K UHD)", sortOrder: 1 },
            { name: "Panel", value: "QLED", sortOrder: 2 },
            { name: "HDR", value: "Quantum HDR", sortOrder: 3 },
            { name: "Refresh Rate", value: "120Hz", sortOrder: 4 },
          ],
        },
      },
    }),
  ]);

  // Bundles
  await prisma.bundle.create({
    data: {
      name: "Complete Home Starter Package",
      nameAr: "باقة تأسيس المنزل الكاملة",
      slug: "complete-home-starter",
      description: "Everything you need to set up your new home. Includes a refrigerator, washing machine, air conditioner, and smart TV at an unbeatable bundle price.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop",
      price: 89999,
      originalPrice: 119996,
      isActive: true,
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      items: {
        create: [
          { productId: products[1].id, quantity: 1 },
          { productId: products[3].id, quantity: 1 },
          { productId: products[2].id, quantity: 1 },
          { productId: products[0].id, quantity: 1 },
        ],
      },
    },
  });

  await prisma.bundle.create({
    data: {
      name: "Kitchen Upgrade Bundle",
      nameAr: "باقة تطوير المطبخ",
      slug: "kitchen-upgrade-bundle",
      description: "Upgrade your kitchen with premium appliances. Perfect for cooking enthusiasts who want the best tools.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop",
      price: 15999,
      originalPrice: 21498,
      isActive: true,
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      items: {
        create: [
          { productId: products[4].id, quantity: 1 },
          { productId: products[7].id, quantity: 1 },
        ],
      },
    },
  });

  // Flash Deals
  const now = new Date();
  await prisma.flashDeal.createMany({
    data: [
      {
        productId: products[0].id,
        dealPrice: 27999,
        startDate: now,
        endDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
        stock: 10,
        sold: 3,
        isActive: true,
      },
      {
        productId: products[4].id,
        dealPrice: 3999,
        startDate: now,
        endDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
        stock: 20,
        sold: 12,
        isActive: true,
      },
      {
        productId: products[6].id,
        dealPrice: 16999,
        startDate: now,
        endDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
        stock: 15,
        sold: 5,
        isActive: true,
      },
    ],
  });

  // Coupons
  await prisma.coupon.createMany({
    data: [
      { code: "WELCOME10", type: "percentage", value: 10, minOrder: 1000, maxDiscount: 500, usageLimit: 1000, isActive: true, endDate: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000) },
      { code: "SUMMER25", type: "percentage", value: 25, minOrder: 5000, maxDiscount: 2000, usageLimit: 500, isActive: true, endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) },
      { code: "FREESHIP", type: "free_shipping", value: 0, minOrder: 200, usageLimit: 1000, isActive: true, endDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000) },
      { code: "FLAT500", type: "fixed", value: 500, minOrder: 3000, usageLimit: 200, isActive: true, endDate: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000) },
    ],
  });

  // Demo User
  await prisma.user.create({
    data: {
      email: "demo@emptychartpro.com",
      name: "Ahmed Hassan",
      password: "$2b$10$placeholder_hash_for_demo_user_password",
      role: "USER",
      emailVerified: true,
      loyaltyPoints: 1250,
    },
  });

  // Admin User
  await prisma.user.create({
    data: {
      email: "admin@emptychartpro.com",
      name: "Admin",
      password: "$2b$10$placeholder_hash_for_admin_password",
      role: "ADMIN",
      emailVerified: true,
    },
  });

  // Reviews
  const demoUser = await prisma.user.findUnique({ where: { email: "demo@emptychartpro.com" } });
  if (demoUser) {
    await prisma.review.createMany({
      data: [
        { productId: products[0].id, userId: demoUser.id, rating: 5, title: "Amazing Picture Quality!", comment: "Absolutely stunning picture quality! The delivery was incredibly fast and the installation team was professional. Best purchase I've made this year.", isVerified: true, helpful: 24 },
        { productId: products[1].id, userId: demoUser.id, rating: 5, title: "Spacious and Efficient", comment: "The refrigerator is spacious and energy-efficient. The installment plan made it affordable. Highly recommend!", isVerified: true, helpful: 18 },
        { productId: products[2].id, userId: demoUser.id, rating: 4, title: "Great Cooling Performance", comment: "Great cooling performance and very quiet operation. The warranty service gives peace of mind. Installed in just 2 days.", isVerified: true, helpful: 15 },
        { productId: products[4].id, userId: demoUser.id, rating: 5, title: "Changed My Cooking", comment: "This air fryer changed my cooking routine completely! Perfect for healthy meals and so easy to clean. Amazing value for the price.", isVerified: true, helpful: 42 },
      ],
    });
  }

  console.log("✓ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
