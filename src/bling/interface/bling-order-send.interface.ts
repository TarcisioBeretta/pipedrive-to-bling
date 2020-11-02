export interface BlingOrderSend {
	pedido: {
		cliente: Cliente;
		transporte?: Transporte;
		itens: Item[];
		parcelas: Parcela[];
		vlr_frete?: string;
		vlr_desconto?: string;
		obs?: string;
		obs_internas?: string;
	}
}

interface Cliente {
	nome: string;
	tipoPessoa?: string;
	endereco?: string;
	cpf_cnpj?: string;
	ie_rg?: string;
	numero?: string;
	complemento?: string;
	bairro?: string;
	cep?: string;
	cidade?: string;
	uf?: string;
	fone?: string;
	email?: string;
}

interface DadosEtiqueta {
	nome?: string;
	endereco?: string;
	numero?: string;
	complemento?: string;
	municipio?: string;
	uf?: string;
	cep?: string;
	bairro?: string;
}

interface Volume {
	servico?: string;
	codigoRastreamento?: any[];
}

interface Transporte {
	transportadora?: string;
	tipo_frete?: string;
	servico_correios?: string;
	dados_etiqueta?: DadosEtiqueta;
	volumes?: Volume[];
}

interface Item {
	item: Item2
}

interface Item2 {
	codigo?: string;
	descricao: string;
	un?: string;
	qtde: string;
	vlr_unit: string;
}


interface Parcela {
	parcela: Parcela2;
}

interface Parcela2 {
	data?: string;
	vlr: string;
	obs?: any;
}
