import React from 'react';
import axios from "axios";
import { useState } from 'react'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { useCookies } from 'react-cookie'
import { Buffer } from 'buffer';
import './Auth.css'

interface IAuth {
  url: string,
  buttonText: string,
  buttonColor: string,
  buttonTextColor: string
}

export const Auth = ({ url, buttonText = 'Authenticate', buttonColor = 'blue', buttonTextColor ='white' }: IAuth) => {
  const [cookies, setCookie] = useCookies(['access_token']);
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const token = Buffer.from(`${clientId.trim()}:${clientSecret.trim()}`).toString('base64');
    const headers = {
      headers: {
        'x-api-key': apiKey.trim(),
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    await axios.post(
      'api/v2/oauth2/token',
      { grant_type: "client_credentials" },
      headers
    ).then(function (response) {
        setIsLoading(false);
        setCookie('access_token', response.data['access_token'], { path: '/'});

        window.location.href = url;
      })
      .catch(function (error) {
        setIsLoading(false);
        setErrorMessage(error.message);
      });
  }

  return <>
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {errorMessage &&
          <div className="mt-2 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{errorMessage}</h3>
              </div>
            </div>
          </div>
        }
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Client Id
              </label>
              <div className="mt-1">
                <input
                  required
                  onInvalid={(e) => {
                    const inputElement = e.target as HTMLInputElement;
                    inputElement.setCustomValidity("Client Id is required");
                  }}
                  onInput={(e) => {
                    const inputElement = e.target as HTMLInputElement;
                    inputElement.setCustomValidity("");
                  }}
                  id="client-id"
                  name="client-id"
                  onChange={(e) => setClientId(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Client Secret
              </label>
              <div className="mt-1">
                <input
                  required
                  onInvalid={(e) => {
                    const inputElement = e.target as HTMLInputElement;
                    inputElement.setCustomValidity("Client secret is required");
                  }}
                  onInput={(e) => {
                    const inputElement = e.target as HTMLInputElement;
                    inputElement.setCustomValidity("");
                  }}
                  id="client-secret"
                  name="client-secret"
                  onChange={(e) => setClientSecret(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Api Key
              </label>
              <div className="mt-1">
                <input
                  required
                  onInvalid={(e) => {
                    const inputElement = e.target as HTMLInputElement;
                    inputElement.setCustomValidity("Api key is required");
                  }}
                  onInput={(e) => {
                    const inputElement = e.target as HTMLInputElement;
                    inputElement.setCustomValidity("");
                  }}
                  id="api-key"
                  name="api-key"
                  onChange={(e) => setApiKey(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                style={{ backgroundColor: buttonColor, color: buttonTextColor }}
                className="flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none"
              >
                {isLoading &&
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                }
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
}
