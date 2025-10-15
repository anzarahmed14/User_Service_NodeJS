import { DataSource } from "typeorm";
import { UserEntity } from "./entities/UserEntity";
import { RoleEntity } from "./entities/RoleEntity";
export const AppDataSource = new DataSource({
    type:"mssql",
    //url:"mssql://sa:Test%402014@127.0.0.1:1433/demoprojectdb",
    url: "mssql://sa:Test%402014@host.docker.internal:1433/demoprojectdb",
    synchronize: false,
    logging:true,
    entities:[RoleEntity,UserEntity],
    options:{
        encrypt:false,
         trustServerCertificate: true
    }
})

