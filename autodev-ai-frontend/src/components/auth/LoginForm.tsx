import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Code } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      handleOAuthLogin(token);
    }
  }, [searchParams]);

  const handleOAuthLogin = async (token: string) => {
    try {
      // Fetch user profile with the token to complete login
      const res = await api.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      login(token, res.data);
      navigate('/dashboard');
    } catch (err) {
      setError('OAuth login failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/github`;
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        <Button type="submit" className="w-full h-12 text-sm font-black uppercase tracking-widest" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleGithubLogin}
          className="w-full h-12 flex items-center justify-center gap-3 font-bold border-gray-100 hover:bg-gray-50"
        >
          <Code size={20} />
          <span>Continue with GitHub</span>
        </Button>
      </div>

      <p className="text-center text-sm text-gray-600 font-medium">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-primary font-black hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
