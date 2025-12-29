

export default function Login() {
    return (
        // login container
        <div className="w-80 min-h-96 bg-violet-300 p-6 rounded-lg shadow-lg flex flex-col justify-start items-center">
            {/* login title */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-violet-700">Login</h1>
            </div>

            {/* login form */}
            <div className="login-form">
                <input type="text" placeholder="Username" className="login-input" />
                <input type="password" placeholder="Password" className="login-input" />
                <button className="login-button">Entrar</button>
            </div>

            {/* login footer */}
            <div className="login-footer">
                <p>Não tem uma conta? <a href="/register" className="login-link">Registre-se</a></p>
            </div>
        </div>
    )
}