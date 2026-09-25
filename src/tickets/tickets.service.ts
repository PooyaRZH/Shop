import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketRepository } from 'src/repo/tickets.repo';

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsRepo: TicketRepository) { }

  async create(createTicketDto: CreateTicketDto) {
    const isExistUser = await this.ticketsRepo.findUserById(createTicketDto.user_id)
    if (!isExistUser) throw new NotFoundException("user not found !")

    if (createTicketDto.main_ticket_id) {
      const isExistsTicket = await this.ticketsRepo.findMainTicketById(createTicketDto.main_ticket_id)
      console.log(isExistsTicket)
      if (!isExistsTicket) throw new NotFoundException("main ticket not found !")
    }

    return this.ticketsRepo.create(createTicketDto)
  }

  async findAll() {
    // koll main tickets haye database
    return await this.ticketsRepo.findAll();
  }



  // ------------------------------ WAY 1 (be tedad main ticket query ejra mishavad)
  // async findUserTickets(id: number) {
  //   const mainTickets = await this.ticketsRepo.findMainTicketsByUserId(id);

  //   const allTickets = await Promise.all(
  //     mainTickets.map((t) =>
  //       this.ticketsRepo.findTicketsUser(t.id)
  //     )
  //   );

  //   return allTickets;
  // }


  // ------------------------------ WAY 2 (faghat 1 query ejra mishavad)
  async findUserTickets(userId: number) {
    const allTickets = await this.ticketsRepo.findTicketsByUserId(userId);
    if (allTickets.length < 1) throw new NotFoundException("تیکتی یافت نشد");

    return allTickets;
  }











  // update(id: number, updateTicketDto: UpdateTicketDto) {
  //   return `This action updates a #${id} ticket`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} ticket`;
  // }




}
