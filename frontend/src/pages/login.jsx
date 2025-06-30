import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../imgs/Giuseppe.png';

function Login() {
  const [loginType, setLoginType] = useState(null);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const correctUsers = {
    garcom: { email: 'garcom@example.com', password: '1234' },
    chef: { email: 'chef@example.com', password: 'chefpass' },
    admin: { email: 'admin@example.com', password: 'adminpass' },
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!loginType) {
      setError('Selecione o tipo de login');
      return;
    }

    const user = correctUsers[loginType];

    if (
      credentials.email.toLowerCase() === user.email.toLowerCase() &&
      credentials.password === user.password
    ) {
      setError('');
      if (loginType === 'garcom') {
        navigate('/DashboardGarcom1'); 
      } else if (loginType === 'chef') {
         navigate('/DashboardCozinha'); 
      } else if (loginType === 'admin') {
        navigate('/Admin'); 
      }
    } else {
      setError('Email ou senha incorretos');
    }
  }

  return (
    <div className="w-full h-screen bg-red-600 flex items-center justify-center px-4">
      <div className="bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-lg min-h-[80vh] flex flex-col items-center space-y-6">
        <img src={logo} alt="Logo Giuseppe" className="w-32 h-auto" />

        <div className="w-full text-center space-y-2">
          <p className="text-lg font-semibold">Selecione o tipo de login</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => setLoginType('garcom')}>Garçom</button>
            <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => setLoginType('chef')}>Chef</button>
            <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => setLoginType('admin')}>Administrador</button>
          </div>
        </div>

        {error && <div className="text-red-600 font-semibold">{error}</div>}

        {loginType && (
          <form onSubmit={handleSubmit} className="w-full space-y-4 mt-4">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full px-4 py-2 border rounded"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full px-4 py-2 border rounded"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
            <button type="submit" className="bg-red-600 text-white w-full py-2 rounded hover:bg-red-700">
              Entrar como {loginType === 'garcom' ? 'Garçom' : loginType === 'chef' ? 'Chef' : 'Administrador'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
