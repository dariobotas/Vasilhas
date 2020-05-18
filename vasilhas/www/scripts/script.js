/**
 * Variáveis globais
 */
var historico = []; //histórico ou lista de fechados (poderá ser um dos dois ou será preciso criar o array)
var vasilhas = [];
var abertos = [];
var fechados = [];


var TipoOperacao = {
    E: "Encher",
    V: "Vazar",
    N: "Nada"
};

var TipoDeProcura = {
    L: "Largura",
    P: "Profundidade"
};

/** 
 * Funções do programa
 */
/**
 * Fazer append de vários elementos do Document Object Model
 *
 * @returns nada se tiver um ou zero argumentos.
 */
function appendVariosFilhos() {

    if (arguments.length == 0 || arguments.length == 1) return;
    var elementoAppend = arguments[0];
    var i, l = arguments.length;
    for (i = 1; i < l; i++) {
        elementoAppend.appendChild(arguments[i]);
    }
}

/**
 * @function limpaElemento
 * @param  {HTMLElement} elementoHTML O elemento HTML a limpar
 */
function limpaElemento(elementoHTML) {
    while (elementoHTML.firstChild != undefined) {
        elementoHTML.removeChild(elementoHTML.firstChild);
    }
}

/**
 * Verifica se é uma vasilha
 *
 * @param {*} vasilha
 * @returns verdadeiro ou falso
 */
function isVasilha(vasilha) {
    return vasilha.constructor === Vasilha;
}

/**
 * Verifica se uma vasilha está vazia
 *
 * @param {*} vasilha
 * @returns verdadeiro ou falso
 */
function isVazia(vasilha) {
    return vasilha.quantidadeDeAgua == 0;
}

/**
 * Verifica se uma vasilha está cheia
 *
 * @param {*} vasilha
 * @returns verdadeiro ou falso
 */
function isCheia(vasilha) {
    return vasilha.quantidadeDeAgua == vasilha.tamanhoMaximo;
}

/**
 * Verifica se é um Array
 *
 * @param {*} myArray
 * @returns verdadeiro ou falso
 */
function isArray(myArray) {
    return myArray.constructor === [];
}
/**
 * Verifica se é um objecto
 *
 * @param {*} object
 * @returns verdadeiro ou falso
 */
function isObject(object) {
    return object.constructor === Object;
}

/**
 * Copia valores de um array para outro.
 *
 * @param {*} o
 * @returns objecto copiado
 */
function copiaDeArrays(o) {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = (typeof v === "object" && v !== null) ? copiaDeArrays(v) : v;
    }
    return output;
}

/**
 * Retorna lista de abertos
 *
 * @returns lista de abertos
 */
function getAbertos() {
    return abertos;
}

/**
 * Função para limpar lista de abertos.
 *
 * @returns lista de abertos limpa
 */
function limparAbertos() {
    return abertos = [];
}
/**
 * Retorna lista de fechados
 *
 * @returns lista de fechados
 */
function getFechados() {
    return fechados;
}

/**
 * Função para limpar lista de fechados.
 *
 * @returns lista de fechados limpa
 */
function limparFechados() {
    return fechados = [];
}

/**
 * Obtém array de vasilhas
 *
 * @returns lista de vasilhas
 */
function getVasilhas() {
    return vasilhas;
}

/**
 * Obtém uma vasilha do array de vasilhas
 *
 * @param {*} nome
 * @returns vasilha
 */
function getVasilha(nome) {
    var vasilhas = getVasilhas();
    return vasilhas.find(function (vasilha) {
        return vasilha.nome.toUpperCase() == nome.toUpperCase();
    });
}

/**
 * Adiciona uma vasilha à lista de vasilhas. Tem no máximo 2 vasilhas.
 *
 * @param {*} vasilha
 * @returns adicionar vasilha à lista de vasilhas.
 */
