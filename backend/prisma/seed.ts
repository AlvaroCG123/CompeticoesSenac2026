import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'


async function Main() {
    try {
        await prisma.convidado.deleteMany()
        await prisma.usuario.deleteMany()
        await prisma.mesa.deleteMany()

        console.log("Seed rodando")

        const adminHash = await bcrypt.hash("admin123",10)
        const cerimoniaHash = await bcrypt.hash("cerimonia123",10)

        const admin = await prisma.usuario.create({
            data:{
                nome:"admin",
                CPF:"000.000.000-01",
                email:"admin@wedding.com",
                cargo:"ADMIN",
                senha: adminHash,
            }
        })
        const cerimonialista = await prisma.usuario.create({
            data:{
                nome:"cerimonialista",
                CPF:"000.000.000-02",
                email:"cerimonialista@wedding.com",
                cargo:"CERIMONIALISTA",
                senha: cerimoniaHash,
            }
        })

        await prisma.mesa.createMany({
            data: [
                {id:1,numero:1,capacidade:6},
                {id:2,numero:2,capacidade:6},
                {id:3,numero:3,capacidade:6},
                {id:4,numero:4,capacidade:6},
                {id:5,numero:5,capacidade:6},
                {id:6,numero:6,capacidade:6},
                {id:7,numero:7,capacidade:6},
                {id:8,numero:8,capacidade:6},
            ]
        })

        await prisma.convidado.createMany({
            data: [
                {
                    nome_completo:"Celso Bastos",
                    email:"celso.bastos@gmail.com",
                    telefone:"(54) 99134-5678",
                    mesaId:1,
                    check_in:true,
                    horario_checkin: new Date()
                    
                },
                {
                    nome_completo:"Marina Bastos",
                    email:"marina.bastos@gmail.com",
                    telefone:"(54) 99134-5679",
                    mesaId:1,
                    check_in:true,
                },
                {
                    nome_completo:"Fernando Bastos",
                    email:"fernando.bastos@gmail.com",
                    mesaId:1,
                    telefone:"(54) 99134-5680",
                    check_in:true,
                    horario_checkin: new Date()
                },
                {
                    nome_completo:"Antônio Bastos",
                    email:"antonio.bastos@gmail.com",
                    mesaId:1,
                    telefone:"(54) 99234-1122",
                    check_in:false
                                   },
                {
                    nome_completo:"Sônia Bastos",
                    email:"sonia.bastos@gmail.com",
                    mesaId:1,
                    telefone:"(54) 99234-1123",
                    check_in:false
                    
                },
                {
                    nome_completo:"Carlos Henrique Lima",
                    email:"carloslima@gmail.com",
                    mesaId:1,
                    telefone:"(54) 98765-4321",
                    check_in:false
                    
                },
                {
                    nome_completo:"Cláudio Bastos",
                    email:"claudio.bastos@gmail.com",
                    mesaId:2,
                    telefone:"(51) 99876-1234",
                    check_in:false
                    
                },
                {
                    nome_completo:"Regina Bastos",
                    email:"regina.bastos@gmail.com",
                    mesaId:2,
                    telefone:"(51) 99876-1235",
                    check_in:false
                    
                },
                {
                    nome_completo:"Bernardo Bastos",
                    email:"bernardo.bastos@gmail.com",
                    mesaId:2,
                    telefone:"(11) 97654-3210",
                    check_in:false
                    
                },
                {
                    nome_completo:"Bárbara Bastos",
                    email:"barbara.bastos@gmail.com",
                    mesaId:2,
                    telefone:"(54) 99111-2233",
                    check_in:false
                    
                },
                {
                    nome_completo:"Marcelo Junqueira",
                    email:"marcelo.junqueira@gmail.com",
                    mesaId:2,
                    telefone:"(54) 99111-2234",
                    check_in:false
                    
                },
                {
                    nome_completo:"Mariana Bastos",
                    email:"mariana.bastos@gmail.com",
                    mesaId:2,
                    telefone:"(54) 99111-2235",
                    check_in:false
                    
                },
                {
                    nome_completo:"Vitor Bastos",
                    email:"vitor.bastos@gmail.com",
                    mesaId:3,
                    telefone:"(54) 99111-2236",
                    check_in:false
                    
                },
                {
                    nome_completo:"Ana Luiza Ferreira",
                    email:"analuiza.ferreira@gmail.com",
                    mesaId:3,
                    telefone:"(51) 99345-6789",
                    check_in:false
                    
                },
                {
                    nome_completo:"Pedro Henrique Martins",
                    email:"pedrohenrique.martins@gmail.com",
                    mesaId:3,
                    telefone:"(51) 99345-6790",
                    check_in:false
                    
                },
                {
                    nome_completo:"Isabela Costa",
                    email:"isabela.costa@gmail.com",
                    mesaId:3,
                    telefone:"(51) 98765-1234",
                    check_in:false
                    
                },
                {
                    nome_completo:"Lucas Mendes",
                    email:"lucas.mendes@gmail.com",
                    mesaId:3,
                    telefone:"(51) 99234-5678",
                    check_in:false
                    
                },
                {
                    nome_completo:"Juliana Alves",
                    email:"juliana.alves@gmail.com",
                    mesaId:3,
                    telefone:"(51) 99234-5679",
                    check_in:false
                    
                },
                {
                    nome_completo:"Takeshi Nakao",
                    email:"takeshi.nakao@outlook.com",
                    mesaId:4,
                    telefone:"+81 90-1234-5678",
                    check_in:false
                    
                },
                {
                    nome_completo:"Rina Nakao",
                    email:"rina.nakao@outlook.com",
                    mesaId:4,
                    telefone:"+81 90-1234-5679",
                    check_in:false
                    
                },
                {
                    nome_completo:"Daniel Suzuki",
                    email:"daniel.suzuki@gmail.com",
                    mesaId:4,
                    telefone:"+1 (415) 555-0123",
                    check_in:false
                    
                },
                {
                    nome_completo:"Erika Suzuki",
                    email:"erika.suzuki@gmail.com",
                    mesaId:4,
                    telefone:"+1 (415) 555-0124",
                    check_in:false
                    
                },
                {
                    nome_completo:"Yuki Tanaka",
                    email:"yuki.tanaka@outlook.com",
                    mesaId:4,
                    telefone:"+81 90-8765-4321",
                    check_in:false
                    
                },
                {
                    nome_completo:"Kenji Yamamoto",
                    email:"kenji.yamamoto@outlook.com",
                    mesaId:4,
                    telefone:"+81 90-8765-4322",
                    check_in:false
                    
                },
                {
                    nome_completo:"Mattew Stuart",
                    email:"mattew.stuart@gmail.com",
                    mesaId:4,
                    telefone:"+44 7700 900123",
                    check_in:false
                    
                },
                {
                    nome_completo:"Olivia Thompson",
                    email:"olivia.thompson@gmail.com",
                    mesaId:5,
                    telefone:"+44 7700 900124",
                    check_in:false
                    
                },
                {
                    nome_completo:"Ravi Desai",
                    email:"ravi.desai@gmail.com",
                    mesaId:5,
                    telefone:"+91 98765 43210",
                    check_in:false
                    
                },
                {
                    nome_completo:"Charlotte Harper",
                    email:"charlotte.harper@gmail.com",
                    mesaId:5,
                    telefone:"+44 7700 900125",
                    check_in:false
                    
                },
                {
                    nome_completo:"Mia Taylor",
                    email:"mia.taylor@gmail.com",
                    mesaId:5,
                    telefone:"+44 7700 900126",
                    check_in:false
                    
                },
                {
                    nome_completo:"Michael Brown",
                    email:"michael.brown@gmail.com",
                    mesaId:5,
                    telefone:"+44 7700 900127",
                    check_in:false
                    
                },
                {
                    nome_completo:"Beatriz Santos",
                    email:"beatriz.santos@gmail.com",
                    mesaId:5,
                    telefone:"(51) 99567-8901",
                    check_in:false
                    
                },
                {
                    nome_completo:"Gabriel Oliveira",
                    email:"gabriel.oliveira@gmail.com",
                    mesaId:6,
                    telefone:"(51) 99567-8902",
                    check_in:false
                    
                },
                {
                    nome_completo:"Fernanda Rocha",
                    email:"fernanda.rocha@gmail.com",
                    mesaId:6,
                    telefone:"(51) 99567-8903",
                    check_in:false
                    
                },
                {
                    nome_completo:"Rafael Sousa",
                    email:"rafael.sousa@gmail.com",
                    mesaId:6,
                    telefone:"(51) 99567-8904",
                    check_in:false
                    
                },
                {
                    nome_completo:"Camila Pereira",
                    email:"camila.pereira@gmail.com",
                    mesaId:6,
                    telefone:"(51) 99567-8905",
                    check_in:false
                    
                },
                {
                    nome_completo:"Thiago Rodrigues",
                    email:"thiago.rodrigues@gmail.com",
                    mesaId:6,
                    telefone:"(51) 99567-8906",
                    check_in:false
                    
                }
            ]
        })
        console.log("Seed finalizado")
    } catch (error) {
        console.error("Falha no seed: ", error)
    }finally{
        await prisma.$disconnect()
    }
}

await Main()