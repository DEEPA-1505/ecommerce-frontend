import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About Us', href: '/#about' },
            { name: 'Our Story', href: '/#story' },
            { name: 'Careers', href: '/#careers' },
            { name: 'Press', href: '/#press' },
        ],
        support: [
            { name: 'Help Center', href: '/#help' },
            { name: 'Contact Us', href: '/#contact' },
            { name: 'Returns', href: '/#returns' },
            { name: 'Shipping Info', href: '/#shipping' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '/#privacy' },
            { name: 'Terms of Service', href: '/#terms' },
            { name: 'Cookie Policy', href: '/#cookies' },
            { name: 'GDPR', href: '/#gdpr' },
        ],
        social: [
            { name: 'Facebook', href: 'https://facebook.com', icon: '📘' },
            { name: 'Twitter', href: 'https://twitter.com', icon: '🐦' },
            { name: 'Instagram', href: 'https://instagram.com', icon: '📷' },
            { name: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
        ]
    };

    const handleExternalLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleInternalLink = (href) => {
        if (href.startsWith('/#')) {
            const elementId = href.substring(2);
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="text-2xl font-bold text-blue-400">E-Commerce</div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Your trusted destination for premium electronics, gadgets, and accessories. 
                            Quality products at competitive prices.
                        </p>
                        <div className="flex space-x-4">
                            {footerLinks.social.map((social) => (
                                <button
                                    key={social.name}
                                    onClick={() => handleExternalLink(social.href)}
                                    className="text-gray-400 hover:text-white transition-colors duration-200 text-xl"
                                    title={social.name}
                                >
                                    {social.icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => handleInternalLink(link.href)}
                                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => handleInternalLink(link.href)}
                                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Legal</h3>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => handleInternalLink(link.href)}
                                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="max-w-md mx-auto text-center">
                        <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
                        <p className="text-gray-300 text-sm mb-4">
                            Subscribe to our newsletter for the latest products and offers
                        </p>
                        <div className="flex space-x-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-gray-950 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            © {currentYear} E-Commerce. All Rights Reserved.
                        </div>
                        <div className="flex space-x-6">
                            <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                Home
                            </Link>
                            <Link to="/#products" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                Products
                            </Link>
                            <Link to="/cart" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                                Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}