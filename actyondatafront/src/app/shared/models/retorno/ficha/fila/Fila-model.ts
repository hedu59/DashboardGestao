export class PesquisaFilaModel {
    Success: boolean;
    Message: string;
    Data: Data;
}

export class Data {
    DevedorEmFila: DevedorEmFila
}

export class DevedorEmFila {
    ASSESSORIA_ID: number;
    ATUACAO: string;
    CAMPANHA_ID: number;
    COBRADOR_ID: number;
    CONT_ID: number;
    DATA: Date;
    DATA_HORA_DISTRIBUIDO: Date;
    DEVEDOR_ID: number;
    EQUIPE_ID: number;
    FILA_ID: number;
    NOME_FILA: string;
    NUMERO_REMESSA: string;
    SE_FILA_MANUAL_URA: string;
    TIPO_FILA: string;
}
