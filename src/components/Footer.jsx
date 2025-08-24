export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm text-gray-300">
                        © Deepa Cart. All Rights Reserved.
                    </p>
                    <div className="mt-4 flex justify-center space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}