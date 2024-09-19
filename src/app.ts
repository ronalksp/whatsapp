import { createBot, createFlow,MemoryDB, createProvider, addKeyword } from '@bot-whatsapp/bot'
import {BaileysProvider, handleCtx} from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword('Hola').addAnswer('Buenas amig@!! Bienvenido')

/**
 * 
 */
const main = async () => {

    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http?.server.post('/send-message', handleCtx(async (bot,req, res) => {
        //const phone = req.body.phone
        //await bot.sendMessage('5493865537785','mensaje!',{})
        const body = req.body
        const mensaje = body.mensaje
        const numero = body.numero
        console.log(body)
        await bot.sendMessage(numero,mensaje,{})
        res.end('esto es del server de polka')
    }))

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main()