function adicionarVasilha(vasilha) {
    if (!vasilha) return;
    if (vasilhas.length == 2) return "Já tem " + vasilhas.length + " vasilhas. Não pode adicionar mais!";
    if (isObject(vasilha)) {
        var v = new Vasilha(
            vasilha.nome,
            vasilha.tamanhoMaximo,
            vasilha.quantidadeDeAgua
        );
        return vasilhas.push(v);
    }
    vasilhas.push(vasilha);
}

/**
 * Remove uma vasilha do array de vasilhas
 *
 * @param {*} nome
 */
function removerVasilha(nome) {
    var vasilha = getVasilha(nome);
    var index = vasilhas.indexOf(vasilha);

    if (index > -1) {
        vasilhas.splice(index, 1);
    }
}

/**
 * Constroi uma string para mostrar todas as vasilhas
 *
 * @param {*} vasilhas
 * @returns a string de vasilhas
 */
function toStringVasilhas(vasilhas) {
    return vasilhas.forEach(function (getVasilha) {
        document.writeln(getVasilha.stringVasilha() + '<br/>');
    });
}

/**
 * Obtém o array do histórico de vasilhas (quando são realizadas operações sobre vasilhas)
 *
 * @returns lista de histórico.
 */
function getHistoricoDeVasilhas() {
    return historico;
}

/**
 * Obtém um array de vasilhas, especificando uma posição do histórico
 *
 * @param {*} posicao
 * @returns lista de vasilhas do histórico.
 */
function getVasilhasDePosicaoDoHistorico(posicao) {
    var vasilhasHistorico = getHistoricoDeVasilhas();
    if (posicao > vasilhasHistorico.length) return "Não existe mais do que " + vasilhasHistorico.length + " vasilhas no histórico!";
    return vasilhasHistorico[posicao];
}

/**
 * Adicion um array de vasilhas ao histórico
 *
 * @param {*} vasilhas
 * @param {*} inicioFim
 * @returns nada se não houver vasilhas
 */
function adicionarVasilhasAoHistorico(vasilhas, inicioFim) {
    if (!vasilhas) return;
    var c = copiaDeArrays(vasilhas);
    if (inicioFim.toUpperCase() == "I") {
        historico.unshift(c);
    } else {
        historico.push(c);
    }
}

/**
 * Função para limpar o histórico de vasilhas.
 *
 * @returns
 */
function limparHistorico() {
    return historico = [];
}

/**
 * String para mostrar o histórico de vasilhas
 *
 * @param {*} vasilhasArray
 * @returns string do histórico de vasilhas
 */
function toStringListasDeVasilhas(vasilhasArray) {
    return vasilhasArray.forEach(function (getHistoricoDeVasilhas, index) {
        document.writeln('Posicao ' + (index + 1) + ": <br/>");
        getHistoricoDeVasilhas.forEach(
            function (getVasilha) {
                document.writeln(getVasilha.stringVasilha() + '<br/>');
            }) + '<br/>';
        document.writeln("<br/>");
    });
}

/**
 * Verifica se uma vasilha já tem 1 litro
 *
 * @param {*} vasilhas
 * @param {*} valorFinal
 * @returns vasilha que é a solução do problema
 */
function solucao(vasilhas, valorFinal) {
    return vasilhas.find(function (vasilha) {
        if (vasilha.quantidadeDeAgua == valorFinal)
            return vasilha;
    });

}

/**
 * Função para procurar uma vasilha específica numa lista de vasilhas.
 *
 * @param {*} listaVasilhas
 * @param {*} valor
 * @returns vasilha, caso encontrada.
 */
function procuraVasilhaEmListaVasilhas(listaVasilhas, valor) {
    if (arguments.length == 0) return;
    var i, ll = listaVasilhas.length;
    for (i = 0; i < ll; i++) {
        var l = listaVasilhas[i];
        var s = solucao(l, valor);
        if (s !== undefined) return listaVasilhas[i];
    }
}

