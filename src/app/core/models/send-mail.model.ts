export interface SendMailModel {
    DestinatariosPrincipales:Array<string>,
    IdDocumento:number,
    Asunto:string,
    CuerpoMensaje:string,
    Usuario:string,
    ArchivoOrgigen:boolean,
    ArchivoTexto:boolean,
}
