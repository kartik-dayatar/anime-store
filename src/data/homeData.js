export const heroSlides = [
    {
        bg: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#2563eb 100%)',
        badge: 'New Season Drop',
        title: 'Where Every Otaku Belongs',
        subtitle: 'Premium figures, apparel & collectibles from 300+ anime series. Officially licensed, globally shipped.',
        primaryBtn: { text: 'Shop Now', link: '/products' },
        secondaryBtn: { text: 'New Arrivals', link: '/products?type=new' },
        visuals: [
            { bg: 'linear-gradient(135deg,#ef4444,#f97316)', text: 'Demon Slayer', class: 'float-1' },
            { bg: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', text: 'Jujutsu Kaisen', class: 'float-2' },
            { bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', text: 'One Piece', class: 'float-3' }
        ]
    },
    {
        bg: 'linear-gradient(135deg,#1a0a2e 0%,#3b1d6e 50%,#7c3aed 100%)',
        badge: 'Limited Edition',
        title: 'Exclusive Figure Collection',
        subtitle: 'Hand-painted, limited-run figures from top studios. Each piece is a masterpiece for your collection.',
        primaryBtn: { text: 'View Figures', link: '/products?category=figures' },
        secondaryBtn: { text: 'Collectibles', link: '/products?category=collectibles' },
        visuals: [
            { bg: 'linear-gradient(135deg,#06b6d4,#3b82f6)', text: 'Attack on Titan', class: 'float-1' },
            { bg: 'linear-gradient(135deg,#ec4899,#8b5cf6)', text: 'Spy x Family', class: 'float-2' },
            { bg: 'linear-gradient(135deg,#10b981,#06b6d4)', text: 'My Hero Academia', class: 'float-3' }
        ]
    },
    {
        bg: 'linear-gradient(135deg,#0c1220 0%,#1e293b 50%,#334155 100%)',
        badge: 'Summer Sale 🔥',
        title: 'Up to 40% Off Everything',
        subtitle: 'Biggest anime merch sale of the year. Grab your favorites before they\'re gone!',
        primaryBtn: { text: 'Shop Sale', link: '/products' },
        secondaryBtn: { text: 'Gift Cards', link: '/giftcards' },
        visuals: [
            { bg: 'linear-gradient(135deg,#f97316,#eab308)', text: 'Naruto', class: 'float-1' },
            { bg: 'linear-gradient(135deg,#ef4444,#ec4899)', text: 'Dragon Ball Z', class: 'float-2' },
            { bg: 'linear-gradient(135deg,#14b8a6,#22c55e)', text: 'Chainsaw Man', class: 'float-3' }
        ]
    }
];

export const statsData = [
    { icon: '📦', strong: '3,000+', text: 'Products' },
    { icon: '🎬', strong: '300+', text: 'Anime Series' },
    { icon: '🙂', strong: '10k+', text: 'Happy Customers' },
    { icon: '🔒', strong: '100%', text: 'Secure Checkout' },
    { icon: '✅', strong: 'Authentic', text: 'Licensed Merch' }
];

export const animeList = [
    { name: 'Demon Slayer', count: '240+ items', bg: 'linear-gradient(135deg,#ef4444,#b91c1c)', link: 'demon-slayer' },
    { name: 'Jujutsu Kaisen', count: '180+ items', bg: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', link: 'jujutsu-kaisen' },
    { name: 'One Piece', count: '320+ items', bg: 'linear-gradient(135deg,#f97316,#dc2626)', link: 'one-piece' },
    { name: 'Naruto', count: '280+ items', bg: 'linear-gradient(135deg,#f59e0b,#ea580c)', link: 'naruto' },
    { name: 'Attack on Titan', count: '150+ items', bg: 'linear-gradient(135deg,#475569,#1e293b)', link: 'attack-on-titan' },
    { name: 'Spy x Family', count: '120+ items', bg: 'linear-gradient(135deg,#ec4899,#be185d)', link: 'spy-x-family' },
    { name: 'Dragon Ball Z', count: '260+ items', bg: 'linear-gradient(135deg,#eab308,#f97316)', link: 'dragon-ball' },
    { name: 'My Hero Academia', count: '200+ items', bg: 'linear-gradient(135deg,#22c55e,#15803d)', link: 'my-hero-academia' },
    { name: 'Chainsaw Man', count: '90+ items', bg: 'linear-gradient(135deg,#dc2626,#7f1d1d)', link: 'chainsaw-man' }
];

export const trendingProducts = [
    { id: 1, name: 'Demon Slayer Haori', anime: 'Demon Slayer', price: '₹3,735', rating: '4.9', bg: 'linear-gradient(135deg,#fecaca,#fca5a5)', badge: 'Trending' },
    { id: 2, name: 'Gojo Satoru Figure', anime: 'Jujutsu Kaisen', price: '₹7,387', rating: '4.8', bg: 'linear-gradient(135deg,#ddd6fe,#c4b5fd)', badge: 'Trending' },
    { id: 3, name: 'Luffy Straw Hat', anime: 'One Piece', price: '₹2,407', rating: '4.9', bg: 'linear-gradient(135deg,#fed7aa,#fdba74)', badge: 'Hot' },
    { id: 4, name: 'Naruto Headband', anime: 'Naruto Shippuden', price: '₹1,577', rating: '4.7', bg: 'linear-gradient(135deg,#bfdbfe,#93c5fd)', badge: 'New' },
    { id: 5, name: 'Deku Hero Jacket', anime: 'My Hero Academia', price: '₹5,395', rating: '4.6', bg: 'linear-gradient(135deg,#bbf7d0,#86efac)', badge: 'Trending' },
    { id: 6, name: 'Anya Forger Plush', anime: 'Spy x Family', price: '₹2,656', rating: '4.9', bg: 'linear-gradient(135deg,#fecdd3,#fda4af)', badge: 'Limited' },
    { id: 7, name: 'Levi Ackerman Poster', anime: 'Attack on Titan', price: '₹1,245', rating: '4.8', bg: 'linear-gradient(135deg,#e9d5ff,#d8b4fe)', badge: 'Sale' },
    { id: 8, name: 'Vegeta Scouter', anime: 'Dragon Ball Z', price: '₹3,486', rating: '4.7', bg: 'linear-gradient(135deg,#fef3c7,#fde68a)', badge: 'Popular' }
];

export const freshDrops = [
    { name: 'Gojo Unlimited Void Figure', price: '₹15,687', bg: 'linear-gradient(135deg,#7c3aed,#2563eb)' },
    { name: 'Demon Slayer Hashira Box', price: '₹10,707', bg: 'linear-gradient(135deg,#ef4444,#f97316)' },
    { name: 'Anya Waku Waku Edition', price: '₹6,142', bg: 'linear-gradient(135deg,#ec4899,#8b5cf6)' }
];

export const whyUsData = [
    { icon: '⚡', title: 'Premium Quality', text: 'Every item is sourced from authorized manufacturers. No bootlegs, ever.' },
    { icon: '🚚', title: 'Fast Delivery', text: 'Express shipping worldwide. Most orders ship within 24 hours of purchase.' },
    { icon: '🛡️', title: 'Secure Payments', text: '256-bit SSL encryption. We support cards, UPI, wallets, and crypto.' },
    { icon: '🏆', title: 'Authentic Licensed', text: 'Officially licensed merchandise from Bandai, Good Smile, Funko & more.' }
];

export const reviewsData = [
    { text: '"The Demon Slayer haori I ordered is absolutely stunning. The quality exceeded my expectations. Shipping was fast too!"', author: 'Sakura M.', initial: 'S', bg: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' },
    { text: '"Best anime merch store I\'ve found. The Gojo figure is incredibly detailed. Already planning my next order!"', author: 'Riku T.', initial: 'R', bg: 'linear-gradient(135deg,#ef4444,#f97316)' },
    { text: '"Ordered the One Piece collector\'s box. Packaging was premium, items were perfect. This is THE store for anime fans."', author: 'Aiden K.', initial: 'A', bg: 'linear-gradient(135deg,#22c55e,#14b8a6)' }
];

export const newsData = [
    { tag: 'Announcement', title: 'Jujutsu Kaisen Season 3 Confirmed for Fall 2026', text: 'MAPPA Studios confirms the return of Yuji Itadori in the highly anticipated Culling Game arc.', bg: 'linear-gradient(135deg,#1e40af,#3b82f6)' },
    { tag: 'Release', title: 'One Piece Film: Grand Line Breaks Box Office Records', text: 'The latest One Piece movie surpasses $500M globally, becoming the highest-grossing anime film.', bg: 'linear-gradient(135deg,#dc2626,#f97316)' },
    { tag: 'Collab', title: 'Bandai x OtakuNation Exclusive Figure Drop', text: 'Limited-edition collaboration figures available only at OtakuNation. Pre-orders open this weekend!', bg: 'linear-gradient(135deg,#7c3aed,#ec4899)' },
    { tag: 'Trending', title: 'Dragon Ball Daima: New Series Reveals Main Cast', text: 'The new Dragon Ball series introduces fresh characters alongside Goku and Vegeta.', bg: 'linear-gradient(135deg,#0891b2,#22d3ee)' }
];

export const blogData = [
    { date: 'Feb 10, 2026', title: 'Top 10 Anime Trends to Watch in 2026', text: 'From isekai evolution to AI-generated manga, here\'s what\'s shaping the anime industry this year.', bg: 'linear-gradient(135deg,#f97316,#eab308)' },
    { date: 'Feb 5, 2026', title: 'Figure Spotlight: Gojo Satoru Unlimited Void', text: 'An in-depth look at the most sought-after JJK figure of the year.', bg: 'linear-gradient(135deg,#8b5cf6,#6366f1)' },
    { date: 'Jan 28, 2026', title: 'Upcoming Releases: Spring 2026 Anime Merch', text: 'Preview the hottest merchandise drops coming this spring.', bg: 'linear-gradient(135deg,#06b6d4,#10b981)' }
];
