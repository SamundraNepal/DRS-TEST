'use client';

import React, { useState } from 'react';
import { useLanguageContext } from '../components/use-context';
import { HandleLogIn, HandleSignUp } from '../database/handle_data';
import Spinner from '../components/spinner';
import { useRouter } from 'next/navigation';

interface SignupFields {
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
  confirm_password: string;
  auth: string; // admin code
}

interface LoginFields {
  email_address: string;
  password: string;
}

export default function AuthPage() {
  const { language } = useLanguageContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center w-full sm:h-[calc(100vh-70px)] p-4 bg-gradient-to-br from-emerald-50 to-green-100">
      {isLoading && <Spinner />}

      <div className="w-full flex flex-col md:flex-row justify-evenly items-center gap-6 md:gap-12">
        <LoginForm language={language} setIsLoading={setIsLoading} />

        <div className="my-4 md:my-0 text-center text-gray-500 font-semibold">
          OR
        </div>

        <SignupForm language={language} setIsLoading={setIsLoading} />
      </div>
    </div>
  );
}

type logInProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
};

/* ---------- Login Form ---------- */
function LoginForm({ language, setIsLoading }: logInProps) {
  const [formData, setFormData] = useState<LoginFields>({
    email_address: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await HandleLogIn({ formData });
      if (res.success) {
        router.refresh();
        setMessage('');
      } else {
        setMessage(res.message);
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-white/90 backdrop-blur-md border border-emerald-200 rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col gap-6 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl sm:text-2xl font-extrabold text-emerald-800 text-center uppercase">
        {language === 'ENG' ? 'Login' : 'लगइन'}
      </h1>

      <InputField
        id="email_address"
        type="email"
        label={language === 'ENG' ? 'Email' : 'इमेल'}
        placeholder={
          language === 'ENG' ? 'Enter your email' : 'तपाईंको इमेल लेख्नुहोस्'
        }
        value={formData.email_address}
        onChange={handleChange}
      />

      <InputField
        id="password"
        type="password"
        label={language === 'ENG' ? 'Password' : 'पासवर्ड'}
        placeholder={
          language === 'ENG'
            ? 'Enter your password'
            : 'तपाईंको पासवर्ड लेख्नुहोस्'
        }
        value={formData.password}
        onChange={handleChange}
      />

      {message && <p className="font-medium text-sm text-red-600">{message}</p>}

      <button className="bg-emerald-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-emerald-700 transition duration-300 shadow-md hover:shadow-lg">
        {language === 'ENG' ? 'Login' : 'लगइन'}
      </button>
    </form>
  );
}

type signUpProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
};

/* ---------- Signup Form ---------- */
function SignupForm({ language, setIsLoading }: signUpProps) {
  const [formData, setFormData] = useState<SignupFields>({
    first_name: '',
    last_name: '',
    email_address: '',
    password: '',
    confirm_password: '',
    auth: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await HandleSignUp({ formData });

      if (res.success) {
        setFormData({
          first_name: '',
          last_name: '',
          email_address: '',
          password: '',
          confirm_password: '',
          auth: '',
        });
        setMessage('Account Created. Please log in.');
      } else {
        setMessage(res.message);
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-white/90 backdrop-blur-md border border-emerald-200 rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col gap-6 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl sm:text-2xl font-extrabold text-emerald-800 text-center uppercase">
        {language === 'ENG' ? 'Sign Up' : 'साइन अप'}
      </h1>

      <InputField
        id="first_name"
        type="text"
        label={language === 'ENG' ? 'First Name' : 'नाम'}
        placeholder={
          language === 'ENG'
            ? 'Enter your first name'
            : 'तपाईंको नाम लेख्नुहोस्'
        }
        value={formData.first_name}
        onChange={handleChange}
      />

      <InputField
        id="last_name"
        type="text"
        label={language === 'ENG' ? 'Last Name' : 'थर'}
        placeholder={
          language === 'ENG' ? 'Enter your last name' : 'तपाईंको थर लेख्नुहोस्'
        }
        value={formData.last_name}
        onChange={handleChange}
      />

      <InputField
        id="email_address"
        type="email"
        label={language === 'ENG' ? 'Email' : 'इमेल'}
        placeholder={
          language === 'ENG' ? 'Enter your email' : 'तपाईंको इमेल लेख्नुहोस्'
        }
        value={formData.email_address}
        onChange={handleChange}
      />

      <InputField
        id="password"
        type="password"
        label={language === 'ENG' ? 'Password' : 'पासवर्ड'}
        placeholder={
          language === 'ENG'
            ? 'Enter your password'
            : 'तपाईंको पासवर्ड लेख्नुहोस्'
        }
        value={formData.password}
        onChange={handleChange}
      />

      <InputField
        id="confirm_password"
        type="password"
        label={
          language === 'ENG' ? 'Confirm Password' : 'पासवर्ड पुष्टि गर्नुहोस्'
        }
        placeholder={
          language === 'ENG'
            ? 'Confirm your password'
            : 'पासवर्ड पुनः लेख्नुहोस्'
        }
        value={formData.confirm_password}
        onChange={handleChange}
      />

      <InputField
        id="auth"
        type="text"
        label={language === 'ENG' ? 'Admin Code' : 'प्रशासक कोड'}
        placeholder={
          language === 'ENG' ? 'Enter admin code' : 'प्रशासक कोड लेख्नुहोस्'
        }
        value={formData.auth}
        onChange={handleChange}
      />

      {message && <p className="font-medium text-xs text-red-600">{message}</p>}

      <button className="bg-emerald-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-emerald-700 transition duration-300 shadow-md hover:shadow-lg">
        {language === 'ENG' ? 'Sign Up' : 'साइन अप'}
      </button>
    </form>
  );
}

/* ---------- Generic Input Component ---------- */
type GenericInputProps = {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
}: GenericInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-emerald-700 font-semibold">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-2 border-emerald-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-black"
        required
      />
    </div>
  );
}