/**
 * Verifica se há alguma vasilha vazia
 *
 * @param {*} vasilhas
 * @returns vasilha vazia.
 */
function algumaVasilhaVazia(vasilhas) {
    return vasilhas.find(function (vasilha) {
        return isVazia(vasilha);
    });
}

/**
 * Verifica se há alguma vasilha cheia
 *
 * @param {*} vasilhas
 * @returns vasilha cheia.
 */
function algumaVasilhaCheia(vasilhas) {
    return vasilhas.find(function (vasilha) {
        return isVazia(vasilha);
    });
}

/**
 * Função que representa objecto vasilha
 *
 * @param {*} nome - Para dar um nome à vasilha.
 * @param {*} tamanhoMaximo - Tamanho máximo que a vasilha pode ter.
 * @param {*} quantidadeDeAgua - Quantidade actual de água.
 * @param {*} operacao - Quantidade actual de água.
 */

function Vasilha(nome, tamanhoMaximo, quantidadeDeAgua, operacao) {
    var letra = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.nome = nome ? nome : nome += letra.charAt(Math.floor(Math.random() * letra.length));
    this.tamanhoMaximo = parseInt(tamanhoMaximo) || 5;
    this.quantidadeDeAgua = (parseInt(quantidadeDeAgua) < 0 || parseInt(quantidadeDeAgua) > this.tamanhoMaximo) ? 0 : parseInt(quantidadeDeAgua);
    this.operacao = operacao ? operacao : TipoOperacao.N;
}
Vasilha.prototype.constructor = Vasilha;

/**
 * Função para mostrar no ecrã a informação respeitante à vasilha.
 *
 * @returns a informação da vasilha.
 */
Vasilha.prototype.stringVasilha = function () {
    return "Vasilha: " + this.nome +
        " - " + "Tamanho máximo: " + this.tamanhoMaximo +
        " - " + "Quantidade de água: " + this.quantidadeDeAgua +
        " - " + "Operação: " + this.operacao;
}

/**
 * Função para vazar as vasilhas. Se contiver uma vasilha de destino, vaza o conteúdo para essa vasilha.
 * Se não tiver vaza essa mesma vasilha.
 * @param {*} vasilhaDestino - Vasilha para vazar conteúdo.
 * @param {*} vasilhas - Lista de vasilhas para adicionar a operação ao histórico.
 * @returns visualização das vasilhas.
 */
Vasilha.prototype.vazarVasilha = function (vasilhaDestino) {

    //Se a vasilha não tiver destino, esvazia só essa vasilha.
    if (vasilhaDestino == null ||
        vasilhaDestino == undefined ||
        (
            isVasilha(vasilhaDestino) &&
            this.nome == vasilhaDestino.nome
        )
    ) {
        this.operacao = TipoOperacao.V;
        this.quantidadeDeAgua = 0;
        return;
    }

    //Se a vasilha de origem e a de destino forem do mesmo tipo e tiverem nomes diferentes
    //A vasilha de origem, vai despejar agua para a de destino
    if (isVasilha(vasilhaDestino) &&
        this.nome !== vasilhaDestino.nome
    ) {
        if (!isVazia(this) &&
            !isCheia(vasilhaDestino)) {
            this.operacao = TipoOperacao.V;
            this.quantidadeDeAgua--;
            vasilhaDestino.operacao = TipoOperacao.E;
            vasilhaDestino.quantidadeDeAgua++;
            this.vazarVasilha(vasilhaDestino);
        } else {
            return;
        }
    }

}

/**
 * Função para encher vasilha.
 *
 * @param {*} vasilhas - Lista de vasilhas com o estado a adicionar ao histórico.
 */
Vasilha.prototype.encherVasilha = function () {
    this.operacao = TipoOperacao.E;
    this.quantidadeDeAgua = this.tamanhoMaximo;
}

