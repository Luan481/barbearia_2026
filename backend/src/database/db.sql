CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE,
    tipo VARCHAR(20) DEFAULT 'CLIENTE',
    ativo BOOLEAN DEFAULT TRUE
);


CREATE TABLE servicos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    duracao INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);


CREATE TABLE horarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    barbeiro_id UUID NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    disponivel BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (barbeiro_id)
        REFERENCES usuarios(id)
);


CREATE TABLE agendamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cliente_id UUID NOT NULL,
    barbeiro_id UUID NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'AGENDADO',
    valor DECIMAL(10,2) DEFAULT 0,

    FOREIGN KEY (cliente_id)
        REFERENCES usuarios(id),

    FOREIGN KEY (barbeiro_id)
        REFERENCES usuarios(id)
);


CREATE TABLE agendamento_servicos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agendamento_id UUID NOT NULL,
    servico_id UUID NOT NULL,
    preco DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (agendamento_id)
        REFERENCES agendamentos(id),

    FOREIGN KEY (servico_id)
        REFERENCES servicos(id)
);


CREATE TABLE produtos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE
);


CREATE TABLE vendas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cliente_id UUID,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valor_total DECIMAL(10,2) DEFAULT 0,
    forma_pagamento VARCHAR(30),

    FOREIGN KEY (cliente_id)
        REFERENCES usuarios(id)
);


CREATE TABLE venda_itens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venda_id UUID NOT NULL,
    produto_id UUID NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (venda_id)
        REFERENCES vendas(id),

    FOREIGN KEY (produto_id)
        REFERENCES produtos(id)
);


CREATE TABLE planos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    quantidade_cortes INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);


CREATE TABLE assinaturas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cliente_id UUID NOT NULL,
    plano_id UUID NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    cortes_utilizados INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ATIVA',

    FOREIGN KEY (cliente_id)
        REFERENCES usuarios(id),

    FOREIGN KEY (plano_id)
        REFERENCES planos(id)
);


CREATE TABLE beneficios_aniversario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cliente_id UUID NOT NULL,
    ano INT NOT NULL,
    utilizado BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (cliente_id)
        REFERENCES usuarios(id),

    UNIQUE (cliente_id, ano)
);
