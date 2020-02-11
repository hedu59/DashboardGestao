export class DividaAtualizadaModel {
    Success: boolean;
    Message: string;
    Data: Data;
}

export class Data {
    resultTituloVM: resultTituloVM[]
    listaCampos: listaCampos[]
}

export class resultTituloVM {
    DevedorId: number;
    ContId: number;
    ValorPrincipalComDesconto: number;
    ValorJurosComDesconto: number;
    ValorMultaComDesconto: number;
    ValorHonorarioComDesconto: number;
    ValorTotalComAcrescimos:number;
    ValorTotalComDescontos: number;
    DataInicioPagamento: Date;
    DataVencimentoOriginal: Date;
    PercentualMaxDescontoJuros: number;
    PercentualMaxDescontoMulta:number;
    PercentualMaxDescontoJurosMulta: number;
    PercentualMaxDescontoHonorario: number;
    PercentualMaxDescontoPrincipal:number;
    FAIXA: number;
    TITULO_ID:number;
    VALOR_ORIGINAL:number;
    OBSE: string;
    TIPO_TITULO: string
    NUMERO_CONTRATO: string;
    NUMERO_DOCUMENTO: string;
    PRODUTO_ID: string;
    VALOR_ADICIONAL1: number;
    VALOR_ADICIONAL2: number;
}

export class listaCampos {
    CONTRATANTE_ID: string;
    SEQU_ID: string;
    CAMPO: string;
    DESCRICAO: string
}