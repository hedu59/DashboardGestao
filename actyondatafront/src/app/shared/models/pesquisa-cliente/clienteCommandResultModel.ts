export class CommandResult {
    Success: boolean;
    Mensage: string;
    Data: Data
}

export class Data {
    ListDevedor: ListDevedor
}

export class ListDevedor {
    BAIRRO: string;
    BAIRRO_EMPRESA: string;
    CARGO: string;
    CEP: string;
    CIDADE: string;
    CIDADE_EMPRESA: string;
    COMPLEMENTO: string;
    COMPLEMENTO_ENDERECO_EMPRESA: string;
    CONT_ID: number
    CPF: string;
    DATA_NASCIMENTO: Date;
    DEVEDOR_ID: number
    EMPRESA: string;
    ENDERECO: string;
    ENDERECO_EMPRESA: string;
    ESTADO_CIVIL: string;
    FANTASIA: string;
    NOME: string;
    NOME_CONJUGUE: string;
    NOME_MAE: string;
    NOME_PAI: string;
    NUMERO: string;
    NUMERO_EMPRESA: string;
    RG: string;
    RG_COMPLEMENTO: string;
    SEXO: string;
    UF: string;
    UF_EMPRESA: string;
}