/**
 * Função que vai gerar sucessores (com base nas operações sobre as vasilhas) da lista de vasilhas passada como parâmetro
 * retornando um array com várias listas de vasilhas, resultado de aplicar os operadoes.
 * @param {*} noVasilha - será adicionado a lista de vasilhas que será considerado um nó
 * @returns sucessores da lista de vasilhas inserida.
 */
function sucessores(noVasilha) {
    var sucessores = [];
    vasilhaA = new Vasilha(
        noVasilha[0].nome,
        noVasilha[0].tamanhoMaximo,
        noVasilha[0].quantidadeDeAgua,
        noVasilha[0].operacao);
    vasilhaB = new Vasilha(
        noVasilha[1].nome,
        noVasilha[1].tamanhoMaximo,
        noVasilha[1].quantidadeDeAgua,
        noVasilha[1].operacao);

    /**
     * Função que vai aplicar o operador às vasilhas e devolve o resultado do mesmo.
     *
     * @param {*} operador
     * @param {*} vasilhaOrigem
     * @param {*} vasilhaDestino
     * @param {*} noVasilhas
     * @returns lista das duas vasilhas depois do operador aplicado.
     */
    function aplicaOperadores(operador, vasilhaOrigem, vasilhaDestino, noVasilhas) {
        if (vasilhaOrigem == null && vasilhaDestino == null) return;
        var novasVasilhas = [];
        var novaOrigem = new Vasilha(
            vasilhaOrigem.nome,
            vasilhaOrigem.tamanhoMaximo,
            vasilhaOrigem.quantidadeDeAgua,
            vasilhaOrigem.operacao
        );
        var novoDestino = new Vasilha(
            vasilhaDestino.nome,
            vasilhaDestino.tamanhoMaximo,
            vasilhaDestino.quantidadeDeAgua,
            vasilhaDestino.operacao
        );

        /**
         * Função que coloca as vasilhas na ordem correta.
         *
         * @param {*} origem
         * @param {*} destino
         * @param {*} noVasilhas0
         * @param {*} vasilhas
         * @returns lista de vasilhas na ordem correta
         */
        function adicionarVasilasPorOrdem(origem, destino, noVasilhas0, vasilhas) {
            if (origem.nome == noVasilhas0.nome) {
                vasilhas.push(origem);
                vasilhas.push(destino);
                return vasilhas;
            } else {
                vasilhas.push(destino);
                vasilhas.push(origem);
                return vasilhas;
            }
        }
        if (operador == TipoOperacao.E) {
            novaOrigem.encherVasilha();
            var v = adicionarVasilasPorOrdem(novaOrigem, novoDestino, noVasilhas[0], novasVasilhas);
            return noVasilhas = v;
        }
        if (operador == TipoOperacao.V) {
            if (vasilhaOrigem !== null && vasilhaDestino.operacao == TipoOperacao.N) {
                novaOrigem.vazarVasilha(null);
                var v = adicionarVasilasPorOrdem(novaOrigem, novoDestino, noVasilhas[0], novasVasilhas);
                return noVasilhas = v;
            } else if (vasilhaOrigem !== null && vasilhaDestino.operacao !== TipoOperacao.N) {
                novaOrigem.vazarVasilha(novoDestino);
                var v = adicionarVasilasPorOrdem(novaOrigem, novoDestino, noVasilhas[0], novasVasilhas);
                return noVasilhas = v;
            }
        }
    }

    //Verifica se a primeira vasilha não está vazia e se a segunda não está cheia e vaza da primeira para a segunda.
    if (!isVazia(vasilhaA) && !isCheia(vasilhaB)) {
        vasilhaA.operacao = TipoOperacao.V;
        vasilhaB.operacao = TipoOperacao.E;
        var a = aplicaOperadores(vasilhaA.operacao, vasilhaA, vasilhaB, noVasilha);
        sucessores.push(a);
    }
    //Verifica se a segunda vasilha não está vazia e se a primeira não está cheia e vaza da segunda para a primeira.
    if (!isVazia(vasilhaB) && !isCheia(vasilhaA)) {
        vasilhaB.operacao = TipoOperacao.V;
        vasilhaA.operacao = TipoOperacao.E;
        var a = aplicaOperadores(vasilhaB.operacao, vasilhaB, vasilhaA, noVasilha);
        sucessores.push(a);
    }
    //Verifica se a primeira vasilha não está vazia e vaza-a
    if (!isVazia(vasilhaA)) {
        vasilhaA.operacao = TipoOperacao.V;
        vasilhaB.operacao = TipoOperacao.N;
        var a = aplicaOperadores(vasilhaA.operacao, vasilhaA, vasilhaB, noVasilha);
        sucessores.push(a);
    }
    //Verifica se a a segunda vasilha não está vazia e vaza-a
    if (!isVazia(vasilhaB)) {
        vasilhaB.operacao = TipoOperacao.V;
        vasilhaA.operacao = TipoOperacao.N;
        var a = aplicaOperadores(vasilhaB.operacao, vasilhaB, vasilhaA, noVasilha);
        sucessores.push(a);
    }
    //Verifica se a primeira vasilha não está cheia e enche-a
    if (!isCheia(vasilhaA)) {
        vasilhaA.operacao = TipoOperacao.E;
        vasilhaB.operacao = TipoOperacao.N;
        var a = aplicaOperadores(vasilhaA.operacao, vasilhaA, vasilhaB, noVasilha);
        sucessores.push(a);
    }
    //Verifica se a a segunda vasilha não está cheia e enche-a
    if (!isCheia(vasilhaB)) {
        vasilhaB.operacao = TipoOperacao.E;
        vasilhaA.operacao = TipoOperacao.N;
        var a = aplicaOperadores(vasilhaB.operacao, vasilhaB, vasilhaA, noVasilha);
        sucessores.push(a);
    }
    return sucessores;
}
/**
 * Função para definir objecto representativo de um nó.
 *
 * @param {*} pai
 * @param {*} valor
 */
