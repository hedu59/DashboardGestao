export class RetornoAcionamento {
    Success: boolean;
    Message: string
    Data: DataAcionamento
}

export class DataAcionamento {
    ACIONAMENTO_ID: number;
    DATA: Date;
    HORA: String;
    ACAO_ID: string;
    DESCRICAO: string;
    MENSAGEM: string;
    COBRADOR_NOME: string;
    COBRADOR_ID: number;
    DEVEDOR_ID: number;
    FONE: string;
    DATA_PREVISAO: Date;
    DISCADOR: string;
}