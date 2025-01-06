'use client'
import Link from "next/link";
import { checkIfLoggedIn } from "../services/user/registerUser";
import useModalStore from "../store/modelStore";
import { Home, Info, Book, LogIn, Heart, Mail, Phone } from 'lucide-react';
import '@/app/css/footer.css'
import Swal from 'sweetalert2'

const Footer = () => {
  const openModal = useModalStore((state) => state.openModal);

  const handleLoginClick = () => {
    if (checkIfLoggedIn()) {
      Swal.fire({
        title: 'כבר מחובר',
        text: 'אתה כבר מחובר לחשבון משתמש, לאחר יציאה ניתן להתחבר שוב.',
        icon: 'info',
        confirmButtonText: 'הבנתי'
      });
    } else {
      openModal();
    }
  };

  return (
    
    <footer className="footer">
      <div className="footer-content">
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
       
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              ניווט מהיר
            </h3>
            <div className="flex flex-col items-end space-y-3">
              <Link href="/" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
                דף הבית
                <Home className="h-4 w-4" />
              </Link>
              <Link href="/pages/about" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
                אודות האתר
                <Info className="h-4 w-4" />
              </Link>
              <button
                onClick={handleLoginClick}
                className="flex items-center gap-2 hover:text-pink-600 transition-colors"
              >
                התחברות
                <LogIn className="h-4 w-4" />
              </button>
            </div>
          </div>
      
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-bold mb-4">צור קשר</h3>
            <div className="flex flex-col items-center space-y-3">
              <a href="mailto:contact@eventPlaning.com" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
                <Mail className="h-4 w-4" />
                contact@eventPlaning
              </a>
              <a href="tel:+972556611170" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
                <Phone className="h-4 w-4" />
                972-556-611-170+
              </a>
            </div>
          </div>
        
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-bold mb-4">מדיניות פרטיות </h3>
            <Link href="/pages/terms" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
              תקנון האתר
              <Book className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    
      <div className="bottom-bar">
        <div className="flex flex-col items-center">
          <p className="accentuated-text">
            eventPlaning כל הזכויות שמורות ©
          </p>
          <div className="flex items-center mt-2">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
