'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function Login() {
  const [username, setUsername] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (username.trim() === '') {
      return;
    }
    // Lógica para armazenar o nome de usuário
    console.log('Username submitted:', username);
  };

  const isButtonDisabled = username.trim() === '';

  return (
    <section className="flex items-center justify-center h-screen w-full bg-[#DDDDDD] p-4 md:p-0">
      <Card className="w-full md:w-[500px] h-fit md:h-[205px] border-zinc-300 rounded-2xl p-6">
        <CardHeader className="-mb-2 p-0">
          <CardTitle className="font-bold text-[22px]">Welcome to CodeLeap network</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between">
            <div className="flex flex-col">
              <label htmlFor="username" className="font-normal text-[16px] block mb-[8px]">
                Please enter your username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-600 rounded-sm text-[14px] pl-2 h-[32px] w-full mb-[16px]"
              />
            </div>
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isButtonDisabled}
                className={`w-[111px] h-[32px] rounded-md text-white font-bold text-[16px]
                  ${isButtonDisabled ? 'bg-[#c2c2c2] text-[#767676] cursor-not-allowed' : 'bg-indigo-400 hover:bg-indigo-500 cursor-pointer'}
                `}
              >
                ENTER
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}