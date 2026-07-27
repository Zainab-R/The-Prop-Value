"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface Props {
  register: any;
  name: string;
  placeholder: string;
}

export default function PasswordInput({
  register,
  name,
  placeholder,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...register(name)}
        className="w-full rounded-xl border p-4 pr-12 outline-none focus:border-orange-500"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-4"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}