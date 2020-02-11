export class TitulosClienteModel {
    Success: boolean;
    Mensage: string;
    Data: Data
}

export class Data {
    ListTitulo: ListTitulo
}

export class ListTitulo {
    TITULO_ID: number;
    TIPO_TITULO_ID: number;
    DEVEDOR_ID: number;
    NUMERO_CONTRATO: string;
    NUMERO_PRESTACAO: string;
    QTDE_PRESTACAO: number;
    NUMERO_DOCUMENTO: string;
    VALOR: number;
    DATA_VENCIMENTO: Date;
    PRODUTO_ID: string;
    OBSE: string;
    CONT_ID: number;
    NOME_ALUNO: number
}