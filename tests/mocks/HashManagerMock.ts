export class HashGeneratorMocks {

    public hash = (password: string)=> {
       return "senha_Hasheada"
    }
 
    public compareHash = (password: string, hash: string)=> {
       return password === hash
    }
    
 }