const wa = require('@open-wa/wa-automate');
const getShorter = require("./functions/getShorter.ts");
const getCnpj = require("./functions/getCnpj.ts");
const getCallVerification = require("./functions/getCallVerification.ts");
const getAddOrRemoveInGroup = require("./functions/getAddOrRemoveInGroup.ts");
const getAdmins = require("./functions/getAdmins.ts");
const getLinkGroup = require("./functions/getLinkGroup.ts");
const getMenu = require("./functions/getMenu.ts");
const getConvertToStick = require("./functions/getConvertToStick.ts");
const getYoutubeMp3 = require("./functions/getYoutubeMp3.ts");
const getAddedInGroup = require("./functions/getAddedInGroup.ts");
const onStartup = require("./functions/onStartup.ts");
const onDeath = require("./functions/onDeath.ts");
const getTextToAudio = require("./functions/getTextToAudio.ts");
const getNotice = require("./functions/getNotice.ts")
const getTiktokVideo = require("./functions/getTiktokVideo.ts")
const getTranslate = require("./functions/getTranslate.ts")
const getWhatsappLink = require("./functions/getWhatsappLink")
const getYoutubeMp4 = require("./functions/getYoutubeMp4")
const getWikipedia = require("./functions/getWikipedia")
const getDice = require("./functions/getDice")
const truthOrDare = require("./functions/truthOrDare")
const getTotal = require("./functions/getTotal")
const getWeather = require("./functions/getWeather")
process.setMaxListeners(15);

onStartup.onStartup();
onDeath.onDeath();
wa.create({
    sessionId: "BotMarvinUSB",
    restartOnCrash: (client) => start(client),
    authTimeout: 60, //Tempo aguardado para se conectar ao whatsapp
    blockCrashLogs: true,
    disableSpins: true,
    useChrome: true,
    headless: true, //Caso true não irá mostrar a janela do chrome
    logConsole: false,
    popup: true,
    killProcessOnBrowserClose: true,
    chromiumArgs: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--aggressive-cache-discard",
        "--disable-cache",
        "--disable-application-cache",
        "--disable-offline-load-stale-cache",
        "--disk-cache-size=0",
    ],
    qrTimeout: 0, //timeFixedando 0, o código QR não possuirá um tempo de vida
}).then((client) => start(client));

function start(client) {
    try {
        getYoutubeMp3.getYoutubeMp3(client);
        getAddedInGroup.getAddedInGroup(client);
        getMenu.getMenu(client);
        getLinkGroup.getLinkGroup(client);
        getAdmins.getAdmins(client);
        getAddOrRemoveInGroup.getAddOrRemoveInGroup(client);
        getCallVerification.getCallVerification(client);
        getCnpj.getCnpj(client);
        getShorter.getShorter(client);
        getTextToAudio.getTextToAudio(client);
        getNotice.getNotice(client)
        getTiktokVideo.getTiktokVideo(client)
        getTranslate.getTranslate(client)
        getWhatsappLink.getWhatsappLink(client)
        getYoutubeMp4.getYoutubeMp4(client)
        getConvertToStick.getConvertToStick(client)
        getWikipedia.getWikipedia(client)
        getDice.getDice(client)
        getDice.getD20(client)
        truthOrDare.truthOrDare(client)
        getTotal.getTotal(client)
        getWeather.getWeather(client)

    } catch (error) {
        console.log(error)
    }
}