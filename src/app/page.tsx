"use client"
import Cadastro from "@/pages/auth/cadastro";
import Login from "@/pages/auth/login";
import { useState } from "react";

export default function Home() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-violet-200 flex justify-center items-center">
            {isLogin ? <Login onToggle={() => setIsLogin(false)} /> : <Cadastro onToggle={() => setIsLogin(true)} />}
        </div>
    )
}
