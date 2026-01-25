interface Usuario {
    nome: string,
    email: string,
    senha: string
}

async function criarUsuario ({ nome, email, senha }: Usuario) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/login/registrar/registrar.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
    });

    if (!response.ok) {
        throw new Error('Erro ao criar usuário');
    }

    return await response.json();
}

async function loginUsuario ({ email, senha }: Omit<Usuario, 'nome'>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/login/login.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    if (!response.ok) {
        throw new Error('Erro ao fazer login');
    }

    return await response.json();
}

async function obterUsuario () {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/listarUsuarios.php`, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Erro ao obter usuário');
    }

    return await response.json();
}

export { criarUsuario, loginUsuario, obterUsuario };