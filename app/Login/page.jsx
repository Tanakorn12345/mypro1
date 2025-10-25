import Navbar from '../components/Navbar';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login Page',
  description: 'Login to our website',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <LoginForm />
    </div>
  );
}
