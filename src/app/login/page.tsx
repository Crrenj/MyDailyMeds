import LoginPage from '../login';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Créez un compte</h1>
        <LoginPage />
      </div>
    </div>
  );
}