function No(pai, valor, nivel) {
    this.pai = pai;
    this.valor = valor;
    this.nivel = nivel;
}
No.prototype.constructor = No;

/**
 * Função procuraSolucao para chamar a função que faz a procura conforme o tipo de parâmetros passados
 *
 * @param {*} noInicial
 * @param {*} tipoDeProcura
 * @param {*} profundidadeMaxima
 * @returns
 */
function procurarSolucao(noInicial, tipoDeProcura, profundidadeMaxima) {
    if (arguments.length == 0) return;

    /**
     * Função para inverter lista
     *
     * @param {*} lista
     * @returns lista invertida
     */
    function inverterLista(lista) {
        var n = [],
            i, l = lista.length;
        for (var i = 0; i < l; i++) {
            n.unshift(lista[i]);
        }
        return n;
    }

    var vasilhaSolucao = solucao(noInicial, 1);

    if (vasilhaSolucao !== undefined) {
        return document.writeln("As vasilhas finais são: <br/>") + toStringVasilhas(noInicial);
    } else {
        var no = new No(-1, noInicial, 0);
        getAbertos().push(no);
        var listaDeAbertos = getAbertos();
        var listaDeFechados = getFechados();
        procura(listaDeAbertos, listaDeFechados, tipoDeProcura, profundidadeMaxima);

    }

}
/**
 * Função que vai fazer a procura da solução do problema conforme o algoritmo passado.
 *
 * @param {*} listaDeAbertos
 * @param {*} listaDeFechados
 * @param {*} algoritmo
 * @param {*} profundidadeMaxima
 * @returns histórico com o caminho desde o início até à resolução do problema.
 */
