export default class Marketing {
    update({ id, userName }) {
        // importante lembrar que o [update] é responsavel por gerenciar seus error/exceptions
        // nao deve-se ter await no notify por que a responsabilidade do notify é só emitir eventos
        // só notificar todo mundo
        console.log(`${id}: [marketing] will send an welcome email to ${userName}`)
    }
}