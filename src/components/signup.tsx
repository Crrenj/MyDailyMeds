'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password, birthday }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push(data.redirect || '/dashboard');
    } else {
      setMessage(data.error || 'Une erreur est survenue.');
    }
  };

  return (
    <form onSubmit={handleSignup} className="px-7 h-screen grid justify-center items-center">
      <div className="grid gap-6" id="form">
        <div className="w-full flex gap-3">
          <input
            className="capitalize shadow-2xl p-3 w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black"
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="capitalize shadow-2xl p-3 w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black"
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-6 w-full">
          <input
            className="p-3 shadow-2xl w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="p-3 shadow-2xl w-full text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
            type="date"
            placeholder="Date de naissance"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            className="p-3 shadow-2xl w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="p-3 shadow-2xl w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
            type="password"
            placeholder="Confirmez le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="outline-none shadow-2xl w-full p-3 bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px] hover:text-[#035ec5] font-bold"
          type="submit"
        >
          S'inscrire
        </button>
        {message && <p className="text-red-500 text-center mt-2">{message}</p>}
      </div>
    </form>
  );
}