function procura(listaDeAbertos, listaDeFechados, algoritmo, profundidadeMaxima) {
    if (listaDeAbertos == null) return;

    /**
     * Verifica se uma vasilha está numa determinada lista.
     *
     * @param {*} noVasilha - nó vasilha
     * @param {*} lista - lista de vasilhas
     * @returns nó se estiver na lista
     */
    function isInList(noVasilha, lista) {
        var i, ll = lista.length;
        for (var i = 0; i < ll; i++) {
            var l = lista[i];
            if (l[0].quantidadeDeAgua == noVasilha[0].quantidadeDeAgua && l[1].quantidadeDeAgua == noVasilha[1].quantidadeDeAgua)
                return l;
        }
    }

    /**
     * Transforma a lista de nós, numa lista com os valores dos nós, para analisar os valores.
     *
     * @param {*} listaDeFechados
     * @returns nova lista de valores.
     */
    function novaListaDeArrays(listaDeFechados) {
        var l = [],
            i, ll = listaDeFechados.length;
        for (i = 0; i < ll; i++) {
            l.push(listaDeFechados[i].valor);
        }
        return l;
    }

    //senão se atingiu a profundidade máxima vai procurar solução na segunda operação das vasilhas
    if (algoritmo == TipoDeProcura.P) {
        if (listaDeAbertos.length == 0) {
            return;
        } else {
            //transformar o primeiro array da lista de abertos num nó com referência para o nó pai
            var no = listaDeAbertos[0];
            //Transformar a lista de fechados que contém um array de objectos, num array em que cada posição contém [vasilha, vasilha]
            var novaListaDeFechados = novaListaDeArrays(listaDeFechados);
            //Obtém nível de profundidade
            var nivel = no.nivel + 1;
            //remove o primeiro nó da lista de abertos
            listaDeAbertos.shift();
            //se o nó na primeira posição da lista de abertos não estiver igual na lista de fechados, adiciona-o
            if (isInList(no.valor, novaListaDeFechados) == undefined) {
                listaDeFechados.push(no);
            }
            //Verifica se já chegou à profundidade máxima
            if (no.nivel >= profundidadeMaxima) {
                procura(listaDeAbertos, listaDeFechados, TipoDeProcura.P, profundidadeMaxima);
            } else {
                //fazer sucessores desse nó
                var sucessoresNo = sucessores(no.valor);
                //ver se é encontrado o valor esperado nos sucessores desse nó
                var achado = procuraVasilhaEmListaVasilhas(sucessoresNo, 1);
                //Obtém a posição do nó pai na lista de fechados
                var pai = listaDeFechados.length - 1;
                //se o valor esperado não foi encontrado nos filhos
                if (achado == undefined || achado == null) {
                    var i, l = sucessoresNo.length;
                    for (i = 0; i < l; i++) {
                        var noFilho = new No(pai, sucessoresNo[i], nivel);
                        var novaListaDeAbertos = novaListaDeArrays(listaDeAbertos);
                        if (isInList(noFilho.valor, novaListaDeAbertos) == undefined) {
                            //adiciona à pilha "lista de nós abertos"
                            listaDeAbertos.unshift(noFilho);
                        }
                    }
                    procura(listaDeAbertos, listaDeFechados, TipoDeProcura.P, profundidadeMaxima);
                } else {
                    var nAchado = new No(pai, achado);
                    var lista = [];
                    lista.unshift(nAchado);
                    adicionarVasilhasAoHistorico(achado, 'i');
                    var i, l = listaDeFechados.length - 1;
                    for (i = l; i > -1; i--) {
                        var primeiroHistorico = lista[0];
                        if (i == primeiroHistorico.pai) {
                            adicionarVasilhasAoHistorico(listaDeFechados[i].valor, 'i');
                            lista.unshift(listaDeFechados[i]);
                        }
                    }
                }
            }

        }
    }
    //procura em largura
    //se não encontrar nos sucessores de um nó, vai fazer o mesmo um a 
    else {
        if (listaDeAbertos.length == 0) {
            return;
        } else {
            //transformar o primeiro array da lista de abertos num nó com referência para o nó pai
            var no = listaDeAbertos[0];
            //Transformar a lista de fechados que contém um array de objectos, num array em que cada posição contém [vasilha, vasilha]
            var novaListaDeFechados = novaListaDeArrays(listaDeFechados);
            //se o nó na primeira posição da lista de abertos não estiver igual na lista de fechados, adiciona-o
            if (isInList(no.valor, novaListaDeFechados) == undefined) {
                listaDeFechados.push(no);
            }
            //remove o primeiro nó da lista de abertos
            listaDeAbertos.shift();
            //fazer sucessores desse nó
            var sucessoresNo = sucessores(no.valor);
            //ver se é encontrado o valor esperado nos sucessores desse nó
            var achado = procuraVasilhaEmListaVasilhas(sucessoresNo, 1);
            //Obtém a posição do nó pai na lista de fechados
            var pai = listaDeFechados.length - 1;
            //se o valor esperado não foi encontrado nos filhos
            if (achado == undefined || achado == null) {
                var i, l = sucessoresNo.length;
                for (i = 0; i < l; i++) {
                    var noFilho = new No(pai, sucessoresNo[i]);
                    var novaListaDeAbertos = novaListaDeArrays(listaDeAbertos);
                    if (isInList(noFilho.valor, novaListaDeAbertos) == undefined) {
                        //adiciona à fila "lista de nós abertos"
                        listaDeAbertos.push(noFilho);
                    }
                }
                procura(listaDeAbertos, listaDeFechados, TipoDeProcura.L, profundidadeMaxima--);
            } else {
                var nAchado = new No(pai, achado);
                var lista = [];
                lista.unshift(nAchado);
                adicionarVasilhasAoHistorico(achado, 'i');
                var i, l = listaDeFechados.length - 1;
                for (i = l; i > -1; i--) {
                    var primeiroHistorico = lista[0];
                    if (i == primeiroHistorico.pai) {
                        adicionarVasilhasAoHistorico(listaDeFechados[i].valor, 'i');
                        lista.unshift(listaDeFechados[i]);
                    }
                }
                listaDeFechados.push(nAchado);
            }
        }
    }
}

/**
 * Para iniciar página com valores.
 *
 */
function iniciarBD() {
    /*var vasilhaA = {
        nome: "A",
        tamanhoMaximo: 3,
        quantidadeDeAgua: 0
    };*/
    var vasilhaA = new Vasilha("A", 3, 0);
    var vasilhaB = new Vasilha("B", 5, 0);


    //obter primeira vasilha
    adicionarVasilha(vasilhaA);

    //obter segunda vasilha
    adicionarVasilha(vasilhaB);

    document.writeln('<br/>' + adicionarVasilha({
        nome: "C",
        tamanhoMaximo: 4,
        quantidadeDeAgua: 0
    }) + '<br/><br/>');

    /* document.writeln("<br/>For each das vasilhas (com as duas vasilhas):<br/>");
    toStringVasilhas(getVasilhas()); */

    //Encher vasilhas A e B
    /*     document.writeln("<br/>Encher Vasilha A:<br/>");
        vasilhaA.encherVasilha();
        toStringVasilhas(getVasilhas());
        
        document.writeln("<br/>Encher Vasilha B:<br/>");
        vasilhaB.encherVasilha();
        toStringVasilhas(getVasilhas()); */

    /* Vazar Vasilhas */
    /* document.writeln("<br/>Vazar Vasilha A:<br/>");
    vasilhaA.vazarVasilha(null);
    toStringVasilhas(getVasilhas());

    document.writeln("<br/>Vazar Vasilha B para A:<br/>");
    vasilhaB.vazarVasilha(vasilhaA);
    toStringVasilhas(getVasilhas()); */

    //Encher vasilha B
    /* document.writeln("<br/>Encher Vasilha B:<br/>");
    vasilhaB.encherVasilha();
    toStringVasilhas(getVasilhas()); */

    //Vazar vasilha A
    /*     document.writeln("<br/>Vazar Vasilha A:<br/>");
        vasilhaA.vazarVasilha(null);
        toStringVasilhas(getVasilhas()); */

    //Vazar vasilha B
    /* document.writeln("<br/>Vazar Vasilha B:<br/>");
    vasilhaB.vazarVasilha(null);
    toStringVasilhas(getVasilhas()); */

    /* document.writeln("<br/> Sucessores:<br/>");
    var suce = sucessores(getVasilhas());
    toStringListasDeVasilhas(suce);

    document.writeln("<br/> Mostra a primeira vasilha com 0 litros encontrada na lista dos sucessores:<br/>");
    var a =procuraVasilhaEmListaVasilhas(suce, 0);
    toStringVasilhas(a); */

    document.writeln("<hr><br/>Procura em largura pela solução das vasilhas dadas:<br/><br/>");
    procurarSolucao(getVasilhas(), TipoDeProcura.L, 5);
    toStringListasDeVasilhas(getHistoricoDeVasilhas());
    document.writeln("Quantidade de nós abertos: " + getAbertos().length);
    document.writeln("<br/>Quantidade de nós fechados: " + getFechados().length);

    document.writeln("<hr><br/>Procura em profundidade pela solução das vasilhas dadas:<br/><br/>");
    limparHistorico();
    limparAbertos();
    limparFechados();
    procurarSolucao(getVasilhas(), TipoDeProcura.P, 5);
    toStringListasDeVasilhas(getHistoricoDeVasilhas());
    document.writeln("Quantidade de nós abertos: " + getAbertos().length);
    document.writeln("<br/>Quantidade de nós fechados: " + getFechados().length);

}
/**
 * Apresentação inicial do ecrã
 *
 */
function ecraInicial() {
    var sistema = document.getElementById("sistema");
    var container = document.getElementById("container");
    var form1 = document.getElementById("form1");
    var form2 = document.getElementById("form2");

    var titulo = document.createElement('h2');
    var botaoIniciar = document.createElement("input");

    botaoIniciar.type = "button";
    botaoIniciar.value = "Iniciar";
    titulo.appendChild(document.createTextNode("Problema - as vasilhas de água"));
    titulo.style.textAlign = 'center';
    form2.style.display = 'none';

    limpaElemento(sistema);
    limpaElemento(container);

    //container.appendChild(botaoIniciar);
    appendVariosFilhos(container, botaoIniciar);
    //sistema.appendChild(container);
    appendVariosFilhos(sistema, container);

    botaoIniciar.addEventListener('click', function (event) {
        limpaElemento(container);
        appendVariosFilhos(container, titulo); //container.appendChild(titulo);

        setTimeout(function () {

            limpaElemento(container);

            var titulo = document.createElement('h2');
            //titulo.appendChild(document.createTextNode("Quer-se medir 1 litro de água com o recurso a duas vasilhas (A e B) não graduadas que cheias contém exatamente 3 e 5 litros de água (respectivamente) e um tanque de água. Considere que pode desperdiçar água."));
            appendVariosFilhos(titulo, document.createTextNode("Quer-se medir 1 litro de água com o recurso a duas vasilhas (A e B) não graduadas que cheias contém exatamente 3 e 5 litros de água (respectivamente) e um tanque de água. Considere que pode desperdiçar água."));
            appendVariosFilhos(container, titulo); //container.appendChild(titulo);

            setTimeout(function () {

                limpaElemento(container);

                /* container.appendChild(form1);
                container.appendChild(form2); */
                appendVariosFilhos(container, form1, form2);
                appendVariosFilhos(sistema, container);
                //sistema.appendChild(container);

            }, 10000);
        }, 2000);
    });

    //clearInterval(interval);  

    //form1.style.display = 'none';
}

/**
 * Para inserir valores ao carregar a página.
 *
 */
window.onload = function () {
    ecraInicial();
    //iniciarBD();

}